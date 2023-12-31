import React, {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import "regenerator-runtime/runtime";
import { createSpeechlySpeechRecognition } from "@speechly/speech-recognition-polyfill";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { debounce } from "debounce";
import { factCheck, suggestAnswers } from "../helpers/GPTEndpoints";
import { async } from "regenerator-runtime";
import "./SpeechComponent.scss";
import mic from "../assets/mic.svg";
import { AppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const appId = import.meta.env.VITE_SPEECHLY_APP_ID;
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

const SpeechComponent = ({ addNote, updateState }) => {
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  const {
    transcript: textStream,
    listening,
    resetTranscript: resetTextStream,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const transcript = useRef([
    {
      text: "",
      timestamp: new Date(),
      factual: "true",
    },
  ]);
  const transcriptLength = useRef(0);

  // update transcript state
  const {
    transcript: _transcript,
    corrections: _corrections,
    setTranscript,
  } = useContext(AppContext);

  const navigate = useNavigate();
  function updateAllState() {
    let cleanTranscript = "";
    transcript.current.forEach((segment) => (cleanTranscript += segment.text));
    setTranscript(cleanTranscript);
    updateState();
    navigate("/results");
  }

  let transcriptText;
  if (transcriptLength.current === 0) {
    transcriptText = "Start Recording to See Live Transcript";
  } else {
    transcriptText = "Live Transcript";
  }

  useEffect(() => {
    console.log("textStream changed");
    console.log(textStream);
  }, [textStream]);

  function updateTranscript(newTextStream) {
    if (newTextStream.length === 0) return;

    // construct the new block object
    let newBlockText = newTextStream.substring(
      transcriptLength.current,
      newTextStream.length
    );
    let blockObject = {
      text: newBlockText,
      timestamp: new Date(),
      factual: "unknown",
    };
    transcriptLength.current = newTextStream.length;

    if (blockObject.text.length > 5) {
      transcript.current.push(blockObject);
      fetchCorrection();
      checkForQuestion();
    } else {
      // append the new block to the last block
      let lastBlock = transcript.current[transcript.current.length - 1];
      lastBlock.text += blockObject.text;
    }

    async function fetchCorrection() {
      // get the last three blocks that were factual

      let lastFewBlocks = [];
      let lastFewBlocksText = "";

      for (let i = transcript.current.length - 1; i >= 0; i--) {
        let currentBlock = transcript.current[i];
        if (currentBlock.factual === "false") break;
        else {
          lastFewBlocksText = currentBlock.text + lastFewBlocksText;
          lastFewBlocks.push(currentBlock);
          if (lastFewBlocksText.length > 200) break;
        }
      }

      // check if the last three blocks are factual
      const response = await factCheck(blockObject.text);
      console.log(response);
      if (!response.factual && !response.unclear) {
        addNote({
          transcriptText: lastFewBlocksText,
          timestamp: blockObject.timestamp,
          corrections: response.corrections,
          unclear: response.unclear,
          status: "correction",
        });
      }

      // update the factual status of the block
      if (response.factual) {
        for (let i = 0; i < lastFewBlocks.length; i++) {
          lastFewBlocks[i].factual = "true";
        }
      } else {
        for (let i = 0; i < lastFewBlocks.length; i++) {
          lastFewBlocks[i].factual = "false";
        }
      }
    }

    async function checkForQuestion() {
      const response = await suggestAnswers(blockObject.text);
      if (response.containsQuestion) {
        addNote({
          status: "question",
          question: response.question,
          answer: response.answer,
          timestamp: blockObject.timestamp,
        });
      }
    }

    forceUpdate();
    console.log(transcript.current);
  }

  const updateTranscriptDebounced = useCallback(
    debounce((newTextStream) => {
      updateTranscript(newTextStream);
    }, 1000),
    []
  );

  useEffect(() => {
    if (textStream.length === 0) return;
    if (textStream.length > transcriptLength.current + 250) {
      updateTranscript(textStream);
    }
    updateTranscriptDebounced(textStream);
  }, [textStream, transcriptLength, updateTranscriptDebounced]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="speech-component">
      <div className="transcriptTitle">{transcriptText}</div>
      <div className="transcriptContainer">
        {transcript.current.map((block, index) => {
          if (block.text.length === 0) return;
          return (
            // <p key={index}>
            // 	[{block.factual}]: {dateToHHMMSS(block.timestamp)}: {block.text}
            // </p>
            <p key={index}>{block.text}</p>
          );
        })}
      </div>
      <div className="buttonRow">
        {/* <p>Microphone: {listening ? "on" : "off"}</p> */}
        <button
          className="recordButton"
          onClick={() => {
            if (listening) {
              SpeechRecognition.stopListening();
            } else {
              SpeechRecognition.startListening({ continuous: true });
            }
          }}
        >
          <div className="buttonContainer">
            <img src={mic}></img>
            {listening && <div className="recordIcon">&nbsp;</div>}
          </div>
          {/* {listening ? "Stop" : "Start"} */}
        </button>
        {!listening && (
          <button className="recordButton endSession" onClick={updateAllState}>
            End Session
          </button>
        )}
        {/* <button onClick={resetTextStream}>Reset</button> */}
      </div>
    </div>
  );
};

function dateToHHMMSS(date) {
  if (!date) return "";
  return date.toISOString().substr(11, 8);
}

export default SpeechComponent;

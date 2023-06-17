import React, {
	useCallback,
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

// const appId = import.meta.env.VITE_SPEECHLY_APP_ID;
// const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
// SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

const SpeechComponent = () => {
	const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

	const {
		transcript: textStream,
		listening,
		resetTranscript: resetTextStream,
		browserSupportsSpeechRecognition,
	} = useSpeechRecognition();

	const transcript = useRef([]);
	const transcriptLength = useRef(0);

	useEffect(() => {
		console.log("textStream changed");
		console.log(textStream);
	}, [textStream]);

	function updateTranscript(newTextStream) {
		let newBlock = newTextStream.substring(
			transcriptLength.current,
			newTextStream.length
		);
		transcript.current.push(newBlock);
		transcriptLength.current = newTextStream.length;

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
		if (textStream.length > transcriptLength.current + 250) {
			updateTranscript(textStream);
		}
		updateTranscriptDebounced(textStream);
	}, [textStream, transcriptLength, updateTranscriptDebounced]);

	if (!browserSupportsSpeechRecognition) {
		return <span>Browser doesn't support speech recognition.</span>;
	}

	return (
		<div>
			<p>Microphone: {listening ? "on" : "off"}</p>
			<button
				onClick={() => {
					SpeechRecognition.startListening({ continuous: true });
				}}
			>
				Start
			</button>
			<button onClick={SpeechRecognition.stopListening}>Stop</button>
			<button onClick={resetTextStream}>Reset</button>
			{/* <p>{textStream}</p> */}
			{transcript.current.map((block, index) => {
				return <p key={index}>{block}</p>;
			})}
		</div>
	);

	return <div>SpeechRecognition</div>;
};

export default SpeechComponent;

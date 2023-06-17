import React from "react";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition";

const SpeechComponent = () => {
	const {
		transcript,
		listening,
		resetTranscript,
		browserSupportsSpeechRecognition,
	} = useSpeechRecognition();

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
			<button onClick={resetTranscript}>Reset</button>
			<p>{transcript}</p>
		</div>
	);

	return <div>SpeechRecognition</div>;
};

export default SpeechComponent;

import { useEffect, useReducer, useRef, useState } from "react";
import PrettyBox from "../components/PrettyBox";
import "./SpeechPage.scss";
import face from "../assets/face.svg";
import SpeechComponent from "../components/SpeechComponent";
import { factCheck } from "../helpers/GPTEndpoints";
import getSentiment from "../helpers/getSentimentHume";
import getSentimentPrediction from "../helpers/getSentimentHume";

export const SpeechPage = () => {
	const content =
		"Pigs were not kept in every home and prayed to every evening and night in South America before European colonization. The cultural practices related to pigs varied among indigenous peoples.";
	const timestamp = "12:35pm";
	const [count, setCount] = useState(0);
	const [loading, setLoading] = useState(true);

	const notes = useRef([]);
	const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

	const sampleNote = {
		transcriptText:
		  "tyler freya's web two my boy priya shou he's so good at web development",
		timestamp: new Date(),
		corrections: [
		  "The paragraph is too vague and lacks context to be fact-checked."
		],
		status: "correction"
	};

	const sampleNote2 = {
		transcriptText:
		  "FUCK FUCK FUCK FUCK FUCK FUCK FUCK FUCK FUCK FUCK FUCK",
		timestamp: new Date(),
		corrections: [
		  "FUCK FUCK FUCK FUCK FUCK FUCK FUCK FUCK FUCK"
		],
		status: "suggestion"
	};

	const addNote = (note) => {
		notes.current.push(note);
		forceUpdate();
	};

	const setNotes = () => {
		corrections = notes;
	}

	console.log(JSON.stringify(notes.current));

	useEffect(function () {
		async function fetchData() {
			const response = await factCheck("pigs are 1 inch tall");
			console.log(response);
			const response1 = await getSentiment("I hate you");
			
			if(response1 !== "undefined")
			{
				console.log(response1)
				console.log("coming here")
				const responseObj = JSON.parse(response1);
				const jobId = responseObj.job_id;
				console.log(jobId);
				const response2 = await getSentimentPrediction(response1);
				console.log(response2);

			}
			else{
				console.log("undefined")
			}
			
		}
		setLoading(false);

		fetchData();
	}, []);

	if (loading) return <div>Loading...</div>;

	return (
		<div className="pageContainer">
			<div className="leftSide">
				<img src={face} className="face" />
				<SpeechComponent addNote={addNote} />
			</div>
			<div className="boxesContainer">
				{notes.current.reverse().map((note, index) => {
					if (index <= 2)
					return (<PrettyBox index={index} note={note} status="correction" />);
				}
				)}
				{/* <PrettyBox
					note = {sampleNote}
				/>
				<PrettyBox
					note = {sampleNote2}
				/> */}
				{/* <PrettyBox
					content={content + content}
					timestamp={timestamp}
					status="correction"
				/> */}
			</div>
		</div>
	);
};

// export default SpeechPage;

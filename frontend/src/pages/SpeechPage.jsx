import { useEffect, useReducer, useRef, useState } from "react";
import PrettyBox from "../components/PrettyBox";
import "./SpeechPage.scss";
import face from "../assets/face.svg";
import SpeechComponent from "../components/SpeechComponent";
import { factCheck } from "../helpers/GPTEndpoints";

export const SpeechPage = () => {
	const content =
		"Pigs were not kept in every home and prayed to every evening and night in South America before European colonization. The cultural practices related to pigs varied among indigenous peoples.";
	const timestamp = "12:35pm";
	const [count, setCount] = useState(0);
	const [loading, setLoading] = useState(true);

	const corrections = useRef([]);
	const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

	const addCorrection = (correction) => {
		corrections.current.push(correction);
		forceUpdate();
	};

	console.log(JSON.stringify(corrections.current));

	useEffect(function () {
		async function fetchData() {
			const response = await factCheck("pigs are 1 inch tall");
			console.log(response);
		}
		setLoading(false);

		fetchData();
	}, []);

	if (loading) return <div>Loading...</div>;

	return (
		<div className="pageContainer">
			<div className="leftSide">
				<img src={face} className="face" />
				<SpeechComponent addCorrection={addCorrection} />
			</div>
			<div className="boxesContainer">
				{corrections.current.map((correction, index) => (
					<PrettyBox key={index} correction={correction} status="correction" />
				))}

				{/* <PrettyBox
					corrections={["correction1", "correction2", "correction3"]}
					transcriptText={"transcriptText"}
					timestamp={new Date()}
					status="correction"
				/> */}
				{/* <PrettyBox
					content={content}
					timestamp={timestamp}
					status="correction"
				/>
				<PrettyBox
					content={content + content}
					timestamp={timestamp}
					status="correction"
				/> */}
			</div>
		</div>
	);
};

// export default SpeechPage;

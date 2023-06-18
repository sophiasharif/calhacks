import React from "react";
import "./PrettyBox.scss";

const PrettyBox = ({ corrections, transcriptText, timestamp, status }) => {
	return (
		<div className="boxContainer">
			<div className={`sideBar ${status}`}>&nbsp;</div>
			<div className="textContainer">
				<div className="timestamp">{dateToHHMMSS(timestamp)}</div>
				<div className="transcript">You said: "{transcriptText}"</div>
				<div className="boxContent">
					{corrections?.map((correction, index) => (
						<div className="correction" key={index}>
							<div className="correctionText">{correction}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

function dateToHHMMSS(date) {
	if (!date) return "";
	return date.toISOString().substr(11, 8);
}

export default PrettyBox;

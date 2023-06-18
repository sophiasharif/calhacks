import React from "react";
import "./PrettyBox.scss";

const PrettyBox = ({ note }) => {
	console.log("note", note);

	if (note.status === "question") {
		return (
			<div className="boxContainer">
				<div className={`sideBar ${note.status}`}>&nbsp;</div>
				<div className="textContainer">
					<div className="timestamp">{dateToHHMMSS(note.timestamp)}</div>
					<div className="transcript">Someone asked: "{note.question}"</div>
					<div className="boxContent">
						<div className="correctionText">A: {note?.answer}</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="boxContainer">
			<div className={`sideBar ${note.status}`}>&nbsp;</div>
			<div className="textContainer">
				<div className="timestamp">{dateToHHMMSS(note.timestamp)}</div>
				<div className="transcript">You said: "{note.transcriptText}"</div>
				<div className="boxContent">
					{note.corrections?.map((correction, index) => (
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

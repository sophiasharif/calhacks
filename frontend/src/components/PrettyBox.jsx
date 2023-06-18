import React from "react";
import "./PrettyBox.scss";

const PrettyBox = ({ note, index }) => {
  const e = index;
  let him_cook;
  if (index === 1) {
    him_cook = "second";
  }
  if (index === 2) {
    him_cook = "third";
  }

  if (note.status === "question") {
    return (
      <div className={`boxContainer ${him_cook}`}>
        <div className="textContainer">
          <div className="topRow">
            <div className={`sideBar ${note.status}`}>&nbsp;</div>
            {/* <div className="timestamp">{dateToHHMMSS(note.timestamp)}</div> */}
            <div className="transcript">
              {" "}
              <span style={{ fontWeight: 700 }}>
                [{dateToHHMMSS(note.timestamp)}]{" "}
              </span>
              Someone asked: "{note.question}"
            </div>
          </div>
          <div className="boxContent">
            <div className="correctionText">A: {note?.answer}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="boxContainer">
      <div className="textContainer">
        <div className="topRow">
          <div className={`sideBar ${note.status}`}>&nbsp;</div>
          {/* <div className="timestamp">{dateToHHMMSS(note.timestamp)}</div> */}
          <div className="transcript">
            <span style={{ fontWeight: 700 }}>
              [{dateToHHMMSS(note.timestamp)}] You said:
            </span>{" "}
            "{note.transcriptText}"
          </div>
        </div>
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

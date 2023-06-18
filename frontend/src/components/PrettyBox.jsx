import React, { useState } from "react";
import "./PrettyBox.scss";
import { getContradictingSources } from "../helpers/GPTEndpoints";

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

  const [links, setLinks] = useState(null);
  // const sources = getContradictingSources(note.transcriptText).then(() => {
  //   temp = [];
  //   sources.forEach((source) =>
  //     temp.append("https://en.wikipedia.org/wiki/" + source)
  //   );
  //   console.log("SOURCES:", temp);
  //   setLinks(temp);
  // });

  getContradictingSources(note.transcriptText).then((sources) => {
    let temp = [];
    sources.forEach((source) => {
      temp.push("en.wikipedia.org/wiki/" + source);
    });
    console.log("temp is now", temp);
    setLinks(temp);
  });

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
        <div className="sources">
          {links?.map((link, i) => (
            // const noSpaces = link.replace(/ /g, "_");
            <a href={`//${link.replace(/ /g, "_")}`}>Source {i + 1}</a>
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

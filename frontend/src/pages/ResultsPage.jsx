import { useContext } from "react";
import PrettyBox from "../components/PrettyBox";
import { getContradictingSources } from "../helpers/GPTEndpoints";
import factCheckClaim from "../helpers/factCheckClaim";
import "./ResultsPage.scss";
import { AppContext } from "../contexts/AppContext";

export const ResultsPage = () => {
  const length = "13:58";
  const numMistakes = 10;
  const summary =
    "In the enchanted forest, where the whispers of ancient trees danced with the ethereal light filtering through the canopies, a peculiar harmony unfolded. The air hummed with an otherworldly energy, as if time itself held its breath in reverence. Mythical creatures, hidden in the shadows, whispered secrets to the wind, their voices blending with the symphony of chirping birds and rustling leaves. The forest floor, adorned with a vibrant tapestry of mosses and delicate wildflowers, served as a soft pathway for wandering souls. Rays of sunlight, like golden ribbons, cascaded through the foliage, casting mesmerizing patterns upon the forest floor. It was a realm where dreams intermingled with reality, where every step held the promise of encountering a hidden wonder. The forest was a sanctuary, a place where one could escape the confines of the mundane and embrace the enchantment that dwelled within.";
  const { corrections: notes, transcript } = useContext(AppContext);

  return (
    <div className="wrapper">
      <h1>Your Session</h1>
      <div className="grid">
        <div className="col" id="stats">
          <h3>Length of Session: {length}</h3>
          <h3>Mistakes Caught: {numMistakes}</h3>
          <h2>Summary</h2>
          <div id="summary" className="container">
            {summary}
          </div>
        </div>
        <div className="col">
          <h2>Transcript</h2>
          <div id="transcript" className="container">
            {transcript}
          </div>
        </div>
      </div>
      <div id="corrections">
        {notes.map((note, index) => (
          <PrettyBox key={index} note={note} status="correction" />
        ))}
      </div>
    </div>
  );
};

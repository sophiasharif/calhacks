import PrettyBox from "../components/PrettyBox";
import "./ResultsPage.scss";

export const ResultsPage = () => {
  const length = "13:58";
  const numMistakes = 10;
  const summary =
    "In the enchanted forest, where the whispers of ancient trees danced with the ethereal light filtering through the canopies, a peculiar harmony unfolded. The air hummed with an otherworldly energy, as if time itself held its breath in reverence. Mythical creatures, hidden in the shadows, whispered secrets to the wind, their voices blending with the symphony of chirping birds and rustling leaves. The forest floor, adorned with a vibrant tapestry of mosses and delicate wildflowers, served as a soft pathway for wandering souls. Rays of sunlight, like golden ribbons, cascaded through the foliage, casting mesmerizing patterns upon the forest floor. It was a realm where dreams intermingled with reality, where every step held the promise of encountering a hidden wonder. The forest was a sanctuary, a place where one could escape the confines of the mundane and embrace the enchantment that dwelled within.";
  const notes = [
    {
      transcriptText:
        "tyler freya's web two my boy priya shou he's so good at web development",
      timestamp: null,
      corrections: [
        "The paragraph is too vague and lacks context to be fact-checked.",
      ],
      status: "correction",
    },
    {
      transcriptText: " please fact check oh it's cool",
      timestamp: null,
      corrections: [
        "The paragraph does not contain any factual information to fact check.",
      ],
      status: "correction",
    },
    {
      transcriptText:
        " as an experienced senior web developer i'm a very good web developer no fact check factually true that's what it says let's go do all my friends sophia she's also good at web development true yeah let's get me to use two vagins contact to be conscious",
      timestamp: null,
      corrections: [
        "The given paragraph is nonsensical and does not contain any factual information.",
      ],
      status: "correction",
    },
    {
      transcriptText: " okay my indian tech support for",
      timestamp: null,
      corrections: [
        "The given text is incomplete and does not provide enough information to fact-check.",
      ],
      status: "correction",
    },
    {
      transcriptText: " what is that transcription",
      timestamp: null,
      corrections: ["The paragraph is too short and vague to evaluate."],
      status: "correction",
    },
    {
      transcriptText: " anyway my indian tech support friend is a big",
      timestamp: null,
      corrections: [
        "The paragraph is incomplete and lacks context. It is impossible to fact-check without additional information.",
      ],
      status: "correction",
    },
    {
      transcriptText:
        " okay what's the best way to handle this because like so sometime oh okay i guess i should just throw out the things that don't have enough like",
      timestamp: null,
      corrections: [
        "The paragraph is too vague and does not contain any factual information to fact check.",
      ],
      status: "correction",
    },
  ];
  const transcript = `In the realm of fan fiction, where imagination knows no bounds, a captivating tale unraveled. The familiar characters from a beloved book series found themselves in an unexpected adventure beyond the confines of their original story. Harry Potter, armed with his trusty wand, stumbled upon a time-turner that whisked him away to a parallel universe where he encountered the crew of the starship Enterprise. The worlds of magic and science collided as Harry teamed up with Captain Kirk and Spock to face a formidable enemy threatening both realms. Together, they forged an unlikely alliance, combining the power of spells and futuristic technology to save their worlds from certain doom.

  In the realm of superheroes, the Avengers found themselves facing their greatest challenge yet. A rogue supervillain had managed to gain control over time itself, creating alternate realities where heroes turned against each other. Iron Man found himself in a dystopian future where he was the only remaining hero, while Captain America was transported to a realm where villains ruled with an iron fist. As they navigated these twisted timelines, the Avengers had to find a way to restore balance and bring their team back together. With the fate of the multiverse hanging in the balance, they proved that the power of friendship and determination could conquer even the most daunting obstacles.
  
  In the world of fantasy, a prophecy foretold the coming of a legendary hero. Frodo Baggins, bearing the One Ring, embarked on a perilous journey through Middle-earth, accompanied by an unlikely fellowship. However, in this alternate tale, the fellowship expanded to include characters from other beloved fantasy realms. Legolas and Aragorn found themselves joined by Gandalf the Grey and the mighty warrior princess, Xena. Together, they faced hordes of orcs, encountered mythical creatures, and challenged the dark forces that threatened to engulf the world. Their epic quest became a crossover of epic proportions, uniting heroes from different realms in a battle against the forces of darkness.
  
  In the realm of science fiction, the Doctor, a time-traveling alien, stumbled upon a distress signal originating from a distant galaxy. Intrigued, the Doctor piloted the TARDIS to investigate, only to find himself embroiled in a conflict between warring alien races. As he unraveled the mystery behind their ancient feud, he encountered a group of rebels fighting for freedom. Joined by the fearless space smuggler, Han Solo, and the brilliant engineer, Kaylee Frye, the Doctor led an intergalactic rebellion against the tyrannical rulers. Their adventures spanned across galaxies, filled with thrilling escapades, and unexpected alliances formed in the name of justice.
  
  In the realm of romance, two beloved characters from different universes found their paths crossing in the most unexpected way. Elizabeth Bennet, the spirited heroine of Pride and Prejudice, found herself transported through time to modern-day New York City. As she navigated the bustling streets and bewildering technology, she crossed paths with the dashing billionaire, Tony Stark. Sparks flew as their witty banter and sharp intellects collided, leading to a whirlwind romance that transcended time and societal norms. With the power of love.`;

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

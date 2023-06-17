import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import PrettyBox from "./components/PrettyBox";
import factCheck from "./helpers/factCheck";
import "./App.scss";
import face from "./assets/face.svg";
import summarize from "./helpers/summarize";

function App() {
  const content =
    "Pigs were not kept in every home and prayed to every evening and night in South America before European colonization. The cultural practices related to pigs varied among indigenous peoples.";
  const timestamp = "12:35pm";
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(function () {
    async function fetchData() {
      const response = await summarize(
        "Mythological stories can be traced across continents and back to the beginning of time. People from different cultures have created myths to celebrate the diverse, the heroic, the unbelievable, and the unknown. At first glance, students may wonder what ties their lives may have to Greek mythology, if any. However, upon further examination, they will realize that myths have provided us with explanations, have influenced our vocabulary, have entertained people for many generations, and continue to teach us many lessons. Students will gain knowledge and understanding of the legacy of ancient Greece; selected myths, gods, and goddesses and their impact on literature today; and the relationship between Greek mythology and modern society."
      );
      // const response = await factCheck("pigs don't exist");
      console.log(response);
    }
    setLoading(false);

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="pageContainer">
      <img src={face} className="face" />
      <div className="boxesContainer">
        <PrettyBox
          content={content}
          timestamp={timestamp}
          status="suggestion"
        />
        <PrettyBox
          content={content}
          timestamp={timestamp}
          status="correction"
        />
        <PrettyBox
          content={content + content}
          timestamp={timestamp}
          status="correction"
        />
      </div>
    </div>
  );
}

export default App;

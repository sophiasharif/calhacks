import { useEffect, useState } from "react";
import PrettyBox from "../components/PrettyBox";
import factCheck from "../helpers/factCheck";
import suggestion from "../helpers/suggestion";
import "./SpeechPage.scss";
import face from "../assets/face.svg";

export const SpeechPage = () => {
  const content =
    "Pigs were not kept in every home and prayed to every evening and night in South America before European colonization. The cultural practices related to pigs varied among indigenous peoples.";
  const timestamp = "12:35pm";
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(function () {
    async function fetchData() {
      const response = await suggestion(
        "pigs are 1 inch tall. i love minecraft. obama used to be the president. when was obama the president?"
      );
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
};

// export default SpeechPage;

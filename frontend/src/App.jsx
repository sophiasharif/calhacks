import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import PrettyBox from "./components/PrettyBox";
import factCheck from "./helpers/factCheck";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(function () {
    async function fetchData() {
      const response = await factCheck("pigs are 1 inch tall");
      console.log(response);
    }

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <PrettyBox />
    </div>
  );
}

export default App;

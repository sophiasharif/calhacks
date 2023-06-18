import React, { useState } from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SpeechComponent from "./components/SpeechComponent.jsx";
import { SpeechPage } from "./pages/SpeechPage.jsx";
import { PlanPage } from "./pages/PlanPage.jsx";
import { ResultsPage } from "./pages/ResultsPage";
import { AppContext } from "./contexts/AppContext";

const router = createBrowserRouter([
	{
		path: "/live",
		element: <SpeechPage></SpeechPage>,
	},
	{
		path: "/speech",
		element: <SpeechComponent></SpeechComponent>,
	},
	{
		path: "/",
		element: <PlanPage></PlanPage>,
	},
	{
		path: "/results",
		element: <ResultsPage></ResultsPage>,
	},
]);

// ReactDOM.createRoot(document.getElementById("root")).render(
// <AppContext.Provider value={}>
//   <RouterProvider router={router} />
//   </AppContext.Provider>
// );

const App = () => {
	// Initialize your shared state here
	const [transcript, setTranscript] = useState("");
	const [corrections, setCorrections] = useState([]);

	return (
		<AppContext.Provider
			value={{ transcript, setTranscript, corrections, setCorrections }}
		>
			<RouterProvider router={router} />
		</AppContext.Provider>
	);
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

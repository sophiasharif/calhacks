import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SpeechComponent from "./components/SpeechComponent.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App></App>,
	},
	{
		path: "/speech",
		element: <SpeechComponent></SpeechComponent>,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	// <React.StrictMode>
	<RouterProvider router={router} />
	// </React.StrictMode>,
);

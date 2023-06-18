import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SpeechComponent from "./components/SpeechComponent.jsx";
import { SpeechPage } from "./pages/SpeechPage.jsx";
import { ResultsPage } from "./pages/ResultsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SpeechPage></SpeechPage>,
  },
  {
    path: "/speech",
    element: <SpeechComponent></SpeechComponent>,
  },
  {
    path: "/results",
    element: <ResultsPage></ResultsPage>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>,
);

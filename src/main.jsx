import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { initTheme } from "./core/theme/useTheme.js";
import "./theme/palette.css";
import "./styles/global.css";
import "./styles/app.css";

initTheme(); // apply saved/system theme before first paint
createRoot(document.getElementById("root")).render(<App />);

import React from "react";
import ReactDOM from "react-dom/client";
//import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "primereact/resources/themes/lara-light-blue/theme.css"; // Theme
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css"; // Icons
import "primeflex/primeflex.css"; // Utility classes (optional)


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename="/">
    <App />
  </BrowserRouter>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom"; // Importa el Router
import './index.css'
import App from './App.jsx'


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* Envuelve App con el Router */}
      <App />
    
  </React.StrictMode>
);
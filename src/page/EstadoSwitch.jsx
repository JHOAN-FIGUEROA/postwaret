// EstadoSwitch.js
import React from "react";
import "../css/EstadoSwitch.css";

function EstadoSwitch({ estado, onChange }) {
    return (
      <div className="toggle-switch">
        <input
          type="checkbox"
          id={`switch-${estado}`}
          checked={estado === "Activa"}
          onChange={onChange}
        />
        <label htmlFor={`switch-${estado}`} className="switch-label">
          <span className="slider"></span>
        </label>
      </div>
    );
  }
  
  export default EstadoSwitch;
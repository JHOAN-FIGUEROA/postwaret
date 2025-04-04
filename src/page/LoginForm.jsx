import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

function LoginForm({ onBackToHome, onLogin }) {
  const navigate = useNavigate();

  return (
    <div className="form-container">
      <h2>Iniciar Sesión</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onLogin();
        }}
      >
        <div>
          <label>Correo electrónico:</label>
          <input type="email" required />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" required />
        </div>
        <button className="logii" type="submit">Iniciar Sesión</button>
      </form>
      <button className="logii" onClick={() => navigate("/")}>Volver al Inicio</button>

      <button className="logii" onClick={() => navigate("/reset-password")}>
        ¿Olvidaste tu contraseña?
      </button>
    </div>
  );
}

export default LoginForm;
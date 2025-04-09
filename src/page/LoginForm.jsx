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
        <div className="form-group">
          <label>Correo electrónico:</label>
          <input type="email" required className="form-input" />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input type="password" required className="form-input" />
        </div>
        <div className="button-group-vertical">
          <button className="btn login-btn" type="submit">Iniciar Sesión</button>
          <button className="btn back-btn" onClick={() => navigate("/")}>Volver al Inicio</button>
          <button className="btn forgot-btn" onClick={() => navigate("/reset-password")}>
            ¿Olvidaste tu contraseña?
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
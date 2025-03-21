// src/components/LoginForm.jsx
import React from "react";
import "../css/Login.css";

function LoginForm({ onBackToHome, onLogin }) {
  return (
    <div className="form-container">
      <h2>Iniciar Sesión</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onLogin(); // Simula el inicio de sesión
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
        <button class="logii" type="submit">Iniciar Sesión</button>
      </form>
      <button className="btn" onClick={onBackToHome}>
        Volver al Inicio
      </button>
    </div>
  );
}

export default LoginForm;
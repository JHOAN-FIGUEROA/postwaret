import React from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import "../css/Login.css";

function RegisterForm({ onBackToHome, onLogin }) { // Recibe onLogin como prop
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simula el registro exitoso (aquí iría tu lógica de registro real)
    // ...
    
    // Llama a onLogin para actualizar el estado de autenticación
    onLogin();
    // Redirige al panel de administrador
    navigate("/");
  };

  return (
    <div className="form-container">
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}> {/* Usa handleSubmit */}
        <div>
          <label>Nombre completo:</label>
          <input type="text" required />
        </div>
        <div>
          <label>Correo electrónico:</label>
          <input type="email" required />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" required />
        </div>
        <div>
          <label>Confirmar contraseña:</label>
          <input type="password" required />
        </div>
        <button className="logii" type="submit">Registrarse</button>
      </form>
      <button className="btn" onClick={onBackToHome}>
        Volver al Inicio
      </button>
    </div>
  );
}

export default RegisterForm;
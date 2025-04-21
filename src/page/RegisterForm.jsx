import React from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import "../css/Login.css";
import logo from "../../public/postwarelogo.png";

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
      <img src={logo} alt="PostWare Logo" className="logo" style={{ width: '100px', margin: '0 auto', display: 'block' }} />
      <form onSubmit={handleSubmit}> {/* Usa handleSubmit */}
        <div className="form-group">
          <label>Nombre completo:</label>
          <input type="text" required className="form-input" />
        </div>
        <div className="form-group">
          <label>Correo electrónico:</label>
          <input type="email" required className="form-input" />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input type="password" required className="form-input" />
        </div>
        <div className="form-group">
          <label>Confirmar contraseña:</label>
          <input type="password" required className="form-input" />
        </div>
        <div className="button-group-vertical">
          <button className="btn login-btn" type="submit">Registrarse</button>
          <button className="btn back-btn" onClick={onBackToHome}>
            Volver al Inicio
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
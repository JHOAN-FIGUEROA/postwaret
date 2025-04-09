import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Correo enviado exitosamente. Revisa tu bandeja de entrada.");
    navigate("/login");
  };

  return (
    <div className="form-container">
      <h2>Recuperar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Correo electrónico:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="button-group-vertical">
          <button className="btn login-btn" type="submit">Enviar Token</button>
          <button className="btn back-btn" onClick={() => navigate("/login")}>
            Volver a Iniciar Sesión
          </button>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
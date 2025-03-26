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
        <button className="logii" type="submit">Enviar Token</button>
      </form>
      <button className="btn" onClick={() => navigate("/login")}>Volver a Iniciar Sesión</button>
    </div>
  );
}

export default ResetPassword;
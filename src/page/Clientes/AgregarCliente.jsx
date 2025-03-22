import React from "react";
import { useNavigate } from "react-router-dom";


function AgregarCliente() {
  const navigate = useNavigate();

  const handleGuardar = () => {
    // Lógica para guardar (no funcional)
    alert("Cliente guardado (simulación)");
    navigate("/clientes"); // Redirigir de vuelta a la lista de clientes
  };

  return (
    <div>
      <h2>Agregar Cliente</h2>
      <form>
        <div>
          <label>Nombre:</label>
          <input type="text" placeholder="Nombre del cliente" />
        </div>
        <div>
          <label>Contacto:</label>
          <input type="email" placeholder="contacto@cliente.com" />
        </div>
        <div>
          <label>Teléfono:</label>
          <input type="text" placeholder="123456789" />
        </div>
        <button type="button" onClick={handleGuardar}>
          Guardar
        </button>
      </form>
    </div>
  );
}

export default AgregarCliente;
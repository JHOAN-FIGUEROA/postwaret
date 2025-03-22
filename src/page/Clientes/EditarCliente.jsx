import React from "react";
import { useNavigate, useParams } from "react-router-dom";


function EditarCliente() {
  const { id } = useParams(); // Obtener el ID del cliente desde la URL
  const navigate = useNavigate();

  const handleGuardar = () => {
    // Lógica para guardar (no funcional)
    alert(`Cliente con ID ${id} editado (simulación)`);
    navigate("/clientes"); // Redirigir de vuelta a la lista de clientes
  };

  return (
    <div>
      <h2>Editar Cliente</h2>
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

export default EditarCliente;
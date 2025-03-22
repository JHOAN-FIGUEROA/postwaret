import React from "react";
import { useParams } from "react-router-dom";


function VerDetalleCliente() {
  const { id } = useParams(); // Obtener el ID del cliente desde la URL

  return (
    <div>
      <h2>Detalle del Cliente</h2>
      <p>ID: {id}</p>
      <p>Nombre: Cliente {id}</p>
      <p>Contacto: contacto@cliente.com</p>
      <p>Teléfono: 123456789</p>
    </div>
  );
}

export default VerDetalleCliente;
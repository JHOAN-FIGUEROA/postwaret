// src/page/AnularProveedor.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function AnularProveedor() {
  const navigate = useNavigate();

  // Función para manejar la anulación del proveedor
  const handleAnular = () => {
    alert("Proveedor anulado (simulación)");
    navigate("/proveedores"); // Redirige a la página de proveedores
  };

  // Función para cancelar la anulación
  const handleCancelar = () => {
    navigate("/proveedores"); // Redirige a la página de proveedores
  };

  return (
    <div className="main-content with-sidebar">
      <h2>Anular Proveedor</h2>
      <p>¿Estás seguro de que deseas anular este proveedor?</p>
      <div>
        <Button variant="danger" onClick={handleAnular}>
          Confirmar Anulación
        </Button>{" "}
        <Button variant="secondary" onClick={handleCancelar}>
          Cancelar
        </Button>
      </div>
    </div>
  );
}

export default AnularProveedor;
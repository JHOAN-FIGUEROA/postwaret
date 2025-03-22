// src/page/AnularCompra.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function AnularCompra() {
  const navigate = useNavigate();

  // Función para manejar la anulación
  const handleAnular = () => {
    alert("Compra anulada (simulación)");
    navigate("/compras"); // Redirige a la página de compras
  };

  // Función para cancelar la anulación
  const handleCancelar = () => {
    navigate("/compras"); // Redirige a la página de compras
  };

  return (
    <div className="main-content with-sidebar">
      <h2>Anular Compra</h2>
      <p>¿Estás seguro de que deseas anular esta compra?</p>
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

export default AnularCompra;
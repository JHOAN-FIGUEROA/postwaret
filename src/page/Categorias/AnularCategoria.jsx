// src/page/AnularCategoria.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";

function AnularCategoria() {
  const navigate = useNavigate();
  const location = useLocation(); // Usamos useLocation para obtener el estado de navegación

  // Obtener los datos de la categoría desde el estado de navegación
  const categoria = location.state?.categoria || {
    id: 1,
    nombre: "Categoría A",
    descripcion: "Descripción de la categoría A",
  };

  // Función para manejar la anulación de la categoría
  const handleAnular = () => {
    alert(`Categoría "${categoria.nombre}" anulada (simulación)`);
    navigate("/categoria"); // Redirige a la página de categorías
  };

  // Función para cancelar la anulación
  const handleCancelar = () => {
    navigate("/categoria"); // Redirige a la página de categorías
  };

  return (
    <div className="main-content with-sidebar">
      <h2>Anular Categoría</h2>
      <p>
        ¿Estás seguro de que deseas anular la categoría{" "}
        <strong>{categoria.nombre}</strong>?
      </p>
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

export default AnularCategoria;
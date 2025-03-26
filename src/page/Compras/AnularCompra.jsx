// src/page/AnularCompra.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Sidebar from "./../Sidebar"; 

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

  const modules = [
    {
      name: "Dashboard",
      submenus: [{ name: "Dashboard", path: "/dasboard" }],
    },
    {
      name: "Configuración",
      submenus: [
        { name: "Usuarios", path: "/usuarios" },
        { name: "Roles", path: "/roles" },
        
      ],
    },
    {
      name: "Compras",
      submenus: [
        { name: "Compras", path: "/compras" },
        { name: "Proveedores", path: "/proveedores" },
        { name: "Categoría", path: "/categoria" },
        { name: "Productos", path: "/productos" },
      ],
    },
    {
      name: "Ventas",
      submenus: [
        { name: "Ventas", path: "/ventas" },
        { name: "Clientes", path: "/clientes" },
      ],
    },
  ];

  return (
    <div className="main-content with-sidebar">
      <h2>Anular Compra</h2>
      <Sidebar modules={modules} /> {/* Agrega el Sidebar aquí */}
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
// src/page/AnularProducto.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Sidebar from "./../Sidebar"; 

function AnularProducto() {
  const navigate = useNavigate();
  const location = useLocation(); // Usamos useLocation para obtener el estado de navegación

  // Obtener los datos del producto desde el estado de navegación
  const producto = location.state?.producto || {
    id: 1,
    nombre: "Producto A",
    categoria: "Categoría A",
    precioUnitarioCOP: 50000, // Precio en pesos colombianos
    descripcion: "Descripción del Producto A",
  };

  // Función para manejar la anulación del producto
  const handleAnular = () => {
    alert(`Producto "${producto.nombre}" anulado (simulación)`);
    navigate("/productos"); // Redirige a la página de productos
  };

  // Función para cancelar la anulación
  const handleCancelar = () => {
    navigate("/productos"); // Redirige a la página de productos
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
      <h2>Anular Producto</h2>
      <Sidebar modules={modules} /> {/* Agrega el Sidebar aquí */}
      <p>
        ¿Estás seguro de que deseas anular el producto{" "}
        <strong>{producto.nombre}</strong>?
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

export default AnularProducto;
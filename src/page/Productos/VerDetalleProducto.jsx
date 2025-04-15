// src/page/VerDetalleProducto.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import Sidebar from "./../Sidebar"; 
import "./producto.css";

function VerDetalleProducto() {
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

  // Función para regresar a la página de productos
  const handleRegresar = () => {
    navigate("/productos");
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
      <Sidebar modules={modules} />
      <div className="product-detail-container">
        <h2 className="product-detail-title">Detalle del Producto</h2>
        <div className="product-detail-card">
          <div className="card-body">
            <h4 className="card-title">Información General</h4>
            <p>
              <strong>Nombre:</strong> {producto.nombre}
            </p>
            <p>
              <strong>Categoría:</strong> {producto.categoria}
            </p>
            <p>
              <strong>Precio Unitario (COP):</strong> ${producto.precioUnitarioCOP.toLocaleString()}
            </p>
            <p>
              <strong>Descripción:</strong> {producto.descripcion}
            </p>
          </div>
        </div>
        <Button variant="secondary" onClick={handleRegresar} className="product-detail-button">
          Regresar
        </Button>
      </div>
    </div>
  );
}

export default VerDetalleProducto;
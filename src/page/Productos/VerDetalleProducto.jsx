// src/page/VerDetalleProducto.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import Sidebar from "./../Sidebar"; 

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
    historialPrecios: [
      {
        fecha: "2023-10-01",
        precio: 45000,
      },
      {
        fecha: "2023-09-01",
        precio: 40000,
      },
    ],
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
      <h2>Detalle del Producto</h2>
      <Sidebar modules={modules} /> {/* Agrega el Sidebar aquí */}
      <div>
        <h4>Información General</h4>
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
      <div>
        <h4>Historial de Precios</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Precio (COP)</th>
            </tr>
          </thead>
          <tbody>
            {producto.historialPrecios.map((precio, index) => (
              <tr key={index}>
                <td>{precio.fecha}</td>
                <td>${precio.precio.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Button variant="secondary" onClick={handleRegresar}>
        Regresar
      </Button>
    </div>
  );
}

export default VerDetalleProducto;
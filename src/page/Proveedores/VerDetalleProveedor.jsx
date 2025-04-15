// src/page/VerDetalleProveedor.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Table, Card } from "react-bootstrap";
import Sidebar from "./../Sidebar"; 
import './proveedor.css';
function VerDetalleProveedor() {
  const navigate = useNavigate();
  const location = useLocation(); // Usamos useLocation para obtener el estado de navegación

  // Obtener los datos del proveedor desde el estado de navegación
  const proveedor = location.state?.proveedor || {
    id: 1,
    nombre: "Proveedor A",
    apellido: "Apellido A",
    direccion: "Calle 123, Ciudad A",
    email: "proveedora@example.com",
    numeroContacto: "123456789",
    descripcion: "Proveedor de productos electrónicos",
    
  };

  // Función para regresar a la página de proveedores
  const handleRegresar = () => {
    navigate("/proveedores");
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
      <h2 className="detail-title">Detalle del Proveedor</h2>
      <Sidebar modules={modules} /> {/* Agrega el Sidebar aquí */}
      <Card className="detail-card">
        <Card.Body>
          <Card.Title>Información General</Card.Title>
          <Card.Text>
            <strong>Nombre:</strong> {proveedor.nombre}
          </Card.Text>
          <Card.Text>
            <strong>Apellido:</strong> {proveedor.apellido}
          </Card.Text>
          <Card.Text>
            <strong>Dirección:</strong> {proveedor.direccion}
          </Card.Text>
          <Card.Text>
            <strong>Email:</strong> {proveedor.email}
          </Card.Text>
          <Card.Text>
            <strong>Número de Contacto:</strong> {proveedor.numeroContacto}
          </Card.Text>
          <Card.Text>
            <strong>Descripción:</strong> {proveedor.descripcion}
          </Card.Text>
        </Card.Body>
      </Card>
      
      <Button variant="secondary" onClick={handleRegresar} className="mt-3 detail-button">
        Regresar
      </Button>
    </div>
  );
}

export default VerDetalleProveedor;
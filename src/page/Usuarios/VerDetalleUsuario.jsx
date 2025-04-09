import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Table, Card } from "react-bootstrap";
import Sidebar from "./../Sidebar";

import "./agregarusuario.css";

function VerDetalleUsuario() {
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener los datos del usuario desde el estado de navegación
  const usuario = location.state?.usuario || {
    id: 1,
    nombre: "Juan",
    apellido: "Pérez",
    tipoDocumento: "CC",
    documentoIdentidad: "12345678",
    telefono: "987654321",
    direccionCompleta: "Av. Principal 123",
    email: "juan.perez@example.com",
    rol: "Admin",

  };

  // Función para regresar a la página de usuarios
  const handleRegresar = () => {
    navigate("/usuarios");
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
      <div className="detail-container">
        <h2 className="detail-title">Detalle del Usuario</h2>

        <Card className="detail-card">
          <Card.Body>
            <Card.Title>Información Personal</Card.Title>
            <Card.Text>
              <strong>Nombre:</strong> {usuario.nombre} {usuario.apellido}
            </Card.Text>
            <Card.Text>
              <strong>Tipo de Documento:</strong> {usuario.tipoDocumento}
            </Card.Text>
            <Card.Text>
              <strong>Documento de Identidad:</strong> {usuario.documentoIdentidad}
            </Card.Text>
            <Card.Text>
              <strong>Teléfono:</strong> {usuario.telefono}
            </Card.Text>
            <Card.Text>
              <strong>Dirección:</strong> {usuario.direccionCompleta}
            </Card.Text>
            <Card.Text>
              <strong>Email:</strong> {usuario.email}
            </Card.Text>
            <Card.Text>
              <strong>Rol:</strong> {usuario.rol}
            </Card.Text>
          </Card.Body>
        </Card>

      

        <Button
          variant="secondary"
          onClick={handleRegresar}
          className="mt-3 detail-button"
        >
          Regresar
        </Button>
      </div>
    </div>
  );
}

export default VerDetalleUsuario;
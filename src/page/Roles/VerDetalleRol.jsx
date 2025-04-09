import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Table, Card } from "react-bootstrap";
import Sidebar from "./../Sidebar";
import "./rol.css";

function VerDetalleRol() {
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener los datos del rol desde el estado de navegación
  const rol = location.state?.rol || {
    id: 1,
    nombre: "Administrador",
    descripcion: "Rol con todos los permisos del sistema",
    permisos: [
      {
        modulo: "Usuarios",
        acciones: ["Crear", "Leer", "Actualizar", "Eliminar"]
      },
      {
        modulo: "Productos",
        acciones: ["Crear", "Leer", "Actualizar", "Eliminar"]
      },
      {
        modulo: "Ventas",
        acciones: ["Crear", "Leer", "Reportes"]
      }
    ],
    usuariosAsociados: [
      {
        id: 1,
        nombre: "Juan Pérez"
      },
      {
        id: 2,
        nombre: "María García"
      }
    ]
  };

  // Función para regresar a la página de roles
  const handleRegresar = () => {
    navigate("/roles");
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
        <h2 className="detail-title">Detalle del Rol: {rol.nombre}</h2>
        
        <Card className="detail-card">
          <Card.Body>
            <Card.Title className="card-title">Información Básica</Card.Title>
            <p><strong>ID:</strong> {rol.id}</p>
            <p><strong>Nombre:</strong> {rol.nombre}</p>
            <p><strong>Descripción:</strong> {rol.descripcion}</p>
          </Card.Body>
          <Card.Body>
            <Card.Title className="card-title">Permisos Asignados</Card.Title>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Módulo</th>
                  <th>Acciones Permitidas</th>
                </tr>
              </thead>
              <tbody>
                {rol.permisos.map((permiso, index) => (
                  <tr key={index}>
                    <td>{permiso.modulo}</td>
                    <td>{permiso.acciones.join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

      

        <Button 
          variant="primary" 
          className="detail-button" 
          onClick={handleRegresar}
        >
          Regresar
        </Button>
      </div>
    </div>
  );
}

export default VerDetalleRol;
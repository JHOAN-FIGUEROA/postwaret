import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Table, Card } from "react-bootstrap";
import Sidebar from "./../Sidebar";

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
      <h2>Detalle del Rol: {rol.nombre}</h2>
      <Sidebar modules={modules} />
      
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Información Básica</Card.Title>
          <p><strong>Nombre:</strong> {rol.nombre}</p>
          <p><strong>Descripción:</strong> {rol.descripcion}</p>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Permisos Asignados</Card.Title>
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

      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Usuarios con este Rol</Card.Title>
          {rol.usuariosAsociados.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                </tr>
              </thead>
              <tbody>
                {rol.usuariosAsociados.map((usuario, index) => (
                  <tr key={index}>
                    <td>{usuario.id}</td>
                    <td>{usuario.nombre}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No hay usuarios asignados a este rol</p>
          )}
        </Card.Body>
      </Card>

      <Button variant="secondary" onClick={handleRegresar}>
        Regresar
      </Button>
    </div>
  );
}

export default VerDetalleRol;
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import Sidebar from "./../Sidebar";

function VerDetalleUsuario() {
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener los datos del usuario desde el estado de navegación
  const usuario = location.state?.usuario || {
    id: 1,
    nombre: "Juan",
    apellido: "Pérez",
    documentoIdentidad: "12345678",
    telefono: "987654321",
    direccion: "Av. Principal 123",
    email: "juan.perez@example.com",
    rol: "Admin",
    actividadesRecientes: [
      {
        fecha: "2023-10-15",
        accion: "Inició sesión",
        hora: "08:30 AM"
      },
      {
        fecha: "2023-10-14",
        accion: "Actualizó información de producto",
        hora: "04:15 PM"
      },
      {
        fecha: "2023-10-13",
        accion: "Realizó venta",
        hora: "11:20 AM"
      }
    ]
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
      <h2>Detalle del Usuario</h2>
      <Sidebar modules={modules} />
      
      <div>
        <h4>Información Personal</h4>
        <p>
          <strong>Nombre:</strong> {usuario.nombre} {usuario.apellido}
        </p>
        <p>
          <strong>Documento de Identidad:</strong> {usuario.documentoIdentidad}
        </p>
        <p>
          <strong>Teléfono:</strong> {usuario.telefono}
        </p>
        <p>
          <strong>Dirección:</strong> {usuario.direccion}
        </p>
        <p>
          <strong>Email:</strong> {usuario.email}
        </p>
        <p>
          <strong>Rol:</strong> {usuario.rol}
        </p>
      </div>

      <div className="mt-4">
        <h4>Actividades Recientes</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Acción</th>
              <th>Hora</th>
            </tr>
          </thead>
          <tbody>
            {usuario.actividadesRecientes.map((actividad, index) => (
              <tr key={index}>
                <td>{actividad.fecha}</td>
                <td>{actividad.accion}</td>
                <td>{actividad.hora}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Button variant="secondary" onClick={handleRegresar} className="mt-3">
        Regresar
      </Button>
    </div>
  );
}

export default VerDetalleUsuario;
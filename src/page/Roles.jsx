// src/components/Roles.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";

function Roles() {
  const navigate = useNavigate();

  const [roles, setRoles] = useState([
    { id: 1, nombre: "Administrador", descripcion: "Acceso total al sistema" },
    { id: 2, nombre: "Vendedor", descripcion: "Módulo de ventas y clientes" },
    { id: 3, nombre: "Inventario", descripcion: "Gestión de productos y categorías" },
  ]);

  const [busqueda, setBusqueda] = useState("");

  const rolesFiltrados = roles.filter(rol =>
    rol.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    rol.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Funciones de navegación
  const handleAnularRol = () => navigate("/roles/anular");
  const handleEditarRol = () => navigate("/roles/editar");
  const handleAgregarRol = () => navigate("/roles/agregar");
  const handleVerDetalleRol = () => navigate("/roles/ver-detalle");
  const handlePermisosAsociados = () => navigate("/roles/permisos-asociados");


  const modules = [ 
    {
      name: "Dasboard",
      submenus: [{ name: "Dasboard", path: "/dasboard" }],
    },
    {
      name: "Configuracion",
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
        { name: "Categoria", path: "/Categoria" },
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
    <div>
      <div className="main-content">
        <h2>Roles del Sistema</h2>
        <Row className="mb-3">
          <Col>
            <Sidebar modules={modules} />
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Buscar rol..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <Button variant="outline-secondary">Buscar</Button>
            </InputGroup>
          </Col>
          <Col className="text-end">
            <Button variant="primary" onClick={handleAgregarRol}>
              Agregar Rol
            </Button>
          </Col>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rolesFiltrados.map((rol) => (
              <tr key={rol.id}>
                <td>{rol.id}</td>
                <td>{rol.nombre}</td>
                <td>{rol.descripcion}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={handleVerDetalleRol}
                  >
                    Ver Detalle
                  </Button>{" "}
                     <Button
                      variant="info"
                      size="sm"
                      onClick={handlePermisosAsociados}
                      >
                      Permisos Asociados
                      </Button>{" "}
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={handleEditarRol}
                  >
                    Editar
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={handleAnularRol}
                  >
                    Anular
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Roles;
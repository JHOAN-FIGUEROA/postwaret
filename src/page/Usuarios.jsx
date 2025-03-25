// src/components/Usuarios.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import "../css/Proveedores.css";
import Sidebar from "./Sidebar";

function Usuarios() {
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: "Juan Pérez", numeroDocumento: "12345678", rol: "Administrador" },
    { id: 2, nombre: "María García", numeroDocumento: "87654321", rol: "Vendedor" },
    { id: 3, nombre: "Carlos López", numeroDocumento: "11223344", rol: "Supervisor" },
  ]);

  const [busqueda, setBusqueda] = useState("");

  const usuariosFiltrados = usuarios.filter(usuario =>
    usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    usuario.numeroDocumento.includes(busqueda)
  );

  // Funciones de navegación
  const handleAnularUsuario = () => navigate("/usuarios/anular");
  const handleEditarUsuario = () => navigate("/usuarios/editar");
  const handleAgregarUsuario = () => navigate("/usuarios/agregar");
  const handleVerDetalleUsuario = () => navigate("/usuarios/ver-detalle");

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
        <h2>Usuarios Registrados</h2>
        <Row className="mb-3">
          <Col>
            <Sidebar modules={modules} />
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Buscar usuario..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <Button variant="outline-secondary">Buscar</Button>
            </InputGroup>
          </Col>
          <Col className="text-end">
            <Button variant="primary" onClick={handleAgregarUsuario}>
              Agregar Usuario
            </Button>
          </Col>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>N° Documento</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.numeroDocumento}</td>
                <td>{usuario.rol}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={handleVerDetalleUsuario}
                  >
                    Ver Detalle
                  </Button>{" "}
                  <Button
                    variant="info"
                    size="sm"
                    onClick={handleVerDetalleUsuario}
                  >
                    Permisos Asociados
                  </Button>{" "}
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={handleEditarUsuario}
                  >
                    Editar
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={handleAnularUsuario}
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

export default Usuarios;
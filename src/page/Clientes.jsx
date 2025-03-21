// src/components/Proveedores.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Table, Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import "../css/Proveedores.css";
import Sidebar from "./Sidebar";

function Clientes() {
  // Estado para almacenar la lista de proveedores
  const [clientes, setclientes] = useState([
    { id: 1, nombre: "Cliente A", contacto: "contacto@cliente.com", telefono: "123456789" },
    { id: 2, nombre: "Cliente B", contacto: "contacto@Cliente.com", telefono: "987654321" },
    { id: 3, nombre: "Cliente C", contacto: "contacto@Cliente.com", telefono: "987654345" },
  ]);

  // Estado para manejar la búsqueda
  const [busqueda, setBusqueda] = useState("");

  // Filtrar proveedores basados en la búsqueda
  const clientesFiltrados = clientes.filter((clientes) =>
    clientes.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Funciones para manejar las acciones
  const handleAnular = (id) => {
    alert(`Anular Cliente con ID: ${id}`);
  };

  const handleEditar = (id) => {
    alert(`Editar Cliente con ID: ${id}`);
  };

  const handleVerDetalle = (id) => {
    alert(`Ver detalle del Cliente con ID: ${id}`);
  };

  // Definir los módulos para el Sidebar
  const modules = [
    {
      name: "Configuracion",
      submenus: [
        { name: "Usuarios", path: "/usuarios" },
        { name: "Roles", path: "/roles" },
        { name: "Permisos", path: "/permisos" },
        
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
        { name: "Clientes", path: "/clientes" },
        { name: "Ventas", path: "/ventas" }, // Nuevo módulo de Ventas con submenú Clientes
      ],
    },
  ];

  return (
    <div>
      <div className="main-content">
        <h2>Clientes Registrados</h2>
        {/* Pasa la prop modules al Sidebar */}
        <Sidebar modules={modules} />
        <Row className="mb-3">
          <Col>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Buscar Cliente..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <Button variant="outline-secondary">Buscar</Button>
            </InputGroup>
          </Col>
          <Col className="text-end">
            <Button variant="primary">Agregar Cliente</Button>
          </Col>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Contacto</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.map((clientes) => (
              <tr key={clientes.id}>
                <td>{clientes.id}</td>
                <td>{clientes.nombre}</td>
                <td>{clientes.contacto}</td>
                <td>{clientes.telefono}</td>
                <td>
                  <Button variant="info" size="sm" onClick={() => handleVerDetalle(clientes.id)}>
                    Ver Detalle
                  </Button>{" "}
                  <Button variant="warning" size="sm" onClick={() => handleEditar(clientes.id)}>
                    Editar
                  </Button>{" "}
                  <Button variant="danger" size="sm" onClick={() => handleAnular(clientes.id)}>
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

export default Clientes;
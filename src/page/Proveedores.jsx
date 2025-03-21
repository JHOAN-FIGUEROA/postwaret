// src/components/Proveedores.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Table, Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import "../css/Proveedores.css";
import Sidebar from "./Sidebar";

function Proveedores() {
  // Estado para almacenar la lista de proveedores
  const [proveedores, setProveedores] = useState([
    { id: 1, nombre: "Proveedor A", contacto: "contacto@proveedora.com", telefono: "123456789" },
    { id: 2, nombre: "Proveedor B", contacto: "contacto@proveedorb.com", telefono: "987654321" },
    { id: 3, nombre: "Proveedor C", contacto: "contacto@proveedorc.com", telefono: "987654345" },
  ]);

  // Estado para manejar la búsqueda
  const [busqueda, setBusqueda] = useState("");

  // Filtrar proveedores basados en la búsqueda
  const proveedoresFiltrados = proveedores.filter((proveedor) =>
    proveedor.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Funciones para manejar las acciones
  const handleAnular = (id) => {
    alert(`Anular proveedor con ID: ${id}`);
  };

  const handleEditar = (id) => {
    alert(`Editar proveedor con ID: ${id}`);
  };

  const handleVerDetalle = (id) => {
    alert(`Ver detalle del proveedor con ID: ${id}`);
  };

  // Definir los módulos para el Sidebar
  const modules = [
    {
      name: "Dasboard",
      submenus: [
        { name: "Dasboard", path: "/dasboard" },
       
        
      ],
    },

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
        { name: "Clientes", path: "/clientes" }, // Nuevo módulo de Ventas con submenú Clientes
      ],
    },
  ];

  return (
    <div>
      <div className="main-content">
        <h2>Proveedores Registrados</h2>
        {/* Pasa la prop modules al Sidebar */}
        <Sidebar modules={modules} />
        <Row className="mb-3">
          <Col>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Buscar proveedor..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <Button variant="outline-secondary">Buscar</Button>
            </InputGroup>
          </Col>
          <Col className="text-end">
            <Button variant="primary">Agregar Proveedor</Button>
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
            {proveedoresFiltrados.map((proveedor) => (
              <tr key={proveedor.id}>
                <td>{proveedor.id}</td>
                <td>{proveedor.nombre}</td>
                <td>{proveedor.contacto}</td>
                <td>{proveedor.telefono}</td>
                <td>
                  <Button variant="info" size="sm" onClick={() => handleVerDetalle(proveedor.id)}>
                    Ver Detalle
                  </Button>{" "}
                  <Button variant="warning" size="sm" onClick={() => handleEditar(proveedor.id)}>
                    Editar
                  </Button>{" "}
                  <Button variant="danger" size="sm" onClick={() => handleAnular(proveedor.id)}>
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

export default Proveedores;
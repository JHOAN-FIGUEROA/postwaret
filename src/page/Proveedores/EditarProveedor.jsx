// src/page/EditarProveedor.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Sidebar from "./../Sidebar"; 

function EditarProveedor() {
  const navigate = useNavigate();

  // Datos ficticios del proveedor
  const proveedor = {
    id: 1,
    nombre: "Proveedor A",
    apellido: "Apellido A",
    direccion: "Calle 123, Ciudad A",
    email: "proveedora@example.com",
    numeroContacto: "123456789",
    descripcion: "Proveedor de productos electrónicos",
  };

  // Función para manejar la edición del proveedor
  const handleEditar = () => {
    alert("Proveedor editado (simulación)");
    navigate("/proveedores"); // Redirige a la página de proveedores
  };

  // Función para cancelar la edición
  const handleCancelar = () => {
    navigate("/proveedores"); // Redirige a la página de proveedores
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
      <h2>Editar Proveedor</h2>
      <Sidebar modules={modules} /> {/* Agrega el Sidebar aquí */}
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={proveedor.nombre}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="apellido">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                value={proveedor.apellido}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="direccion">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                name="direccion"
                value={proveedor.direccion}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={proveedor.email}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="numeroContacto">
              <Form.Label>Número de Contacto</Form.Label>
              <Form.Control
                type="text"
                name="numeroContacto"
                value={proveedor.numeroContacto}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="descripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                value={proveedor.descripcion}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="text-end">
            <Button variant="success" onClick={handleEditar}>
              Guardar Cambios
            </Button>{" "}
            <Button variant="secondary" onClick={handleCancelar}>
              Cancelar
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default EditarProveedor;
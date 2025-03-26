// src/page/AgregarProveedor.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Sidebar from "./../Sidebar"; 

function AgregarProveedor() {
  const navigate = useNavigate();

  // Estado para almacenar los datos del proveedor
  const [proveedor, setProveedor] = useState({
    nombre: "",
    apellido: "",
    direccion: "",
    email: "",
    numeroContacto: "",
    descripcion: "",
  });

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProveedor({ ...proveedor, [name]: value });
  };

  // Función para simular el guardado del proveedor
  const handleGuardarProveedor = () => {
    alert("Proveedor guardado exitosamente (simulación)");
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
      <h2>Agregar Nuevo Proveedor</h2>
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
                onChange={handleChange}
                placeholder="Ingrese el nombre del proveedor"
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
                onChange={handleChange}
                placeholder="Ingrese el apellido del proveedor"
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
                onChange={handleChange}
                placeholder="Ingrese la dirección del proveedor"
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
                onChange={handleChange}
                placeholder="Ingrese el email del proveedor"
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
                onChange={handleChange}
                placeholder="Ingrese el número de contacto"
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
                onChange={handleChange}
                placeholder="Ingrese una descripción del proveedor"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="text-end">
            <Button variant="success" onClick={handleGuardarProveedor}>
              Guardar Proveedor
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default AgregarProveedor;
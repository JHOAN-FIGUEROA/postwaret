// src/page/AgregarCategoria.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Sidebar from "./../Sidebar"; 


function AgregarCategoria() {
  const navigate = useNavigate();

  // Estado para almacenar los datos de la categoría
  const [categoria, setCategoria] = useState({
    nombre: "",
    descripcion: "",
  });

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoria({ ...categoria, [name]: value });
  };

  // Función para simular el guardado de la categoría
  const handleGuardarCategoria = () => {
    alert("Categoría guardada exitosamente (simulación)");
    navigate("/categoria"); // Redirige a la página de categorías
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
      <h2>Agregar Nueva Categoría</h2>
      <Sidebar modules={modules} /> {/* Agrega el Sidebar aquí */}
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={categoria.nombre}
                onChange={handleChange}
                placeholder="Ingrese el nombre de la categoría"
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
                value={categoria.descripcion}
                onChange={handleChange}
                placeholder="Ingrese una descripción de la categoría"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="text-end">
            <Button variant="success" onClick={handleGuardarCategoria}>
              Guardar Categoría
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default AgregarCategoria;
// src/page/AgregarProducto.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import Sidebar from "./../Sidebar"; 

function AgregarProductoo() {
  const navigate = useNavigate();

  // Estado para almacenar los datos del producto
  const [producto, setProducto] = useState({
    nombre: "",
    categoria: "",
    precioUnitarioCOP: "",
    descripcion: "",
  });

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  // Función para simular el guardado del producto con SweetAlert2
  const handleGuardarProducto = () => {
    Swal.fire({
      icon: "success",
      title: "Producto guardado exitosamente",
      text: "El nuevo producto ha sido creado",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    }).then(() => {
      navigate("/productos"); // Redirige a la página de productos
    });
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
      <h2>Agregar Nuevo Producto</h2>
      <Sidebar modules={modules} /> {/* Agrega el Sidebar aquí */}
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={producto.nombre}
                onChange={handleChange}
                placeholder="Ingrese el nombre del producto"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="categoria">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                type="text"
                name="categoria"
                value={producto.categoria}
                onChange={handleChange}
                placeholder="Ingrese la categoría del producto"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="precioUnitarioCOP">
              <Form.Label>Precio Unitario (COP)</Form.Label>
              <Form.Control
                type="number"
                name="precioUnitarioCOP"
                value={producto.precioUnitarioCOP}
                onChange={handleChange}
                placeholder="Ingrese el precio unitario en COP"
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
                value={producto.descripcion}
                onChange={handleChange}
                placeholder="Ingrese una descripción del producto"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="text-end">
            <Button variant="primary" onClick={handleGuardarProducto}>
              Guardar Producto
            </Button>{" "}
            <Button variant="secondary" onClick={() => navigate("/productos")}>
              Cancelar
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default AgregarProductoo;

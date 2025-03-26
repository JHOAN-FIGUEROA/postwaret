// src/page/CrearCompra.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import Sidebar from "./../Sidebar"; 

function AgregarCompra() {
  const navigate = useNavigate();

  // Estado para almacenar los datos de la compra
  const [compra, setCompra] = useState({
    numeroCompra: "",
    fechaCompra: "",
    proveedor: "",
    productos: [],
    subtotal: 0,
    iva: 0,
    total: 0,
  });

  // Lista de proveedores
  const proveedores = ["Proveedor A", "Proveedor B", "Proveedor C"];

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompra({ ...compra, [name]: value });
  };

  // Función para navegar a la página de agregar productos
  const handleAgregarProductos = () => {
    navigate("/productos/agregar");
  };

  // Función para simular el guardado de la compra
  const handleGuardarCompra = () => {
    alert("Compra guardada exitosamente (simulación)");
    navigate("/compras"); // Redirige a la página de compras
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
      <h2>Crear Nueva Compra</h2>
      <Sidebar modules={modules} /> {/* Agrega el Sidebar aquí */}
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="numeroCompra">
              <Form.Label>N° de Compra</Form.Label>
              <Form.Control
                type="text"
                name="numeroCompra"
                value={compra.numeroCompra}
                onChange={handleChange}
                placeholder="Ingrese el número de compra"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="fechaCompra">
              <Form.Label>Fecha de Compra</Form.Label>
              <Form.Control
                type="date"
                name="fechaCompra"
                value={compra.fechaCompra}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="proveedor">
              <Form.Label>Proveedor</Form.Label>
              <Form.Select
                name="proveedor"
                value={compra.proveedor}
                onChange={handleChange}
              >
                <option value="">Seleccione un proveedor</option>
                {proveedores.map((proveedor, index) => (
                  <option key={index} value={proveedor}>
                    {proveedor}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Button variant="primary" onClick={handleAgregarProductos}>
              Agregar Productos
            </Button>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <InputGroup>
              <InputGroup.Text>Subtotal</InputGroup.Text>
              <Form.Control
                type="text"
                value={compra.subtotal.toFixed(2)}
                readOnly
              />
            </InputGroup>
          </Col>
          <Col>
            <InputGroup>
              <InputGroup.Text>IVA (19%)</InputGroup.Text>
              <Form.Control
                type="text"
                value={compra.iva.toFixed(2)}
                readOnly
              />
            </InputGroup>
          </Col>
          <Col>
            <InputGroup>
              <InputGroup.Text>Total</InputGroup.Text>
              <Form.Control
                type="text"
                value={compra.total.toFixed(2)}
                readOnly
              />
            </InputGroup>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="text-end">
            <Button variant="success" onClick={handleGuardarCompra}>
              Guardar Compra
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default AgregarCompra;
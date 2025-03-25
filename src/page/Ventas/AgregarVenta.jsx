// src/page/CrearVenta.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import Sidebar from "././../Sidebar"; // Importa el Sidebar

function AgregarVenta() {
  const navigate = useNavigate();
  const location = useLocation();

  // Estado para almacenar los datos de la venta
  const [venta, setVenta] = useState({
    Cliente: "",
    fechaventa: "",
    productos: location.state?.productos || [], // Lista de productos
    subtotal: 0,
    Estado: "Activa",
    total: 0,
  });

  // Lista de clientes
  const clientes = ["Cliente A", "Cliente B", "Cliente C"];

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenta((prevVenta) => ({
      ...prevVenta,
      [name]: value,
    }));
  };

  // Función para navegar a la página de agregar productos
  const handleAgregarProductos = () => {
    navigate("/productos/agregarr", {
      state: { productos: venta.productos, origen: "ventas" }, // Indicar que viene de ventas
    });
  };

  // Función para calcular subtotal y total
  const calcularTotales = (productos) => {
    const subtotal = productos.reduce(
      (acc, producto) => acc + producto.cantidad * producto.precioVenta,
      0
    );
    const total = subtotal; // Sin IVA

    setVenta((prevVenta) => ({
      ...prevVenta,
      subtotal,
      total,
    }));
  };

  // Función para simular el guardado de la venta
  const handleGuardarVenta = () => {
    alert("Venta guardada exitosamente");
    navigate("/ventas"); // Redirige a la página de ventas
  };

  // Definir los módulos para el Sidebar
  const modules = [
    {
      name: "Dashboard",
      submenus: [{ name: "Dashboard", path: "/dashboard" }],
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
      <h2>Crear Nueva Venta</h2>
      <Sidebar modules={modules} /> {/* Agrega el Sidebar aquí */}
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="Cliente">
              <Form.Label>Cliente</Form.Label>
              <Form.Select
                name="Cliente"
                value={venta.Cliente}
                onChange={handleChange}
              >
                <option value="">Seleccione un cliente</option>
                {clientes.map((cliente, index) => (
                  <option key={index} value={cliente}>
                    {cliente}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="fechaventa">
              <Form.Label>Fecha de Venta</Form.Label>
              <Form.Control
                type="date"
                name="fechaventa"
                value={venta.fechaventa}
                onChange={handleChange}
              />
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
                value={venta.subtotal.toFixed(2)}
                readOnly
              />
            </InputGroup>
          </Col>
          <Col>
            <InputGroup>
              <InputGroup.Text>Total</InputGroup.Text>
              <Form.Control
                type="text"
                value={venta.total.toFixed(2)}
                readOnly
              />
            </InputGroup>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="text-end">
            <Button variant="success" onClick={handleGuardarVenta}>
              Guardar Venta
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default AgregarVenta;
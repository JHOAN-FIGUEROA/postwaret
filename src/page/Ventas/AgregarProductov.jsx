// src/page/AgregarProductos.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Table, Row, Col, InputGroup } from "react-bootstrap";
import Sidebar from "././../Sidebar"; // Importa el Sidebar

function AgregarProductos() {
  const navigate = useNavigate();
  const location = useLocation();
  const productosIniciales = location.state?.productos || [];

  // Estado para almacenar los productos
  const [productos, setProductos] = useState(productosIniciales);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    cantidad: 1,
    precioVenta: 0, // Cambiado a precioVenta
  });

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto((prevProducto) => ({
      ...prevProducto,
      [name]: name === "cantidad" || name === "precioVenta" ? Number(value) : value,
    }));
  };

  // Función para agregar un producto
  const handleAgregarProducto = () => {
    const subtotal = nuevoProducto.cantidad * nuevoProducto.precioVenta;
    const iva = subtotal * 0.19;
    const total = subtotal + iva;

    const producto = {
      ...nuevoProducto,
      subtotal,
      iva,
      total,
    };

    setProductos([...productos, producto]);
    setNuevoProducto({ nombre: "", cantidad: 1, precioVenta: 0 }); // Reiniciar el formulario
  };

  // Función para eliminar un producto
  const handleEliminarProducto = (index) => {
    const nuevosProductos = productos.filter((_, i) => i !== index);
    setProductos(nuevosProductos);
  };

  // Función para guardar y regresar a la página de crear venta
  const handleGuardar = () => {
    navigate("/ventas/agregar", { state: { productos } });
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
        { name: "Permisos", path: "/permisos" },
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
      <h2>Agregar Productos ventas</h2>
      <Sidebar modules={modules} /> {/* Agrega el Sidebar aquí */}
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="nombreProducto">
              <Form.Label>Nombre del Producto</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={nuevoProducto.nombre}
                onChange={handleChange}
                placeholder="Ingrese el nombre del producto"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="cantidad">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="number"
                name="cantidad"
                value={nuevoProducto.cantidad}
                onChange={handleChange}
                min="1"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="precioVenta">
              <Form.Label>Precio de Venta</Form.Label>
              <Form.Control
                type="number"
                name="precioVenta"
                value={nuevoProducto.precioVenta}
                onChange={handleChange}
                min="0"
              />
            </Form.Group>
          </Col>
          <Col className="d-flex align-items-end">
            <Button variant="primary" onClick={handleAgregarProducto}>
              Agregar
            </Button>
          </Col>
        </Row>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio de Venta</th>
            <th>Subtotal</th>
            <th>IVA (19%)</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto, index) => (
            <tr key={index}>
              <td>{producto.nombre}</td>
              <td>{producto.cantidad}</td>
              <td>${producto.precioVenta.toFixed(2)}</td>
              <td>${producto.subtotal.toFixed(2)}</td>
              <td>${producto.iva.toFixed(2)}</td>
              <td>${producto.total.toFixed(2)}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleEliminarProducto(index)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Row className="mb-3">
        <Col className="text-end">
          <Button variant="success" onClick={handleGuardar}>
            Guardar y Regresar
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default AgregarProductos;
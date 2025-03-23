// src/components/Productos.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import "../css/Proveedores.css";
import Sidebar from "./Sidebar";

function Productos() {
  const navigate = useNavigate();

  // Estado para almacenar la lista de productos
  const [productos, setProductos] = useState([
    {
      id: 1,
      nombre: "Producto A",
      categoria: "Categoría A",
      precioUnitarioCOP: 50000, // Precio en pesos colombianos
    },
    {
      id: 2,
      nombre: "Producto B",
      categoria: "Categoría B",
      precioUnitarioCOP: 75000, // Precio en pesos colombianos
    },
    {
      id: 3,
      nombre: "Producto C",
      categoria: "Categoría C",
      precioUnitarioCOP: 120000, // Precio en pesos colombianos
    },
  ]);

  // Estado para manejar la búsqueda
  const [busqueda, setBusqueda] = useState("");

  // Filtrar productos basados en la búsqueda
  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Funciones para manejar las acciones
  const handleAnularProducto = () => {
    navigate("/productos/anular");
  };

  const handleEditarProducto = () => {
    navigate("/productos/editarr");
  };

  const handleAgregarProducto = () => {
    navigate("/productos/agregarr");
  };

  const handleVerDetalleProducto = () => {
    navigate("/productos/ver-detalle");
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
    <div>
      <div className="main-content">
        <h2>Productos Registrados</h2>
        <Row className="mb-3">
          <Col>
            <Sidebar modules={modules} />
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Buscar Producto..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <Button variant="outline-secondary">Buscar</Button>
            </InputGroup>
          </Col>
          <Col className="text-end">
            <Button variant="primary" onClick={handleAgregarProducto}>
              Agregar Producto
            </Button>
          </Col>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio Unitario (COP)</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>{producto.categoria}</td>
                <td>${producto.precioUnitarioCOP.toLocaleString()}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => handleVerDetalleProducto(producto.id)}
                  >
                    Ver Detalle
                  </Button>{" "}
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={handleEditarProducto}
                  >
                    Editar
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={handleAnularProducto}
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

export default Productos;
import React, { useState } from "react";
import { Table, Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../css/Proveedores.css";
import Sidebar from "./Sidebar";
import EstadoSwitch from "./EstadoSwitch";

function Ventas() {
  const navigate = useNavigate();

  const [ventas, setVentas] = useState([
    {
      id: 1,
      Cliente: "Cliente A",
      fechaventa: "17/02/2025",
      producto: "Producto A",
      Cantidad: "5",
      precioUnitario: 20.0,
      subtotal: 155.0,
      Estado: "Activa",
      total: 184.45,
    },
    {
      id: 2,
      Cliente: "Cliente B",
      fechaventa: "17/02/2025",
      producto: "Producto B",
      Cantidad: "5",
      precioUnitario: 20.0,
      subtotal: 110.0,
      Estado: "Inactiva",
      total: 120.45,
    },
    {
      id: 3,
      Cliente: "Cliente C",
      fechaventa: "17/02/2025",
      producto: "Producto C",
      Cantidad: "5",
      precioUnitario: 20.0,
      subtotal: 145.0,
      Estado: "Activa",
      total: 190.45,
    },
  ]);

  const [busqueda, setBusqueda] = useState("");

  const ventasFiltradas = ventas.filter((venta) =>
    venta.producto.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleCambiarEstado = (id) => {
    setVentas((prevVentas) =>
      prevVentas.map((venta) =>
        venta.id === id
          ? {
              ...venta,
              Estado: venta.Estado === "Activa" ? "Inactiva" : "Activa",
            }
          : venta
      )
    );
  };

  const handleAnular = (id) => {
    alert(`Anular Venta con ID: ${id}`);
  };

  const handleGenerarPDF = (id) => {
    navigate(`/ventas/Generarpdf`);
  };

  const handleVerDetalle = (id) => {
    navigate(`/ventas/ver-detalle/${id}`);
  };

  const handleAgregarVenta = () => {
    navigate("/ventas/agregar");
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
      <h2>Ventas Registradas</h2>
      <Sidebar modules={modules} />
      <Row className="mb-3">
        <Col>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Buscar Venta por producto..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <Button variant="outline-secondary">Buscar</Button>
          </InputGroup>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={handleAgregarVenta}>
            Agregar Venta
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id Venta</th>
            <th>Cliente</th>
            <th>Fecha de Venta</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ventasFiltradas.map((venta) => (
            <tr key={venta.id}>
              <td>{venta.id}</td>
              <td>{venta.Cliente}</td>
              <td>{venta.fechaventa}</td>
              <td>${venta.total.toFixed(2)}</td>
              <td>
                <EstadoSwitch
                  estado={venta.Estado}
                  onChange={() => handleCambiarEstado(venta.id)}
                />
              </td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => handleVerDetalle(venta.id)}
                >
                  Ver Detalle
                </Button>{" "}
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleGenerarPDF(venta.id)}
                >
                  Generar Pdf
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleAnular(venta.id)}
                >
                  Anular
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Ventas;

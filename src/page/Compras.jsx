import React, { useState } from "react";
import { Table, Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import "../css/Proveedores.css";
import Sidebar from "./Sidebar";
import EstadoSwitch from "./EstadoSwitch"; // Importa el componente

function Compras() {
  const navigate = useNavigate(); // Hook para la navegación

  // Estado para almacenar la lista de compras
  const [compras, setCompras] = useState([
    {
      id: 1,
      producto: "Producto A",
      cantidad: 10,
      precioUnitario: 15.5,
      proveedor: "Proveedor A",
      numeroCompra: 1001,
      fechaCompra: "2023-10-01",
      subtotal: 155.0,
      iva: 29.45,
      total: 184.45,
      Estado: "Activa", // Agregamos el estado
    },
    {
      id: 2,
      producto: "Producto B",
      cantidad: 5,
      precioUnitario: 20.0,
      proveedor: "Proveedor B",
      numeroCompra: 1002,
      fechaCompra: "2023-10-02",
      subtotal: 100.0,
      iva: 19.0,
      total: 119.0,
      Estado: "Inactiva", // Agregamos el estado
    },
    {
      id: 3,
      producto: "Producto C",
      cantidad: 8,
      precioUnitario: 12.75,
      proveedor: "Proveedor C",
      numeroCompra: 1003,
      fechaCompra: "2023-10-03",
      subtotal: 102.0,
      iva: 19.38,
      total: 121.38,
      Estado: "Activa", // Agregamos el estado
    },
  ]);

  // Estado para manejar la búsqueda
  const [busqueda, setBusqueda] = useState("");

  // Filtrar compras basadas en la búsqueda
  const comprasFiltradas = compras.filter((compra) =>
    compra.producto.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Función para cambiar el estado de una compra
  const handleCambiarEstado = (id) => {
    setCompras((prevCompras) =>
      prevCompras.map((compra) =>
        compra.id === id
          ? {
              ...compra,
              Estado: compra.Estado === "Activa" ? "Inactiva" : "Activa",
            }
          : compra
      )
    );
  };

  // Funciones para manejar las acciones
  const handleAnular = () => {
    navigate("/compras/anular"); // Redirige a la página de anular
  };

 

  const handleVerDetalle = (id) => {
    navigate(`/compras/ver-detalle/${id}`);
  };

  const handleGenerarPDF = (id) => {
    navigate(`/compras/GenerarPDF`);
  };

  // Función para redirigir a la página de agregar compra
  const handleAgregarCompra = () => {
    navigate("/compras/agregar");
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
    <div>
      <div className="main-content with-sidebar">
        <h2>Compras Registradas</h2>
        {/* Pasa la prop modules al Sidebar */}
        <Sidebar modules={modules} />
        <Row className="mb-3">
          <Col>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Buscar compra por producto..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <Button variant="outline-secondary">Buscar</Button>
            </InputGroup>
          </Col>
          <Col className="text-end">
            <Button variant="primary" onClick={handleAgregarCompra}>
              Agregar Compra
            </Button>
          </Col>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>N° de Compra</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Proveedor</th>
              <th>Fecha de Compra</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {comprasFiltradas.map((compra) => (
              <tr key={compra.id}>
                <td>{compra.numeroCompra}</td>
                <td>{compra.producto}</td>
                <td>{compra.cantidad}</td>
                <td>{compra.proveedor}</td>
                <td>{compra.fechaCompra}</td>
                <td>${compra.total.toFixed(2)}</td>
                <td>
                  <EstadoSwitch
                    estado={compra.Estado}
                    onChange={() => handleCambiarEstado(compra.id)}
                  />
                </td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => handleVerDetalle(compra.id)}
                  >
                    Ver Detalle
                  
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={handleAnular} // Redirige a la página de anular
                  >
                    Anular
                  </Button>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={handleGenerarPDF}
                  >
                    Generar PDF
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

export default Compras;
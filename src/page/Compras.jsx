import React, { useState } from "react";
import { Table, Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import EstadoSwitch from "./EstadoSwitch";

function Compras() {
  const navigate = useNavigate();

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
      Estado: "Activa",
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
      Estado: "Inactiva",
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
      Estado: "Activa",
    },
    
  ]);

  const [busqueda, setBusqueda] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  const comprasFiltradas = compras.filter((compra) =>
    compra.producto.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = comprasFiltradas.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(comprasFiltradas.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

  const handleAnular = () => navigate("/compras/anular");
  const handleVerDetalle = (id) => navigate(`/compras/ver-detalle/${id}`);
  const handleGenerarPDF = () => navigate(`/compras/GenerarPDF`);
  const handleAgregarCompra = () => navigate("/compras/agregar");

  const modules = [
    { name: "Dashboard", submenus: [{ name: "Dashboard", path: "/dashboard" }] },
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
        <Sidebar modules={modules} />
        <Row className="mb-3">
          <Col>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Buscar compra por producto..."
                value={busqueda}
                onChange={(e) => {
                  setBusqueda(e.target.value);
                  setCurrentPage(1);
                }}
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
            {currentItems.map((compra) => (
              <tr key={compra.id}>
                <td>{compra.numeroCompra}</td>
                <td>{compra.producto}</td>
                <td>{compra.cantidad}</td>
                <td>{compra.proveedor}</td>
                <td>{compra.fechaCompra}</td>
                <td>${compra.total.toFixed(3)}</td>
                <td>
                  <EstadoSwitch
                    estado={compra.Estado}
                    onChange={() => handleCambiarEstado(compra.id)}
                  />
                </td>
                <td>
                  <Button variant="info" size="sm" onClick={() => handleVerDetalle(compra.id)}>
                    Ver Detalle
                  </Button>{" "}
                  <Button variant="danger" size="sm" onClick={handleAnular}>
                    Anular
                  </Button>{" "}
                  <Button variant="info" size="sm" onClick={handleGenerarPDF}>
                    Generar PDF
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Paginación */}
        <div className="pagination-container">
          <button 
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>

          <span className="pagination-text">Página {currentPage} de {totalPages}</span>

          <button 
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}

export default Compras;

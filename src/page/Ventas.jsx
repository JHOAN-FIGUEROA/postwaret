import React, { useState } from "react";
import { Table, Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import EstadoSwitch from "./EstadoSwitch";
import Swal from 'sweetalert2';

function Ventas() {
  const navigate = useNavigate();

  const [ventas, setVentas] = useState([
    {
      id: 1,
      Codigovent:1021,
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
      Codigovent:1022,
      Cliente: "Cliente B",
      fechaventa: "17/02/2025",
      producto: "Producto B",
      Cantidad: "5",
      precioUnitario: 20.0,
      subtotal: 110.0,
      Estado: "Inactiva",
      total: 120.000,
    },
    {
      id: 3,
      Codigovent:1023,
      Cliente: "Cliente C",
      fechaventa: "17/02/2025",
      producto: "Producto C",
      Cantidad: "5",
      precioUnitario: 20.0,
      subtotal: 145.0,
      Estado: "Activa",
      total: 4.000,
    },
    {
      id: 4,
      Codigovent:1024,
      Cliente: "Cliente D",
      fechaventa: "18/02/2025",
      producto: "Producto D",
      Cantidad: "3",
      precioUnitario: 15.0,
      subtotal: 45.0,
      Estado: "Activa",
      total: 52.65,
    },
    {
      id: 5,
      Codigovent:1025,
      Cliente: "Cliente E",
      fechaventa: "19/02/2025",
      producto: "Producto E",
      Cantidad: "7",
      precioUnitario: 25.0,
      subtotal: 175.0,
      Estado: "Inactiva",
      total: 203.00,
    },
    {
      id: 6,
      Codigovent:1026,
      Cliente: "Cliente F",
      fechaventa: "20/02/2025",
      producto: "Producto F",
      Cantidad: "2",
      precioUnitario: 30.0,
      subtotal: 60.0,
      Estado: "Activa",
      total: 70.20,
    },
  ]);

  const [busqueda, setBusqueda] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  const ventasFiltradas = ventas.filter((venta) =>
    venta.producto.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = ventasFiltradas.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(ventasFiltradas.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

  const handleGenerarPDF = () => {
    Swal.fire({
      title: 'Generar PDF',
      text: '¿Deseas generar un PDF de esta venta?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Generar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/ventas/GenerarPDF/`);
      }
    });
  };

  const handleVerDetalle = (id) => {
    navigate(`/ventas/ver-detalle/${id}`);
  };

  const handleAgregarVenta = () => {
    Swal.fire({
      title: 'Agregar Venta',
      text: 'Serás redirigido al formulario para crear una nueva venta',
      icon: 'info',
      confirmButtonText: 'Continuar'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/ventas/agregar");
      }
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
      <h2>Ventas Registradas</h2>
      <Sidebar modules={modules} />
      <Row className="mb-3">
        <Col>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Buscar Venta por producto..."
              value={busqueda}
              onChange={(e) => {
                setBusqueda(e.target.value);
                setCurrentPage(1);
              }}
            />
            
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
            <th>Codigo De Venta</th>
            <th>Cliente</th>
            <th>Fecha de Venta</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((venta) => (
            <tr key={venta.id}>
              <td>{venta.Codigovent}</td>
              <td>{venta.Cliente}</td>
              <td>{venta.fechaventa}</td>
              <td>${venta.total.toFixed(3)}</td>
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
                <Button variant="warning" size="sm" onClick={() => handleGenerarPDF(venta.id)}>
                                    Generar PDF
                                  </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

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
  );
}

export default Ventas;
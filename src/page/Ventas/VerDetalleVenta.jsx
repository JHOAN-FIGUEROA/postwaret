import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Table, Card } from "react-bootstrap";
import Sidebar from "../Sidebar";
import "./venta.css";

function VerDetalleVenta() {
  const { id } = useParams(); // Obtiene el ID de la venta desde la URL
  const navigate = useNavigate();

  // Datos ficticios de la venta
  const venta = {
    id: id,
    numeroVenta: 2001,
    fechaVenta: "2023-10-05",
    cliente: "Cliente X",
    productos: [
      {
        nombre: "Producto A",
        cantidad: 2,
        precioUnitario: 50.0,
        subtotal: 100.0,
      },
      {
        nombre: "Producto B",
        cantidad: 1,
        precioUnitario: 75.0,
        subtotal: 75.0,
      },
    ],
    subtotal: 175.0,
    iva: 33.25, // Suponiendo 19% de IVA
    total: 208.25,
  };

  // Función para regresar a la página de ventas
  const handleRegresar = () => {
    navigate("/ventas");
  };
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
      <h2 className="detail-title">Detalle de la Venta</h2>
      <Sidebar modules={modules} />
      <div className="detail-container">
        <Card className="detail-card">
          <Card.Body>
            <Card.Title className="card-title mb-2">Información General</Card.Title>
            <div className="row">
              <div className="col-md-4 col-sm-6 mb-2">
                <strong>N° de Venta:</strong> {venta.numeroVenta}
              </div>
              <div className="col-md-4 col-sm-6 mb-2">
                <strong>Fecha de Venta:</strong> {venta.fechaVenta}
              </div>
              <div className="col-md-4 col-sm-6 mb-2">
                <strong>Cliente:</strong> {venta.cliente}
              </div>
            </div>
            <Card.Title className="card-title mt-3 mb-2">Productos Vendidos</Card.Title>
            <Table striped bordered hover responsive className="compact-table mb-2">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio Unitario</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {venta.productos.map((producto, index) => (
                  <tr key={index}>
                    <td>{producto.nombre}</td>
                    <td>{producto.cantidad}</td>
                    <td>${producto.precioUnitario.toFixed(2)}</td>
                    <td>${producto.subtotal.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Card.Title className="card-title mt-3 mb-2">Resumen de la Venta</Card.Title>
            <div className="row compact-row text-center">
              <div className="col-sm-4">
                <p className="mb-1"><strong>Subtotal:</strong><br />${venta.subtotal.toFixed(2)}</p>
              </div>
             
              <div className="col-sm-4">
                <p className="mb-1"><strong>Total:</strong><br /><strong>${venta.total.toFixed(2)}</strong></p>
              </div>
            </div>
          </Card.Body>
        </Card>
        <Button variant="secondary" className="detail-button mt-3" onClick={handleRegresar}>
          Regresar
        </Button>
      </div>
    </div>
  );
}

export default VerDetalleVenta;

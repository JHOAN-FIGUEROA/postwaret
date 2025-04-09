import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Table, Card } from "react-bootstrap";
import Sidebar from "./../Sidebar";
import "./compra.css";

function VerDetalleCompra() {
  const { id } = useParams();
  const navigate = useNavigate();

  const compra = {
    id: id,
    numeroCompra: 1001,
    fechaCompra: "2023-10-01",
    proveedor: "Proveedor A",
    telefono: "123456789",
    email: "provedor@gmail.com",
    productos: [
      {
        nombre: "Producto A",
        cantidad: 10,
        precioUnitario: 15.5,
        subtotal: 155.0,
        iva: 29.45,
        total: 184.45,
      },
      {
        nombre: "Producto B",
        cantidad: 5,
        precioUnitario: 20.0,
        subtotal: 100.0,
        iva: 19.0,
        total: 119.0,
      },
    ],
    subtotal: 255.0,
    iva: 48.45,
    total: 303.45,
  };

  const handleRegresar = () => {
    navigate("/compras");
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
      <Sidebar modules={modules} />
      <div className="detail-container">
        <h2 className="detail-title">Detalle de Compra #{compra.numeroCompra}</h2>
        
        <Card className="detail-card">
          <Card.Body>
          <Card.Title className="card-title mb-2">Información General</Card.Title>
<div className="row">
  <div className="col-md-4 col-sm-6 mb-2">
    <strong>N° de Compra:</strong> {compra.numeroCompra}
  </div>
  <div className="col-md-4 col-sm-6 mb-2">
    <strong>Fecha:</strong> {compra.fechaCompra}
  </div>
  <div className="col-md-4 col-sm-6 mb-2">
    <strong>Proveedor:</strong> {compra.proveedor}
  </div>
  <div className="col-md-4 col-sm-6 mb-2">
    <strong>Teléfono:</strong> {compra.telefono}
  </div>
  <div className="col-md-4 col-sm-6 mb-2">
    <strong>Email:</strong> {compra.email}
  </div>
</div>

            <Card.Title className="card-title mt-3 mb-2">Productos</Card.Title>
            <Table striped bordered hover responsive className="compact-table mb-2">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio Unitario</th>
                  <th>Subtotal</th>
                  <th>IVA (19%)</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {compra.productos.map((producto, index) => (
                  <tr key={index}>
                    <td>{producto.nombre}</td>
                    <td>{producto.cantidad}</td>
                    <td>${producto.precioUnitario.toFixed(2)}</td>
                    <td>${producto.subtotal.toFixed(2)}</td>
                    <td>${producto.iva.toFixed(2)}</td>
                    <td>${producto.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Card.Title className="card-title mt-3 mb-2">Resumen</Card.Title>
            <div className="row compact-row text-center">
              <div className="col-sm-4">
                <p className="mb-1"><strong>Subtotal:</strong><br />${compra.subtotal.toFixed(2)}</p>
              </div>
              <div className="col-sm-4">
                <p className="mb-1"><strong>IVA (19%):</strong><br />${compra.iva.toFixed(2)}</p>
              </div>
              <div className="col-sm-4">
                <p className="mb-1"><strong>Total:</strong><br /><strong>${compra.total.toFixed(2)}</strong></p>
              </div>
            </div>
          </Card.Body>
        </Card>

        <Button 
          variant="secondary" 
          className="detail-button mt-3" 
          onClick={handleRegresar}
        >
          Regresar
        </Button>
      </div>
    </div>
  );
}

export default VerDetalleCompra;

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import Sidebar from "./../Sidebar"; 

function VerDetalleCompra() {
  const { id } = useParams(); // Obtiene el ID de la compra desde la URL
  const navigate = useNavigate();

  // Datos ficticios de la compra
  const compra = {
    id: id,
    numeroCompra: 1001,
    fechaCompra: "2023-10-01",
    proveedor: "Proveedor A",
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

  // Función para regresar a la página de compras
  const handleRegresar = () => {
    navigate("/compras");
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
      <h2>Detalle de la Compra</h2>
      <Sidebar modules={modules} /> {/* Agrega el Sidebar aquí */}
      <div>
        <h4>Información General</h4>
        <p>
          <strong>N° de Compra:</strong> {compra.numeroCompra}
        </p>
        <p>
          <strong>Fecha de Compra:</strong> {compra.fechaCompra}
        </p>
        <p>
          <strong>Proveedor:</strong> {compra.proveedor}
        </p>
      </div>
      <div>
        <h4>Productos</h4>
        <Table striped bordered hover>
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
      </div>
      <div>
        <h4>Resumen de la Compra</h4>
        <p>
          <strong>Subtotal:</strong> ${compra.subtotal.toFixed(2)}
        </p>
        <p>
          <strong>IVA (19%):</strong> ${compra.iva.toFixed(2)}
        </p>
        <p>
          <strong>Total:</strong> ${compra.total.toFixed(2)}
        </p>
      </div>
      <Button variant="secondary" onClick={handleRegresar}>
        Regresar
      </Button>
    </div>
  );
}

export default VerDetalleCompra;
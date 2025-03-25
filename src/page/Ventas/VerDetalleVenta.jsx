import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import Sidebar from "../Sidebar";

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
      <h2>Detalle de la Venta</h2>
      <Sidebar modules={modules} />
      <div>
        <h4>Información General</h4>
        <p>
          <strong>N° de Venta:</strong> {venta.numeroVenta}
        </p>
        <p>
          <strong>Fecha de Venta:</strong> {venta.fechaVenta}
        </p>
        <p>
          <strong>Cliente:</strong> {venta.cliente}
        </p>
      </div>
      <div>
        <h4>Productos Vendidos</h4>
        <Table striped bordered hover>
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
      </div>
      <div>
        <h4>Resumen de la Venta</h4>
        <p>
          <strong>Subtotal:</strong> ${venta.subtotal.toFixed(2)}
        </p>
        <p>
          <strong>IVA (19%):</strong> ${venta.iva.toFixed(2)}
        </p>
        <p>
          <strong>Total:</strong> ${venta.total.toFixed(2)}
        </p>
      </div>
      <Button variant="secondary" onClick={handleRegresar}>
        Regresar
      </Button>
    </div>
  );
}

export default VerDetalleVenta;

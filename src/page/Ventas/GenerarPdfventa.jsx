import React, { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import Sidebar from "../Sidebar";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function GenerarPDFVenta() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pdfRef = useRef();

  // Datos ficticios de ejemplo
  const venta = {
    id: id,
    numeroVenta: 2001,
    fechaVenta: "2023-10-05",
    cliente: "Cliente X",
    productos: [
      {
        nombre: "Producto A",
        cantidad: 2,
        precioUnitario: 30.0,
        subtotal: 60.0,
        iva: 11.4,
        total: 71.4,
      },
      {
        nombre: "Producto B",
        cantidad: 3,
        precioUnitario: 20.0,
        subtotal: 60.0,
        iva: 11.4,
        total: 71.4,
      },
    ],
    subtotal: 120.0,
    iva: 22.8,
    total: 142.8,
  };

  const handleGenerarPDF = () => {
    const input = pdfRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`venta_${venta.numeroVenta}.pdf`);
    });
  };

  const handleCancelar = () => {
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
      <Sidebar modules={modules} />
      <div
        ref={pdfRef}
        style={{ padding: "20px", backgroundColor: "white", color: "black" }}
      >
        <h2>Detalle de la Venta</h2>
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
              {venta.productos.map((producto, index) => (
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
      </div>

      <Button variant="secondary" onClick={handleGenerarPDF} className="mt-3">
        Generar PDF
      </Button>
      <Button variant="danger" className="ms-2 mt-3" onClick={handleCancelar}>
        Cancelar
      </Button>
    </div>
  );
}

export default GenerarPDFVenta;

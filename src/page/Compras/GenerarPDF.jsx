import React, { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Table, Card } from "react-bootstrap";
import Sidebar from "./../Sidebar";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./compra.css";

function GenerarPDF() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pdfRef = useRef();

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

  const handleGenerarPDF = () => {
    const input = pdfRef.current;
    html2canvas(input, {
      scale: 3,
      useCORS: true,
      scrollY: -window.scrollY,
      windowWidth: input.scrollWidth,
      windowHeight: input.scrollHeight,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`compra_${compra.numeroCompra}.pdf`);
    });
  };

  const handleCancelar = () => {
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
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
          <button onClick={handleGenerarPDF} className="detail-button" style={{ backgroundColor: "#28a745" }}>
            Generar PDF
          </button>
          <button onClick={handleCancelar} className="detail-button" style={{ backgroundColor: "#dc3545" }}>
            Cancelar
          </button>
        </div>

        <div
          ref={pdfRef}
          style={{ backgroundColor: "#fff", padding: "1rem", overflow: "visible", minHeight: "1000px" }}
        >
          <h2 className="detail-title">Soporte De Compra #{compra.numeroCompra}</h2>

          <Card className="detail-card">
            <Card.Body>
              <Card.Title className="card-title mb-2">Información General</Card.Title>
              <div className="row">
                <div className="col-md-4 col-sm-6 mb-2"><strong>N° de Compra:</strong> {compra.numeroCompra}</div>
                <div className="col-md-4 col-sm-6 mb-2"><strong>Fecha:</strong> {compra.fechaCompra}</div>
                <div className="col-md-4 col-sm-6 mb-2"><strong>Proveedor:</strong> {compra.proveedor}</div>
                <div className="col-md-4 col-sm-6 mb-2"><strong>Teléfono:</strong> {compra.telefono}</div>
                <div className="col-md-4 col-sm-6 mb-2"><strong>Email:</strong> {compra.email}</div>
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
                  <p className="mb-1"><strong>Subtotal:</strong></p>
                  <p>${compra.subtotal.toFixed(2)}</p>
                </div>
                <div className="col-sm-4">
                  <p className="mb-1"><strong>IVA (19%):</strong></p>
                  <p>${compra.iva.toFixed(2)}</p>
                </div>
                <div className="col-sm-4">
                  <p className="mb-1"><strong>Total:</strong></p>
                  <p><strong>${compra.total.toFixed(2)}</strong></p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default GenerarPDF;

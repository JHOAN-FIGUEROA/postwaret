import React, { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import Sidebar from "./../Sidebar";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./compra.css"; // Asegúrate de importar el CSS que compartiste

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
    const options = {
      scale: 3,
      useCORS: true,
      letterRendering: true,
      allowTaint: true,
      scrollX: 0,
      scrollY: 0,
      windowWidth: input.scrollWidth,
      windowHeight: input.scrollHeight,
    };

    html2canvas(input, options).then((canvas) => {
      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight) * 0.95;

      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10;

      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`compra_${compra.numeroCompra}.pdf`);
    });
  };

  const handleCancelar = () => {
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

        <div className="detail-card" ref={pdfRef}>
          <h2 className="detail-title">Detalle de la Compra</h2>
          <div className="card-body">
            <div className="card-section">
              <h4 className="card-title">Información General</h4>
              <div className="compact-row" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.5rem" }}>
                <p><strong>N° de Compra:</strong> {compra.numeroCompra}</p>
                <p><strong>Fecha:</strong> {compra.fechaCompra}</p>
                <p><strong>Proveedor:</strong> {compra.proveedor}</p>
                <p><strong>Teléfono:</strong> {compra.telefono}</p>
                <p><strong>Email:</strong> {compra.email}</p>
              </div>
            </div>

            <div className="card-section">
              <h4 className="card-title">Productos</h4>
              <div className="table-responsive">
                <Table striped bordered hover className="compact-table">
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
                    {compra.productos.map((producto, i) => (
                      <tr key={i}>
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
            </div>

            <div className="card-section" style={{ marginTop: "1rem", borderTop: "1px solid #ddd", paddingTop: "1rem" }}>
              <h4 className="card-title">Resumen de la Compra</h4>
              <div style={{ display: "flex", justifyContent: "space-around", textAlign: "center" }}>
                <div>
                  <p><strong>Subtotal:</strong></p>
                  <p>${compra.subtotal.toFixed(2)}</p>
                </div>
                <div>
                  <p><strong>IVA:</strong></p>
                  <p>${compra.iva.toFixed(2)}</p>
                </div>
                <div>
                  <p><strong>Total:</strong></p>
                  <p><strong>${compra.total.toFixed(2)}</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>      
    </div>
  );
}

export default GenerarPDF;

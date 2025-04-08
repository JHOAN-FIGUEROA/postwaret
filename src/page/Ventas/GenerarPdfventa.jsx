import React, { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Sidebar from "../Sidebar";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PostWareLogo from "../../img/PostWareLogo.png";

function GenerarPDFVenta() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pdfRef = useRef();

  const venta = {
    id: id,
    numeroVenta: 2001,
    fechaVenta: "2023-10-05",
    cliente: "Cliente X",
    productos: [
      {
        nombre: "Producto A",
        cantidad: 2,
        precioUnitario: 30000,
        subtotal: 60000,
        iva: 11400,
        total: 71400,
      },
      {
        nombre: "Producto B",
        cantidad: 3,
        precioUnitario: 20000,
        subtotal: 60000,
        iva: 11400,
        total: 71400,
      },
    ],
    subtotal: 120000,
    iva: 22800,
    total: 120000,
  };

  const empresaInfo = {
    nombre: "Minimercado el Poste",
    direccion: "Calle 87a #45-67",
    ciudad: "Medellín",
    telefono: "3234567890",
    email: "postware@gmail.com",
    web: "www.postware.com",
  };

  const handleGenerarPDF = () => {
    const input = pdfRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", [80, 200]); // Tamaño más estrecho como tirilla
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`factura_venta_${venta.numeroVenta}.pdf`);
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

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="main-content with-sidebar">
      <Sidebar modules={modules} />
      <div className="pdf-controls" style={{ margin: "20px 0" }}>
        <Button
          onClick={handleGenerarPDF}
          style={{
            width: "120px",
            height: "38px",
            marginRight: "10px",
            borderRadius: "4px",
            fontSize: "14px",
            backgroundColor: "#28a745",
            borderColor: "#28a745",
            color: "white",
          }}
        >
          Generar PDF
        </Button>
        <Button
          variant="danger"
          onClick={handleCancelar}
          style={{
            width: "120px",
            height: "38px",
            borderRadius: "4px",
            fontSize: "14px",
          }}
        >
          Cancelar
        </Button>
      </div>

      <div
        ref={pdfRef}
        style={{
          padding: "10px",
          backgroundColor: "white",
          color: "black",
          width: "280px", // Ancho más estrecho
          margin: "0 auto",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          fontFamily: "Arial, sans-serif",
          fontSize: "10px", // Tamaño de fuente más pequeño
        }}
      >
        {/* Encabezado */}
        <div style={{ textAlign: "center", marginBottom: "5px" }}>
          <img src={PostWareLogo} alt="Logo" style={{ width: "80px", height: "auto" }} />
          <h3 style={{ margin: "5px 0", fontSize: "14px" }}>{empresaInfo.nombre}</h3>
          <p style={{ margin: "2px 0", fontSize: "9px" }}>{empresaInfo.direccion}</p>
          <p style={{ margin: "2px 0", fontSize: "9px" }}>Tel: {empresaInfo.telefono}</p>
          <p style={{ margin: "2px 0", fontSize: "9px" }}>NIT: 123456789-0</p>
        </div>

        {/* Info de venta */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
          <div>
            <p style={{ margin: "2px 0", fontSize: "9px" }}><strong>Fecha:</strong> {venta.fechaVenta}</p>
            <p style={{ margin: "2px 0", fontSize: "9px" }}><strong>Factura:</strong> {venta.numeroVenta}</p>
          </div>
          <div>
            <p style={{ margin: "2px 0", fontSize: "9px" }}><strong>Cajero:</strong> Usuario</p>
          </div>
        </div>

        {/* Cliente simplificado */}
        <div style={{ borderTop: "1px dashed #000", borderBottom: "1px dashed #000", padding: "3px 0", margin: "5px 0" }}>
          <p style={{ margin: "2px 0", fontSize: "9px" }}><strong>Cliente:</strong> {venta.cliente}</p>
        </div>

        {/* Productos */}
        <table style={{ width: "100%", borderCollapse: "collapse", margin: "5px 0", fontSize: "9px" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "2px 0", borderBottom: "1px dashed #000" }}>Producto</th>
              <th style={{ textAlign: "center", padding: "2px 0", borderBottom: "1px dashed #000" }}>Cant</th>
              <th style={{ textAlign: "right", padding: "2px 0", borderBottom: "1px dashed #000" }}>Valor</th>
            </tr>
          </thead>
          <tbody>
            {venta.productos.map((prod, idx) => (
              <tr key={idx}>
                <td style={{ padding: "2px 0" }}>{prod.nombre}</td>
                <td style={{ textAlign: "center", padding: "2px 0" }}>{prod.cantidad}</td>
                <td style={{ textAlign: "right", padding: "2px 0" }}>{formatCurrency(prod.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totales */}
        <div style={{ borderTop: "1px dashed #000", margin: "5px 0", paddingTop: "3px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ margin: "2px 0", fontSize: "9px" }}><strong>Subtotal:</strong></p>
            <p style={{ margin: "2px 0", fontSize: "9px" }}>{formatCurrency(venta.subtotal)}</p>
          </div>
         
          <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px dashed #000", paddingTop: "3px" }}>
            <p style={{ margin: "2px 0", fontSize: "10px", fontWeight: "bold" }}>TOTAL:</p>
            <p style={{ margin: "2px 0", fontSize: "10px", fontWeight: "bold" }}>{formatCurrency(venta.total)}</p>
          </div>
        </div>

        {/* Método de pago */}
        <div style={{ borderTop: "1px dashed #000", margin: "5px 0", paddingTop: "3px" }}>
          <p style={{ margin: "2px 0", fontSize: "9px" }}><strong>Método de pago:</strong> Efectivo</p>
          <p style={{ margin: "2px 0", fontSize: "9px" }}><strong>Cambio:</strong> $0</p>
        </div>

        {/* Pie de página */}
        <div style={{ textAlign: "center", marginTop: "10px", borderTop: "1px dashed #000", paddingTop: "5px" }}>
          <p style={{ margin: "2px 0", fontSize: "8px" }}>¡Gracias por su compra!</p>
          <p style={{ margin: "2px 0", fontSize: "8px" }}>{empresaInfo.web}</p>
          <p style={{ margin: "2px 0", fontSize: "8px" }}>Este documento es válido como factura de venta</p>
        </div>
      </div>
    </div>
  );
}

export default GenerarPDFVenta;
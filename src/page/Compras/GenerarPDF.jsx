import React, { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import Sidebar from "./../Sidebar";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function GenerarPDF() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pdfRef = useRef();

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

  const handleGenerarPDF = () => {
    const input = pdfRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
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
      <div style={{ padding: "20px", backgroundColor: "white", color: "black" }}>
        <div style={{ marginBottom: "20px" }}>
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

        <div ref={pdfRef}>
          <h2>Detalle de la Compra</h2>
          <div>
            <h4>Información General</h4>
            <p><strong>N° de Compra:</strong> {compra.numeroCompra}</p>
            <p><strong>Fecha de Compra:</strong> {compra.fechaCompra}</p>
            <p><strong>Proveedor:</strong> {compra.proveedor}</p>
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
            <p><strong>Subtotal:</strong> ${compra.subtotal.toFixed(2)}</p>
            <p><strong>IVA (19%):</strong> ${compra.iva.toFixed(2)}</p>
            <p><strong>Total:</strong> ${compra.total.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenerarPDF;

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
        precioUnitario: 30.000,
        subtotal: 60.000,
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

  // Información de la empresa
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
      const pdf = new jsPDF("p", "mm", "a4");
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


// Función para formatear números a formato moneda COP (Pesos Colombianos)
const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 3
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
      color: "white"
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
      fontSize: "14px"
    }}
  >
    Cancelar
  </Button>
</div>
      
      <div
        ref={pdfRef}
        style={{
          padding: "30px",
          backgroundColor: "white",
          color: "black",
          maxWidth: "800px",
          margin: "0 auto",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          fontFamily: "Arial, sans-serif"
        }}
      >

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <div style={{ flex: "1" }}>
            <img src={PostWareLogo} alt="" />
            <div style={{ 
              width: "100px", 
              height: "80px", 
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
              fontWeight: "bold",
              color: "#0080ff"
            }}>
  
            </div>
            <div style={{ marginTop: "10px" }}>
              <p style={{ margin: "0", fontSize: "12px" }}>{empresaInfo.nombre}</p>
              <p style={{ margin: "0", fontSize: "12px" }}>{empresaInfo.direccion}</p>
              <p style={{ margin: "0", fontSize: "12px" }}>{empresaInfo.ciudad}</p>
              <p style={{ margin: "0", fontSize: "12px" }}>Tel: {empresaInfo.telefono}</p>
              <p style={{ margin: "0", fontSize: "12px" }}>{empresaInfo.email}</p>
              <p style={{ margin: "0", fontSize: "12px" }}>{empresaInfo.web}</p>
            </div>
          </div>
          
          <div style={{ textAlign: "right" }}>
            <h2 style={{ color: "#333", margin: "0 0 10px 0" }}>Recibo de venta</h2>
            <p style={{ margin: "0", fontSize: "12px" }}><strong>Fecha:</strong> {venta.fechaVenta}</p>
            <p style={{ margin: "0", fontSize: "12px" }}><strong>N° de Venta:</strong> {venta.numeroVenta}</p>
          </div>
        </div>
        
        {/* Información del cliente */}
        <div style={{ 
          border: "1px solid #ddd", 
          borderRadius: "5px", 
          padding: "15px", 
          marginBottom: "20px", 
          backgroundColor: "#f9f9f9" 
        }}>
          <h4 style={{ margin: "0 0 10px 0", color: "#0080ff", fontSize: "16px" }}>Cliente</h4>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ flex: "1" }}>
              <p style={{ margin: "0", fontSize: "12px" }}><strong>Nombre:</strong> {venta.cliente}</p>
              <p style={{ margin: "0", fontSize: "12px" }}><strong>Dirección:</strong> Calle Cliente #789</p>
              <p style={{ margin: "0", fontSize: "12px" }}><strong>Ciudad:</strong> Ciudad Cliente</p>
            </div>
            <div style={{ flex: "1", textAlign: "right" }}>
              <p style={{ margin: "0", fontSize: "12px" }}><strong>Email:</strong> cliente@example.com</p>
              <p style={{ margin: "0", fontSize: "12px" }}><strong>Teléfono:</strong> (123) 987-6543</p>
            </div>
          </div>
        </div>
        
        {/* Tabla de productos */}
        <div style={{ marginBottom: "20px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#0080ff", color: "white" }}>
                <th style={{ padding: "10px", textAlign: "left", fontSize: "12px" }}>Producto</th>
                <th style={{ padding: "10px", textAlign: "center", fontSize: "12px" }}>Cantidad</th>
                <th style={{ padding: "10px", textAlign: "right", fontSize: "12px" }}>Precio Unitario</th>
                <th style={{ padding: "10px", textAlign: "right", fontSize: "12px" }}>Subtotal</th>
                <th style={{ padding: "10px", textAlign: "right", fontSize: "12px" }}>IVA (19%)</th>
                <th style={{ padding: "10px", textAlign: "right", fontSize: "12px" }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {venta.productos.map((producto, index) => (
                <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "10px", fontSize: "12px" }}>{producto.nombre}</td>
                  <td style={{ padding: "10px", textAlign: "center", fontSize: "12px" }}>{producto.cantidad}</td>
                  <td style={{ padding: "10px", textAlign: "right", fontSize: "12px" }}>{formatCurrency(producto.precioUnitario)}</td>
                  <td style={{ padding: "10px", textAlign: "right", fontSize: "12px" }}>{formatCurrency(producto.subtotal)}</td>
                  <td style={{ padding: "10px", textAlign: "right", fontSize: "12px" }}>{formatCurrency(producto.iva)}</td>
                  <td style={{ padding: "10px", textAlign: "right", fontSize: "12px" }}>{formatCurrency(producto.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Información de pago */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ flex: "1" }}>
            <div style={{ 
              border: "1px solid #ddd", 
              borderRadius: "5px", 
              padding: "15px", 
              backgroundColor: "#f9f9f9" 
            }}>
              <h4 style={{ margin: "0 0 10px 0", color: "#0080ff", fontSize: "16px" }}>Instrucciones de pago</h4>
              <p style={{ margin: "0", fontSize: "12px" }}><strong>Método de pago:</strong> Transferencia bancaria</p>
              <p style={{ margin: "0", fontSize: "12px" }}><strong>Banco:</strong> Banco Principal</p>
              <p style={{ margin: "0", fontSize: "12px" }}><strong>Cuenta:</strong> 123-456-789</p>
              <p style={{ margin: "0", fontSize: "12px" }}><strong>Titular:</strong> {empresaInfo.nombre}</p>
            </div>
          </div>
          
          <div style={{ flex: "1", marginLeft: "20px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <td style={{ padding: "10px", textAlign: "left", fontSize: "12px" }}><strong>Subtotal:</strong></td>
                  <td style={{ padding: "10px", textAlign: "right", fontSize: "12px" }}>{formatCurrency(venta.subtotal)}</td>
                </tr>
                <tr>
                  <td style={{ padding: "10px", textAlign: "left", fontSize: "12px" }}><strong>IVA (19%):</strong></td>
                  <td style={{ padding: "10px", textAlign: "right", fontSize: "12px" }}>{formatCurrency(venta.iva)}</td>
                </tr>
                <tr style={{ backgroundColor: "#f9f9f9" }}>
                  <td style={{ padding: "10px", textAlign: "left", fontWeight: "bold", fontSize: "14px" }}><strong>Total:</strong></td>
                  <td style={{ padding: "10px", textAlign: "right", fontWeight: "bold", fontSize: "14px" }}>{formatCurrency(venta.total)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Notas y firma */}
<div style={{ marginTop: "30px" }}>
  <div style={{ marginBottom: "30px", float: "left" }}>
    <h4 style={{ margin: "0 0 10px 0", color: "#0080ff", fontSize: "16px" }}>Notas</h4>
    <p style={{ margin: "0", fontSize: "12px" }}>Gracias por su compra.</p>
  </div>
  
  <div style={{ float: "right" }}>
    <div style={{ 
      display: "inline-block", 
      textAlign: "center" 
    }}>
      <p style={{ margin: "0", fontSize: "20px" }}>PostWare</p>
    </div>
  </div>
  <div style={{ clear: "both" }}></div>
</div>
          </div>  
        </div>
  )
}

export default GenerarPDFVenta;
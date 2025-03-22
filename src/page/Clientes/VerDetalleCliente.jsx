// src/page/VerDetalleCliente.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom"; // Importa useNavigate
import Sidebar from "././../Sidebar";
 // Importa el Sidebar

function VerDetalleCliente() {
  const { id } = useParams(); // Obtener el ID del cliente desde la URL
  const navigate = useNavigate(); // Hook para la navegación

  // Definir los módulos para el Sidebar
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
        { name: "Permisos", path: "/permisos" },
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

  // Función para manejar el clic en el botón "Continuar"
  const handleContinuar = () => {
    navigate("/clientes"); // Redirigir a la lista de clientes
  };

  return (
    <div className="main-content with-sidebar">
      <h2>Detalle del Cliente</h2>
      <Sidebar modules={modules} /> {/* Agrega el Sidebar aquí */}
      <p>ID: {id}</p>
      <p>Nombre: Cliente {id}</p>
      <p>Contacto: contacto@cliente.com</p>
      <p>Teléfono: 123456789</p>
      <button type="button" onClick={handleContinuar}>
        Continuar
      </button>
    </div>
  );
}

export default VerDetalleCliente;
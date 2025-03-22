// src/page/AgregarCliente.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "././../Sidebar";// Importa el Sidebar

function AgregarCliente() {
  const navigate = useNavigate();

  const handleGuardar = () => {
    // Lógica para guardar (no funcional)
    alert("Cliente guardado (simulación)");
    navigate("/clientes"); // Redirigir de vuelta a la lista de clientes
  };

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

  return (
    <div className="main-content with-sidebar">
      <h2>Agregar Cliente</h2>
      <Sidebar modules={modules} /> {/* Agrega el Sidebar aquí */}
      <form>
        <div>
          <label>Nombre:</label>
          <input type="text" placeholder="Nombre del cliente" />
        </div>
        <div>
          <label>Contacto:</label>
          <input type="email" placeholder="contacto@cliente.com" />
        </div>
        <div>
          <label>Teléfono:</label>
          <input type="text" placeholder="123456789" />
        </div>
        <button type="button" onClick={handleGuardar}>
          Guardar
        </button>
      </form>
    </div>
  );
}

export default AgregarCliente;
import React from "react";
import Sidebar from "./Sidebar";
import "../css/Admin.css";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom"; // Para renderizar las rutas anidadasss



function AdminPanel() {
  const modules = [
    {
      name: "Configuracion",
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
        { name: "Categoria", path: "/Categoria" },
        { name: "Productos", path: "/productos" },
      ],
    },
    {
      name: "Ventas",
      submenus: [
        { name: "Clientes", path: "/clientes" }, // Nuevo módulo de Ventas con submenú Clientes
      ],
    },
  ];

  return (
    <div className="admin-panel">
      {/* Sidebar fijo */}
      <Sidebar modules={modules} />

      {/* Contenido principal */}
      <div className="main-content">
        {/* Navbar */}
        <nav>
          <Link to="/" className="logo">
            🛒 Postware
          </Link>
          <div>
            <button className="btn" onClick={() => {}}>
              Cerrar Sesión
            </button>
          </div>
        </nav>

        {/* Contenido de la página */}
        <Outlet />
      </div>
    </div>
  );
}

export default AdminPanel;
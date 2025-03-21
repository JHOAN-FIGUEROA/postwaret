import React from "react";
import Sidebar from "./Sidebar";
import "../css/Admin.css";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom"; // Para renderizar las rutas anidadasss



function Dasboard() {
  const modules = [
    {
      name: "Dasboard",
      submenus: [
        { name: "Dasboard", path: "/dasboard" },
       
        
      ],
    },

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
    <div className="main-content">
      {/* Sidebar fijo */}
      <Sidebar modules={modules} />

      <h1>HOla Dasboard</h1>

        {/* Contenido de la página */}
        <Outlet />
      </div>
   
  );
}

export default Dasboard;
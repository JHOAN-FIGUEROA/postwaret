import React from "react";
import Sidebar from "./Sidebar";
import "../css/Admin.css";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, AreaChart, Area } from "recharts";

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
        { name: "Ventas", path: "/ventas" },
        { name: "Clientes", path: "/clientes" },
      ],
    },
  ];

  // Datos falsos para las gráficas
  const productData = [
    { name: "Producto A", cantidad: 400 },
    { name: "Producto B", cantidad: 300 },
    { name: "Producto C", cantidad: 200 },
    { name: "Producto D", cantidad: 500 },
    { name: "Producto E", cantidad: 600 },
  ];

  const clientData = [
    { name: "Enero", clientes: 2400 },
    { name: "Febrero", clientes: 1398 },
    { name: "Marzo", clientes: 9800 },
    { name: "Abril", clientes: 3908 },
    { name: "Mayo", clientes: 4800 },
  ];

  const salesData = [
    { name: "Enero", ventas: 2400 },
    { name: "Febrero", ventas: 1398 },
    { name: "Marzo", ventas: 9800 },
    { name: "Abril", ventas: 3908 },
    { name: "Mayo", ventas: 4800 },
  ];

  return (
    <div className="main-content">
      {/* Sidebar fijo */}
      <Sidebar modules={modules} />

      {/* Contenido principal */}
      <div className="titulodasboard" ><h1>Dasboard</h1></div>

      {/* Gráfica de productos */}
      <div className="chart-container">
        <h2>Gráfica de Productos</h2>
        <BarChart width={600} height={300} data={productData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="cantidad" fill="#8884d8" />
        </BarChart>
      </div>

      {/* Gráfica de clientes */}
      <div className="chart-container">
        <h2>Gráfica de Clientes</h2>
        <LineChart width={600} height={300} data={clientData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="clientes" stroke="#82ca9d" />
        </LineChart>
      </div>

      {/* Gráfica de ventas */}
      <div className="chart-container">
        <h2>Gráfica de Ventas</h2>
        <AreaChart width={600} height={300} data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="ventas" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </div>

      {/* Contenido de la página (rutas anidadas) */}
      <Outlet />
    </div>
  );
}

export default Dasboard;
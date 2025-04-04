"use client"

import { useEffect } from "react"
import Sidebar from "./Sidebar"
import { useNavigate, useLocation } from "react-router-dom"
import { Outlet } from "react-router-dom"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, AreaChart, Area, ResponsiveContainer
} from "recharts"
import "../css/Dashboard.css"

function Dashboard() {
  const navigate = useNavigate()
  const location = useLocation()

  // Check if user is logged in
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn")
    if (loggedInStatus !== "true") {
      navigate("/")
    }
  }, [navigate])

  const modules = [
    {
      name: "Dashboard",
      submenus: [{ name: "Dashboard", path: "/dasboard" }],
    },
    {
      name: "Configuracion",
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
  ]

  // Datos para gráficas
  const productData = [
    { name: "Producto A", cantidad: 400 },
    { name: "Producto B", cantidad: 300 },
    { name: "Producto C", cantidad: 200 },
    { name: "Producto D", cantidad: 500 },
    { name: "Producto E", cantidad: 600 },
  ]

  const clientData = [
    { name: "Enero", clientes: 2400 },
    { name: "Febrero", clientes: 1398 },
    { name: "Marzo", clientes: 9800 },
    { name: "Abril", clientes: 3908 },
    { name: "Mayo", clientes: 4800 },
  ]

  const salesData = [
    { name: "Enero", ventas: 2400 },
    { name: "Febrero", ventas: 1398 },
    { name: "Marzo", ventas: 9800 },
    { name: "Abril", ventas: 3908 },
    { name: "Mayo", ventas: 4800 },
  ]

  const userData = [
    { name: "Enero", usuarios: 300 },
    { name: "Febrero", usuarios: 500 },
    { name: "Marzo", usuarios: 700 },
    { name: "Abril", usuarios: 650 },
    { name: "Mayo", usuarios: 900 },
  ]

  const isDashboardPath = location.pathname === "/dasboard"

  return (
    <div className="main-content">
      <Sidebar modules={modules} />

      {isDashboardPath && (
        <div className="dashboard-content">
          <div className="titulodasboard">
            <h1>Dashboard</h1>
          </div>

          <div className="charts-row">
            {/* Gráfica de productos */}
            <div className="chart-container">
              <h2>Gráfica de Productos</h2>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={productData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="cantidad" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Gráfica de clientes */}
            <div className="chart-container">
              <h2>Gráfica de Clientes</h2>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={clientData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="clientes" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Gráfica de ventas */}
            <div className="chart-container">
              <h2>Gráfica de Ventas</h2>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="ventas" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Gráfica de usuarios registrados */}
            <div className="chart-container">
              <h2>Gráfica de Usuarios Registrados</h2>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={userData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="usuarios" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      <Outlet />
    </div>
  )
}

export default Dashboard

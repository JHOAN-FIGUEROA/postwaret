import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "./../Sidebar";

function VerDetalleCliente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    // Simulación de carga de datos (Reemplazar con una petición real)
    const clienteEjemplo = {
      documentoIdentidad: "12345678",
      nombre: "Juan",
      apellido: "Pérez",
      direccion: "Calle Falsa 123",
      email: "juan.perez@example.com",
      numeroContacto: "987654321",
      estado: true,
    };
    setCliente(clienteEjemplo);
  }, [id]);

  const handleContinuar = () => {
    navigate("/clientes");
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
      <h2>Detalle del Cliente</h2>
      <Sidebar modules={modules} />
      {cliente ? (
        <div>
          <p><strong>ID:</strong> {id}</p>
          <p><strong>Documento de Identidad:</strong> {cliente.documentoIdentidad}</p>
          <p><strong>Nombre:</strong> {cliente.nombre} {cliente.apellido}</p>
          <p><strong>Dirección:</strong> {cliente.direccion}</p>
          <p><strong>Email:</strong> {cliente.email}</p>
          <p><strong>Teléfono:</strong> {cliente.numeroContacto}</p>
          <p><strong>Estado:</strong> {cliente.estado ? "Activo" : "Inactivo"}</p>
          <button type="button" onClick={handleContinuar}>
            Continuar
          </button>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

export default VerDetalleCliente;

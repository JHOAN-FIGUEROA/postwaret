import Sidebar from "././../Sidebar";

// src/page/EditarCliente.jsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";


function EditarCliente() {
  const { id } = useParams(); // Obtener el ID del cliente desde la URL
  const navigate = useNavigate();

  const handleGuardar = () => {
    // Lógica para guardar (no funcional)
    alert(`Cliente con ID ${id} editado (simulación)`);
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
      <h2>Editar Cliente</h2>
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

export default EditarCliente;
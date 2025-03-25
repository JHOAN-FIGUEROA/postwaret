import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./../Sidebar";

function EditarCliente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState({
    documentoIdentidad: "",
    nombre: "",
    apellido: "",
    direccion: "",
    email: "",
    numeroContacto: "",
    estado: false,
  });

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCliente({
      ...cliente,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleGuardar = () => {
    console.log("Cliente editado:", cliente);
    alert(`Cliente con ID ${id} editado (simulación)`);
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
      <h2>Editar Cliente</h2>
      <Sidebar modules={modules} />
      <form>
        <div>
          <label>Documento de Identidad:</label>
          <input
            type="number"
            name="documentoIdentidad"
            value={cliente.documentoIdentidad}
            onChange={handleChange}
            placeholder="Ingrese el documento"
          />
        </div>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={cliente.nombre}
            onChange={handleChange}
            placeholder="Nombre del cliente"
          />
        </div>
        <div>
          <label>Apellido:</label>
          <input
            type="text"
            name="apellido"
            value={cliente.apellido}
            onChange={handleChange}
            placeholder="Apellido del cliente"
          />
        </div>
        <div>
          <label>Dirección:</label>
          <input
            type="text"
            name="direccion"
            value={cliente.direccion}
            onChange={handleChange}
            placeholder="Dirección del cliente"
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={cliente.email}
            onChange={handleChange}
            placeholder="contacto@cliente.com"
          />
        </div>
        <div>
          <label>Teléfono:</label>
          <input
            type="text"
            name="numeroContacto"
            value={cliente.numeroContacto}
            onChange={handleChange}
            placeholder="123456789"
          />
        </div>
        <div>
          <label>Estado:</label>
          <input
            type="checkbox"
            name="estado"
            checked={cliente.estado}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={handleGuardar}>
          Guardar
        </button>
      </form>
    </div>
  );
}

export default EditarCliente;

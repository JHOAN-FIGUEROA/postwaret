import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
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
    // Validación simple para asegurarse de que todos los campos están completos
    if (
      !cliente.documentoIdentidad ||
      !cliente.nombre ||
      !cliente.apellido ||
      !cliente.direccion ||
      !cliente.email ||
      !cliente.numeroContacto
    ) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos antes de guardar.",
      });
      return;
    }

    Swal.fire({
      title: "¿Guardar cambios?",
      text: `Se editará el cliente con ID ${id}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0d6efd",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Sí, guardar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Cliente editado:", cliente);

        Swal.fire({
          icon: "success",
          title: "Cliente editado",
          text: "Los cambios se han guardado exitosamente.",
          timer: 2000,
          showConfirmButton: false,
        });

        setTimeout(() => {
          navigate("/clientes");
        }, 2000);
      }
    });
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

  return (
    <div className="agregar-cliente-form">
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

        <button type="button" onClick={handleGuardar}>
          Guardar
        </button>
      </form>
    </div>
  );
}

export default EditarCliente;

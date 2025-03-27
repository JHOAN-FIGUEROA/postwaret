import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./../Sidebar";
import Swal from 'sweetalert2';

function AgregarCliente() {
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCliente({
      ...cliente,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validarFormulario = () => {
    if (!cliente.documentoIdentidad) {
      Swal.fire({
        icon: 'error',
        title: 'Campo requerido',
        text: 'El documento de identidad es obligatorio',
      });
      return false;
    }
    if (!cliente.nombre) {
      Swal.fire({
        icon: 'error',
        title: 'Campo requerido',
        text: 'El nombre es obligatorio',
      });
      return false;
    }
    if (!cliente.email || !/^\S+@\S+\.\S+$/.test(cliente.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Email inválido',
        text: 'Por favor ingrese un email válido',
      });
      return false;
    }
    return true;
  };

  const handleGuardar = () => {
 

    Swal.fire({
      title: '¿Guardar cliente?',
      text: "¿Estás seguro de que deseas guardar este cliente?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, guardar',
      
    }).then((result) => {
      if (result.isConfirmed) {
        // Simulación de guardado
        console.log("Cliente guardado:", cliente);
        
        Swal.fire({
          title: '¡Guardado!',
          text: 'El cliente ha sido registrado exitosamente',
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
        }).then(() => {
          navigate("/clientes");
        });
      }
    });
  };

  const modules = [
    {
      name: "Dashboard",
      submenus: [{ name: "Dashboard", path: "/dahboard" }],
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
      <h2>Agregar Cliente</h2>
      <Sidebar modules={modules} />
      <form>
        <div className="form-group">
          <label>Documento de Identidad:</label>
          <input
            type="number"
            name="documentoIdentidad"
            value={cliente.documentoIdentidad}
            onChange={handleChange}
            placeholder="Ingrese el documento"
            required
          />
        </div>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={cliente.nombre}
            onChange={handleChange}
            placeholder="Nombre del cliente"
            required
          />
        </div>
        <div className="form-group">
          <label>Apellido:</label>
          <input
            type="text"
            name="apellido"
            value={cliente.apellido}
            onChange={handleChange}
            placeholder="Apellido del cliente"
          />
        </div>
        <div className="form-group">
          <label>Dirección:</label>
          <input
            type="text"
            name="direccion"
            value={cliente.direccion}
            onChange={handleChange}
            placeholder="Dirección del cliente"
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={cliente.email}
            onChange={handleChange}
            placeholder="contacto@cliente.com"
            required
          />
        </div>
        <div className="form-group">
          <label>Teléfono:</label>
          <input
            type="text"
            name="numeroContacto"
            value={cliente.numeroContacto}
            onChange={handleChange}
            placeholder="123456789"
          />
        </div>
        
        <div className="form-actions">
          
          <button type="button" className="btn-primary" onClick={handleGuardar}>
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}

export default AgregarCliente;
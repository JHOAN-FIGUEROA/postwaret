import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
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

  const handleCancelar = () => {
    navigate("/clientes");
  };

  const handleGuardar = () => {
    if (!validarFormulario()) return;

    Swal.fire({
      title: '¿Guardar cliente?',
      text: "¿Estás seguro de que deseas guardar este cliente?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar'
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

  // Estilos CSS
  const styles = `
    .cancel-button {
      background-color: #dc3545;
      border-color: #dc3545;
      color: white;
      margin-right: 10px;
    }
    .cancel-button:hover {
      background-color: #c82333;
      border-color: #bd2130;
    }
    .button-container {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 20px;
    }
    .agregar-cliente-form {
      padding: 20px;
      margin-left: 250px;
      width: calc(100% - 250px);
    }
    .form-group {
      margin-bottom: 15px;
    }
    .form-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
    }
    .form-control {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #ced4da;
      border-radius: 4px;
    }
    .form-control:focus {
      border-color: #80bdff;
      outline: 0;
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
  `;

  return (
    <div className="agregar-cliente-form">
      <style>{styles}</style>
      <h2>Agregar Cliente</h2>
      <Sidebar modules={modules} />
      <Form>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="documentoIdentidad">
              <Form.Label>Documento de Identidad *</Form.Label>
              <Form.Control
                type="number"
                name="documentoIdentidad"
                value={cliente.documentoIdentidad}
                onChange={handleChange}
                placeholder="Ingrese el documento"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre *</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={cliente.nombre}
                onChange={handleChange}
                placeholder="Nombre del cliente"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="apellido">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                value={cliente.apellido}
                onChange={handleChange}
                placeholder="Apellido del cliente"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="direccion">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                name="direccion"
                value={cliente.direccion}
                onChange={handleChange}
                placeholder="Dirección del cliente"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label>Email *</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={cliente.email}
                onChange={handleChange}
                placeholder="contacto@cliente.com"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="numeroContacto">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="numeroContacto"
                value={cliente.numeroContacto}
                onChange={handleChange}
                placeholder="123456789"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="estado">
              <Form.Check
                type="checkbox"
                label="Cliente activo"
                name="estado"
                checked={cliente.estado}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="button-container">
            <Button variant="danger" className="cancel-button" onClick={handleCancelar}>
              Cancelar
            </Button>
            <Button variant="success" onClick={handleGuardar}>
              Guardar Cliente
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default AgregarCliente;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Sidebar from "./../Sidebar";
import Swal from 'sweetalert2';

function AgregarProveedor() {
  const navigate = useNavigate();

  // Estado para almacenar los datos del proveedor
  const [proveedor, setProveedor] = useState({
    nombre: "",
    apellido: "",
    direccion: "",
    email: "",
    numeroContacto: "",
    descripcion: "",
  });

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProveedor({ ...proveedor, [name]: value });
  };

  // Función para validar el formulario
  const validarFormulario = () => {
    if (!proveedor.nombre.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El nombre es requerido',
      });
      return false;
    }
    if (!proveedor.email.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El email es requerido',
      });
      return false;
    }
    if (!proveedor.apellido.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El apellido es requerido',
      });
      return false;
    }
    if (!proveedor.direccion.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La dirección es requerida',
      });
      return false;
    }
    if (!proveedor.numeroContacto.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El número de contacto es requerido',
      });
      return false;
    }
    if (!proveedor.descripcion.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La descripción es requerida',
      });
      return false;
    }
    return true;
  };

  // Función para manejar el botón cancelar
  const handleCancelar = () => {
    navigate("/proveedores"); // Redirige a la página de proveedores sin guardar
  };

  // Función para guardar el proveedor con SweetAlert2
  const handleGuardarProveedor = () => {
    if (!validarFormulario()) return;

    Swal.fire({
      title: '¿Guardar proveedor?',
      text: "¿Estás seguro de que deseas guardar este proveedor?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '¡Guardado!',
          text: 'El proveedor ha sido guardado exitosamente.',
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
        }).then(() => {
          navigate("/proveedores"); // Redirige a la página de proveedores
        });
      }
    });
  };

  const modules = [
    {
      name: "Dashboard",
      submenus: [{ name: "Dashboard", path: "/dasboard" }],
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
    }
    .agregar-cliente-form {
      padding: 20px;
      margin-left: 250px;
      width: calc(100% - 250px);
    }
    .required-field::after {
      content: "*";
      color: red;
      margin-left: 5px;
    }
  `;

  return (
    <div className="agregar-cliente-form">
      <style>{styles}</style>
      <h2>Agregar Nuevo Proveedor</h2>
      <Sidebar modules={modules} />
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="nombre">
              <Form.Label className="required-field">Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={proveedor.nombre}
                onChange={handleChange}
                placeholder="Ingrese el nombre del proveedor"
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="apellido">
              <Form.Label className="required-field">Apellido</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                value={proveedor.apellido}
                onChange={handleChange}
                placeholder="Ingrese el apellido del proveedor"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="direccion">
              <Form.Label className="required-field">Dirección</Form.Label>
              <Form.Control
                type="text"
                name="direccion"
                value={proveedor.direccion}
                onChange={handleChange}
                placeholder="Ingrese la dirección del proveedor"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="email">
              <Form.Label className="required-field">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={proveedor.email}
                onChange={handleChange}
                placeholder="Ingrese el email del proveedor"
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="numeroContacto">
              <Form.Label className="required-field">Número de Contacto</Form.Label>
              <Form.Control
                type="text"
                name="numeroContacto"
                value={proveedor.numeroContacto}
                onChange={handleChange}
                placeholder="Ingrese el número de contacto"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="descripcion">
              <Form.Label className="required-field">Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                value={proveedor.descripcion}
                onChange={handleChange}
                placeholder="Ingrese una descripción del proveedor"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="button-container">
            <Button variant="danger" className="cancel-button" onClick={handleCancelar}>
              Cancelar
            </Button>
            <Button variant="success" onClick={handleGuardarProveedor}>
              Guardar Proveedor
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default AgregarProveedor;
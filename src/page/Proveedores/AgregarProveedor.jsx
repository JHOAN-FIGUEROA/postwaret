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
    return true;
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

  return (
    <div className="main-content with-sidebar">
      <h2>Agregar Nuevo Proveedor</h2>
      <Sidebar modules={modules} />
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
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
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                value={proveedor.apellido}
                onChange={handleChange}
                placeholder="Ingrese el apellido del proveedor"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="direccion">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                name="direccion"
                value={proveedor.direccion}
                onChange={handleChange}
                placeholder="Ingrese la dirección del proveedor"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
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
              <Form.Label>Número de Contacto</Form.Label>
              <Form.Control
                type="text"
                name="numeroContacto"
                value={proveedor.numeroContacto}
                onChange={handleChange}
                placeholder="Ingrese el número de contacto"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="descripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                value={proveedor.descripcion}
                onChange={handleChange}
                placeholder="Ingrese una descripción del proveedor"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="text-end">
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
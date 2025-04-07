import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import Sidebar from "./../Sidebar";

function AgregarUsuario() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    documentoIdentidad: "",
    telefono: "",
    direccion: "",
    email: "",
    password: "",
    rol: "Cajero",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const validarFormulario = () => {
    const {
      nombre,
      apellido,
      documentoIdentidad,
      telefono,
      direccion,
      email,
      password,
      rol,
    } = usuario;

    if (
      !nombre.trim() ||
      !apellido.trim() ||
      !documentoIdentidad.trim() ||
      !telefono.trim() ||
      !direccion.trim() ||
      !email.trim() ||
      !password.trim() ||
      !rol.trim()
    ) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos requeridos",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Email inválido",
        text: "Por favor, ingresa un correo electrónico válido",
      });
      return false;
    }

    if (password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Contraseña muy corta",
        text: "La contraseña debe tener al menos 6 caracteres",
      });
      return false;
    }

    return true;
  };

  const handleGuardarUsuario = () => {
    if (!validarFormulario()) return;

    Swal.fire({
      icon: "success",
      title: "Usuario guardado exitosamente",
      text: "El nuevo usuario ha sido creado",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    }).then(() => {
      navigate("/usuarios");
    });
  };

  const handleCancelar = () => {
    navigate("/usuarios");
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
    .required-field::after {
      content: " *";
      color: red;
    }
  `;

  return (
    <div className="agregar-cliente-form">
      <style>{styles}</style>
      <h2>Agregar Nuevo Usuario</h2>
      <Sidebar modules={modules} />
      <Form>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="nombre">
              <Form.Label className="required-field">Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={usuario.nombre}
                onChange={handleChange}
                placeholder="Ingrese el nombre"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="apellido">
              <Form.Label className="required-field">Apellido</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                value={usuario.apellido}
                onChange={handleChange}
                placeholder="Ingrese el apellido"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="documentoIdentidad">
              <Form.Label className="required-field">Documento de Identidad</Form.Label>
              <Form.Control
                type="text"
                name="documentoIdentidad"
                value={usuario.documentoIdentidad}
                onChange={handleChange}
                placeholder="Ingrese el documento de identidad"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="telefono">
              <Form.Label className="required-field">Teléfono</Form.Label>
              <Form.Control
                type="tel"
                name="telefono"
                value={usuario.telefono}
                onChange={handleChange}
                placeholder="Ingrese el teléfono"
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
                value={usuario.direccion}
                onChange={handleChange}
                placeholder="Ingrese la dirección"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label className="required-field">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={usuario.email}
                onChange={handleChange}
                placeholder="Ingrese el email"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="password">
              <Form.Label className="required-field">Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={usuario.password}
                onChange={handleChange}
                placeholder="Ingrese la contraseña"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="rol">
              <Form.Label className="required-field">Rol</Form.Label>
              <Form.Select
                name="rol"
                value={usuario.rol}
                onChange={handleChange}
                required
              >
                <option value="Admin">Administrador</option>
                <option value="Cajero">Cajero</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col className="button-container">
            <Button variant="danger" className="cancel-button" onClick={handleCancelar}>
              Cancelar
            </Button>
            <Button variant="success" onClick={handleGuardarUsuario}>
              Guardar Usuario
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default AgregarUsuario;

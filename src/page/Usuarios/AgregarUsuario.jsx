import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import Sidebar from "./../Sidebar";

function AgregarUsuario() {
  const navigate = useNavigate();

  // Estado para almacenar los datos del usuario
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    documentoIdentidad: "", 
    telefono: "",
    direccion: "",
    email: "",
    password: "",
    rol: "Cajero" // Valor por defecto
  });

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  // Función para simular el guardado del usuario con SweetAlert2
  const handleGuardarUsuario = () => {
    Swal.fire({
      icon: "success",
      title: "Usuario guardado exitosamente",
      text: "El nuevo usuario ha sido creado",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    }).then(() => {
      navigate("/usuarios"); // Redirige a la página de usuarios
    });
  };

  // Función para manejar el botón cancelar
  const handleCancelar = () => {
    navigate("/usuarios"); // Redirige a la página de usuarios sin guardar
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

  // Estilos CSS para el botón cancelar
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
              <Form.Label>Nombre</Form.Label>
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
              <Form.Label>Apellido</Form.Label>
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
              <Form.Label>Documento de Identidad</Form.Label>
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
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="tel"
                name="telefono"
                value={usuario.telefono}
                onChange={handleChange}
                placeholder="Ingrese el teléfono"
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
                value={usuario.direccion}
                onChange={handleChange}
                placeholder="Ingrese la dirección"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
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
              <Form.Label>Contraseña</Form.Label>
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
              <Form.Label>Rol</Form.Label>
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
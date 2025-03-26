import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Sidebar from "./../Sidebar";

function EditarUsuario() {
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener los datos del usuario desde el estado de navegación
  const usuarioInicial = location.state?.usuario || {
    id: 1,
    nombre: "Juan",
    apellido: "Pérez",
    documentoIdentidad: "12345678",
    telefono: "987654321",
    direccion: "Av. Principal 123",
    email: "juan.perez@example.com",
    password: "password123",
    rol: "Admin"
  };

  // Estado para almacenar los datos del usuario
  const [usuario, setUsuario] = useState(usuarioInicial);

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  // Función para manejar la edición del usuario
  const handleEditar = () => {
    alert("Usuario editado exitosamente (simulación)");
    navigate("/usuarios"); // Redirige a la página de usuarios
  };

  // Función para cancelar la edición
  const handleCancelar = () => {
    navigate("/usuarios"); // Redirige a la página de usuarios
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
      <h2>Editar Usuario</h2>
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
                placeholder="Dejar en blanco para no cambiar"
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
          <Col className="text-end">
            <Button variant="success" onClick={handleEditar}>
              Guardar Cambios
            </Button>{" "}
            <Button variant="secondary" onClick={handleCancelar}>
              Cancelar
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default EditarUsuario;
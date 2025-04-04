import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import Sidebar from "./../Sidebar";

function AgregarRol() {
  const navigate = useNavigate();

  // Estado para almacenar los datos del rol
  const [rol, setRol] = useState({
    nombre: "",
    descripcion: "",
  });

  // Función para mostrar alertas SweetAlert2
  const showAlert = (icon, title, text = "") => {
    Swal.fire({
      icon,
      title,
      text,
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRol({ ...rol, [name]: value });
  };

  // Función para simular el guardado del rol
  const handleGuardarRol = () => {
    // Muestra alerta de confirmación
    showAlert("success", "Rol guardado exitosamente", "El nuevo rol ha sido creado");
    navigate("/roles"); // Redirige a la página de roles
  };

  // Función para manejar el botón cancelar
  const handleCancelar = () => {
    navigate("/roles"); // Redirige a la página de roles sin guardar
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
      <h2>Agregar Nuevo Rol</h2>
      <Sidebar modules={modules} />
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre del Rol</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={rol.nombre}
                onChange={handleChange}
                placeholder="Ingrese el nombre del rol"
                required
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
                value={rol.descripcion}
                onChange={handleChange}
                placeholder="Ingrese una descripción del rol"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="button-container">
            <Button variant="danger" className="cancel-button" onClick={handleCancelar}>
              Cancelar
            </Button>
            <Button variant="success" onClick={handleGuardarRol}>
              Guardar Rol
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default AgregarRol;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import Sidebar from "./../Sidebar";

function AgregarRol() {
  const navigate = useNavigate();

  const [rol, setRol] = useState({
    nombre: "",
    descripcion: "",
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRol({ ...rol, [name]: value });
  };

  const validarFormulario = () => {
    if (!rol.nombre.trim() ) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos requeridos",
      });
      return false;
    }
    return true;
  };

  const handleGuardarRol = () => {
    if (!validarFormulario()) return;

    showAlert("success", "Rol guardado exitosamente", "El nuevo rol ha sido creado");
    navigate("/roles");
  };

  const handleCancelar = () => {
    navigate("/roles");
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
      <h2>Agregar Nuevo Rol</h2>
      <Sidebar modules={modules} />
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="nombre">
              <Form.Label className="required-field">Nombre del Rol</Form.Label>
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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import Sidebar from "./../Sidebar";
import "./rol.css"; // Importar el archivo CSS

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
    if (!rol.nombre.trim()) {
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

  return (
    <div className="main-content with-sidebar">
      <Sidebar modules={modules} />
      <div className="rol-form-container">
        <h2 className="rol-form-title">Agregar Nuevo Rol</h2>
        <Form>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="nombre">
                <Form.Label className="rol-form-label required">Nombre del Rol</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={rol.nombre}
                  onChange={handleChange}
                  placeholder="Ingrese el nombre del rol"
                  className="rol-form-input"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="descripcion">
                <Form.Label className="rol-form-label">Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="descripcion"
                  value={rol.descripcion}
                  onChange={handleChange}
                  placeholder="Ingrese una descripción del rol"
                  className="rol-form-textarea"
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="rol-form-actions">
            <Button variant="danger" className="rol-form-btn cancel" onClick={handleCancelar}>
              Cancelar
            </Button>
            <Button variant="success" className="rol-form-btn save" onClick={handleGuardarRol}>
              Guardar Rol
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default AgregarRol;

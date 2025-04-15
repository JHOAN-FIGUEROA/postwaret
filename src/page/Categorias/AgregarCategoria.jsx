import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import Sidebar from "./../Sidebar";
import "./categoria.css"; // Importar el archivo CSS de categoría

function AgregarCategoria() {
  const navigate = useNavigate();

  // Estado para almacenar los datos de la categoría
  const [categoria, setCategoria] = useState({
    nombre: "",
    descripcion: "",
  });

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoria({ ...categoria, [name]: value });
  };

  // Función para manejar el botón cancelar
  const handleCancelar = () => {
    navigate("/categoria"); // Redirige a la página de categorías sin guardar
  };

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

  const validarFormulario = () => {
    if (!categoria.nombre.trim()) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos requeridos",
      });
      return false;
    }
    return true;
  };

  const handleGuardarCategoria = () => {
    if (!validarFormulario()) return;

    showAlert("success", "Categoría guardada exitosamente", "La nueva categoría ha sido creada");
    navigate("/categoria");
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
    <div className="main-content with-sidebar">
      <style>{styles}</style>
      <Sidebar modules={modules} />
      <div className="categoria-form-container">
        <h2 className="categoria-form-title">Agregar Nueva Categoría</h2>
        <Form>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="nombre">
                <Form.Label className="categoria-form-label required">Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={categoria.nombre}
                  onChange={handleChange}
                  placeholder="Ingrese el nombre de la categoría"
                  className="categoria-form-input"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="descripcion">
                <Form.Label className="categoria-form-label">Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="descripcion"
                  value={categoria.descripcion}
                  onChange={handleChange}
                  placeholder="Ingrese una descripción de la categoría"
                  className="categoria-form-textarea"
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="categoria-form-actions">
            <Button variant="danger" className="categoria-form-btn cancel" onClick={handleCancelar}>
              Cancelar
            </Button>
            <Button variant="success" className="categoria-form-btn save" onClick={handleGuardarCategoria}>
              Guardar Categoría
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default AgregarCategoria;
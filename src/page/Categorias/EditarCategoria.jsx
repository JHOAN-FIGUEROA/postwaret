// src/page/EditarCategoria.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import Sidebar from "./../Sidebar";
import "./categoria.css"; // Importar el archivo CSS de categoría

function EditarCategoria() {
  const navigate = useNavigate();
  const location = useLocation(); // Usamos useLocation para obtener el estado de navegación

  // Obtener los datos de la categoría desde el estado de navegación
  const categoriaInicial = location.state?.categoria || {
    id: 1,
    nombre: "Categoría A",
    descripcion: "Descripción de la categoría A",
  };

  // Estado para almacenar los datos de la categoría
  const [categoria, setCategoria] = useState(categoriaInicial);

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoria({ ...categoria, [name]: value });
  };

  // Función para manejar la edición de la categoría con alertas
  const handleEditar = () => {
    if (!categoria.nombre.trim() || !categoria.descripcion.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, complete todos los campos antes de guardar.",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Categoría editada",
      text: "La categoría se ha actualizado correctamente.",
      confirmButtonText: "Aceptar",
    }).then(() => {
      navigate("/categoria"); // Redirige a la página de categorías
    });
  };

  // Función para cancelar la edición con alerta de confirmación
  const handleCancelar = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Los cambios no guardados se perderán.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "No, continuar",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/categoria");
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
        <h2 className="categoria-form-title">Editar Categoría</h2>
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
            <Button variant="success" className="categoria-form-btn save" onClick={handleEditar}>
              Guardar Cambios
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default EditarCategoria;
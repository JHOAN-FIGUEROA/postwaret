import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import Sidebar from "./../Sidebar";

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

  // Función para manejar el guardado de la categoría con alerta
  const handleGuardarCategoria = () => {
    if (!categoria.nombre.trim() || !categoria.descripcion.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, complete todos los campos antes de guardar.",
      });
      return;
    }

    Swal.fire({
      title: '¿Guardar categoría?',
      text: "¿Estás seguro de que deseas guardar esta categoría?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Categoría guardada",
          text: "La categoría se ha guardado exitosamente.",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() => {
          navigate("/categoria"); // Redirige a la página de categorías
        });
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
  `;

  return (
    <div className="agregar-cliente-form">
      <style>{styles}</style>
      <h2>Agregar Nueva Categoría</h2>
      <Sidebar modules={modules} />
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={categoria.nombre}
                onChange={handleChange}
                placeholder="Ingrese el nombre de la categoría"
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
                value={categoria.descripcion}
                onChange={handleChange}
                placeholder="Ingrese una descripción de la categoría"
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
            <Button variant="success" onClick={handleGuardarCategoria}>
              Guardar Categoría
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default AgregarCategoria;
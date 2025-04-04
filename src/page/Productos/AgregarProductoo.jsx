import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import Sidebar from "./../Sidebar"; 

function AgregarProducto() {
  const navigate = useNavigate();

  // Estado para almacenar los datos del producto
  const [producto, setProducto] = useState({
    nombre: "",
    categoria: "",
    codigoBarras: "", 
    precioUnitarioCOP: "",
    descripcion: "",
  });

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  // Función para manejar el botón cancelar
  const handleCancelar = () => {
    navigate("/productos"); // Redirige a la página de productos sin guardar
  };

  // Función para simular el guardado del producto con SweetAlert2
  const handleGuardarProducto = () => {
    // Validación con lógica condicional
    const { nombre, categoria, codigoBarras, precioUnitarioCOP, descripcion } = producto;

    // Si hay código de barras, los demás campos son opcionales
    if (codigoBarras) {
      Swal.fire({
        title: '¿Guardar producto?',
        text: "¿Estás seguro de que deseas guardar este producto?",
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
            title: "Producto guardado exitosamente",
            text: "El nuevo producto ha sido creado con código de barras",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          }).then(() => {
            navigate("/productos");
          });
        }
      });
      return;
    }

    // Si NO hay código de barras, validar campos obligatorios
    if (!nombre || !precioUnitarioCOP) {
      Swal.fire({
        icon: "error",
        title: "Campos Obligatorios",
        html: `
          <p>Cuando no se ingresa código de barras, son obligatorios:</p>
          <ul>
            <li>Nombre del Producto</li>
            <li>Precio Unitario</li>
          </ul>
        `,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }

    // Si pasa la validación
    Swal.fire({
      title: '¿Guardar producto?',
      text: "¿Estás seguro de que deseas guardar este producto?",
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
          title: "Producto guardado exitosamente",
          text: "El nuevo producto ha sido creado",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() => {
          navigate("/productos");
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
      content: " *";
      color: #dc3545;
    }
  `;

  return (
    <div className="agregar-cliente-form">
      <style>{styles}</style>
      <h2>Agregar Nuevo Producto</h2>
      <Sidebar modules={modules} />
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="nombre">
              <Form.Label className={!producto.codigoBarras ? "required-field" : ""}>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={producto.nombre}
                onChange={handleChange}
                placeholder="Ingrese el nombre del producto"
                required={!producto.codigoBarras}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="categoria">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                type="text"
                name="categoria"
                value={producto.categoria}
                onChange={handleChange}
                placeholder="Ingrese la categoría del producto"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="codigoBarras">
              <Form.Label>Código de Barras (Opcional)</Form.Label>
              <Form.Control
                type="text"
                name="codigoBarras"
                value={producto.codigoBarras}
                onChange={handleChange}
                placeholder="Escanear o ingresar código de barras"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="precioUnitarioCOP">
              <Form.Label className={!producto.codigoBarras ? "required-field" : ""}>Precio Unitario (COP)</Form.Label>
              <Form.Control
                type="number"
                name="precioUnitarioCOP"
                value={producto.precioUnitarioCOP}
                onChange={handleChange}
                placeholder="Ingrese el precio unitario en COP"
                required={!producto.codigoBarras}
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
                value={producto.descripcion}
                onChange={handleChange}
                placeholder="Ingrese una descripción del producto"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="button-container">
            <Button variant="danger" className="cancel-button" onClick={handleCancelar}>
              Cancelar
            </Button>
            <Button variant="success" onClick={handleGuardarProducto}>
              Guardar Producto
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default AgregarProducto;
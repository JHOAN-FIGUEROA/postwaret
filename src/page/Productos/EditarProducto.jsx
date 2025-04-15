// src/page/EditarProductoo.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import Sidebar from "./../Sidebar"; 
import "./producto.css";

function EditarProductoo() {
  const navigate = useNavigate();
  const location = useLocation(); // Usamos useLocation para obtener el estado de navegación

  // Obtener los datos del producto desde el estado de navegación
  const productoInicial = location.state?.producto || {
    id: 1,
    nombre: "Producto A",
    categoria: "Categoría A",
    precioUnitarioCOP: 50000, // Precio en pesos colombianos
    descripcion: "Descripción del Producto A",
  };

  // Estado para almacenar los datos del producto
  const [producto, setProducto] = useState(productoInicial);

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  // Función para manejar la edición del producto usando SweetAlert2
  const handleEditar = () => {
    Swal.fire({
      icon: "success",
      title: "Producto editado correctamente",
      text: "Los cambios se han guardado",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    }).then(() => {
      navigate("/productos"); // Redirige a la página de productos
    });
  };

  // Función para cancelar la edición
  const handleCancelar = () => {
    navigate("/productos"); // Redirige a la página de productos
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
      <div className="product-form-container">
        <h2 className="product-form-title">Editar Producto</h2>
        <Form>
          <div className="product-form-layout">
            <div className="product-form-column">
              <div className="product-form-field">
                <Form.Label className="product-form-label required">Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={producto.nombre}
                  onChange={handleChange}
                  placeholder="Ingrese el nombre del producto"
                  className="product-form-input"
                  required
                />
              </div>
              <div className="product-form-field">
                <Form.Label className="product-form-label required">Categoría</Form.Label>
                <Form.Control
                  type="text"
                  name="categoria"
                  value={producto.categoria}
                  onChange={handleChange}
                  placeholder="Ingrese la categoría del producto"
                  className="product-form-input"
                  required
                />
              </div>
              <div className="product-form-field">
                <Form.Label className="product-form-label required">Código de Barras</Form.Label>
                <Form.Control
                  type="text"
                  name="codigoBarras"
                  value={producto.codigoBarras}
                  onChange={handleChange}
                  placeholder="Escanear o ingresar código de barras"
                  className="product-form-input"
                />
              </div>
            </div>
            <div className="product-form-column">
              <div className="product-form-field">
                <Form.Label className="product-form-label required">Precio Unitario (COP)</Form.Label>
                <Form.Control
                  type="number"
                  name="precioUnitarioCOP"
                  value={producto.precioUnitarioCOP}
                  onChange={handleChange}
                  placeholder="Ingrese el precio unitario en COP"
                  className="product-form-input"
                  required
                />
              </div>
              <div className="product-form-field">
                <Form.Label className="product-form-label required">Porcentaje de Ganancia</Form.Label>
                <Form.Control
                  type="number"
                  name="porcentajeGanancia"
                  value={producto.porcentajeGanancia}
                  onChange={handleChange}
                  placeholder="Ingresa el porcentaje de ganancia del producto"
                  className="product-form-input"
                  required
                />
              </div>
              <div className="product-form-field">
                <Form.Label className="product-form-label required">Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="descripcion"
                  value={producto.descripcion}
                  onChange={handleChange}
                  placeholder="Ingrese una descripción del producto"
                  className="product-form-input"
                  required
                />
              </div>
            </div>
            <div className="product-form-actions">
              <Button variant="outline-danger" onClick={handleCancelar} className="product-form-btn">
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleEditar} className="product-form-btn">
                Guardar Cambios
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default EditarProductoo;

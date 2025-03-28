import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Table, Row, Col, InputGroup } from "react-bootstrap";
import Sidebar from "./../Sidebar"; 

function AgregarProductos() {
  const navigate = useNavigate();
  const location = useLocation();
  const productosIniciales = location.state?.productos || [];

  // Estado para almacenar los productos
  const [productos, setProductos] = useState(productosIniciales);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    codigoBarras: "", // Nuevo campo para código de barras
    cantidad: 1,
    precioUnitario: 0,
  });

  // Función para agregar un producto
  const handleAgregarProducto = () => {
    // Convertir precioUnitario y cantidad a números
    const precioUnitario = parseFloat(nuevoProducto.precioUnitario);
    const cantidad = parseInt(nuevoProducto.cantidad, 10);

    // Validar que los valores sean números válidos
    if (isNaN(precioUnitario)) {
      alert("El precio unitario debe ser un número válido.");
      return;
    }
    if (isNaN(cantidad)) {
      alert("La cantidad debe ser un número válido.");
      return;
    }

    // Calcular subtotal, IVA y total
    const subtotal = cantidad * precioUnitario;
    const iva = subtotal * 0.19;
    const total = subtotal + iva;

    // Crear el nuevo producto
    const producto = {
      ...nuevoProducto,
      precioUnitario,
      cantidad,
      subtotal,
      iva,
      total,
    };

    // Agregar el producto a la lista
    setProductos([...productos, producto]);

    // Reiniciar el formulario
    setNuevoProducto({ 
      nombre: "", 
      codigoBarras: "", // Reiniciar también el código de barras
      cantidad: 1, 
      precioUnitario: 0 
    });
  };

  // Función para eliminar un producto
  const handleEliminarProducto = (index) => {
    const nuevosProductos = productos.filter((_, i) => i !== index);
    setProductos(nuevosProductos);
  };

  // Función para guardar y regresar a la página de crear compra
  const handleGuardar = () => {
    navigate("/compras/agregar", { state: { productos } });
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
    <div className="agregarproducto">
      <h2>Agregar Productos</h2>
      <Sidebar modules={modules} />
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="nombreProducto">
              <Form.Label>Nombre del Producto</Form.Label>
              <Form.Control
                type="text"
                value={nuevoProducto.nombre}
                onChange={(e) =>
                  setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })
                }
                placeholder="Ingrese el nombre del producto"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="codigoBarras">
              <Form.Label>Código de Barras (Opcional)</Form.Label>
              <Form.Control
                type="text"
                value={nuevoProducto.codigoBarras}
                onChange={(e) =>
                  setNuevoProducto({ ...nuevoProducto, codigoBarras: e.target.value })
                }
                placeholder="Escanear o ingresar código de barras"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="cantidad">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="number"
                value={nuevoProducto.cantidad}
                onChange={(e) =>
                  setNuevoProducto({ ...nuevoProducto, cantidad: e.target.value })
                }
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="precioUnitario">
              <Form.Label>Precio Unitario</Form.Label>
              <Form.Control
                type="number"
                value={nuevoProducto.precioUnitario}
                onChange={(e) =>
                  setNuevoProducto({ ...nuevoProducto, precioUnitario: e.target.value })
                }
              />
            </Form.Group>
          </Col>
          <Col className="d-flex align-items-end">
            <Button variant="primary" onClick={handleAgregarProducto}>
              Agregar
            </Button>
          </Col>
        </Row>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Código de Barras</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Subtotal</th>
            <th>IVA (19%)</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto, index) => (
            <tr key={index}>
              <td>{producto.nombre}</td>
              <td>{producto.codigoBarras || 'N/A'}</td>
              <td>{producto.cantidad}</td>
              <td>${producto.precioUnitario.toFixed(2)}</td>
              <td>${producto.subtotal.toFixed(2)}</td>
              <td>${producto.iva.toFixed(2)}</td>
              <td>${producto.total.toFixed(2)}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleEliminarProducto(index)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Row className="mb-3">
        <Col className="text-end">
          <Button variant="success" onClick={handleGuardar}>
            Guardar y Regresar
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default AgregarProductos;
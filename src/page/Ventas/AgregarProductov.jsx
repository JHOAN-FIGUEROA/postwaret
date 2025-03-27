import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Table, Row, Col, InputGroup } from "react-bootstrap";
import Sidebar from "././../Sidebar";
import Swal from 'sweetalert2';

function AgregarProductos() {
  const navigate = useNavigate();
  const location = useLocation();
  const productosIniciales = location.state?.productos || [];

  // Estado para almacenar los productos
  const [productos, setProductos] = useState(productosIniciales);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    codigoBarras: "",
    cantidad: 1,
    precioVenta: 0,
  });

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto((prevProducto) => ({
      ...prevProducto,
      [name]: name === "cantidad" || name === "precioVenta" ? Number(value) : value,
    }));
  };

  // Función para agregar un producto con validación mejorada
  const handleAgregarProducto = () => {
    if (!nuevoProducto.codigoBarras && (!nuevoProducto.nombre || nuevoProducto.precioVenta <= 0)) {
      Swal.fire({
        icon: 'error',
        title: 'Datos incompletos',
        html: 'Cuando no se ingresa código de barras, son obligatorios:<br/><br/>- Nombre del Producto<br/>- Precio de Venta mayor a 0',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    const subtotal = nuevoProducto.cantidad * nuevoProducto.precioVenta;
    const iva = subtotal * 0.19;
    const total = subtotal + iva;

    const producto = {
      ...nuevoProducto,
      subtotal,
      iva,
      total,
    };

    setProductos([...productos, producto]);
    setNuevoProducto({ 
      nombre: "", 
      codigoBarras: "",
      cantidad: 1, 
      precioVenta: 0 
    });

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Producto agregado',
      showConfirmButton: false,
      timer: 1500
    });
  };

  // Función para eliminar un producto con confirmación
  const handleEliminarProducto = (index) => {
    Swal.fire({
      title: '¿Eliminar producto?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const nuevosProductos = productos.filter((_, i) => i !== index);
        setProductos(nuevosProductos);
        Swal.fire(
          'Eliminado!',
          'El producto ha sido eliminado',
          'success'
        );
      }
    });
  };

  // Función para guardar y regresar con confirmación
  const handleGuardar = () => {
    if (productos.length === 0) {
      Swal.fire({
        icon: 'question',
        title: '¿Continuar sin productos?',
        text: 'No has agregado ningún producto, ¿deseas continuar?',
        showCancelButton: true,
        confirmButtonText: 'Sí, continuar',
        cancelButtonText: 'No, agregar productos'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/ventas/agregar", { state: { productos } });
        }
      });
    } else {
      Swal.fire({
        title: 'Guardar productos',
        text: `Estás a punto de guardar ${productos.length} producto(s)`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Guardar y regresar',
        cancelButtonText: 'Seguir editando'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/ventas/agregar", { state: { productos } });
        }
      });
    }
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

  return (
    <div className="main-content with-sidebar">
      <h2>Agregar Productos ventas</h2>
      <Sidebar modules={modules} />
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="nombreProducto">
              <Form.Label>
                Nombre del Producto {!nuevoProducto.codigoBarras && <span className="text-danger">*</span>}
              </Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={nuevoProducto.nombre}
                onChange={handleChange}
                placeholder="Ingrese el nombre del producto"
                required={!nuevoProducto.codigoBarras}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="codigoBarras">
              <Form.Label>Código de Barras (Opcional)</Form.Label>
              <Form.Control
                type="text"
                name="codigoBarras"
                value={nuevoProducto.codigoBarras}
                onChange={handleChange}
                placeholder="Escanear o ingresar código de barras"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="cantidad">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="number"
                name="cantidad"
                value={nuevoProducto.cantidad}
                onChange={handleChange}
                min="1"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="precioVenta">
              <Form.Label>
                Precio de Venta {!nuevoProducto.codigoBarras && <span className="text-danger">*</span>}
              </Form.Label>
              <Form.Control
                type="number"
                name="precioVenta"
                value={nuevoProducto.precioVenta}
                onChange={handleChange}
                min="0"
                required={!nuevoProducto.codigoBarras}
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
      
      {productos.length > 0 ? (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Código de Barras</th>
                <th>Cantidad</th>
                <th>Precio de Venta</th>
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
                  <td>${producto.precioVenta.toFixed(2)}</td>
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
          <div className="text-end mb-3">
            <h5>Total General: ${productos.reduce((sum, p) => sum + p.total, 0).toFixed(2)}</h5>
          </div>
        </>
      ) : (
        <div className="alert alert-info mt-3">
          No hay productos agregados
        </div>
      )}
      
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
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import Sidebar from "././../Sidebar";
import Swal from 'sweetalert2';

function AgregarVenta() {
  const navigate = useNavigate();
  const location = useLocation();

  // Estado para almacenar los datos de la venta
  const [venta, setVenta] = useState({
    Cliente: "",
    fechaventa: "",
    productos: location.state?.productos || [],
    subtotal: 0,
    Estado: "Activa",
    total: 0,
  });

  // Lista de clientes
  const clientes = ["Cliente A", "Cliente B", "Cliente C"];

  // Calcular totales cuando cambian los productos
  useEffect(() => {
    calcularTotales(venta.productos);
  }, [venta.productos]);

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenta((prevVenta) => ({
      ...prevVenta,
      [name]: value,
    }));
  };

  // Función para navegar a la página de agregar productos
  const handleAgregarProductos = () => {
    Swal.fire({
      title: 'Agregar Productos',
      text: 'Serás redirigido para seleccionar productos',
      icon: 'info',
      confirmButtonText: 'Continuar'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/productos/agregarrr", {
          state: { productos: venta.productos, origen: "ventas" },
        });
      }
    });
  };

  // Función para calcular subtotal y total
  const calcularTotales = (productos) => {
    const subtotal = productos.reduce(
      (acc, producto) => acc + (producto.cantidad * producto.precioVenta || 0),
      0
    );
    const total = subtotal;

    setVenta((prevVenta) => ({
      ...prevVenta,
      subtotal,
      total,
    }));
  };

  // Función para validar el formulario
  const validarFormulario = () => {
    if (!venta.Cliente) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe seleccionar un cliente',
      });
      return false;
    }
    if (!venta.fechaventa) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe ingresar una fecha de venta',
      });
      return false;
    }
    if (venta.productos.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe agregar al menos un producto',
      });
      return false;
    }
    return true;
  };

  // Función para guardar la venta
  const handleGuardarVenta = () => {
    

    Swal.fire({
      title: '¿Guardar venta?',
      text: "¿Estás seguro de que deseas guardar esta venta?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '¡Venta guardada!',
          text: 'La venta ha sido registrada exitosamente',
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
        }).then(() => {
          navigate("/ventas");
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

  return (
    <div className="main-content with-sidebar">
      <h2>Crear Nueva Venta</h2>
      <Sidebar modules={modules} />
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="Cliente">
              <Form.Label>Cliente</Form.Label>
              <Form.Select
                name="Cliente"
                value={venta.Cliente}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un cliente</option>
                {clientes.map((cliente, index) => (
                  <option key={index} value={cliente}>
                    {cliente}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="fechaventa">
              <Form.Label>Fecha de Venta</Form.Label>
              <Form.Control
                type="date"
                name="fechaventa"
                value={venta.fechaventa}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Button variant="primary" onClick={handleAgregarProductos}>
              Agregar Productos
            </Button>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <InputGroup>
              <InputGroup.Text>Subtotal</InputGroup.Text>
              <Form.Control
                type="text"
                value={venta.subtotal.toFixed(2)}
                readOnly
              />
            </InputGroup>
          </Col>
          <Col>
            <InputGroup>
              <InputGroup.Text>Total</InputGroup.Text>
              <Form.Control
                type="text"
                value={venta.total.toFixed(2)}
                readOnly
              />
            </InputGroup>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="text-end">
            <Button variant="success" onClick={handleGuardarVenta}>
              Guardar Venta
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default AgregarVenta;
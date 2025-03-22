// src/page/EditarCompra.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, InputGroup, Table } from "react-bootstrap";


function EditarCompra() {
  const navigate = useNavigate();

  // Datos ficticios de la compra
  const compra = {
    numeroCompra: 1001,
    fechaCompra: "2023-10-01",
    proveedor: "Proveedor A",
    productos: [
      {
        nombre: "Producto A",
        cantidad: 10,
        precioUnitario: 15.5,
        subtotal: 155.0,
        iva: 29.45,
        total: 184.45,
      },
      {
        nombre: "Producto B",
        cantidad: 5,
        precioUnitario: 20.0,
        subtotal: 100.0,
        iva: 19.0,
        total: 119.0,
      },
    ],
    subtotal: 255.0,
    iva: 48.45,
    total: 303.45,
  };

  // Función para manejar la edición
  const handleEditar = () => {
    alert("Compra editada (simulación)");
    navigate("/compras"); // Redirige a la página de compras
  };

  // Función para cancelar la edición
  const handleCancelar = () => {
    navigate("/compras"); // Redirige a la página de compras
  };

  return (
    <div className="main-content with-sidebar">
      <h2>Editar Compra</h2>
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="numeroCompra">
              <Form.Label>N° de Compra</Form.Label>
              <Form.Control
                type="text"
                name="numeroCompra"
                value={compra.numeroCompra}
                readOnly
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="fechaCompra">
              <Form.Label>Fecha de Compra</Form.Label>
              <Form.Control
                type="date"
                name="fechaCompra"
                value={compra.fechaCompra}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="proveedor">
              <Form.Label>Proveedor</Form.Label>
              <Form.Control
                type="text"
                name="proveedor"
                value={compra.proveedor}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <h4>Productos</h4>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio Unitario</th>
                  <th>Subtotal</th>
                  <th>IVA (19%)</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {compra.productos.map((producto, index) => (
                  <tr key={index}>
                    <td>{producto.nombre}</td>
                    <td>{producto.cantidad}</td>
                    <td>${producto.precioUnitario.toFixed(2)}</td>
                    <td>${producto.subtotal.toFixed(2)}</td>
                    <td>${producto.iva.toFixed(2)}</td>
                    <td>${producto.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <InputGroup>
              <InputGroup.Text>Subtotal</InputGroup.Text>
              <Form.Control
                type="text"
                value={compra.subtotal.toFixed(2)}
                readOnly
              />
            </InputGroup>
          </Col>
          <Col>
            <InputGroup>
              <InputGroup.Text>IVA (19%)</InputGroup.Text>
              <Form.Control
                type="text"
                value={compra.iva.toFixed(2)}
                readOnly
              />
            </InputGroup>
          </Col>
          <Col>
            <InputGroup>
              <InputGroup.Text>Total</InputGroup.Text>
              <Form.Control
                type="text"
                value={compra.total.toFixed(2)}
                readOnly
              />
            </InputGroup>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="text-end">
            <Button variant="success" onClick={handleEditar}>
              Guardar Cambios
            </Button>{" "}
            <Button variant="secondary" onClick={handleCancelar}>
              Cancelar
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default EditarCompra;
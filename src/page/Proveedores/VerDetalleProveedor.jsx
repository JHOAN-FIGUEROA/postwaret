// src/page/VerDetalleProveedor.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";

function VerDetalleProveedor() {
  const navigate = useNavigate();
  const location = useLocation(); // Usamos useLocation para obtener el estado de navegación

  // Obtener los datos del proveedor desde el estado de navegación
  const proveedor = location.state?.proveedor || {
    id: 1,
    nombre: "Proveedor A",
    apellido: "Apellido A",
    direccion: "Calle 123, Ciudad A",
    email: "proveedora@example.com",
    numeroContacto: "123456789",
    descripcion: "Proveedor de productos electrónicos",
    productosSuministrados: [
      {
        nombre: "Producto A",
        cantidadSuministrada: 100,
        ultimaEntrega: "2023-10-01",
      },
      {
        nombre: "Producto B",
        cantidadSuministrada: 50,
        ultimaEntrega: "2023-09-25",
      },
    ],
  };

  // Función para regresar a la página de proveedores
  const handleRegresar = () => {
    navigate("/proveedores");
  };

  return (
    <div className="main-content with-sidebar">
      <h2>Detalle del Proveedor</h2>
      <div>
        <h4>Información General</h4>
        <p>
          <strong>Nombre:</strong> {proveedor.nombre}
        </p>
        <p>
          <strong>Apellido:</strong> {proveedor.apellido}
        </p>
        <p>
          <strong>Dirección:</strong> {proveedor.direccion}
        </p>
        <p>
          <strong>Email:</strong> {proveedor.email}
        </p>
        <p>
          <strong>Número de Contacto:</strong> {proveedor.numeroContacto}
        </p>
        <p>
          <strong>Descripción:</strong> {proveedor.descripcion}
        </p>
      </div>
      <div>
        <h4>Productos Suministrados</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad Suministrada</th>
              <th>Última Entrega</th>
            </tr>
          </thead>
          <tbody>
            {proveedor.productosSuministrados.map((producto, index) => (
              <tr key={index}>
                <td>{producto.nombre}</td>
                <td>{producto.cantidadSuministrada}</td>
                <td>{producto.ultimaEntrega}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Button variant="secondary" onClick={handleRegresar}>
        Regresar
      </Button>
    </div>
  );
}

export default VerDetalleProveedor;
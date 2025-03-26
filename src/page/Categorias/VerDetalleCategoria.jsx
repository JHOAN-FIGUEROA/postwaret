// src/page/VerDetalleCategoria.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import Sidebar from "./../Sidebar"; 

function VerDetalleCategoria() {
  const navigate = useNavigate();
  const location = useLocation(); // Usamos useLocation para obtener el estado de navegación

  // Obtener los datos de la categoría desde el estado de navegación
  const categoria = location.state?.categoria || {
    id: 1,
    nombre: "Categoría A",
    descripcion: "Descripción de la categoría A",
    productosAsociados: [
      {
        nombre: "Producto X",
        cantidad: 50,
        ultimaActualizacion: "2023-10-01",
      },
      {
        nombre: "Producto Y",
        cantidad: 30,
        ultimaActualizacion: "2023-09-25",
      },
    ],
  };

  // Función para regresar a la página de categorías
  const handleRegresar = () => {
    navigate("/categoria");
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
      <h2>Detalle de la Categoría</h2>
      <Sidebar modules={modules} /> {/* Agrega el Sidebar aquí */}
      <div>
        <h4>Información General</h4>
        <p>
          <strong>Nombre:</strong> {categoria.nombre}
        </p>
        <p>
          <strong>Descripción:</strong> {categoria.descripcion}
        </p>
      </div>
      <div>
        <h4>Productos Asociados</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Última Actualización</th>
            </tr>
          </thead>
          <tbody>
            {categoria.productosAsociados.map((producto, index) => (
              <tr key={index}>
                <td>{producto.nombre}</td>
                <td>{producto.cantidad}</td>
                <td>{producto.ultimaActualizacion}</td>
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

export default VerDetalleCategoria;
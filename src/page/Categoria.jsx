// src/components/Proveedores.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import "../css/Proveedores.css"; 
import Sidebar from "./Sidebar";


function Categoria() {
  const navigate = useNavigate();

  const [Categoria, setCategoria] = useState([
    { id: 1, nombre: "Categoria A", Descripcion: "Categoria A de Productos", },
    { id: 2, nombre: "Categoria B", Descripcion: "Categoria B de Productos", },
    { id: 3, nombre: "Categoria c", Descripcion: "Categoria C de Productos", },
    // Agrega más proveedores según sea necesario
  ]);

  // Estado para manejar la búsqueda
  const [busqueda, setBusqueda] = useState("");

  // Filtrar proveedores basados en la búsqueda
  const categoriaFiltrados = Categoria.filter((categoria) =>
    categoria.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Funciones para manejar las acciones
  const handleAnularCategoria = () => {
    navigate("/categoria/anular");
    // Lógica para anular el proveedor
  };

  const handleEditarCategoria = () => {
    navigate("/categoria/editar");
  
  };

  const handleAgregarCategoria = () => {
    navigate("/categoria/agregar");
    // Lógica para ver el detalle del proveedor
  };
  const handleVerDetalleCategoria = (id) => {
    navigate("/categoria/ver-detalle");
    // Lógica para ver el detalle del proveedor
  };
  const modules = [
    {
      name: "Dasboard",
      submenus: [
        { name: "Dasboard", path: "/dasboard" },
       
        
      ],
    },

    {
      name: "Configuracion",
      submenus: [
        { name: "Usuarios", path: "/usuarios" },
        { name: "Roles", path: "/roles" },
        { name: "Permisos", path: "/permisos" },
        
      ],
    },
    
    {
      name: "Compras",
      submenus: [
        { name: "Compras", path: "/compras" },
        { name: "Proveedores", path: "/proveedores" },
        { name: "Categoria", path: "/Categoria" },
        { name: "Productos", path: "/productos" },
      ],
    },
    {
      name: "Ventas",
      submenus: [
        { name: "Ventas", path: "/ventas" },
        { name: "Clientes", path: "/clientes" }, // Nuevo módulo de Ventas con submenú Clientes
      ],
    },
  ];


  return (
    <div>
     
      <div className="main-content">
        <h2>Categorias Registradas</h2>
        <Row className="mb-3">
          <Col>
          <Sidebar modules={modules} />
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Buscar Categoria..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <Button variant="outline-secondary">Buscar</Button>
            </InputGroup>
          </Col>
          <Col className="text-end">
            <Button variant="primary" onClick={handleAgregarCategoria}>
                          Agregar Categoria
            </Button>
          </Col>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categoriaFiltrados.map((categoria) => (
              <tr key={categoria.id}>
                <td>{categoria.id}</td>
                <td>{categoria.nombre}</td>
                <td>{categoria.Descripcion}</td>
                
                <td>
                      <Button
                        variant="info"
                        size="sm"
                        onClick={handleVerDetalleCategoria}
                        >
                        Ver Detalle
                       </Button>
                       <Button
                        variant="warning"
                        size="sm"
                        onClick={handleEditarCategoria}
                        >
                        Editar
                       </Button>
                       <Button
                        variant="danger"
                        size="sm"
                        onClick={handleAnularCategoria}
                        >
                        Anular
                       </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Categoria;
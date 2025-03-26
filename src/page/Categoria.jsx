// src/components/Categoria.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";
import EstadoSwitch from "./EstadoSwitch";

function Categoria() {
  const navigate = useNavigate();

  const [categorias, setCategorias] = useState([
    { id: 1, nombre: "Categoria A", Descripcion: "Categoria A de Productos", Estado: "Activa" },
    { id: 2, nombre: "Categoria B", Descripcion: "Categoria B de Productos", Estado: "Activa" },
    { id: 3, nombre: "Categoria C", Descripcion: "Categoria C de Productos", Estado: "Inactiva" },
    { id: 4, nombre: "Categoria D", Descripcion: "Categoria D de Productos", Estado: "Activa" },
    { id: 5, nombre: "Categoria E", Descripcion: "Categoria E de Productos", Estado: "Inactiva" },
    { id: 6, nombre: "Categoria F", Descripcion: "Categoria F de Productos", Estado: "Activa" },
  ]);

  // Estados para manejar la búsqueda y paginación
  const [busqueda, setBusqueda] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  // Filtrar categorías basados en la búsqueda
  const categoriasFiltradas = categorias.filter((categoria) =>
    categoria.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categoriasFiltradas.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(categoriasFiltradas.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Función para cambiar el estado de la categoría
  const handleCambiarEstado = (categoriaId) => {
    setCategorias((prevCategorias) => {
      return prevCategorias.map((categoria) => {
        if (categoria.id === categoriaId) {
          const nuevoEstado = categoria.Estado === "Activa" ? "Inactiva" : "Activa";
          return {
            ...categoria,
            Estado: nuevoEstado,
          };
        }
        return categoria;
      });
    });
  };

  // Funciones para manejar las acciones
  const handleAnularCategoria = (id) => {
    alert(`Anular Categoría con ID: ${id}`);
  };

  const handleEditarCategoria = (id) => {
    navigate(`/categoria/editar/${id}`);
  };

  const handleAgregarCategoria = () => {
    navigate("/categoria/agregar");
  };

  const handleVerDetalleCategoria = (id) => {
    navigate(`/categoria/ver-detalle/${id}`);
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
        { name: "Clientes", path: "/clientes" },
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
                onChange={(e) => {
                  setBusqueda(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
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
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((categoria) => (
              <tr key={categoria.id}>
                <td>{categoria.id}</td>
                <td>{categoria.nombre}</td>
                <td>{categoria.Descripcion}</td>
                <td>
                  <EstadoSwitch
                    key={`estado-switch-${categoria.id}`}
                    estado={categoria.Estado}
                    onChange={() => handleCambiarEstado(categoria.id)}
                  />
                </td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => handleVerDetalleCategoria(categoria.id)}
                  >
                    Ver Detalle
                  </Button>{" "}
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEditarCategoria(categoria.id)}
                  >
                    Editar
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleAnularCategoria(categoria.id)}
                  >
                    Anular
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Pagination controls */}
        <div className="pagination-container">
          <button 
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>

          <span className="pagination-text">Página {currentPage} de {totalPages}</span>

          <button 
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}

export default Categoria;
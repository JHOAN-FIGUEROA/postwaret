import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
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

  const [busqueda, setBusqueda] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  const categoriasFiltradas = categorias.filter((categoria) =>
    categoria.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categoriasFiltradas.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(categoriasFiltradas.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCambiarEstado = (categoriaId, nuevoEstado) => {
    Swal.fire({
      title: "¿Cambiar estado?",
      text: `¿Está seguro que desea ${nuevoEstado === "Activa" ? "activar" : "desactivar"} esta categoría?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, cambiar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        setCategorias((prevCategorias) =>
          prevCategorias.map((categoria) =>
            categoria.id === categoriaId
              ? { ...categoria, Estado: nuevoEstado }
              : categoria
          )
        );
        Swal.fire({
          icon: "success",
          title: "Estado cambiado",
          text: `La categoría ha sido ${nuevoEstado === "Activa" ? "activada" : "desactivada"} correctamente.`,
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleEliminarCategoria = async (id) => {
    const result = await Swal.fire({
      title: "¿Está seguro?",
      text: "Esta acción no se puede deshacer. ¿Desea eliminar esta categoría?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      setCategorias(categorias.filter((categoria) => categoria.id !== id));
      Swal.fire({
        icon: "success",
        title: "¡Eliminado!",
        text: "La categoría ha sido eliminada exitosamente.",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  const handleEditarCategoria = (id) => {
    Swal.fire({
      title: "¿Editar categoría?",
      text: "Será redirigido al formulario de edición.",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Continuar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/categoria/editar`);
      }
    });
  };

  const handleAgregarCategoria = () => {
    Swal.fire({
      title: "Agregar nueva categoría",
      text: "Será redirigido al formulario de creación.",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Continuar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/categoria/agregar");
      }
    });
  };

  const handleVerDetalleCategoria = (id) => {
    const categoria = categorias.find(c => c.id === id);
    Swal.fire({
      title: `Detalle de ${categoria.nombre}`,
      html: `
        <div style="text-align: left;">
          <p><strong>ID:</strong> ${categoria.id}</p>
          <p><strong>Nombre:</strong> ${categoria.nombre}</p>
          <p><strong>Descripción:</strong> ${categoria.Descripcion}</p>
          <p><strong>Estado:</strong> ${categoria.Estado}</p>
        </div>
      `,
      icon: "info",
      confirmButtonText: "Cerrar",
      confirmButtonColor: "#3085d6",
    });
  };
  const modules = [
    {
      name: "Dashboard",
      submenus: [{ name: "Dashboard", path: "/dasboard" }],
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
        { name: "Categoria", path: "/categoria" },
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
    <div className="main-content">
      <h2>Categorías Registradas</h2>
      <Row className="mb-3">
        <Col>
        <Sidebar modules={modules} />
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Buscar Categoría..."
              value={busqueda}
              onChange={(e) => {
                setBusqueda(e.target.value);
                setCurrentPage(1);
              }}
            />
           
          </InputGroup>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={handleAgregarCategoria}>
            Agregar Categoría
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((categoria) => (
              <tr key={categoria.id}>
                <td>{categoria.id}</td>
                <td>{categoria.nombre}</td>
                <td>{categoria.Descripcion}</td>
                <td>
                  <EstadoSwitch
                    estado={categoria.Estado}
                    onChange={(nuevoEstado) => handleCambiarEstado(categoria.id, nuevoEstado)}
                  />
                </td>
                <td>
                  <Button variant="info" size="sm" onClick={() => handleVerDetalleCategoria(categoria.id)}>
                    Ver Detalle
                  </Button>{" "}
                  <Button variant="warning" size="sm" onClick={() => handleEditarCategoria(categoria.id)}>
                    Editar
                  </Button>{" "}
                  <Button variant="danger" size="sm" onClick={() => handleEliminarCategoria(categoria.id)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No se encontraron categorías
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <div className="pagination-container">
        <Button 
          variant="outline-primary" 
          onClick={() => {
            if (currentPage > 1) {
              paginate(currentPage - 1);
            } else {
              Swal.fire({
                icon: "info",
                title: "Primera página",
                text: "Ya estás en la primera página.",
                timer: 1500,
                timerProgressBar: true,
                showConfirmButton: false,
              });
            }
          }} 
          disabled={currentPage === 1}
        >
          Anterior
        </Button>
        <span className="mx-3">Página {currentPage} de {totalPages}</span>
        <Button 
          variant="outline-primary" 
          onClick={() => {
            if (currentPage < totalPages) {
              paginate(currentPage + 1);
            } else {
              Swal.fire({
                icon: "info",
                title: "Última página",
                text: "Ya estás en la última página.",
                timer: 1500,
                timerProgressBar: true,
                showConfirmButton: false,
              });
            }
          }} 
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}

export default Categoria;
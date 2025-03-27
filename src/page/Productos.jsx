import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";
import EstadoSwitch from "./EstadoSwitch";

function Productos() {
  const navigate = useNavigate();

  // Estado para almacenar la lista de productos
  const [productos, setProductos] = useState([
    {
      id: 1,
      nombre: "Producto A",
      categoria: "Categoría A",
      precioUnitarioCOP: 50000,
      Estado: "Activo"
    },
    {
      id: 2,
      nombre: "Producto B",
      categoria: "Categoría B",
      precioUnitarioCOP: 75000,
      Estado: "Activo"
    },
    {
      id: 3,
      nombre: "Producto C",
      categoria: "Categoría C",
      precioUnitarioCOP: 120000,
      Estado: "Inactivo"
    },
    {
      id: 4,
      nombre: "Producto D",
      categoria: "Categoría A",
      precioUnitarioCOP: 80000,
      Estado: "Activo"
    },
    {
      id: 5,
      nombre: "Producto E",
      categoria: "Categoría B",
      precioUnitarioCOP: 95000,
      Estado: "Inactivo"
    },
    {
      id: 6,
      nombre: "Producto F",
      categoria: "Categoría C",
      precioUnitarioCOP: 150000,
      Estado: "Activo"
    },
  ]);

  // Estados para manejar la búsqueda y paginación
  const [busqueda, setBusqueda] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  // Filtrar productos basados en la búsqueda
  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    producto.categoria.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productosFiltrados.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(productosFiltrados.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Función para cambiar el estado del producto
  const handleCambiarEstado = (productoId) => {
    setProductos((prevProductos) => {
      return prevProductos.map((producto) => {
        if (producto.id === productoId) {
          const nuevoEstado = producto.Estado === "Activo" ? "Inactivo" : "Activo";
          return {
            ...producto,
            Estado: nuevoEstado,
          };
        }
        return producto;
      });
    });
  };

  // Función para eliminar producto con confirmación
  const handleEliminarProducto = (id) => {
    if (window.confirm("¿Está seguro que desea eliminar este producto?")) {
      setProductos(productos.filter(producto => producto.id !== id));
      alert("Producto eliminado exitosamente");
    }
  };

  const handleEditarProducto = (id) => {
    navigate(`/productos/editarr`);
  };

  const handleAgregarProducto = () => {
    navigate("/productos/agregarr");
  };

  const handleVerDetalleProducto = (id) => {
    navigate(`/productos/ver-detalle`);
  };

  // Definir los módulos para el Sidebar
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
    <div>
      <div className="main-content">
        <h2>Productos Registrados</h2>
        <Row className="mb-3">
          <Col>
            <Sidebar modules={modules} />
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Buscar Producto..."
                value={busqueda}
                onChange={(e) => {
                  setBusqueda(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <Button variant="outline-secondary">Buscar</Button>
            </InputGroup>
          </Col>
          <Col className="text-end">
            <Button variant="primary" onClick={handleAgregarProducto}>
              Agregar Producto
            </Button>
          </Col>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio Unitario (COP)</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>{producto.categoria}</td>
                <td>${producto.precioUnitarioCOP.toLocaleString()}</td>
                <td>
                  <EstadoSwitch
                    key={`estado-switch-${producto.id}`}
                    estado={producto.Estado}
                    onChange={() => handleCambiarEstado(producto.id)}
                  />
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => handleVerDetalleProducto(producto.id)}
                    >
                      Ver Detalle
                    </Button>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleEditarProducto(producto.id)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleEliminarProducto(producto.id)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

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

export default Productos;
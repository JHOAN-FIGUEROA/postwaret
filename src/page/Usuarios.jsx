import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";
import EstadoSwitch from "./EstadoSwitch";

function Usuarios() {
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: "Juan Pérez", numeroDocumento: "12345678", rol: "Administrador", estado: "Activo" },
    { id: 2, nombre: "María García", numeroDocumento: "87654321", rol: "Vendedor", estado: "Activo" },
    { id: 3, nombre: "Carlos López", numeroDocumento: "11223344", rol: "Supervisor", estado: "Inactivo" },
    { id: 4, nombre: "Ana Martínez", numeroDocumento: "44332211", rol: "Vendedor", estado: "Activo" },
    { id: 5, nombre: "Luis Rodríguez", numeroDocumento: "55667788", rol: "Supervisor", estado: "Inactivo" },
    { id: 6, nombre: "Sofía González", numeroDocumento: "99887766", rol: "Vendedor", estado: "Activo" },
    { id: 7, nombre: "Pedro Sánchez", numeroDocumento: "33445566", rol: "Administrador", estado: "Activo" },
  ]);

  const [busqueda, setBusqueda] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  const usuariosFiltrados = usuarios.filter(usuario =>
    usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    usuario.numeroDocumento.includes(busqueda)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = usuariosFiltrados.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(usuariosFiltrados.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  // Función para cambiar el estado del usuario
  const handleCambiarEstado = (usuarioId) => {
    setUsuarios(usuarios.map(usuario => 
      usuario.id === usuarioId 
        ? {...usuario, estado: usuario.estado === "Activo" ? "Inactivo" : "Activo"} 
        : usuario
    ));
  };

  

  const handleEliminarUsuario = (id) => {
    if (window.confirm("¿Está seguro que desea eliminar este usuario?")) {
      setUsuarios(usuarios.filter(usuario => usuario.id !== id));
      alert("Usuario eliminado exitosamente");
    }
  };

  const handleEditarUsuario = () => navigate("/usuarios/editar");

  const handleAgregarUsuario = () => navigate("/usuarios/agregar");
  const handleVerDetalleUsuario = (id) => navigate(`/usuarios/ver-detalle/${id}`);

  const modules = [
    {
      name: "Dashboard",
      submenus: [{ name: "Dashboard", path: "/dashboard" }],
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
      <h2>Usuarios Registrados</h2>
      <Row className="mb-3">
        <Col>
          <Sidebar modules={modules} />
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Buscar usuario..."
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
          <Button variant="primary" onClick={handleAgregarUsuario}>
            Agregar Usuario
          </Button>
        </Col>
      </Row>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>N° Documento</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.numeroDocumento}</td>
              <td>{usuario.rol}</td>
              <td>
                <EstadoSwitch
                  estado={usuario.estado}
                  onChange={() => handleCambiarEstado(usuario.id)}
                />
              </td>
              <td>
                <Button variant="info" size="sm" onClick={() => handleVerDetalleUsuario(usuario.id)}>
                  Ver Detalle
                </Button>{' '}
                <Button variant="warning" size="sm" onClick={() => handleEditarUsuario(usuario.id)}>
                  Editar
                </Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleAnularUsuario(usuario.id)}>
                  Anular
                </Button>
              </td>
            </tr>

          ))}
          </thead>
          <tbody>
            {currentItems.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.numeroDocumento}</td>
                <td>{usuario.rol}</td>
                <td>
                  <Button variant="info" size="sm" onClick={handleVerDetalleUsuario}>
                    Ver Detalle
                  </Button>{" "}
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={handleEditarUsuario}
                  >
                    Editar
                  </Button>{" "}
                  <Button 
                    variant="danger" 
                    size="sm" 
                    onClick={() => handleEliminarUsuario(usuario.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="pagination-container">
          <Button 
            variant="outline-primary"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>

          <span className="mx-3">Página {currentPage} de {totalPages}</span>

          <Button 
            variant="outline-primary"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Siguiente
          </Button>
        </div>

        <div className="text-center mt-2 pagination-info">
          Mostrando usuarios {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, usuariosFiltrados.length)} de {usuariosFiltrados.length}
        </div>

      </div>
    </div>
  );
}

export default Usuarios;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";
import EstadoSwitch from "./EstadoSwitch";
import { useAlert } from '../AlertContext';


function Roles() {
  const navigate = useNavigate();
  const { showSuccess, showInfo, showWarning, showError, confirm } = useAlert();
  const { alert } = useAlert();

  const [roles, setRoles] = useState([
    { 
      id: 1, 
      nombre: "Administrador", 
      descripcion: "Acceso total al sistema", 
      estado: true
    },
    { 
      id: 2, 
      nombre: "Vendedor", 
      descripcion: "Módulo de ventas y clientes", 
      estado: true
    },
    { 
      id: 3, 
      nombre: "Inventario", 
      descripcion: "Gestión de productos y categorías", 
      estado: true 
    },
    { 
      id: 4, 
      nombre: "Soporte", 
      descripcion: "Acceso a configuración y usuarios", 
      estado: true 
    },
    { 
      id: 5, 
      nombre: "Contador", 
      descripcion: "Gestión de informes y finanzas", 
      estado: true
    },
  ]);

  const [busqueda, setBusqueda] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  const rolesFiltrados = roles.filter(rol =>
    rol.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    rol.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rolesFiltrados.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(rolesFiltrados.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Función para cambiar el estado del rol
  const toggleEstado = (rolId) => {
    setRoles(prevRoles => 
      prevRoles.map(rol => 
        rol.id === rolId 
          ? { ...rol, estado: !rol.estado } 
          : rol
      )
    );
    
    // Mostrar notificación de cambio de estado
    const rol = roles.find(r => r.id === rolId);
    const nuevoEstado = !rol.estado;
    showInfo(`El rol "${rol.nombre}" ha sido ${nuevoEstado ? 'activado' : 'desactivado'}`);
  };

  // Función para eliminar rol con confirmación
  const handleEliminarRol = async (id) => {
    const rol = roles.find(r => r.id === id);
    const confirmed = await alert (
      `¿Está seguro que desea eliminar el rol "${rol.nombre}"?`, 
      "Eliminar Rol"
    );
    
    if (alert) {
      setRoles(roles.filter(rol => rol.id !== id));
      showSuccess(`Rol "${rol.nombre}" eliminado exitosamente`);
    }
  };

  const handleEditarRol = (id) => {
    const rol = roles.find(r => r.id === id);
    showInfo(`Editando rol: ${rol.nombre}`);
    navigate(`/roles/editar`);
  };
  
  const handleAgregarRol = () => {
    navigate("/roles/agregar");
  };
  
  const handleVerDetalleRol = (id) => {
    const rol = roles.find(r => r.id === id);
    showInfo(`Viendo detalles del rol: ${rol.nombre}`);
    navigate(`/roles/ver-detalle`);
  };
  
  const handlePermisosAsociados = (id) => {
    const rol = roles.find(r => r.id === id);
    showInfo(`Gestionando permisos del rol: ${rol.nombre}`);
    navigate(`/roles/permisos-asociados`);
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
    <div className="main-content">
      <h2>Roles del Sistema</h2>
      <Row className="mb-3">
        <Col>
          <Sidebar modules={modules} />
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Buscar rol..."
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
          <Button variant="primary" onClick={handleAgregarRol}>
            Agregar Rol
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
          {currentItems.map((rol) => (
            <tr key={rol.id}>
              <td>{rol.id}</td>
              <td>{rol.nombre}</td>
              <td>{rol.descripcion}</td>
              <td>
                <EstadoSwitch
                  activo={rol.estado}
                  onChange={() => toggleEstado(rol.id)}
                />
              </td>
              <td>
                <div className="d-flex gap-2">
                  <Button 
                    variant="info" 
                    size="sm" 
                    onClick={() => handleVerDetalleRol(rol.id)}
                  >
                    Ver Detalle
                  </Button>
                  <Button 
                    variant="info" 
                    size="sm" 
                    onClick={() => handlePermisosAsociados(rol.id)}
                  >
                    Permisos
                  </Button>
                  <Button 
                    variant="warning" 
                    size="sm" 
                    onClick={() => handleEditarRol(rol.id)}
                  >
                    Editar
                  </Button>
                  <Button 
                    variant="danger" 
                    size="sm" 
                    onClick={() => handleEliminarRol(rol.id)}
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
  );
}

export default Roles;
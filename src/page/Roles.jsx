import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";
import Estado from './Estado'; // Import the new Estado component
import Swal from 'sweetalert2';

function Roles() {
  const navigate = useNavigate();
  
  // Configuración global para las alertas toast
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  const [roles, setRoles] = useState([
    { 
      id: 1, 
      nombre: "Administrador", 
      descripcion: "Acceso total al sistema",
      estado: "Activo"
    },
    { 
      id: 2, 
      nombre: "Vendedor", 
      descripcion: "Módulo de ventas y clientes",
      estado: "Activo"
    },
    { 
      id: 3, 
      nombre: "Inventario", 
      descripcion: "Gestión de productos y categorías",
      estado: "Inactivo"
    },
    { 
      id: 4, 
      nombre: "Soporte", 
      descripcion: "Acceso a configuración y usuarios",
      estado: "Activo"
    },
    { 
      id: 5, 
      nombre: "Contador", 
      descripcion: "Gestión de informes y finanzas",
      estado: "Inactivo"
    },
  ]);

  const [busqueda, setBusqueda] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  // Función para mostrar alertas toast
  const showToast = (icon, title) => {
    Toast.fire({
      icon,
      title
    });
  };

  // Función para cambiar el estado de un rol
  const handleCambiarEstado = (id) => {
    setRoles(prevRoles =>
      prevRoles.map(rol =>
        rol.id === id
          ? {
              ...rol,
              estado: rol.estado == "Activo" ? "Inactivo" : "Activo"
            }
          : rol
      )
    );
    showToast('success', 'Estado del rol actualizado');
  };

  // Función para guardar un nuevo rol
  const handleGuardarRol = (nuevoRol) => {
    const id = Math.max(...roles.map(r => r.id)) + 1;
    const rolCompleto = { ...nuevoRol, id, estado: "Activo" };
    
    setRoles([...roles, rolCompleto]);
    showToast('success', 'Rol creado exitosamente');
    navigate("/roles");
  };

  // Función para editar un rol existente
  const handleEditarRolGuardar = (rolEditado) => {
    setRoles(roles.map(rol => 
      rol.id === rolEditado.id ? rolEditado : rol
    ));
    showToast('success', 'Rol actualizado exitosamente');
    navigate("/roles");
  };

  const rolesFiltrados = roles.filter(rol =>
    rol.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    rol.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rolesFiltrados.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(rolesFiltrados.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Función para eliminar rol con confirmación
  const handleEliminarRol = async (id) => {
    const rol = roles.find(r => r.id === id);
    
    const result = await Swal.fire({
      title: '¿Está seguro?',
      text: `¿Desea eliminar el rol "${rol.nombre}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
    
    if (result.isConfirmed) {
      setRoles(roles.filter(rol => rol.id !== id));
      showToast('success', 'Rol eliminado exitosamente');
    }
  };

  const handleEditarRol = (id) => {
    const rol = roles.find(r => r.id === id);
    showToast('info', `Editando rol: ${rol.nombre}`);
    navigate(`/roles/editar`);
  };
  
  const handleAgregarRol = () => {
    navigate("/roles/agregar");
  };
  
  const handleVerDetalleRol = (id) => {
    const rol = roles.find(r => r.id === id);
    showToast('info', `Viendo detalles de: ${rol.nombre}`);
    navigate(`/roles/ver-detalle`);
  };
  
  const handlePermisosAsociados = (id) => {
    const rol = roles.find(r => r.id === id);
    showToast('info', `Gestionando permisos de: ${rol.nombre}`);
    navigate(`/roles/permisos-asociados`);
  };

  const modules = [ 
    {
      name: "Dashboard",
      submenus: [{ name: "Dashboard", path: "/dahboard" }],
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
          
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((rol) => (
            <tr key={rol.id}>
            
              <td>{rol.nombre}</td>
              <td>{rol.descripcion}</td>
              <td>
                <Estado 
                  estado={rol.estado} 
                  onChange={() => handleCambiarEstado(rol.id)}
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
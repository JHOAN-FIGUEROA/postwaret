import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Table, Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";
import EstadoSwitch from "./EstadoSwitch";
import Swal from 'sweetalert2';

function Proveedores() {
  const navigate = useNavigate();

  // Estado para almacenar la lista de proveedores
  const [proveedores, setProveedores] = useState([
    { id: 1, Nit:911567, nombre: "Proveedor A", contacto: "contacto@proveedora.com", telefono: "123456789", Estado: "Activa" },
    { id: 2, Nit:811567,nombre: "Proveedor B", contacto: "contacto@proveedorb.com", telefono: "987654321", Estado: "Activa" },
    { id: 3, Nit:711567,nombre: "Proveedor C", contacto: "contacto@proveedorc.com", telefono: "987654345", Estado: "Inactiva" },
    { id: 4, Nit:611567,nombre: "Proveedor D", contacto: "contacto@proveedord.com", telefono: "555555555", Estado: "Activa" },
    { id: 5, Nit:511567,nombre: "Proveedor E", contacto: "contacto@proveedore.com", telefono: "666666666", Estado: "Inactiva" },
    { id: 6, Nit:411567,nombre: "Proveedor F", contacto: "contacto@proveedorf.com", telefono: "777777777", Estado: "Activa" },
  ]);

  // Estados para manejar la búsqueda y paginación
  const [busqueda, setBusqueda] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  // Filtrar proveedores basados en la búsqueda
  const proveedoresFiltrados = proveedores.filter((proveedor) =>
    proveedor.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = proveedoresFiltrados.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(proveedoresFiltrados.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Función para cambiar el estado del proveedor
  const handleCambiarEstado = (proveedorId) => {
    setProveedores((prevProveedores) => {
      return prevProveedores.map((proveedor) => {
        if (proveedor.id === proveedorId) {
          const nuevoEstado = proveedor.Estado === "Activa" ? "Inactiva" : "Activa";
          return {
            ...proveedor,
            Estado: nuevoEstado,
          };
        }
        return proveedor;
      });
    });
  };

  // Función para eliminar proveedor con confirmación usando SweetAlert2
  const handleEliminarProveedor = (id) => {
    Swal.fire({
      title: '¿Está seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setProveedores(proveedores.filter(proveedor => proveedor.id !== id));
        Swal.fire(
          '¡Eliminado!',
          'El proveedor ha sido eliminado.',
          'success'
        );
      }
    });
  };

  const handleAgregarProveedor = () => {
    navigate("/proveedor/agregar");
  };

  const handleEditarProveedor = (id) => {
    Swal.fire({
      title: '¿Editar proveedor?',
      text: "Serás redirigido al formulario de edición",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/proveedor/editar`);
      }
    });
  };

  const handleVerDetalleProveedor = (id) => {
    navigate(`/proveedor/ver-detalle`);
  };

  // Definir los módulos para el Sidebar
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
        <h2>Proveedores Registrados</h2>
        <Sidebar modules={modules} />
        <Row className="mb-3">
          <Col>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Buscar proveedor..."
                value={busqueda}
                onChange={(e) => {
                  setBusqueda(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
              />

            </InputGroup>
          </Col>
          <Col className="text-end">
            <Button variant="primary" onClick={handleAgregarProveedor}>
              Agregar Proveedor
            </Button>
          </Col>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nit</th>
              <th>Nombre</th>
              <th>Contacto</th>
              <th>Teléfono</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((proveedor) => (
              <tr key={proveedor.id}>
                <td>{proveedor.Nit}</td>
                <td>{proveedor.nombre}</td>
                <td>{proveedor.contacto}</td>
                <td>{proveedor.telefono}</td>
                <td>
                  <EstadoSwitch
                    key={`estado-switch-${proveedor.id}`}
                    estado={proveedor.Estado}
                    onChange={() => handleCambiarEstado(proveedor.id)}
                  />
                </td>
                <td>
                  <div className="d-flex gap-2">
                  
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => handleVerDetalleProveedor(proveedor.id)}
                    >
                      Ver Detalle
                    </Button>

                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleEditarProveedor(proveedor.id)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleEliminarProveedor(proveedor.id)}
                    >
                      Eliminar
                    </Button>
                  </div>
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

        <Outlet />
      </div>
    </div>
  );
}

export default Proveedores;
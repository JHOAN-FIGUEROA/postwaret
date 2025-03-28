"use client"

import { useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { Table, Form, Button, InputGroup, Row, Col } from "react-bootstrap"
import Sidebar from "./Sidebar"
import EstadoSwitch from "./EstadoSwitch"
import Swal from 'sweetalert2'

function Clientes() {
  const [clientes, setClientes] = useState([
    { id:1 ,Documento: 1011395174, nombre: "Cliente A", contacto: "contacto@cliente.com", telefono: "123456789", Estado: "Activa" },
    { id:2 , Documento: 2011395174, nombre: "Cliente B", contacto: "contacto@Cliente.com", telefono: "987654321", Estado: "Activa" },
    { id:3 , Documento: 3011395174, nombre: "Cliente C", contacto: "contacto@Cliente.com", telefono: "987654345", Estado: "Inactiva" },
    { id:4 , Documento: 4011395174, nombre: "Cliente D", contacto: "contacto@clienteD.com", telefono: "555555555", Estado: "Activa" },
    { id:5 , Documento: 5011395174, nombre: "Cliente E", contacto: "contacto@ClienteE.com", telefono: "666666666", Estado: "Inactiva" },
    {  id:6 ,Documento: 6011395174, nombre: "Cliente F", contacto: "contacto@ClienteF.com", telefono: "777777777", Estado: "Activa" },
  ])

  const [busqueda, setBusqueda] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(3)
  const navigate = useNavigate()

  const clientesFiltrados = clientes.filter((cliente) => 
    cliente.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = clientesFiltrados.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(clientesFiltrados.length / itemsPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const handleAgregar = () => {
    Swal.fire({
      title: 'Agregar Cliente',
      text: 'Serás redirigido al formulario para agregar un nuevo cliente',
      icon: 'info',
      confirmButtonText: 'Continuar'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/clientes/agregar")
      }
    })
  }

  const handleEditar = (id) => {
    Swal.fire({
      title: 'Editar Cliente',
      text: 'Serás redirigido al formulario de edición',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/clientes/editar/`)
      }
    })
  }

  const handleVerDetalle = (id) => {
    const cliente = clientes.find(c => c.id === id)
    Swal.fire({
      title: `Detalle del Cliente: ${cliente.nombre}`,
      html: `
        <p><strong>Documento:</strong> ${cliente.Documento}</p>
        <p><strong>Contacto:</strong> ${cliente.contacto}</p>
        <p><strong>Teléfono:</strong> ${cliente.telefono}</p>
        <p><strong>Estado:</strong> ${cliente.Estado}</p>
      `,
      icon: 'info',
      confirmButtonText: 'Cerrar'
    })
  }

  const handleEliminar = (id) => {
    Swal.fire({
      title: '¿Eliminar cliente?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setClientes(clientes.filter(cliente => cliente.id !== id))
        Swal.fire(
          '¡Eliminado!',
          'El cliente ha sido eliminado exitosamente',
          'success'
        )
      }
    })
  }

  const handleCambiarEstado = (clienteId) => {
    setClientes((prevClientes) => {
      return prevClientes.map((cliente) => {
        if (cliente.id === clienteId) {
          const nuevoEstado = cliente.Estado === "Activa" ? "Inactiva" : "Activa"
          
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Estado cambiado a ${nuevoEstado}`,
            showConfirmButton: false,
            timer: 1500
          })
          
          return {
            ...cliente,
            Estado: nuevoEstado,
          }
        }
        return cliente
      })
    })
  }

  const modules = [
    {
      name: "Dashboard",
      submenus: [{ name: "Dashboard", path: "/dahboard" }],
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
  ]

  return (
    <div>
      <div className="main-content">
        <h2>Clientes Registrados</h2>
        <Sidebar modules={modules} />
        <Row className="mb-3">
          <Col>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Buscar Cliente..."
                value={busqueda}
                onChange={(e) => {
                  setBusqueda(e.target.value)
                  setCurrentPage(1)
                }}
              />
              <Button variant="outline-secondary">Buscar</Button>
            </InputGroup>
          </Col>
          <Col className="text-end">
            <Button variant="primary" onClick={handleAgregar}>
              Agregar Cliente
            </Button>
          </Col>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Documento</th>
              <th>Nombre</th>
              <th>Contacto</th>
              <th>Teléfono</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.Documento}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.contacto}</td>
                <td>{cliente.telefono}</td>
                <td>
                  <EstadoSwitch
                    key={`estado-switch-${cliente.id}`}
                    estado={cliente.Estado}
                    onChange={() => handleCambiarEstado(cliente.id)}
                  />
                </td>
                <td>
                  <Button variant="info" size="sm" onClick={() => handleVerDetalle(cliente.id)}>
                    Ver Detalle
                  </Button>{" "}
                  <Button variant="warning" size="sm" onClick={() => handleEditar(cliente.id)}>
                    Editar
                  </Button>{" "}
                  <Button variant="danger" size="sm" onClick={() => handleEliminar(cliente.id)}>
                    Eliminar
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

        <Outlet />
      </div>
    </div>
  )
}

export default Clientes
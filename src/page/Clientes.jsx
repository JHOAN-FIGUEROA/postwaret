"use client"

import { useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { Table, Form, Button, InputGroup, Row, Col } from "react-bootstrap"
import Sidebar from "./Sidebar"
import EstadoSwitch from "./EstadoSwitch" // Importa el componente

function Clientes() {
  const [clientes, setClientes] = useState([
    { id: 1, nombre: "Cliente A", contacto: "contacto@cliente.com", telefono: "123456789", Estado: "Activa" },
    { id: 2, nombre: "Cliente B", contacto: "contacto@Cliente.com", telefono: "987654321", Estado: "Activa" },
    { id: 3, nombre: "Cliente C", contacto: "contacto@Cliente.com", telefono: "987654345", Estado: "Inactiva" },
  ])

  const [busqueda, setBusqueda] = useState("")
  const navigate = useNavigate() // Hook para la navegación

  const clientesFiltrados = clientes.filter((cliente) => cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()))

  const handleAgregar = () => {
    navigate("/clientes/agregar") // Redirigir a la ruta de agregar cliente
  }

  const handleEditar = (id) => {
    navigate(`/clientes/editar/`) // Redirigir a la ruta de editar cliente
  }

  const handleVerDetalle = (id) => {
    navigate(`/clientes/detalle/`) // Redirigir a la ruta de ver detalle
  }

  const handleAnular = (id) => {
    alert(`Anular Cliente con ID: ${id}`)
  }

  // Función para cambiar el estado del cliente específico por ID
  const handleCambiarEstado = (clienteId) => {
    console.log(`Cambiando estado del cliente con ID: ${clienteId}`)

    setClientes((prevClientes) => {
      return prevClientes.map((cliente) => {
        // Solo modificar el cliente con el ID específico
        if (cliente.id === clienteId) {
          console.log(`Cliente encontrado: ${cliente.nombre}, Estado actual: ${cliente.Estado}`)
          const nuevoEstado = cliente.Estado === "Activa" ? "Inactiva" : "Activa"
          console.log(`Nuevo estado: ${nuevoEstado}`)
          return {
            ...cliente,
            Estado: nuevoEstado,
          }
        }
        // Devolver los demás clientes sin cambios
        return cliente
      })
    })
  }

  const modules = [
    {
      name: "Dasboard",
      submenus: [{ name: "Dasboard", path: "/dasboard" }],
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
                onChange={(e) => setBusqueda(e.target.value)}
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
              <th>ID</th>
              <th>Nombre</th>
              <th>Contacto</th>
              <th>Teléfono</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.contacto}</td>
                <td>{cliente.telefono}</td>
                <td>
                  {/* Crear un componente EstadoSwitch único para cada cliente */}
                  <EstadoSwitch
                    key={`estado-switch-${cliente.id}`}
                    estado={cliente.Estado}
                    onChange={() => {
                      console.log(`Switch clicked for cliente ID: ${cliente.id}`)
                      handleCambiarEstado(cliente.id)
                    }}
                  />
                </td>
                <td>
                  <Button variant="info" size="sm" onClick={() => handleVerDetalle(cliente.id)}>
                    Ver Detalle
                  </Button>{" "}
                  <Button variant="warning" size="sm" onClick={() => handleEditar(cliente.id)}>
                    Editar
                  </Button>{" "}
                  <Button variant="danger" size="sm" onClick={() => handleAnular(cliente.id)}>
                    Anular
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* Renderizar las rutas anidadas */}
        <Outlet />
      </div>
    </div>
  )
}

export default Clientes


import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Row, Col, Card, Table } from "react-bootstrap";
import Sidebar from "./../Sidebar";

function EditarRol() {
  const navigate = useNavigate();
  const location = useLocation();

  // Datos iniciales del rol
  const [rol, setRol] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    permisos: {
      sistema: false,
      usuarios: false,
      configuracion: false,
      compras: false,
      ventas: false
    }
  });

  // Cargar datos del rol al montar el componente
  useEffect(() => {
    if (location.state?.rol) {
      setRol(location.state.rol);
    }
  }, [location.state]);

  // Manejar cambios en los campos básicos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRol({ ...rol, [name]: value });
  };

  // Manejar cambios en los permisos
  const handlePermisoChange = (modulo) => {
    setRol({
      ...rol,
      permisos: {
        ...rol.permisos,
        [modulo]: !rol.permisos[modulo]
      }
    });
  };

  // Guardar cambios
  const handleGuardar = () => {
    alert("Rol actualizado exitosamente");
    navigate("/roles");
  };

  // Cancelar edición
  const handleCancelar = () => {
    navigate("/roles");
  };

  const modules = [
    {
      name: "Dashboard",
      submenus: [{ name: "Dashboard", path: "/dashboard" }],
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
    <div className="main-content with-sidebar">
      <h2>Editar Rol: {rol.nombre}</h2>
      <Sidebar modules={modules} />

      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Información Básica</Card.Title>
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="nombre">
                  <Form.Label>Nombre del Rol</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={rol.nombre}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="descripcion">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={1}
                    name="descripcion"
                    value={rol.descripcion}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Permisos Asignados</Card.Title>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Módulo</th>
                <th>Acceso</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(rol.permisos).map(([modulo, tieneAcceso]) => (
                <tr key={modulo}>
                  <td>{modulo.charAt(0).toUpperCase() + modulo.slice(1)}</td>
                  <td>
                    <Form.Check
                      type="switch"
                      id={`permiso-${modulo}`}
                      checked={tieneAcceso}
                      onChange={() => handlePermisoChange(modulo)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <div className="text-end">
        <Button variant="success" onClick={handleGuardar} className="me-2">
          Guardar Cambios
        </Button>
        <Button variant="secondary" onClick={handleCancelar}>
          Cancelar
        </Button>
      </div>
    </div>
  );
}

export default EditarRol;
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Card, ListGroup } from "react-bootstrap";
import Swal from "sweetalert2";
import Sidebar from "./../Sidebar";
import "./rol.css"; 
function EditarRol() {
  const navigate = useNavigate();
  const location = useLocation();

  // Estado inicial del rol
  const [rol, setRol] = useState({
    nombre: "Cajero",
    descripcion:
      "El rol Cajero es el rol que administra toda La parte de compras y ventas",
    permisos: {
      entrarSistema: false,
      cambiarEstadoUsuario: false,
      verPermisosAsociados: false,
      salirSistema: false,
      accederConfiguracion: false,
      asociarPermisos: false,
      eliminarUsuario: false,
      crearRol: false,
      entrarCompras: false,
      editarUsuario: false,
      editarRol: false,
      verCompras: false,
      agregarUsuario: false,
      anularRol: false,
      agregarCompra: false,
      descargarPDF: false,
      eliminarRol: false,
      verDetalleCompra: false,
      anularUsuario: false,
      verDetalleRol: false,
      anularCompra: false,
      buscarUsuario: false,
      verRoles: false,
      cambiarEstadoCompra: false,
      verDetalleUsuario: false,
      cambiarEstadoRol: false,
      buscarCompra: false,
    },
  });

  // Cargar datos del rol si se pasan por navegación
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
  const handlePermisoChange = (permiso) => {
    setRol({
      ...rol,
      permisos: {
        ...rol.permisos,
        [permiso]: !rol.permisos[permiso],
      },
    });
  };

  // Guardar cambios con alerta de SweetAlert2 y redirigir
  const handleGuardar = () => {
    Swal.fire({
      icon: "success",
      title: "Rol actualizado exitosamente",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    }).then(() => {
      navigate("/roles");
    });
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
      <h2>Editor Rol</h2>
      <Sidebar modules={modules} />

      <Card className="mb-4">
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="rol-form-label required">Nombre del Rol</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={rol.nombre}
                onChange={handleChange}
                className="rol-form-input"
              />
              <Form.Label className="rol-form-label">Descripción del Rol</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                value={rol.descripcion}
                onChange={handleChange}
                className="rol-form-textarea"
              />
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Title>Permisos Asociados</Card.Title>
          <ListGroup variant="flush">
            {Object.entries({
              
              "Dashboard": "Ver La Dashboard",
              "Configuracion": "Ver La Configuracion",
              "Usuarios": "Ver los usuarios",
              "Roles": "Ver los roles",
              "Compras": "Ver Las Compras",
              "Productos": "Ver Los productos",
              "Categoria": "Ver Las categorias",
              "Proveedores": "Ver los proveedores",
              "Ventas": "Ver Las ventas",
              "Clientes": "Ver los clientes",

              
            }).map(([label, permisoKey]) => (
              <ListGroup.Item key={permisoKey}>
                <Form.Check
                  type="checkbox"
                  id={`permiso-${permisoKey}`}
                  label={label}
                  checked={rol.permisos[permisoKey]}
                  onChange={() => handlePermisoChange(permisoKey)}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>

      <div className="rol-form-actions">
        <Button variant="danger" className="rol-form-btn cancel" onClick={handleCancelar}>
          Cancelar
        </Button>
        <Button variant="success" className="rol-form-btn save" onClick={handleGuardar}>
          Guardar Cambios
        </Button>
      </div>
    </div>
  );
}

export default EditarRol;

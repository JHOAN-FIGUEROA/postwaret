import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Card, ListGroup } from "react-bootstrap";
import Swal from "sweetalert2";
import Sidebar from "./../Sidebar";

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
              <Form.Label>
                <strong>Nombre</strong>
              </Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={rol.nombre}
                onChange={handleChange}
                className="mb-2"
              />
              <Form.Label>
                <strong>Descripción Del Rol</strong>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                value={rol.descripcion}
                onChange={handleChange}
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
              "Entrar Al Sistema": "entrarSistema",
              "Cambiar estado de usuario": "cambiarEstadoUsuario",
              "Ver Permisos Asociados": "verPermisosAsociados",
              "Salir del sistema": "salirSistema",
              "Acceder a Configuración": "accederConfiguracion",
              "Asociar Permisos Al Rol": "asociarPermisos",
              "Eliminar usuario": "eliminarUsuario",
              "Crear Rol": "crearRol",
              "Entrar Al modulo de Compras": "entrarCompras",
              "Editar usuario": "editarUsuario",
              "Editar Rol": "editarRol",
              "Ver Compras Enlistadas": "verCompras",
              "Agregar usuario": "agregarUsuario",
              "Anular Rol": "anularRol",
              "Agregar Compra": "agregarCompra",
              "Descargar pdf": "descargarPDF",
              "Eliminar Rol": "eliminarRol",
              "Ver Detalle De Compra": "verDetalleCompra",
              "Anular usuario": "anularUsuario",
              "Ver Detalle De Rol": "verDetalleRol",
              "Anular Compra": "anularCompra",
              "Buscar usuario": "buscarUsuario",
              "Ver Roles Enlistados": "verRoles",
              "Cambiar Estado De Compra": "cambiarEstadoCompra",
              "Ver detalle de usuario": "verDetalleUsuario",
              "Cambiar Estado De rol": "cambiarEstadoRol",
              "Buscar Compra": "buscarCompra",
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

      <div className="d-flex justify-content-end mt-4">
        <Button variant="primary" onClick={handleGuardar} className="me-2">
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

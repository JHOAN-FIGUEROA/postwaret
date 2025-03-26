import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";
import Sidebar from "./../Sidebar";

function PermisosAsociados() {
  const navigate = useNavigate();

  // Estado para los permisos seleccionados
  const [permisos, setPermisos] = useState({
    sistema: {
      entrar: false,
      editar: false,
    },
    usuarios: {
      eliminar: false,
      editar: false,
      agregar: false,
      descargarPdf: false,
      anular: false,
      buscar: false,
      verDetalle: false,
      cambiarEstado: false,
    },
    configuracion: {
      acceder: false,
      crearRol: false,
      editarRol: false,
      anularRol: false,
      eliminarRol: false,
      verDetalleRol: false,
      verRoles: false,
      cambiarEstadoRol: false,
    },
    permisos: {
      verAsociados: false,
      escolar: false,
    },
    compras: {
      entrar: false,
      verLista: false,
      agregar: false,
      verDetalle: false,
      anular: false,
      cambiarEstado: false,
      buscar: false,
    }
  });

  // Función para manejar cambios en los checkboxes
  const handleCheckboxChange = (categoria, permiso) => {
    setPermisos(prev => ({
      ...prev,
      [categoria]: {
        ...prev[categoria],
        [permiso]: !prev[categoria][permiso]
      }
    }));
  };

  // Función para guardar los permisos y redirigir
  const handleGuardarPermisos = () => {
    alert("Permisos guardados exitosamente");
    navigate("/roles"); // Redirige a la página de roles
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
        { name: "Permisos", path: "/permisos" },
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
      <h2>Permisos</h2>
      <Sidebar modules={modules} />
      
      <Card>
        <Card.Body>
          <Card.Title>Permisos Asociados</Card.Title>
          
          <div className="mb-4">
            <h5>Sistema</h5>
            <Form.Check
              type="checkbox"
              label="Entrar Al Sistema"
              checked={permisos.sistema.entrar}
              onChange={() => handleCheckboxChange('sistema', 'entrar')}
            />
            <Form.Check
              type="checkbox"
              label="Editar al sistema"
              checked={permisos.sistema.editar}
              onChange={() => handleCheckboxChange('sistema', 'editar')}
            />
          </div>

          <div className="mb-4">
            <h5>Usuarios</h5>
            <Form.Check
              type="checkbox"
              label="Eliminar usuario"
              checked={permisos.usuarios.eliminar}
              onChange={() => handleCheckboxChange('usuarios', 'eliminar')}
            />
            <Form.Check
              type="checkbox"
              label="Editar usuario"
              checked={permisos.usuarios.editar}
              onChange={() => handleCheckboxChange('usuarios', 'editar')}
            />
            <Form.Check
              type="checkbox"
              label="Agregar usuario"
              checked={permisos.usuarios.agregar}
              onChange={() => handleCheckboxChange('usuarios', 'agregar')}
            />
            <Form.Check
              type="checkbox"
              label="Descargar PDF"
              checked={permisos.usuarios.descargarPdf}
              onChange={() => handleCheckboxChange('usuarios', 'descargarPdf')}
            />
            <Form.Check
              type="checkbox"
              label="Anular usuario"
              checked={permisos.usuarios.anular}
              onChange={() => handleCheckboxChange('usuarios', 'anular')}
            />
            <Form.Check
              type="checkbox"
              label="Buscar usuario"
              checked={permisos.usuarios.buscar}
              onChange={() => handleCheckboxChange('usuarios', 'buscar')}
            />
            <Form.Check
              type="checkbox"
              label="Ver detalle de usuario"
              checked={permisos.usuarios.verDetalle}
              onChange={() => handleCheckboxChange('usuarios', 'verDetalle')}
            />
            <Form.Check
              type="checkbox"
              label="Cambiar estado de usuario"
              checked={permisos.usuarios.cambiarEstado}
              onChange={() => handleCheckboxChange('usuarios', 'cambiarEstado')}
            />
          </div>

          <div className="mb-4">
            <h5>Configuración</h5>
            <Form.Check
              type="checkbox"
              label="Acceder a Configuración"
              checked={permisos.configuracion.acceder}
              onChange={() => handleCheckboxChange('configuracion', 'acceder')}
            />
            <Form.Check
              type="checkbox"
              label="Crear Rol"
              checked={permisos.configuracion.crearRol}
              onChange={() => handleCheckboxChange('configuracion', 'crearRol')}
            />
            <Form.Check
              type="checkbox"
              label="Editar Rol"
              checked={permisos.configuracion.editarRol}
              onChange={() => handleCheckboxChange('configuracion', 'editarRol')}
            />
            <Form.Check
              type="checkbox"
              label="Anular Rol"
              checked={permisos.configuracion.anularRol}
              onChange={() => handleCheckboxChange('configuracion', 'anularRol')}
            />
            <Form.Check
              type="checkbox"
              label="Eliminar Rol"
              checked={permisos.configuracion.eliminarRol}
              onChange={() => handleCheckboxChange('configuracion', 'eliminarRol')}
            />
            <Form.Check
              type="checkbox"
              label="Ver Detalle De Rol"
              checked={permisos.configuracion.verDetalleRol}
              onChange={() => handleCheckboxChange('configuracion', 'verDetalleRol')}
            />
            <Form.Check
              type="checkbox"
              label="Ver Roles Enlistados"
              checked={permisos.configuracion.verRoles}
              onChange={() => handleCheckboxChange('configuracion', 'verRoles')}
            />
            <Form.Check
              type="checkbox"
              label="Cambiar Estado De rol"
              checked={permisos.configuracion.cambiarEstadoRol}
              onChange={() => handleCheckboxChange('configuracion', 'cambiarEstadoRol')}
            />
          </div>

          <div className="mb-4">
            <h5>Permisos</h5>
            <Form.Check
              type="checkbox"
              label="Ver Permisos Asociados"
              checked={permisos.permisos.verAsociados}
              onChange={() => handleCheckboxChange('permisos', 'verAsociados')}
            />
            <Form.Check
              type="checkbox"
              label="Escolar Permisos Al Rol"
              checked={permisos.permisos.escolar}
              onChange={() => handleCheckboxChange('permisos', 'escolar')}
            />
          </div>

          <div className="mb-4">
            <h5>Compras</h5>
            <Form.Check
              type="checkbox"
              label="Entrar Al módulo de Compras"
              checked={permisos.compras.entrar}
              onChange={() => handleCheckboxChange('compras', 'entrar')}
            />
            <Form.Check
              type="checkbox"
              label="Ver Compras Enlistadas"
              checked={permisos.compras.verLista}
              onChange={() => handleCheckboxChange('compras', 'verLista')}
            />
            <Form.Check
              type="checkbox"
              label="Agregar Compras"
              checked={permisos.compras.agregar}
              onChange={() => handleCheckboxChange('compras', 'agregar')}
            />
            <Form.Check
              type="checkbox"
              label="Ver Detalle De Compras"
              checked={permisos.compras.verDetalle}
              onChange={() => handleCheckboxChange('compras', 'verDetalle')}
            />
            <Form.Check
              type="checkbox"
              label="Anular Compras"
              checked={permisos.compras.anular}
              onChange={() => handleCheckboxChange('compras', 'anular')}
            />
            <Form.Check
              type="checkbox"
              label="Cambiar Estado De Compras"
              checked={permisos.compras.cambiarEstado}
              onChange={() => handleCheckboxChange('compras', 'cambiarEstado')}
            />
            <Form.Check
              type="checkbox"
              label="Buscar Compras"
              checked={permisos.compras.buscar}
              onChange={() => handleCheckboxChange('compras', 'buscar')}
            />
          </div>

          <div className="text-end mt-4">
            <Button variant="primary" onClick={handleGuardarPermisos}>
              Guardar Permisos
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default PermisosAsociados;
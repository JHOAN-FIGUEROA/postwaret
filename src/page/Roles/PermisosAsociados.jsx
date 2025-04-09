import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import Sidebar from "./../Sidebar";
import "./rol.css"; 

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

  // Función para mostrar alertas SweetAlert2
  const showAlert = (icon, title, text = "") => {
    Swal.fire({
      icon,
      title,
      text,
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };

  // Función para guardar los permisos y redirigir
  const handleGuardarPermisos = () => {
    showAlert("success", "Permisos guardados exitosamente", "Los cambios se han guardado.");
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
      <Sidebar modules={modules} />
      
      <Card className="permisos-card">
        <Card.Body className="permisos-card-body">
          <Card.Title className="permisos-card-title">Permisos Asociados</Card.Title>
          
          <div className="permisos-checkbox-group">
            <h5>Postware</h5>
            <Form.Check
              className="permisos-form-check"
              type="checkbox"
              label="Dashboard"
              checked={permisos.sistema.entrar}
              onChange={() => handleCheckboxChange('sistema', 'entrar')}
            />
            <Form.Check
              className="permisos-form-check"
              type="checkbox"
              label="Configuracion"
              checked={permisos.sistema.entrar}
              onChange={() => handleCheckboxChange('sistema', 'entrar')}
            />
            <Form.Check
              className="permisos-form-check"
              type="checkbox"
              label="Roles"
              checked={permisos.sistema.entrar}
              onChange={() => handleCheckboxChange('sistema', 'entrar')}
            />
            <Form.Check
              className="permisos-form-check"
              type="checkbox"
              label="Usuarios"
              checked={permisos.sistema.entrar}
              onChange={() => handleCheckboxChange('sistema', 'entrar')}
            />
            <Form.Check
              className="permisos-form-check"
              type="checkbox"
              label="Compras"
              checked={permisos.sistema.entrar}
              onChange={() => handleCheckboxChange('sistema', 'entrar')}
            />
            <Form.Check
              className="permisos-form-check"
              type="checkbox"
              label="Proveedores"
              checked={permisos.sistema.entrar}
              onChange={() => handleCheckboxChange('sistema', 'entrar')}
            />
            <Form.Check
              className="permisos-form-check"
              type="checkbox"
              label="Productos"
              checked={permisos.sistema.entrar}
              onChange={() => handleCheckboxChange('sistema', 'entrar')}
            />
            <Form.Check
              className="permisos-form-check"
              type="checkbox"
              label="Categoria"
              checked={permisos.sistema.entrar}
              onChange={() => handleCheckboxChange('sistema', 'entrar')}
            />
            <Form.Check
              className="permisos-form-check"
              type="checkbox"
              label="Ventas"
              checked={permisos.sistema.entrar}
              onChange={() => handleCheckboxChange('sistema', 'entrar')}
            />
            <Form.Check
              className="permisos-form-check"
              type="checkbox"
              label="Clientes"
              checked={permisos.sistema.entrar}
              onChange={() => handleCheckboxChange('sistema', 'entrar')}
            />
          </div>

          <div className="permisos-actions">
            <Button 
              className="permisos-save-btn" 
              onClick={handleGuardarPermisos}
            >
              Guardar Permisos
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default PermisosAsociados;
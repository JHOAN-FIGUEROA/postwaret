import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";
import Sidebar from "./../Sidebar";
import Swal from 'sweetalert2';
import './proveedor.css';

const departamentosColombia = [
  "Amazonas", "Antioquia", "Arauca", "Atlántico", "Bolívar", 
  "Boyacá", "Caldas", "Caquetá", "Casanare", "Cauca", 
  "Cesar", "Chocó", "Córdoba", "Cundinamarca", "Guainía", 
  "Guaviare", "Huila", "La Guajira", "Magdalena", "Meta", 
  "Nariño", "Norte de Santander", "Putumayo", "Quindío", 
  "Risaralda", "San Andrés y Providencia", "Santander", "Sucre", 
  "Tolima", "Valle del Cauca", "Vaupés", "Vichada"
];

function EditarProveedor() {
  const navigate = useNavigate();

  // Estado para los datos del proveedor (ahora editable)
  const [proveedor, setProveedor] = useState({
    id: 1,
    nombre: "Proveedor A",
    apellido: "Apellido A",
    direccion: {
      tipoVia: "",
      numeroVia: "",
      letraVia: "",
      bis: false,
      cuadrante: "",
      numeroCasa: "",
      letraCasa: "",
      complemento: "",
      barrio: "",
      municipio: "",
      departamento: "",
    },
    email: "proveedora@example.com",
    numeroContacto: "123456789",
    descripcion: "Proveedor de productos electrónicos",
    tipoDocumento: "CC",
    documento: "123456789",
  });

  const [showDireccionModal, setShowDireccionModal] = useState(false);

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProveedor({ ...proveedor, [name]: value });
  };

  // Función para validar el formulario
  const validarFormulario = () => {
    if (!proveedor.nombre.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El nombre es requerido',
      });
      return false;
    }
    if (!proveedor.email.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El email es requerido',
      });
      return false;
    }
    return true;
  };

  // Función para manejar la edición del proveedor con SweetAlert2
  const handleEditar = () => {
    if (!validarFormulario()) return;

    Swal.fire({
      title: '¿Guardar cambios?',
      text: "¿Estás seguro de que deseas guardar los cambios en este proveedor?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '¡Guardado!',
          text: 'Los cambios han sido guardados exitosamente.',
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
        }).then(() => {
          navigate("/proveedores");
        });
      }
    });
  };

  // Función para cancelar la edición con confirmación
  const handleCancelar = () => {
    Swal.fire({
      title: '¿Cancelar cambios?',
      text: "¿Estás seguro de que deseas descartar los cambios realizados?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'Continuar editando'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/proveedores");
      }
    });
  };

  const handleGuardarDireccion = () => {
    const dir = proveedor.direccion;
    let direccionCompleta = `${dir.tipoVia} ${dir.numeroVia}${dir.letraVia}${dir.bis ? " Bis" : ""} ${dir.cuadrante ? dir.cuadrante : ""} # ${dir.numeroCasa}${dir.letraCasa}`;
    
    if (dir.complemento) direccionCompleta += `, ${dir.complemento}`;
    direccionCompleta += `, ${dir.barrio}, ${dir.municipio}, ${dir.departamento}`;

    setProveedor({
      ...proveedor,
      direccionCompleta: direccionCompleta.trim()
    });

    setShowDireccionModal(false);
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
    <div className="main-content with-sidebar">
      <Sidebar modules={modules} />
      <div className="proveedor-form-container">
        <h2 className="proveedor-form-title">Editar Proveedor</h2>
        <Form>
          <div className="user-form-layout">
            <div className="user-form-column">
              <div className="user-form-field">
                <Form.Label className="user-form-label required">Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={proveedor.nombre}
                  onChange={handleChange}
                  placeholder="Ingrese el nombre"
                  className="user-form-input"
                  required
                />
              </div>
              <div className="user-form-field">
                <Form.Label className="user-form-label required">Tipo de Documento</Form.Label>
                <Form.Select
                  name="tipoDocumento"
                  value={proveedor.tipoDocumento}
                  onChange={handleChange}
                  className="user-form-select"
                  required
                >
                  <option value="CC">Cédula de Ciudadanía</option>
                  <option value="CE">Cédula de Extranjería</option>
                  <option value="NIT">NIT</option>
                  <option value="RUT">RUT</option>
                </Form.Select>
              </div>
              <div className="user-form-field">
                <Form.Label className="user-form-label required">Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  name="numeroContacto"
                  value={proveedor.numeroContacto}
                  onChange={handleChange}
                  placeholder="Número de contacto"
                  className="user-form-input"
                  required
                />
              </div>
            </div>
            <div className="user-form-column">
              <div className="user-form-field">
                <Form.Label className="user-form-label required">Apellido</Form.Label>
                <Form.Control
                  type="text"
                  name="apellido"
                  value={proveedor.apellido}
                  onChange={handleChange}
                  placeholder="Ingrese el apellido"
                  className="user-form-input"
                  required
                />
              </div>
              <div className="user-form-field">
                <Form.Label className="user-form-label required">Documento</Form.Label>
                <Form.Control
                  type="text"
                  name="documento"
                  value={proveedor.documento}
                  onChange={handleChange}
                  placeholder="Número de documento"
                  className="user-form-input"
                  required
                />
              </div>
              <div className="user-form-field">
                <Form.Label className="user-form-label required">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={proveedor.email}
                  onChange={handleChange}
                  placeholder="correo@proveedor.com"
                  className="user-form-input"
                  required
                />
              </div>
            </div>
            <div className="user-form-fullwidth">
              <Form.Label className="user-form-label required">Dirección</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  value={proveedor.direccionCompleta}
                  readOnly
                  placeholder="Haz clic para agregar dirección"
                  className="user-form-input"
                  onClick={() => setShowDireccionModal(true)}
                  required
                />
                <Button 
                  variant="outline-secondary"
                  onClick={() => setShowDireccionModal(true)}
                  className="ms-2"
                >
                  <i className="bi bi-pencil-fill"></i>
                </Button>
              </div>
            </div>
            <div className="user-form-fullwidth">
              <div className="user-form-field">
                <Form.Label className="user-form-label required">Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="descripcion"
                  value={proveedor.descripcion}
                  onChange={handleChange}
                  placeholder="Ingrese una descripción del proveedor"
                  className="user-form-input"
                  required
                />
              </div>
            </div>
            <div className="user-form-actions">
              <Button variant="outline-danger" onClick={handleCancelar} className="user-form-btn">
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleEditar} className="user-form-btn">
                Guardar Cambios
              </Button>
            </div>
          </div>
        </Form>
      </div>
      <Modal show={showDireccionModal} onHide={() => setShowDireccionModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Agregar Dirección Completa</Modal.Title>
        </Modal.Header>
        <Modal.Body className="address-modal-content">
          <div className="address-form-row g-3 mb-3">
            <div className="address-form-col address-form-col-3">
              <Form.Label className="proveedor-form-label">Tipo de vía</Form.Label>
              <Form.Select
                name="direccion.tipoVia"
                value={proveedor.direccion.tipoVia}
                onChange={handleChange}
                className="proveedor-form-select"
              >
                <option value="Calle">Calle</option>
                <option value="Carrera">Carrera</option>
                <option value="Avenida">Avenida</option>
                <option value="Diagonal">Diagonal</option>
                <option value="Transversal">Transversal</option>
              </Form.Select>
            </div>
            <div className="address-form-col address-form-col-2">
              <Form.Label className="proveedor-form-label required">Número</Form.Label>
              <Form.Control
                type="text"
                name="direccion.numeroVia"
                value={proveedor.direccion.numeroVia}
                onChange={handleChange}
                placeholder="Ej: 12"
                className="proveedor-form-input"
                required
              />
            </div>
            <div className="address-form-col address-form-col-2">
              <Form.Label className="proveedor-form-label">Letra</Form.Label>
              <Form.Control
                type="text"
                name="direccion.letraVia"
                value={proveedor.direccion.letraVia}
                onChange={handleChange}
                placeholder="Ej: B"
                className="proveedor-form-input"
              />
            </div>
            <div className="address-form-col address-form-col-2">
              <Form.Label className="proveedor-form-label">Bis</Form.Label>
              <div className="proveedor-form-check">
                <Form.Check
                  type="checkbox"
                  name="direccion.bis"
                  checked={proveedor.direccion.bis}
                  onChange={handleChange}
                  className="proveedor-form-checkbox"
                  label=""
                />
              </div>
            </div>
            <div className="address-form-col address-form-col-3">
              <Form.Label className="proveedor-form-label">Cuadrante</Form.Label>
              <Form.Select
                name="direccion.cuadrante"
                value={proveedor.direccion.cuadrante}
                onChange={handleChange}
                className="proveedor-form-select"
              >
                <option value="">Ninguno</option>
                <option value="Sur">Sur</option>
                <option value="Este">Este</option>
                <option value="Norte">Norte</option>
                <option value="Oeste">Oeste</option>
              </Form.Select>
            </div>
          </div>
          <div className="address-form-row g-3 mb-3">
            <div className="address-form-col address-form-col-3">
              <Form.Label className="proveedor-form-label required">Número casa/apto</Form.Label>
              <Form.Control
                type="text"
                name="direccion.numeroCasa"
                value={proveedor.direccion.numeroCasa}
                onChange={handleChange}
                placeholder="Ej: 45-23"
                className="proveedor-form-input"
                required
              />
            </div>
            <div className="address-form-col address-form-col-3">
              <Form.Label className="proveedor-form-label">Letra casa/apto</Form.Label>
              <Form.Control
                type="text"
                name="direccion.letraCasa"
                value={proveedor.direccion.letraCasa}
                onChange={handleChange}
                placeholder="Ej: A"
                className="proveedor-form-input"
              />
            </div>
            <div className="address-form-col address-form-col-6">
              <Form.Label className="proveedor-form-label">Complemento</Form.Label>
              <Form.Control
                type="text"
                name="direccion.complemento"
                value={proveedor.direccion.complemento}
                onChange={handleChange}
                placeholder="Ej: Torre 2, Apto 301"
                className="proveedor-form-input"
              />
            </div>
          </div>
          <div className="address-form-row g-3">
            <div className="address-form-col address-form-col-4">
              <Form.Label className="proveedor-form-label required">Barrio</Form.Label>
              <Form.Control
                type="text"
                name="direccion.barrio"
                value={proveedor.direccion.barrio}
                onChange={handleChange}
                placeholder="Nombre del barrio"
                className="proveedor-form-input"
                required
              />
            </div>
            <div className="address-form-col address-form-col-4">
              <Form.Label className="proveedor-form-label required">Municipio</Form.Label>
              <Form.Control
                type="text"
                name="direccion.municipio"
                value={proveedor.direccion.municipio}
                onChange={handleChange}
                placeholder="Nombre del municipio"
                className="proveedor-form-input"
                required
              />
            </div>
            <div className="address-form-col address-form-col-4">
              <Form.Label className="proveedor-form-label required">Departamento</Form.Label>
              <Form.Select
                name="direccion.departamento"
                value={proveedor.direccion.departamento}
                onChange={handleChange}
                className="proveedor-form-select"
                required
              >
                <option value="">Seleccione...</option>
                {departamentosColombia.map(depto => (
                  <option key={depto} value={depto}>{depto}</option>
                ))}
              </Form.Select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDireccionModal(false)} className="proveedor-form-btn">
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleGuardarDireccion} className="proveedor-form-btn">
            Guardar Dirección
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditarProveedor;
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import Sidebar from "./../Sidebar";
import "./agregarusuario.css";

function EditarUsuario() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDireccionModal, setShowDireccionModal] = useState(false);

  // Obtener los datos del usuario desde el estado de navegación
  const usuarioInicial = location.state?.usuario || {
    id: 1,
    nombre: "Juan",
    apellido: "Pérez",
    tipoDocumento: "CC",
    documentoIdentidad: "12345678",
    telefono: "987654321",
    email: "juan.perez@example.com",
    password: "password123",
    rol: "Admin",
    direccionCompleta: "",
    direccion: {
      tipoVia: "Calle",
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
    }
  };

  // Estado para almacenar los datos del usuario
  const [usuario, setUsuario] = useState(usuarioInicial);

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith("direccion.")) {
      const dirField = name.split(".")[1];
      setUsuario({
        ...usuario,
        direccion: {
          ...usuario.direccion,
          [dirField]: type === "checkbox" ? checked : value
        }
      });
    } else {
      setUsuario({ ...usuario, [name]: value });
    }
  };

  const handleGuardarDireccion = () => {
    const dir = usuario.direccion;
    let direccionCompleta = `${dir.tipoVia} ${dir.numeroVia}${dir.letraVia}${dir.bis ? " Bis" : ""} ${dir.cuadrante ? dir.cuadrante : ""} # ${dir.numeroCasa}${dir.letraCasa}`;
    
    if (dir.complemento) direccionCompleta += `, ${dir.complemento}`;
    direccionCompleta += `, ${dir.barrio}, ${dir.municipio}, ${dir.departamento}`;

    setUsuario({
      ...usuario,
      direccionCompleta: direccionCompleta.trim()
    });

    setShowDireccionModal(false);
  };

  const validarFormulario = () => {
    const {
      nombre,
      apellido,
      tipoDocumento,
      documentoIdentidad,
      telefono,
      email,
      password,
      rol,
      direccionCompleta,
      direccion
    } = usuario;

    if (
      !nombre.trim() ||
      !apellido.trim() ||
      !tipoDocumento.trim() ||
      !documentoIdentidad.trim() ||
      !telefono.trim() ||
      !email.trim() ||
      !password.trim() ||
      !rol.trim() ||
      !direccionCompleta.trim()
    ) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos requeridos",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Email inválido",
        text: "Por favor, ingresa un correo electrónico válido",
      });
      return false;
    }

    if (password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Contraseña muy corta",
        text: "La contraseña debe tener al menos 6 caracteres",
      });
      return false;
    }

    if (
      !direccion.numeroVia ||
      !direccion.numeroCasa ||
      !direccion.barrio ||
      !direccion.municipio ||
      !direccion.departamento
    ) {
      Swal.fire({
        icon: "error",
        title: "Dirección incompleta",
        text: "Por favor, completa los campos requeridos de la dirección",
      });
      return false;
    }
    
    return true;
  };

  // Función para manejar la edición del usuario con SweetAlert2
  const handleEditar = () => {
   if (!validarFormulario()) return;

    Swal.fire({
      icon: "success",
      title: "Usuario editado exitosamente",
      text: "Los cambios se han guardado",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    }).then(() => {
      navigate("/usuarios");
    });
  };

  // Función para cancelar la edición
  const handleCancelar = () => {
    navigate("/usuarios");
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

  const departamentosColombia = [
    "Amazonas", "Antioquia", "Arauca", "Atlántico", "Bolívar", 
    "Boyacá", "Caldas", "Caquetá", "Casanare", "Cauca", 
    "Cesar", "Chocó", "Córdoba", "Cundinamarca", "Guainía", 
    "Guaviare", "Huila", "La Guajira", "Magdalena", "Meta", 
    "Nariño", "Norte de Santander", "Putumayo", "Quindío", 
    "Risaralda", "San Andrés y Providencia", "Santander", "Sucre", 
    "Tolima", "Valle del Cauca", "Vaupés", "Vichada"
  ];

  return (
    <div className="main-content with-sidebar">
      <Sidebar modules={modules} />
      <div className="user-form-container">
        <h2 className="user-form-title">Editar Usuario</h2>
        
        <Form>
          <div className="user-form-layout">
            {/* Primera columna */}
            <div className="user-form-column">
              <div className="user-form-field">
                <Form.Label className="user-form-label required">Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={usuario.nombre}
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
                  value={usuario.tipoDocumento}
                  onChange={handleChange}
                  className="user-form-select"
                  required
                >
                  <option value="CC">Cédula de Ciudadanía</option>
                  <option value="CE">Cédula de Extranjería</option>
                  <option value="TI">Tarjeta de Identidad</option>
                  <option value="PA">Pasaporte</option>
                </Form.Select>
              </div>
  
              <div className="user-form-field">
                <Form.Label className="user-form-label required">Teléfono</Form.Label>
                <Form.Control
                  type="tel"
                  name="telefono"
                  value={usuario.telefono}
                  onChange={handleChange}
                  placeholder="Ingrese el teléfono"
                  className="user-form-input"
                  required
                />
              </div>
  
              <div className="user-form-field">
                <Form.Label className="user-form-label required">Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={usuario.password}
                  onChange={handleChange}
                  placeholder="Dejar en blanco para no cambiar"
                  className="user-form-input"
                />
              </div>
            </div>
  
            {/* Segunda columna */}
            <div className="user-form-column">
              <div className="user-form-field">
                <Form.Label className="user-form-label required">Apellido</Form.Label>
                <Form.Control
                  type="text"
                  name="apellido"
                  value={usuario.apellido}
                  onChange={handleChange}
                  placeholder="Ingrese el apellido"
                  className="user-form-input"
                  required
                />
              </div>
  
              <div className="user-form-field">
                <Form.Label className="user-form-label required">Documento de Identidad</Form.Label>
                <Form.Control
                  type="text"
                  name="documentoIdentidad"
                  value={usuario.documentoIdentidad}
                  onChange={handleChange}
                  placeholder="Ingrese el documento"
                  className="user-form-input"
                  required
                />
              </div>
  
              <div className="user-form-field">
                <Form.Label className="user-form-label required">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={usuario.email}
                  onChange={handleChange}
                  placeholder="Ingrese el email"
                  className="user-form-input"
                  required
                />
              </div>
  
              <div className="user-form-field">
                <Form.Label className="user-form-label required">Rol</Form.Label>
                <Form.Select
                  name="rol"
                  value={usuario.rol}
                  onChange={handleChange}
                  className="user-form-select"
                  required
                >
                  <option value="Admin">Administrador</option>
                  <option value="Cajero">Cajero</option>
                   <option value="Almacenista">Almacenista</option>
                </Form.Select>
              </div>
            </div>
  
            {/* Campo de dirección que abre el modal */}
            <div className="user-form-fullwidth">
              <Form.Label className="user-form-label required">Dirección</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  value={usuario.direccionCompleta}
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
  
            {/* Botones */}
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

      {/* Modal para la dirección */}
      <Modal show={showDireccionModal} onHide={() => setShowDireccionModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Agregar Dirección Completa</Modal.Title>
        </Modal.Header>
        <Modal.Body className="address-modal-content">
          <div className="address-form-row g-3 mb-3">
            <div className="address-form-col address-form-col-3">
              <Form.Label className="user-form-label">Tipo de vía</Form.Label>
              <Form.Select
                name="direccion.tipoVia"
                value={usuario.direccion.tipoVia}
                onChange={handleChange}
                className="user-form-select"
              >
                <option value="Calle">Calle</option>
                <option value="Carrera">Carrera</option>
                <option value="Avenida">Avenida</option>
                <option value="Diagonal">Diagonal</option>
                <option value="Transversal">Transversal</option>
              </Form.Select>
            </div>
            
            <div className="address-form-col address-form-col-2">
              <Form.Label className="user-form-label required">Número</Form.Label>
              <Form.Control
                type="text"
                name="direccion.numeroVia"
                value={usuario.direccion.numeroVia}
                onChange={handleChange}
                placeholder="Ej: 12"
                className="user-form-input"
                required
              />
            </div>
            
            <div className="address-form-col address-form-col-2">
              <Form.Label className="user-form-label">Letra</Form.Label>
              <Form.Control
                type="text"
                name="direccion.letraVia"
                value={usuario.direccion.letraVia}
                onChange={handleChange}
                placeholder="Ej: B"
                className="user-form-input"
              />
            </div>
            
            <div className="address-form-col address-form-col-2">
              <Form.Label className="user-form-label">Bis</Form.Label>
              <div className="user-form-check">
                <Form.Check
                  type="checkbox"
                  name="direccion.bis"
                  checked={usuario.direccion.bis}
                  onChange={handleChange}
                  className="user-form-checkbox"
                  label=""
                />
              </div>
            </div>
            
            <div className="address-form-col address-form-col-3">
              <Form.Label className="user-form-label">Cuadrante</Form.Label>
              <Form.Select
                name="direccion.cuadrante"
                value={usuario.direccion.cuadrante}
                onChange={handleChange}
                className="user-form-select"
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
              <Form.Label className="user-form-label required">Número casa/apto</Form.Label>
              <Form.Control
                type="text"
                name="direccion.numeroCasa"
                value={usuario.direccion.numeroCasa}
                onChange={handleChange}
                placeholder="Ej: 45-23"
                className="user-form-input"
                required
              />
            </div>
            
            <div className="address-form-col address-form-col-3">
              <Form.Label className="user-form-label">Letra casa/apto</Form.Label>
              <Form.Control
                type="text"
                name="direccion.letraCasa"
                value={usuario.direccion.letraCasa}
                onChange={handleChange}
                placeholder="Ej: A"
                className="user-form-input"
              />
            </div>
            
            <div className="address-form-col address-form-col-6">
              <Form.Label className="user-form-label">Complemento</Form.Label>
              <Form.Control
                type="text"
                name="direccion.complemento"
                value={usuario.direccion.complemento}
                onChange={handleChange}
                placeholder="Ej: Torre 2, Apto 301"
                className="user-form-input"
              />
            </div>
          </div>
          
          <div className="address-form-row g-3">
            <div className="address-form-col address-form-col-4">
              <Form.Label className="user-form-label required">Barrio</Form.Label>
              <Form.Control
                type="text"
                name="direccion.barrio"
                value={usuario.direccion.barrio}
                onChange={handleChange}
                placeholder="Nombre del barrio"
                className="user-form-input"
                required
              />
            </div>
            
            <div className="address-form-col address-form-col-4">
              <Form.Label className="user-form-label required">Municipio</Form.Label>
              <Form.Control
                type="text"
                name="direccion.municipio"
                value={usuario.direccion.municipio}
                onChange={handleChange}
                placeholder="Nombre del municipio"
                className="user-form-input"
                required
              />
            </div>
            
            <div className="address-form-col address-form-col-4">
              <Form.Label className="user-form-label required">Departamento</Form.Label>
              <Form.Select
                name="direccion.departamento"
                value={usuario.direccion.departamento}
                onChange={handleChange}
                className="user-form-select"
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
          <Button variant="secondary" onClick={() => setShowDireccionModal(false)} className="user-form-btn">
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleGuardarDireccion} className="user-form-btn">
            Guardar Dirección
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditarUsuario;

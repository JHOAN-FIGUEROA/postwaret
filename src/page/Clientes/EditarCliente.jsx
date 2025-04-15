import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "./../Sidebar";
import './proveedor.css';
import { Form, Button, Modal } from "react-bootstrap";

const departamentosColombia = [
  "Amazonas", "Antioquia", "Arauca", "Atlántico", "Bolívar", 
  "Boyacá", "Caldas", "Caquetá", "Casanare", "Cauca", 
  "Cesar", "Chocó", "Córdoba", "Cundinamarca", "Guainía", 
  "Guaviare", "Huila", "La Guajira", "Magdalena", "Meta", 
  "Nariño", "Norte de Santander", "Putumayo", "Quindío", 
  "Risaralda", "San Andrés y Providencia", "Santander", "Sucre", 
  "Tolima", "Valle del Cauca", "Vaupés", "Vichada"
];

function EditarCliente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState({
    nombre: "",
    tipoDocumento: "CC",
    documento: "",
    apellido: "",
    email: "",
    numeroContacto: "",
    descripcion: "",
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
  });
  const [showDireccionModal, setShowDireccionModal] = useState(false);

  useEffect(() => {
    // Simulación de carga de datos (Reemplazar con una petición real)
    const clienteEjemplo = {
      documentoIdentidad: "12345678",
      nombre: "Juan",
      apellido: "Pérez",
      direccion: "Calle Falsa 123",
      email: "juan.perez@example.com",
      numeroContacto: "987654321",
      estado: true,
    };
    setCliente(clienteEjemplo);
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCliente({
      ...cliente,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleGuardar = () => {
    // Validación simple para asegurarse de que todos los campos están completos
    if (
      !cliente.documentoIdentidad ||
      !cliente.nombre ||
      !cliente.apellido ||
      !cliente.direccion ||
      !cliente.email ||
      !cliente.numeroContacto
    ) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos antes de guardar.",
      });
      return;
    }

    Swal.fire({
      title: "¿Guardar cambios?",
      text: `Se editará el cliente con ID ${id}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0d6efd",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Sí, guardar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Cliente editado:", cliente);

        Swal.fire({
          icon: "success",
          title: "Cliente editado",
          text: "Los cambios se han guardado exitosamente.",
          timer: 2000,
          showConfirmButton: false,
        });

        setTimeout(() => {
          navigate("/clientes");
        }, 2000);
      }
    });
  };

  const handleGuardarDireccion = () => {
    const dir = cliente.direccion;
    let direccionCompleta = `${dir.tipoVia} ${dir.numeroVia}${dir.letraVia}${dir.bis ? " Bis" : ""} ${dir.cuadrante ? dir.cuadrante : ""} # ${dir.numeroCasa}${dir.letraCasa}`;
    
    if (dir.complemento) direccionCompleta += `, ${dir.complemento}`;
    direccionCompleta += `, ${dir.barrio}, ${dir.municipio}, ${dir.departamento}`;

    setCliente({
      ...cliente,
      direccionCompleta: direccionCompleta.trim()
    });

    setShowDireccionModal(false);
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
      <Sidebar modules={modules} />
      <div className="proveedor-form-container">
        <h2 className="proveedor-form-title">Editar Cliente</h2>
        <Form>
          <div className="user-form-layout">
            <div className="user-form-column">
              <div className="user-form-field">
                <Form.Label className="user-form-label required">Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={cliente.nombre}
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
                  value={cliente.tipoDocumento}
                  onChange={handleChange}
                  className="user-form-select"
                  required
                >
                  <option value="CC">Cédula de Ciudadanía</option>
                  <option value="CE">Cédula de Extranjería</option>
                  <option value="TI">Tarjeta De Identidad</option>
                </Form.Select>
              </div>
              <div className="user-form-field">
                <Form.Label className="user-form-label required">Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  name="numeroContacto"
                  value={cliente.numeroContacto}
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
                  value={cliente.apellido}
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
                  value={cliente.documento}
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
                  value={cliente.email}
                  onChange={handleChange}
                  placeholder="correo@cliente.com"
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
                  value={cliente.direccionCompleta}
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
                  value={cliente.descripcion}
                  onChange={handleChange}
                  placeholder="Ingrese una descripción del cliente"
                  className="user-form-input"
                  required
                />
              </div>
            </div>
            <div className="user-form-actions">
              <Button variant="outline-danger" onClick={() => navigate('/clientes')} className="user-form-btn">
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleGuardar} className="user-form-btn">
                Guardar Cambios
              </Button>
            </div>
          </div>
        </Form>
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
                  value={cliente.direccion.tipoVia}
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
                  value={cliente.direccion.numeroVia}
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
                  value={cliente.direccion.letraVia}
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
                    checked={cliente.direccion.bis}
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
                  value={cliente.direccion.cuadrante}
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
                  value={cliente.direccion.numeroCasa}
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
                  value={cliente.direccion.letraCasa}
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
                  value={cliente.direccion.complemento}
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
                  value={cliente.direccion.barrio}
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
                  value={cliente.direccion.municipio}
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
                  value={cliente.direccion.departamento}
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
    </div>
  );
}

export default EditarCliente;

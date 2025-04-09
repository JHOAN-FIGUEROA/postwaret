import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, InputGroup, Table, Modal } from "react-bootstrap";
import Sidebar from "./../Sidebar";
import Swal from 'sweetalert2';

function AgregarCompra() {
  const navigate = useNavigate();

  const [compra, setCompra] = useState({
    numeroCompra: "",
    fechaCompra: "",
    proveedor: "",
    productos: [],
    subtotal: 0,
    total: 0,
  });

  // Estados para el modal de productos
  const [showModal, setShowModal] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [productosCategoria, setProductosCategoria] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    codigoBarras: "",
    cantidad: 1,
    precioUnitario: 0,
  });
  
  // Estado para el escáner de código de barras
  const [codigoBarrasEscaneado, setCodigoBarrasEscaneado] = useState("");
  const [escaneando, setEscaneando] = useState(false);

  // Datos ficticios para el prototipo
  const categorias = ["Lácteos", "Panadería", "Carnes", "Bebidas", "Abarrotes"];
  const productosDisponibles = {
    "Lácteos": [
      { nombre: "Leche Entera 1L", codigoBarras: "1001", precioUnitario: 4500 },
      { nombre: "Yogurt Natural 500g", codigoBarras: "1002", precioUnitario: 9000 },
      { nombre: "Queso Fresco 250g", codigoBarras: "1003", precioUnitario: 12000 },
    ],
    "Panadería": [
      { nombre: "Pan Blanco 500g", codigoBarras: "2001", precioUnitario: 6500 },
      { nombre: "Croissants 6 unidades", codigoBarras: "2002", precioUnitario: 11000 },
      { nombre: "Galletas Chocolate 200g", codigoBarras: "2003", precioUnitario: 7800 },
    ],
    "Carnes": [
      { nombre: "Pechuga de Pollo 1kg", codigoBarras: "3001", precioUnitario: 22000 },
      { nombre: "Carne Molida 500g", codigoBarras: "3002", precioUnitario: 16500 },
      { nombre: "Jamón Cocido 200g", codigoBarras: "3003", precioUnitario: 9800 },
    ],
    "Bebidas": [
      { nombre: "Refresco Cola 2L", codigoBarras: "4001", precioUnitario: 7200 },
      { nombre: "Agua Mineral 1.5L", codigoBarras: "4002", precioUnitario: 3500 },
      { nombre: "Jugo de Naranja 1L", codigoBarras: "4003", precioUnitario: 8200 },
    ],
    "Abarrotes": [
      { nombre: "Arroz Blanco 1kg", codigoBarras: "5001", precioUnitario: 5500 },
      { nombre: "Pasta Espagueti 500g", codigoBarras: "5002", precioUnitario: 4300 },
      { nombre: "Aceite de Oliva 500ml", codigoBarras: "5003", precioUnitario: 18000 },
    ],
  };

  const proveedores = ["Proveedor A", "Proveedor B", "Proveedor C"];

  // Función para manejar el botón cancelar
  const handleCancelar = () => {
    navigate("/compras");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompra({ ...compra, [name]: value });
  };

  const validarFormulario = () => {
    if (!compra.numeroCompra.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El número de compra es requerido',
      });
      return false;
    }
    if (!compra.fechaCompra) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La fecha de compra es requerida',
      });
      return false;
    }
    if (!compra.proveedor) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe seleccionar un proveedor',
      });
      return false;
    }
    if (compra.productos.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe agregar al menos un producto',
      });
      return false;
    }
    return true;
  };

  const handleAgregarProductos = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCategoriaSeleccionada("");
    setProductosCategoria([]);
    setNuevoProducto({
      nombre: "",
      codigoBarras: "",
      cantidad: 1,
      precioUnitario: 0,
    });
    setCodigoBarrasEscaneado("");
    setEscaneando(false);
  };

  const handleCategoriaChange = (e) => {
    const categoria = e.target.value;
    setCategoriaSeleccionada(categoria);
    if (categoria) {
      setProductosCategoria(productosDisponibles[categoria] || []);
    } else {
      setProductosCategoria([]);
    }
    setCodigoBarrasEscaneado("");
  };

  const handleSeleccionarProducto = (producto) => {
    setNuevoProducto({
      nombre: producto.nombre,
      codigoBarras: producto.codigoBarras,
      cantidad: 1,
      precioUnitario: producto.precioUnitario,
    });
  };

  const handleCantidadChange = (e) => {
    const cantidad = parseInt(e.target.value, 10) || 1;
    setNuevoProducto({ ...nuevoProducto, cantidad });
  };

  const handleCodigoBarrasChange = (e) => {
    setCodigoBarrasEscaneado(e.target.value);
  };

  const handleEscanear = () => {
    if (!categoriaSeleccionada) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe seleccionar una categoría primero',
      });
      return;
    }

    setEscaneando(true);
    
    setTimeout(() => {
      const productosArray = productosDisponibles[categoriaSeleccionada];
      const productoAleatorio = productosArray[Math.floor(Math.random() * productosArray.length)];
      
      setCodigoBarrasEscaneado(productoAleatorio.codigoBarras);
      handleSeleccionarProducto(productoAleatorio);
      
      setEscaneando(false);
      
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Código de barras escaneado correctamente',
        text: `Producto: ${productoAleatorio.nombre}`,
        showConfirmButton: false,
        timer: 1500
      });
    }, 1000);
  };

  const buscarProductoPorCodigoBarras = () => {
    if (!categoriaSeleccionada) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe seleccionar una categoría primero',
      });
      return;
    }

    if (!codigoBarrasEscaneado) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ingrese un código de barras para buscar',
      });
      return;
    }

    const productoEncontrado = productosDisponibles[categoriaSeleccionada].find(
      (p) => p.codigoBarras === codigoBarrasEscaneado
    );

    if (productoEncontrado) {
      handleSeleccionarProducto(productoEncontrado);
      
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Producto encontrado',
        text: `Producto: ${productoEncontrado.nombre}`,
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `No se encontró ningún producto con ese código de barras en la categoría ${categoriaSeleccionada}`,
      });
    }
  };

  const handleAgregarProducto = () => {
    const precioUnitario = parseFloat(nuevoProducto.precioUnitario);
    const cantidad = parseInt(nuevoProducto.cantidad, 10);

    if (isNaN(precioUnitario)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El precio unitario debe ser un número válido.',
      });
      return;
    }
    if (isNaN(cantidad)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La cantidad debe ser un número válido.',
      });
      return;
    }

    const subtotal = cantidad * precioUnitario;
    const iva = subtotal * 0.19;
    const total = subtotal + iva;

    const producto = {
      ...nuevoProducto,
      precioUnitario,
      cantidad,
      subtotal,
      iva,
      total,
    };

    const nuevosProductos = [...compra.productos, producto];
    const nuevoSubtotal = nuevosProductos.reduce((acc, p) => acc + p.subtotal, 0);
    const nuevoTotal = nuevosProductos.reduce((acc, p) => acc + p.total, 0);

    setCompra({
      ...compra,
      productos: nuevosProductos,
      subtotal: nuevoSubtotal,
      total: nuevoTotal,
    });

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Producto agregado',
      showConfirmButton: false,
      timer: 1000
    });

    setNuevoProducto({
      nombre: "",
      codigoBarras: "",
      cantidad: 1,
      precioUnitario: 0,
    });
    setCodigoBarrasEscaneado("");
  };

  const handleEliminarProducto = (index) => {
    const nuevosProductos = compra.productos.filter((_, i) => i !== index);
    const nuevoSubtotal = nuevosProductos.reduce((acc, p) => acc + p.subtotal, 0);
    const nuevoTotal = nuevosProductos.reduce((acc, p) => acc + p.total, 0);

    setCompra({
      ...compra,
      productos: nuevosProductos,
      subtotal: nuevoSubtotal,
      total: nuevoTotal,
    });
  };

  const handleGuardarCompra = () => {
    if (validarFormulario()) {
      Swal.fire({
        title: '¿Guardar compra?',
        text: "¿Estás seguro de que deseas guardar esta compra?",
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
            text: 'La compra ha sido guardada exitosamente',
            icon: 'success',
            timer: 2000,
            timerProgressBar: true,
          }).then(() => {
            navigate("/compras");
          });
        }
      });
    }
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

  // Estilos CSS actualizados para incluir los campos obligatorios
  const styles = `
    .barcode-scanner-section {
      background-color: #ffffff;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 20px;
      border: 1px solid #e0e0e0;
    }
    .barcode-scanner-section h5 {
      color: #333;
      margin-bottom: 15px;
      font-weight: 600;
      border-left: 4px solid #007bff;
      padding-left: 10px;
    }
    .spinner-border {
      width: 1rem;
      height: 1rem;
    }
    .table-primary {
      background-color: #cfe2ff !important;
    }
    .agregar-cliente-form {
      padding: 20px;
    }
    .totales-compra {
      margin-top: 20px;
    }
    .productos-modal .modal-content {
      border-radius: 10px;
    }
    .producto-seleccionado {
      background-color: #f8f9fa;
      padding: 15px;
      border-radius: 8px;
      margin-top: 15px;
    }
    .required-field::after {
      content: " *";
      color: red;
    }
    .botones-container {
      margin-right: 100px;
    }
    .agregar-productos-container {
      margin-top: 10px;
    }
    .agregar-productos-btn {
      background-color: #007bff;
      color: #fff;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
    }
    .agregar-productos-btn:hover {
      background-color: #0056b3;
    }
  `;

  return (
    <div className="agregar-cliente-form" style={{ marginLeft: '250px', width: 'calc(100% - 280px)', padding: '20px' }}>
      <style>{styles}</style>
      <h2>Crear Nueva Compra</h2>
      <Sidebar modules={modules} />
      <Form>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="numeroCompra">
              <Form.Label className="required-field">N° de Compra</Form.Label>
              <Form.Control
                type="text"
                name="numeroCompra"
                value={compra.numeroCompra}
                onChange={handleChange}
                placeholder="Ingrese el número de compra"
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="fechaCompra">
              <Form.Label className="required-field">Fecha de Compra</Form.Label>
              <Form.Control
                type="date"
                name="fechaCompra"
                value={compra.fechaCompra}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
          </Col>
          
          <Col md={4}>
          
            <Form.Group controlId="proveedor">
              <Form.Label className="required-field">Proveedor</Form.Label>
              <Form.Select
                name="proveedor"
                value={compra.proveedor}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un proveedor</option>
                {proveedores.map((proveedor, index) => (
                  <option key={index} value={proveedor}>
                    {proveedor}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          </Row>
          <Row className="mt-3"> {/* Nueva fila con margen superior */}

          <div className="agregar-productos-container">
            <Button 
              className="agregar-productos-btn" 
              onClick={handleAgregarProductos}
            >
              Agregar Productos
            </Button>
          </div>
        </Row>

        {compra.productos.length > 0 && (
          <div className="table-responsive">
            <Table striped bordered hover className="mb-3">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Código de Barras</th>
                  <th>Cantidad</th>
                  <th>Precio Unitario</th>
                  <th>Subtotal</th>
                  <th>IVA (19%)</th>
                  <th>Total</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {compra.productos.map((producto, index) => (
                  <tr key={index}>
                    <td>{producto.nombre}</td>
                    <td>{producto.codigoBarras || 'N/A'}</td>
                    <td>{producto.cantidad}</td>
                    <td>${producto.precioUnitario.toLocaleString('es-CO')}</td>
                    <td>${producto.subtotal.toLocaleString('es-CO')}</td>
                    <td>${producto.iva.toLocaleString('es-CO')}</td>
                    <td>${producto.total.toLocaleString('es-CO')}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleEliminarProducto(index)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}

        <Row className="mb-3 totales-compra">
          <Col md={8}>
            <Row>
              <Col md={6}>
                <InputGroup>
                  <InputGroup.Text>Subtotal</InputGroup.Text>
                  <Form.Control
                    type="text"
                    value={`$${compra.subtotal.toLocaleString('es-CO')}`}
                    readOnly
                  />
                </InputGroup>
              </Col>
              <Col md={6}>
                <InputGroup>
                  <InputGroup.Text>Total</InputGroup.Text>
                  <Form.Control
                    type="text"
                    value={`$${compra.total.toLocaleString('es-CO')}`}
                    readOnly
                  />
                </InputGroup>
              </Col>
            </Row>
          </Col>
          <Col md={4} className="text-end d-flex align-items-start justify-content-end">
            {/* Los botones se han eliminado de aquí */}
          </Col>
        </Row>
        
        {/* Botones movidos con margen derecho para desplazarlos 100px a la izquierda */}
        <Row className="mb-3">
          <Col className="text-end">
            <div className="botones-container" style={{ marginRight: '150px' }}>
              <Button variant="danger" onClick={handleCancelar} style={{ marginRight: '10px' }}>
                Cancelar
              </Button>
              <Button variant="success" onClick={handleGuardarCompra}>
                Guardar Compra
              </Button>
            </div>
          </Col>
        </Row>
      </Form>

      <Modal 
        show={showModal} 
        onHide={handleCloseModal} 
        size="lg" 
        backdrop="static"
        aria-labelledby="modal-productos"
        centered
        className="productos-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="modal-productos">Agregar Productos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="categoria">
                  <Form.Label className="required-field">Categoría</Form.Label>
                  <Form.Select
                    value={categoriaSeleccionada}
                    onChange={handleCategoriaChange}
                    required
                  >
                    <option value="">Seleccione una categoría</option>
                    {categorias.map((categoria, index) => (
                      <option key={index} value={categoria}>
                        {categoria}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            {categoriaSeleccionada && (
              <div className="barcode-scanner-section">
                <h5>Escanear código de barras</h5>
                <Row className="mb-3">
                  <Col md={8}>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese o escanee el código de barras"
                      value={codigoBarrasEscaneado}
                      onChange={handleCodigoBarrasChange}
                      disabled={escaneando}
                    />
                  </Col>
                  <Col md={4} className="d-flex">
                    <Button 
                      variant="primary" 
                      className="me-2 flex-grow-1"
                      onClick={buscarProductoPorCodigoBarras}
                      disabled={escaneando}
                    >
                      Buscar
                    </Button>
                    <Button 
                      variant="secondary" 
                      className="flex-grow-1"
                      onClick={handleEscanear}
                      disabled={escaneando}
                    >
                      {escaneando ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Escaneando...
                        </>
                      ) : (
                        'Escanear'
                      )}
                    </Button>
                  </Col>
                </Row>
              </div>
            )}

            {categoriaSeleccionada && (
              <>
                <h5>Productos de {categoriaSeleccionada}</h5>
                <div className="table-responsive">
                  <Table bordered hover className="mb-3">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Código de Barras</th>
                        <th>Precio Unitario</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productosCategoria.map((producto, index) => (
                        <tr key={index} className={producto.codigoBarras === codigoBarrasEscaneado ? "table-primary" : ""}>
                          <td>{producto.nombre}</td>
                          <td>{producto.codigoBarras}</td>
                          <td>${producto.precioUnitario.toLocaleString('es-CO')}</td>
                          <td>
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => handleSeleccionarProducto(producto)}
                            >
                              Seleccionar
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </>
            )}

            {nuevoProducto.nombre && (
              <Row className="mb-3 producto-seleccionado">
                <Col>
                  <h5>Producto Seleccionado: {nuevoProducto.nombre}</h5>
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="cantidad">
                        <Form.Label>Cantidad</Form.Label>
                        <Form.Control
                          type="number"
                          min="1"
                          value={nuevoProducto.cantidad}
                          onChange={handleCantidadChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="d-flex align-items-end">
                      <Button variant="success" onClick={handleAgregarProducto}>
                        Agregar a la Compra
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AgregarCompra;
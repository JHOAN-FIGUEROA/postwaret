import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, InputGroup, Table, Modal } from "react-bootstrap";
import Sidebar from "./../Sidebar";
import Swal from 'sweetalert2';
// Removed import for AgregarCompra.css since we've merged it with App.css

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

  // Datos ficticios para el prototipo - Categorías de supermercado con precios en pesos colombianos
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

  // Lista de proveedores
  const proveedores = ["Proveedor A", "Proveedor B", "Proveedor C"];

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompra({ ...compra, [name]: value });
  };

  // Función para validar el formulario
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

  // Función para mostrar el modal de agregar productos
  const handleAgregarProductos = () => {
    setShowModal(true);
  };

  // Función para cerrar el modal
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

  // Función que se ejecuta cuando se selecciona una categoría
  const handleCategoriaChange = (e) => {
    const categoria = e.target.value;
    setCategoriaSeleccionada(categoria);
    if (categoria) {
      setProductosCategoria(productosDisponibles[categoria] || []);
    } else {
      setProductosCategoria([]);
    }
    // Limpiar el código de barras escaneado cuando se cambia de categoría
    setCodigoBarrasEscaneado("");
  };

  // Función para seleccionar un producto de la lista
  const handleSeleccionarProducto = (producto) => {
    setNuevoProducto({
      nombre: producto.nombre,
      codigoBarras: producto.codigoBarras,
      cantidad: 1,
      precioUnitario: producto.precioUnitario,
    });
  };

  // Función para cambiar la cantidad del producto
  const handleCantidadChange = (e) => {
    const cantidad = parseInt(e.target.value, 10) || 1;
    setNuevoProducto({ ...nuevoProducto, cantidad });
  };

  // Función para manejar el cambio en el campo de código de barras
  const handleCodigoBarrasChange = (e) => {
    setCodigoBarrasEscaneado(e.target.value);
  };

  // Función para simular el escaneo de código de barras
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
    
    // Simulamos un proceso de escaneo que tarda 1 segundo
    setTimeout(() => {
      // Seleccionamos un producto aleatorio de la categoría seleccionada
      const productosArray = productosDisponibles[categoriaSeleccionada];
      const productoAleatorio = productosArray[Math.floor(Math.random() * productosArray.length)];
      
      // Actualizamos los estados
      setCodigoBarrasEscaneado(productoAleatorio.codigoBarras);
      
      // Seleccionamos el producto
      handleSeleccionarProducto(productoAleatorio);
      
      setEscaneando(false);
      
      // Mostramos un mensaje de éxito
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

  // Función para buscar un producto por código de barras
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

    // Buscamos el producto solo en la categoría seleccionada
    const productoEncontrado = productosDisponibles[categoriaSeleccionada].find(
      (p) => p.codigoBarras === codigoBarrasEscaneado
    );

    if (productoEncontrado) {
      // Seleccionamos el producto
      handleSeleccionarProducto(productoEncontrado);
      
      // Mostramos un mensaje de éxito
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

  // Función para agregar un producto a la compra
  const handleAgregarProducto = () => {
    // Convertir precioUnitario y cantidad a números
    const precioUnitario = parseFloat(nuevoProducto.precioUnitario);
    const cantidad = parseInt(nuevoProducto.cantidad, 10);

    // Validar que los valores sean números válidos
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

    // Calcular subtotal, IVA y total
    const subtotal = cantidad * precioUnitario;
    const iva = subtotal * 0.19;
    const total = subtotal + iva;

    // Crear el nuevo producto
    const producto = {
      ...nuevoProducto,
      precioUnitario,
      cantidad,
      subtotal,
      iva,
      total,
    };

    // Agregar el producto a la lista y actualizar totales
    const nuevosProductos = [...compra.productos, producto];
    const nuevoSubtotal = nuevosProductos.reduce((acc, p) => acc + p.subtotal, 0);
    const nuevoTotal = nuevosProductos.reduce((acc, p) => acc + p.total, 0);

    setCompra({
      ...compra,
      productos: nuevosProductos,
      subtotal: nuevoSubtotal,
      total: nuevoTotal,
    });

    // Mostrar mensaje de éxito
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Producto agregado',
      showConfirmButton: false,
      timer: 1000
    });

    // Reiniciar el estado del producto para poder agregar otro
    setNuevoProducto({
      nombre: "",
      codigoBarras: "",
      cantidad: 1,
      precioUnitario: 0,
    });
    setCodigoBarrasEscaneado("");
  };

  // Función para eliminar un producto
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

  // Función para guardar la compra con SweetAlert2
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

  return (
    <div className="agregar-cliente-form">
      <h2>Crear Nueva Compra</h2>
      <Sidebar modules={modules} />
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="numeroCompra">
              <Form.Label>N° de Compra</Form.Label>
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
          <Col>
            <Form.Group controlId="fechaCompra">
              <Form.Label>Fecha de Compra</Form.Label>
              <Form.Control
                type="date"
                name="fechaCompra"
                value={compra.fechaCompra}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="proveedor">
              <Form.Label>Proveedor</Form.Label>
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
        <Row className="mb-3">
          <Col>
            <Button variant="primary" onClick={handleAgregarProductos}>
              Agregar Productos
            </Button>
          </Col>
        </Row>

        {/* Tabla de productos seleccionados */}
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
          <Col>
            <InputGroup>
              <InputGroup.Text>Subtotal</InputGroup.Text>
              <Form.Control
                type="text"
                value={`$${compra.subtotal.toLocaleString('es-CO')}`}
                readOnly
              />
            </InputGroup>
          </Col>
          <Col>
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
        <Row className="mb-3">
          <Col className="text-end">
            <Button variant="success" className="btn-guardar" onClick={handleGuardarCompra}>
              Guardar Compra
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Modal para agregar productos */}
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
            {/* Primero seleccionar categoría */}
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="categoria">
                  <Form.Label>Categoría</Form.Label>
                  <Form.Select
                    value={categoriaSeleccionada}
                    onChange={handleCategoriaChange}
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

            {/* Mostrar opciones de escaneo solo si hay una categoría seleccionada */}
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

            {/* Mostrar productos de la categoría seleccionada */}
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

            {/* Producto seleccionado */}
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

      {/* CSS para el escáner de código de barras */}
      <style jsx="true">{`
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
      `}</style>
    </div>
  );
}

export default AgregarCompra;
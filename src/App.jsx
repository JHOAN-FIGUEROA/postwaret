import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import "./css/App.css"
import LoginForm from "./page/LoginForm"
import RegisterForm from "./page/RegisterForm"
import Dasboard from "./page/Dasboard"
import Proveedores from "./page/Proveedores"
import Compras from "./page/Compras"
import AgregarCompra from "./page/Compras/AgregarCompra"
import VerDetalleCompra from "./page/Compras/VerDetalleCompra"
import GenerarPDF from "./page/Compras/GenerarPDF"
import AgregarProductos from "./page/Compras/AgregarProducto"
import AgregarProveedor from "./page/Proveedores/AgregarProveedor"
import EditarProveedor from "./page/Proveedores/EditarProveedor"
import VerDetalleProveedor from "./page/Proveedores/VerDetalleProveedor"
import AnularProveedor from "./page/Proveedores/AnularProveedor"
import Clientes from "./page/Clientes"
import AgregarCliente from "./page/Clientes/AgregarCliente"
import VerDetalleCliente from "./page/Clientes/VerDetalleCliente"
import EditarCliente from "./page/Clientes/EditarCliente"
import Categoria from "./page/Categoria"
import AgregarCategoria from "./page/Categorias/AgregarCategoria"
import VerDetalleCategoria from "./page/Categorias/VerDetalleCategoria"
import EditarCategoria from "./page/Categorias/EditarCategoria"
import AnularCategoria from "./page/Categorias/AnularCategoria"
import Productos from "./page/Productos"
import AgregarProductoo from "./page/Productos/AgregarProductoo"
import EditarProductoo from "./page/Productos/EditarProducto"
import VerDetalleProducto from "./page/Productos/VerDetalleProducto"
import Ventas from "./page/Ventas"
import AgregarVenta from "./page/Ventas/AgregarVenta"
import AgregarProductosss from "./page/Ventas/AgregarProductov"
import VerDetalleVenta from "./page/Ventas/VerDetalleVenta"
import GenerarPDFVenta from "./page/Ventas/GenerarPdfventa"
import Usuarios from "./page/Usuarios";
import Roles from "./page/Roles";
import ResetPassword from "./page/ResetPassword"
import AgregarUsuario from "./page/Usuarios/AgregarUsuario"
import VerDetalleUsuario from "./page/Usuarios/VerDetalleUsuario"
import EditarUsuario from "./page/Usuarios/EditarUsuarios"
import AgregarRol from "./page/Roles/AgregarRol"
import VerDetalleRol from "./page/Roles/VerDetalleRol"
import PermisosAsociados from "./page/Roles/PermisosAsociados"
import EditarRol from "./page/Roles/EditarRol"
import pasillo from "./img/pasillo.jpg"
import supermercado2 from "./img/supermercado2.jpg"
import supermercado3 from "./img/supermercado3.jpg"


function App() {
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()
  const location = useLocation() // Get current location
  const isHomePage = location.pathname === "/" // Check if we're on the home page
  // Create a global alert system


  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn")
    if (loggedInStatus === "true") {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }

    // Add event listener for storage changes
    const handleStorageChange = () => {
      const currentLoggedInStatus = localStorage.getItem("isLoggedIn")
      setIsLoggedIn(currentLoggedInStatus === "true")
    }

    window.addEventListener("storage", handleStorageChange)

    // Also listen for a custom event
    window.addEventListener("logout", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("logout", handleStorageChange)
    }
  }, [])

  const handleLogin = () => {
    setIsLoggedIn(true)
    localStorage.setItem("isLoggedIn", "true")
    setShowLogin(false)
    navigate("/dasboard")
  }


  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem("isLoggedIn")
    navigate("/")
  }

  return (
    <div className="container">
      {/* Navbar only visible on home page */}
      {isHomePage && (
        <nav>
          <Link to="/" className="logo">
            🛒 POSTWARE
          </Link>
          {!isLoggedIn ? (
            <div>
              <button className="btn" onClick={() => navigate("/login")}>
                Iniciar Sesión
              </button>
              <button className="btn" onClick={() => setShowRegister(true)}>
                Registrarse
              </button>
            </div>
          ) : null}
        </nav>
      )}

      {showLogin ? (
        <LoginForm onBackToHome={() => setShowLogin(false)} onLogin={handleLogin} />
      ) : showRegister ? (
        <RegisterForm onBackToHome={() => setShowRegister(false)} onLogin={handleLogin} />
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dasboard" element={<Dasboard />} />
          <Route path="/proveedores" element={<Proveedores />} />
          <Route path="/compras" element={<Compras />} />
          <Route path="/compras/agregar" element={<AgregarCompra />} />
          <Route path="/compras/ver-detalle/:id" element={<VerDetalleCompra />} />
          <Route path="/compras/GenerarPDF" element={<GenerarPDF />} />
          <Route path="/productos/agregar" element={<AgregarProductos />} />
          <Route path="/productos/editar" element={<EditarCliente />} />
          <Route path="/proveedor/agregar" element={<AgregarProveedor />} />
          <Route path="/proveedor/editar" element={<EditarProveedor />} />
          <Route path="/proveedor/ver-detalle" element={<VerDetalleProveedor />} />
          <Route path="/proveedor/anular" element={<AnularProveedor />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/clientes/agregar" element={<AgregarCliente />} />
          <Route path="/clientes/editar/" element={<EditarCliente />} />
          <Route path="/clientes/detalle/" element={<VerDetalleCliente />} />
          <Route path="/Categoria" element={<Categoria />} />
          <Route path="/categoria/agregar" element={<AgregarCategoria />} />
          <Route path="/categoria/ver-detalle" element={<VerDetalleCategoria />} />
          <Route path="/categoria/editar" element={<EditarCategoria />} />
          <Route path="/categoria/anular" element={<AnularCategoria />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/agregarr" element={<AgregarProductoo />} />
          <Route path="/productos/editarr" element={<EditarProductoo />} />
          <Route path="/productos/ver-detalle" element={<VerDetalleProducto />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/ventas/agregar" element={<AgregarVenta />} />
          <Route path="/productos/agregarrr" element={<AgregarProductosss />} />
          <Route path="/ventas/ver-detalle/:id" element={<VerDetalleVenta />} />
          <Route path="/ventas/Generarpdf" element={<GenerarPDFVenta />} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterForm onLogin={handleLogin} />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/usuarios/agregar" element={<AgregarUsuario />} />
          <Route path="/usuarios/ver-detalle" element={<VerDetalleUsuario />} />
          <Route path="/usuarios/editar" element={<EditarUsuario />} />
          <Route path="/roles/agregar" element={<AgregarRol />} />
          <Route path="/roles/ver-detalle" element={<VerDetalleRol />} />
          <Route path="/roles/permisos-asociados" element={<PermisosAsociados />} />
          <Route path="/roles/editar" element={<EditarRol />} />
        </Routes>
        
      )}
    </div>
  )
}

function HomePage() {
  return (
    <>
      <div className="carousel-container">
        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
          <div>
            <img src={pasillo || "/placeholder.svg"} alt="Supermercado 1" className="carousel-img" />
          </div>
          <div>
            <img src={supermercado2 || "/placeholder.svg"} alt="Supermercado 2" className="carousel-img" />
          </div>
          <div>
            <img src={supermercado3 || "/placeholder.svg"} alt="Supermercado 3" className="carousel-img" />
          </div>
        </Carousel>
      </div>
      <section>
        <h2>Nuestra Empresa</h2>
        <div className="section-container">
          <div className="section-card">
            <h3>Misión</h3>
            <p>Ofrecer productos frescos y de calidad con el mejor servicio.</p>
          </div>
          <div className="section-card">
            <h3>Visión</h3>
            <p>Ser el supermercado de referencia en la región con innovación y compromiso.</p>
          </div>
          <div className="section-card">
            <h3>Historia</h3>
            <p>Desde 1990, llevamos calidad y confianza a los hogares.</p>
          </div>
        </div>
      </section>
      <footer>
        <p>&copy; Postware 2025 - Todos los derechos reservados</p>
      </footer>
    </>
  )
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  )
}


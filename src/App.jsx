import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./css/App.css";
import LoginForm from "./page/LoginForm";
import RegisterForm from "./page/RegisterForm";
import Dasboard from "./page/Dasboard";
import Proveedores from "./page/Proveedores";
import Compras from "./page/Compras";
import AgregarCompra from "./page/Compras/AgregarCompra"
import AgregarProductos from "./page/Compras/AgregarProducto";
import Clientes from "./page/Clientes";
import AgregarCliente from "./page/Clientes/AgregarCliente";
import VerDetalleCliente from "./page/Clientes/VerDetalleCliente";
import EditarCliente from "./page/Clientes/EditarCliente";
import Categoria from "./page/Categoria";
import pasillo from './img/pasillo.jpg'; 
import supermercado2 from './img/supermercado2.jpg';
import supermercado3 from './img/supermercado3.jpg';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    if (loggedInStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    setShowLogin(false);
    navigate("/dasboard"); 
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    navigate("/"); 
  };

  return (
    <div className="container">
      {/* Navbar siempre visible */}
      <nav>
        <Link to="/" className="logo">
          🛒 Postware
        </Link>
        {!isLoggedIn ? (
          <div>
            <button className="btn" onClick={() => setShowLogin(true)}>
              Iniciar Sesión
            </button>
            <button className="btn" onClick={() => setShowRegister(true)}>
              Registrarse
            </button>
          </div>
        ) : (
          <button className="btn btn-danger" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        )}
      </nav>

      {showLogin ? (
        <LoginForm onBackToHome={() => setShowLogin(false)} onLogin={handleLogin} />
      ) : showRegister ? (
        <RegisterForm 
          onBackToHome={() => setShowRegister(false)} 
          onLogin={handleLogin} 
        />
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dasboard" element={<Dasboard />} />
          <Route path="/proveedores" element={<Proveedores />} />
          <Route path="/compras" element={<Compras />} />
          <Route path="/compras/agregar" element={<AgregarCompra />} />
          <Route path="/productos/agregar" element={<AgregarProductos />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/clientes/agregar" element={<AgregarCliente />} />
          <Route path="/clientes/editar/" element={<EditarCliente />} />
          <Route path="/clientes/detalle/" element={<VerDetalleCliente />} />
          <Route path="/Categoria" element={<Categoria />} />
          <Route 
            path="/login" 
            element={<LoginForm onLogin={handleLogin} />} 
          />
          <Route 
            path="/register" 
            element={<RegisterForm onLogin={handleLogin} />} 
          />
        </Routes>
      )}
    </div>
  );
}

function HomePage() {
  return (
    <>
      <div className="carousel-container">
        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
          <div><img src={pasillo} alt="Supermercado 1" className="carousel-img" /></div>
          <div><img src={supermercado2} alt="Supermercado 2" className="carousel-img" /></div>
          <div><img src={supermercado3} alt="Supermercado 3" className="carousel-img" /></div>
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
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
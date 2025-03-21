import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./css/App.css";
import LoginForm from "./page/LoginForm";
import RegisterForm from "./page/RegisterForm";
import AdminPanel from "./page/AdminPanel";
import Proveedores from "./page/Proveedores";
import Clientes from "./page/Clientes";
import Categoria from "./page/Categoria";
import pasillo from './img/pasillo.jpg'; 
import supermercado2 from './img/supermercado2.jpg';
import supermercado3 from './img/supermercado3.jpg';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <Router>
      <div className="container">
        {!isLoggedIn && (
          <nav>
            <Link to="/" className="logo">
              🛒 Postware
            </Link>
            <div>
              <button className="btn" onClick={() => setShowLogin(true)}>
                Iniciar Sesión
              </button>
              <button className="btn" onClick={() => setShowRegister(true)}>
                Registrarse
              </button>
            </div>
          </nav>
        )}

        {showLogin ? (
          <LoginForm onBackToHome={() => setShowLogin(false)} onLogin={handleLogin} />
        ) : showRegister ? (
          <RegisterForm 
            onBackToHome={() => setShowRegister(false)} 
            onLogin={handleLogin} 
          />
        ) : (
          <Routes>
            <Route path="/" element={isLoggedIn ? <AdminPanel /> : <HomePage />} />
            <Route path="/proveedores" element={<Proveedores />} />
            <Route path="/clientes" element={<Clientes />} />
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
    </Router>
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

export default App;
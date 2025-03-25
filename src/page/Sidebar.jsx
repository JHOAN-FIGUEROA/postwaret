"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Sidebar({ modules }) {
  const [expandedModule, setExpandedModule] = useState(null) // Estado para el módulo expandido
  const navigate = useNavigate() // Hook para la navegación
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check login status on mount
    const loggedInStatus = localStorage.getItem("isLoggedIn")
    setIsLoggedIn(loggedInStatus === "true")
  }, [])

  // Función para manejar el clic en un módulo
  const handleModuleClick = (moduleName) => {
    if (expandedModule === moduleName) {
      setExpandedModule(null) // Colapsar el módulo si ya está expandido
    } else {
      setExpandedModule(moduleName) // Expandir el módulo
    }
  }

  // Función para manejar el clic en un submenú
  const handleSubmenuClick = (path) => {
    navigate(path) // Navegar a la ruta correspondiente
  }

  // Función para cerrar sesión
  const handleLogout = () => {
    // Update local state
    setIsLoggedIn(false)

    // Remove from localStorage
    localStorage.removeItem("isLoggedIn")

    // Dispatch custom events to notify App component
    window.dispatchEvent(new Event("logout"))
    window.dispatchEvent(new Event("storage"))

    // Navigate to home page
    navigate("/")
  }

  return (
    <div className="sidebar">
      <h3>Módulos</h3>
      <ul>
        {modules.map((module, index) => (
          <li key={index}>
            <div className="module-item" onClick={() => handleModuleClick(module.name)}>
              {module.name} {/* Renderiza el nombre del módulo */}
              <span className="arrow">{expandedModule === module.name ? "▼" : "►"}</span>
            </div>
            {expandedModule === module.name && (
              <ul className="submenu">
                {module.submenus.map((submenu, subIndex) => (
                  <li key={subIndex} onClick={() => handleSubmenuClick(submenu.path)}>
                    {submenu.name} {/* Renderiza el nombre del submenú */}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <div>
        <button className="btn btn-danger" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  )
}

export default Sidebar


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Sidebar({ modules }) {
  const [expandedModule, setExpandedModule] = useState(null); // Estado para el módulo expandido
  const navigate = useNavigate(); // Hook para la navegación

  // Función para manejar el clic en un módulo
  const handleModuleClick = (moduleName) => {
    if (expandedModule === moduleName) {
      setExpandedModule(null); // Colapsar el módulo si ya está expandido
    } else {
      setExpandedModule(moduleName); // Expandir el módulo
    }
  };

  // Función para manejar el clic en un submenú
  const handleSubmenuClick = (path) => {
    navigate(path); // Navegar a la ruta correspondiente
  };

  // Función para cerrar sesión
  const handleCerrarSesion = () => {
    // Aquí puedes agregar la lógica para cerrar sesión, como limpiar el localStorage, etc.
    localStorage.removeItem("token"); // Ejemplo: Eliminar el token de autenticación
    localStorage.removeItem("user"); // Ejemplo: Eliminar la información del usuario
    navigate("/"); // Redirigir al usuario a la página de inicio
  };

  return (
    <div className="sidebar">
      <h3>Módulos</h3>
      <ul>
        {modules.map((module, index) => (
          <li key={index}>
            <div
              className="module-item"
              onClick={() => handleModuleClick(module.name)}
            >
              {module.name} {/* Renderiza el nombre del módulo */}
              <span className="arrow">
                {expandedModule === module.name ? "▼" : "►"}
              </span>
            </div>
            {expandedModule === module.name && (
              <ul className="submenu">
                {module.submenus.map((submenu, subIndex) => (
                  <li
                    key={subIndex}
                    onClick={() => handleSubmenuClick(submenu.path)}
                  >
                    {submenu.name} {/* Renderiza el nombre del submenú */}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <div>
        <button className="btn btn-danger" onClick={handleCerrarSesion}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
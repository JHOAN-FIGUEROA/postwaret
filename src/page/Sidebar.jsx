import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FaBars, FaTimes } from "react-icons/fa"
import { 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart, 
  Settings, 
  LogOut, 
  Clipboard,
  FileText,
  PieChart,
  CreditCard,
  User,
  UserPlus,
  Box,
  Truck,
  Tag,
  UserCog,
  Wine
} from "lucide-react"

function Sidebar({ modules }) {
  const [expandedModule, setExpandedModule] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true) // Changed to true by default
  const navigate = useNavigate()

  // Icon mapping for modules
  const moduleIcons = {

    "Ventas": ShoppingCart,
    "Dasboard": BarChart,
    "Dashboard": BarChart,
    "Configuracion": Settings,
    "Configuración": Settings,
    "Compras": FileText,

  }

  // Icon mapping for submenus
  const submenuIcons = {
    // Inventario
    "Productos": Wine,
    "Categoria": Tag,
    "Proveedores": Truck,
    "Compras": FileText,

    // Ventas
    "Ventas": ShoppingCart,
    "Dasboard": BarChart,
    "Dashboard": BarChart,
    // Clientes
    "Clientes": Users,


    // Configuración
    "Roles": UserCog,
    "Perfil": Clipboard,
    "Usuarios": Users,
  }

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn")
    setIsLoggedIn(loggedInStatus === "true")
    
    // Store sidebar state in localStorage and read it on component mount
    const savedSidebarState = localStorage.getItem("isSidebarOpen")
    if (savedSidebarState !== null) {
      setIsSidebarOpen(savedSidebarState === "true")
    } else {
      // If no state is saved yet, default to open
      setIsSidebarOpen(true)
    }
  }, [])

  // Save sidebar state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("isSidebarOpen", isSidebarOpen)
  }, [isSidebarOpen])

  const handleModuleClick = (moduleName) => {
    if (expandedModule === moduleName) {
      setExpandedModule(null)
    } else {
      setExpandedModule(moduleName)
    }
  }

  const handleSubmenuClick = (path) => {
    navigate(path)
    // Removed setIsSidebarOpen(false) to keep sidebar open when navigating
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem("isLoggedIn")
    window.dispatchEvent(new Event("logout"))
    window.dispatchEvent(new Event("storage"))
    navigate("/")
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <>
      {/* Botón para abrir/cerrar el sidebar */}
      <button 
        className="sidebar-toggle" 
        onClick={toggleSidebar}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 1001,
          background: 'none',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer'
        }}
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div 
        className={`sidebar ${isSidebarOpen ? 'open' : ''}`}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '250px',
          height: '100vh',
          boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
          transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-in-out',
          zIndex: 1000,
          padding: '20px',
          overflowY: 'auto'
        }}
      >
         <h2 style={{ 
          display: 'flex', 
          justifyContent:'space-between', 
          alignItems: 'center',
          color: 'white' 
        }}>
          🛒 POSTWARE
          <button 
            onClick={toggleSidebar}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <FaTimes />
          </button>
        </h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {modules.map((module, index) => {
            const ModuleIcon = moduleIcons[module.name] || Package
            return (
              <li key={index} style={{ marginBottom: '10px' }}>
                <div 
                  className="module-item" 
                  onClick={() => handleModuleClick(module.name)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    '&:hover': {
                      backgroundColor: '#e9ecef'
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ModuleIcon size={18} />
                    {module.name}
                  </div>
                  <span className="arrow" style={{ fontSize: '12px' }}>
                    {expandedModule === module.name ? "▼" : "►"}
                  </span>
                </div>
                {expandedModule === module.name && (
                  <ul className="submenu" style={{ listStyle: 'none', paddingLeft: '20px' }}>
                    {module.submenus.map((submenu, subIndex) => {
                      const SubmenuIcon = submenuIcons[submenu.name] || Package
                      return (
                        <li 
                          key={subIndex} 
                          onClick={() => handleSubmenuClick(submenu.path)}
                          style={{
                            padding: '8px 12px',
                            cursor: 'pointer',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            '&:hover': {
                              backgroundColor: '#e9ecef'
                            }
                          }}
                        >
                          <SubmenuIcon size={16} />
                          {submenu.name}
                        </li>
                      )
                    })}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
        <div style={{ marginTop: '20px' }}>
          <button 
            className="btn btn-danger" 
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '8px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            <LogOut size={18} /> Cerrar Sesión
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar
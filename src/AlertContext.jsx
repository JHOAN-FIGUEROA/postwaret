import ConfirmDialog from '../src/dialogodeconfirmacion';
import Alert from '../src/alert';
import React, { createContext, useContext, useState, useCallback } from 'react';
import SimpleAlert from '../src/SimpleAlert';

// Create a context
const AlertContext = createContext();

// Generate unique IDs for alerts
const generateId = () => `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Provider component
export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState(null);
  const [simpleAlert, setSimpleAlert] = useState(null);

  // Remove an alert
  const removeAlert = useCallback((id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  }, []);

  // Add a new alert
  const addAlert = useCallback((type, message, title, autoClose = true, duration = 5000) => {
    const id = generateId();
    setAlerts(prev => [...prev, { id, type, message, title, autoClose, duration }]);
    return id;
  }, []);

  // Helper methods for different alert types
  const showSuccess = useCallback((message, title = 'Éxito', autoClose = true, duration = 5000) => {
    return addAlert('success', message, title, autoClose, duration);
  }, [addAlert]);

  const showError = useCallback((message, title = 'Error', autoClose = true, duration = 5000) => {
    return addAlert('error', message, title, autoClose, duration);
  }, [addAlert]);

  const showWarning = useCallback((message, title = 'Advertencia', autoClose = true, duration = 5000) => {
    return addAlert('warning', message, title, autoClose, duration);
  }, [addAlert]);

  const showInfo = useCallback((message, title = 'Información', autoClose = true, duration = 5000) => {
    return addAlert('info', message, title, autoClose, duration);
  }, [addAlert]);

  // Show a confirmation dialog
  const showConfirm = useCallback((message, title = 'Confirmar', confirmText = 'Confirmar', cancelText = 'Cancelar') => {
    return new Promise((resolve) => {
      setConfirmDialog({ message, title, confirmText, cancelText, onConfirm: () => {
        setConfirmDialog(null);
        resolve(true);
      }, onCancel: () => {
        setConfirmDialog(null);
        resolve(false);
      }});
    });
  }, []);

  // Show a simple alert (like the one in the image)
  const alert = useCallback((message, title = '', buttonText = 'Aceptar') => {
    return new Promise((resolve) => {
      setSimpleAlert({ message, title, buttonText, onClose: () => {
        setSimpleAlert(null);
        resolve();
      }});
    });
  }, []);

  // Value to be provided by the context
  const value = {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showConfirm,
    alert
  };

  return (
    <AlertContext.Provider value={value}>
      {children}
      
      {/* Render alerts */}
      <div className="alert-container">
        {alerts.map(alert => (
          <Alert
            key={alert.id}
            id={alert.id}
            type={alert.type}
            title={alert.title}
            message={alert.message}
            autoClose={alert.autoClose}
            duration={alert.duration}
            onClose={removeAlert}
          />
        ))}
      </div>
      
      {/* Render confirmation dialog if active */}
      {confirmDialog && (
        <ConfirmDialog
          title={confirmDialog.title}
          message={confirmDialog.message}
          confirmText={confirmDialog.confirmText}
          cancelText={confirmDialog.cancelText}
          onConfirm={confirmDialog.onConfirm}
          onCancel={confirmDialog.onCancel}
        />
      )}
      
      {/* Render simple alert if active */}
      {simpleAlert && (
        <SimpleAlert
          title={simpleAlert.title}
          message={simpleAlert.message}
          buttonText={simpleAlert.buttonText}
          onClose={simpleAlert.onClose}
        />
      )}
    </AlertContext.Provider>
  );
};

// Custom hook to use the alert context
export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

// Create a global alert system for non-React code
export const createGlobalAlertSystem = () => {
  // This will be called in your main App component
  let alertMethods = null;

  // Function to set the alert methods
  const setAlertMethods = (methods) => {
    alertMethods = methods;
    
    // Expose to window for non-React code
    window.alertSystem = {
      success: (message, title) => alertMethods.showSuccess(message, title),
      error: (message, title) => alertMethods.showError(message, title),
      warning: (message, title) => alertMethods.showWarning(message, title),
      info: (message, title) => alertMethods.showInfo(message, title),
      confirm: (message, title) => alertMethods.showConfirm(message, title),
      alert: (message, title) => alertMethods.alert(message, title)
    };
  };

  return { setAlertMethods };
};
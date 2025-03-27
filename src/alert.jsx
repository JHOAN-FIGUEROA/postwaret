import React, { useEffect, useState } from 'react';
import '../src/css/alert.css';

const AlertIcon = ({ type }) => {
  switch (type) {
    case 'success':
      return <span className="alert-icon">✓</span>;
    case 'error':
      return <span className="alert-icon">✕</span>;
    case 'warning':
      return <span className="alert-icon">⚠</span>;
    case 'info':
      return <span className="alert-icon">ℹ</span>;
    default:
      return null;
  }
};

const Alert = ({ id, type, title, message, onClose, autoClose = true, duration = 5000 }) => {
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose(id);
    }, 400); // Match the animation duration
  };

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration]);

  return (
    <div className={`custom-alert ${type} ${closing ? 'closing' : ''}`}>
      <AlertIcon type={type} />
      <div className="alert-content">
        {title && <div className="alert-title">{title}</div>}
        <p className="alert-message">{message}</p>
      </div>
      <button className="alert-close" onClick={handleClose}>×</button>
      {autoClose && <div className="alert-progress" style={{ animationDuration: `${duration}ms` }}></div>}
    </div>
  );
};

export default Alert;
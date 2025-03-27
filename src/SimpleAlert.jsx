import React from 'react';
import '../src/css/alert.css';

const SimpleAlert = ({ title, message, buttonText = 'Aceptar', onClose }) => {
  return (
    <div className="simple-alert-backdrop">
      <div className="simple-alert">
        {title && <div className="simple-alert-title">{title}</div>}
        <div className="simple-alert-message">{message}</div>
        <button className="simple-alert-button" onClick={onClose}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default SimpleAlert;
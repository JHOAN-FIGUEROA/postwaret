import React from 'react';
import { Form } from 'react-bootstrap';
import '../css/Estado.css';

function Estado({ estado, onChange }) {
  const isActive = estado === "Activo";

  return (
    <Form.Check 
      type="switch"
      id={`estado-switch`}
      className="custom-estado-switch"
      checked={isActive}
      onChange={onChange}
    />
  );
}

export default Estado;
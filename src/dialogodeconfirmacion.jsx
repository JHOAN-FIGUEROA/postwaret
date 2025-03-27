import React from 'react';
import '../src/css/alert.css';

const ConfirmDialog = ({ title, message, onConfirm, onCancel, confirmText = 'Confirmar', cancelText = 'Cancelar' }) => {
  return (
    <div className="confirm-dialog-backdrop" onClick={onCancel}>
      <div className="confirm-dialog" onClick={e => e.stopPropagation()}>
        <div className="confirm-dialog-header">
          <div className="icon">⚠</div>
          <h3>{title || 'Confirmar acción'}</h3>
        </div>
        <div className="confirm-dialog-body">
          {message || '¿Está seguro que desea realizar esta acción?'}
        </div>
        <div className="confirm-dialog-footer">
          <button className="btn-cancel" onClick={onCancel}>
            {cancelText}
          </button>
          <button className="btn-confirm" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
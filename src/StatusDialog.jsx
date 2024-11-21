import React from "react";

function StatusDialog({ message, onClose }) {
  return (
    <div className="status-dialog">
      <div className="dialog-content">
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="dialog-overlay" onClick={onClose}></div>
    </div>
  );
}

export default StatusDialog;

import React from 'react';

function Toast({ message }) {
  return (
    <div className="toast active">
      <i className="fa-solid fa-check-circle"></i>
      <span>{message}</span>
    </div>
  );
}

export default Toast;

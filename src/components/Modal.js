import React from 'react';

function Modal({ title, content, onClose }) {
  return (
    <div className="modal active">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h2 className="modal-title">{title}</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}

export default Modal;

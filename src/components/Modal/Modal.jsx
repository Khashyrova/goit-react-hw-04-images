import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';
const Modal = ({ url, alt, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
      window.removeEventListener('keydown', handleKeyDown);
    }
  };

  const handleBackdpropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };
  return (
    <div className={s.Overlay} onClick={(handleBackdpropClick, handleKeyDown)}>
      <div className={s.Modal}>
        <img src={url} alt={alt} />
        <button className={s.CloseBtn} onClick={handleBackdpropClick}>
          ⛌
        </button>
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  url: PropTypes.string,
  alt: PropTypes.string,
  handleBackdpropClick: PropTypes.func,
};

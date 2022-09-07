import React from 'react';
import Button from '../Button';
import styles from './index.module.css';

const Modal = ({ children, isOpen, handleClose, isConfirmation, confirmed }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalWrapper}>
        <button onClick={handleClose} className={styles.closeButton}>
          X
        </button>
        <div className={styles.childrenContainer}>{children}</div>
        {isConfirmation ? (
          <div className={styles.buttonWrapper}>
            <Button classes="block" onClick={confirmed}>
              Accept
            </Button>
            <Button classes={'red'} onClick={handleClose}>
              Cancel
            </Button>
          </div>
        ) : (
          <div className={styles.buttonWrapper}></div>
        )}
      </div>
    </div>
  );
};

export default Modal;

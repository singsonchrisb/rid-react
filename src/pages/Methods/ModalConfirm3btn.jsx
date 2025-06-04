import React from "react";
import "../../styles/ModalConfirm.css";

export const ModalConfirm = ({ onSubmit, onCancel,onNa, closeModal, children, button1,  button2,  button3}) => {
  // alert('laod modal')
  return (
    
     <div className="modal-container">
      {/* <div className={classes.modalContainer} > */}
      <div className="modal-form">
        <div
          className="modal-header"
          onClick={() => closeModal("Close")}
        >
          <p className="modal-close">&times;</p>
        </div>
        <div className="modal-content">{children}</div>
        <div className="modal-footer">
          <button
            type="submit"
            className="btn btn-submit"
            onClick={() => onSubmit("Yes")}
          >
            {button1}
          </button>
          <button
            type="submit"
            className="btn btn-cancel"
            onClick={() => onCancel("No")}
          >
            {button2}
          </button>
          <button
            type="submit"
            className="btn btn-secondary"
            onClick={() => onNa("Na")}
          >
            {button3}
          </button>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import "../../styles/ModalConfirm.css";


//  import classes from "../../styles/ModalConfirm.css";


export const ModalConfirm = ({ onSubmit, onCancel, closeModal, children, button1,  button2}) => {
  // alert('laod modal')
  return (
    // <div
    //   className="modal-container"
    //   onClick={(e) => {
    //     if (e.target.className === "modal-container")
    //       closeModal("Modal was closed");
    //   }}
    // >
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
        </div>
      </div>
    </div>
  );
};

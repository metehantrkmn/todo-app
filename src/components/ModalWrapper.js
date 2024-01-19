import React from "react";
import Backdrop from "./Backdrop";
import Modal from "./Modal";

const ModalWrapper = (props) => {
  return (
    <div className="wrapper">
      <Modal
        displayModal={props.displayModal}
        setFunction={props.setFunction}
      />
      <Backdrop displayModal={props.displayModal} />
    </div>
  );
};

export default ModalWrapper;

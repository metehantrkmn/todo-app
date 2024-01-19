import React from "react";
import Modal from "./Modal";

const Backdorp = (props) => {
  return <div className="backdrop" onClick={props.displayModal}></div>;
};

export default Backdorp;

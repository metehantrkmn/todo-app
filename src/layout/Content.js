import React, { useState } from "react";
import AddButton from "../components/AddButton";
import Modal from "../components/Modal";
import Todos from "../components/Todos";
import Backdrop from "../components/Backdrop";
import ModalWrapper from "../components/ModalWrapper";

const Content = (props) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const displayModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div>
      <Todos arrayList={props.todoList} deleteFunc={props.deleteFunc} />
      {/* {isModalOpen ? <Modal func={displayModal} /> : null} */}
      {/* {isModalOpen ? <Backdrop func={displayModal} /> : null} */}
      {console.log(props.todoList)}
      {console.log("content.js")}

      {isModalOpen ? (
        <ModalWrapper
          displayModal={displayModal}
          setFuntion={props.deleteFunc}
        />
      ) : null}
      <div className="add-button">
        <AddButton
          Text="Add Todo"
          func={displayModal}
          color="rgb(188, 119, 253)"
        />
      </div>
    </div>
  );
};

export default Content;

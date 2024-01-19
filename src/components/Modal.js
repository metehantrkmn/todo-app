import React from "react";
import AddButton from "./AddButton";
import { useState } from "react";
import axios from "axios";

const Modal = (props) => {
  const [formData, setFormData] = useState({ heading: "", description: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(event.target);
    console.log(name);
    console.log(value);
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  function requestHandler() {
    var newTodo = formData;
    axios
      .post("http://localhost:8080/api/v1/add-todo", newTodo, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("succesfully added new todo");
        }
      })
      .catch((err) => {
        console.log("error occured during adding new todo");
        console.log(err);
      });
  }

  const submitHandler = (event) => {
    event.preventDefault();
    props.displayModal();
    console.log(formData.name + " " + formData.todo);
    requestHandler();
    props.setFunction((prevdata) => ({
      todos: [...prevdata, formData],
    }));
  };

  return (
    <div className="Modal">
      <div className="modal-container">
        <div className="modal-content">
          <button className="close-button" onClick={props.displayModal}>
            <img className="close-icon" src={require("./close.png")} />
          </button>
          <form onSubmit={submitHandler}>
            <div className="input-group">
              <h1>Todo Name</h1>
              <input
                name="heading"
                className="input-bar"
                type="text"
                placeholder="MyTodoName"
                onChange={handleChange}
              ></input>
            </div>
            <div className="input-group">
              <h1>Todo</h1>
              <input
                name="description"
                className="input-bar"
                type="text"
                placeholder="MyTodo Description"
                onChange={handleChange}
              ></input>
            </div>
            <div className="modal-submit-button">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;

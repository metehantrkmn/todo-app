import React from "react";
import img from "./close.png";
import axios from "axios";

//prevdata means {todos: [{title: "afsdf", task: "fasdf"}, ...]}
//so in order to acces todos array you have to use
//prevdata.todos expression
//to delete a todo we are using set function of the provider of the
//todo informations
//so delete function actually a set function of the parent component
//thats why we set the result of filter function into todos property again
//in delete handler
const Todo = (props) => {
  const deleteHandler = (event) => {
    props.deleteFunc((prevdata) => ({
      todos: prevdata.todos.filter((todo) => todo.id != props.id),
    }));
    axios.defaults.withCredentials = true;
    axios
      .delete(`http://localhost:8080/api/v1/delete-todo?heading=${props.title}`)
      .then((response) => {
        if (response.status === 200) {
          console.log("succesfully deleted todo");
        }
      })
      .catch((err) => {
        console.log("error occured while deleting todo");
        console.log(err);
      });
  };

  return (
    <div className="todo">
      <button className="todo-close-button" onClick={deleteHandler}>
        <img className="little" src={img}></img>
      </button>
      <div className="todo-container">
        <h2 className="todo-heading">{props.title}</h2>
        <p className="todo-text">{props.task}</p>
      </div>
    </div>
  );
};

export default Todo;

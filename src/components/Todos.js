import React from "react";
import Todo from "./Todo";

const Todos = (props) => {
  let idNumber = 0;

  return (
    <>
      {props.arrayList.todos.map((object) => {
        idNumber = idNumber + 1;
        //console.log(idNumber);
        object.id = idNumber;
        return (
          <Todo
            title={object.heading}
            task={object.description}
            key={object.id}
            id={object.id}
            deleteFunc={props.deleteFunc}
          ></Todo>
        );
      })}
    </>
  );
};

export default Todos;

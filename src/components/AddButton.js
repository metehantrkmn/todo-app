import React from "react";

const AddButton = (props) => {
  return (
    <div>
      <button
        className="btn-default"
        onClick={props.func}
        style={{ backgroundColor: props.color }}
        type="submit"
      >
        {props.Text}
      </button>
    </div>
  );
};

export default AddButton;

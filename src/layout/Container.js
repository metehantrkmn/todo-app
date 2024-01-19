import React from "react";

const Container = ({ children }) => {
  return (
    <div className="outer-container">
      <div className="container">{children}</div>
    </div>
  );
};

export default Container;

import axios from "axios";
import React, { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const myRef = useRef();

  const dropdown = () => {
    myRef.current.classList.toggle("displayOption");
  };

  const navigate = useNavigate();

  const logoutHandler = (event) => {
    axios.defaults.withCredentials = false;
    axios.post("http://localhost:8080/api/v1/logout").then((resp) => {
      if (resp.status === 2000) {
        localStorage.setItem("authenticated", "false");
        navigate("/Login");
      }
    });
  };

  return (
    <div className="Navbar">
      <div className="navContainer">
        <a className="logo">MyTodoApp</a>
        <button className="hamburger-menu-button" onClick={dropdown}>
          {<img src={require("./hamburger.svg").default} />}
        </button>
        <nav className="navList" ref={myRef}>
          <ul>
            <li className="navLinks">
              <button className="navLinks-buttons">History</button>
            </li>
            <li className="navLinks">
              <button className="navLinks-buttons">Favorites</button>
            </li>
            <li className="navLinks">
              <button className="navLinks-buttons">Logout</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;

/* 
<button className="hamburger-menu-button">
            {<img src={require("./hamburger.svg").default} />}
          </button> */

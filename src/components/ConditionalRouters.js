import React, { useContext } from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Login from "../layout/Login";
import Signup from "../layout/Signup";
import Home from "../layout/Home";
import FileNotFound from "../pages/FileNotFound";

export default function ConditionalRouters(props) {
  /*   if (props.token === null) {
    return (
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="*" element={<FileNotFound />} />
      </Routes>
    );
  } else { */

  return (
    <Routes>
      <Route path="/Home" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="*" element={<FileNotFound />} />
    </Routes>
  );
  //}
}

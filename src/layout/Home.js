import Header from "../components/Header";
import Navbar from "./Navbar";
import Container from "./Container";
import Content from "./Content";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import React, { useContext, useEffect, useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [todoList, setList] = useState({ todos: [] });

  //if you dont use that line it will not send cookies with the request
  axios.defaults.withCredentials = true;
  var authContext = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem("authenticated") === "true") {
      axios
        .get("http://localhost:8080/api/v1/get-todos", {
          withCredentials: true,
        })
        .then((response) => {
          console.log("this is response.data.todos");
          console.log(response.data.todos);
          setList(response.data);
        })
        .catch((err) => {
          console.log(err);
          localStorage.setItem("authenticated", "false");
          navigate("/Login");
        });
    } else {
      localStorage.setItem("authenticated", "false");
      navigate("/Login");
    }
  }, []);

  return (
    //you can only return one parent element which is div here
    <div>
      <Navbar></Navbar>
      <Container>
        <Header title="hello from other side" />
        <Content todoList={todoList} deleteFunc={setList}></Content>
      </Container>
    </div>
  );
};

export default Home;

import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../App";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    lastname: "",
    password: "",
  });

  //set method works async!!!
  //const [token, setToken] = useState("");
  const [emailPop, setEmailPop] = useState(true);
  const [usernamePop, setUsernamePop] = useState(true);
  const [lastnamePop, setLastnamePop] = useState(true);
  const [passwordPop, setPasswordPop] = useState(true);
  const [badRequestPop, setBadRequestPop] = useState(false);

  const authContext = useContext(UserContext);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log(event.target.name);
    console.log(event.target.value);
    inputCheck(event);
  };

  function inputCheck(event) {
    if (event.target.name === "email") {
      let regex = new RegExp(/\S+@\S+\.\S+/);
      if (regex.test(event.target.value)) {
        setEmailPop(true);
        console.log(emailPop);
      } else {
        setEmailPop(false);
        console.log(emailPop);
      }
    } else if (event.target.name === "username") {
      let regex = new RegExp(/\S{3,200}/);
      if (regex.test(event.target.value)) {
        setUsernamePop(true);
      } else {
        setUsernamePop(false);
      }
    } else if (event.target.name === "lastname") {
      let regex = new RegExp(/\S{3,200}/);
      if (regex.test(event.target.value)) {
        setLastnamePop(true);
      } else {
        setLastnamePop(false);
      }
    } else if (event.target.name === "password") {
      let regex = new RegExp(/(\W|\S){8,200}/);
      if (regex.test(event.target.value)) {
        setPasswordPop(true);
      } else {
        setPasswordPop(false);
      }
    }
  }

  function allInputsValid() {
    return emailPop && usernamePop && lastnamePop && passwordPop;
  }

  const navigate = useNavigate();
  const [localVariable, setLocalVariable] = useState(false);

  async function submitHandler(event) {
    event.preventDefault();
    if (allInputsValid()) {
      let myvar = "";
      axios
        .post(
          "http://localhost:8080/api/v1/register",
          {
            email: formData.email,
            username: formData.username,
            lastname: formData.lastname,
            password: formData.password,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.status === 200) {
            //setToken(response.data.token);
            setBadRequestPop(false);
            //navigate("/Login");
            console.log("SUCCESFULY SUBMİTTED THE FORM");
            authContext.setAuthentication();
            setLocalVariable(true);
          } else {
            setBadRequestPop(true);
          }
        })
        .catch((err) => {
          console.log("error block started");
          console.log(err);
          setBadRequestPop(true);
        });
    } else {
      console.log("invalid inputs");
    }
  }

  useEffect(() => {
    if (localVariable === true) {
      localStorage.setItem("authenticated", `${localVariable}`);
      navigate("/Home");
    }
  }, [localVariable]);

  //usestate set method re-renders when it is safe to, before that it schedules re-render
  //so trying to get state of token after setToken doesnt change the state yet
  //thats wht console.log gives null inside submithandler but gives token at here
  //console.log(token);

  return (
    <div className="signup-outer-container">
      <div className="signup-inner-container">
        <div className="signup-content">
          <h1 className="heading">MyTodoApp</h1>
          <p className="text-content">Create and Share Your Todos</p>
          <div className="signup-with-google">
            <Link>
              <button className="signup-submit-button">
                <div className="gmail-inside-button">
                  <img
                    className="gmail-svg"
                    src={require("./gmail-svg.svg").default}
                  ></img>
                  Signup With Google
                </div>
              </button>
            </Link>
            <p className="signup-content-p">Or</p>
          </div>
          <form className="signup-form" onSubmit={submitHandler}>
            {badRequestPop ? <p>User Already Exists</p> : null}
            <div className="signup-input-group">
              <label className="signup-label">Email</label>
              <input
                name="email"
                type="text"
                placeholder=" email@****.com"
                className="signup-content-input"
                onChange={onChangeHandler}
              ></input>
              {!emailPop ? <p>wrong pattern</p> : <p></p>}
            </div>
            <div className="signup-input-group">
              <label className="signup-label">User Name</label>
              <input
                name="username"
                type="text"
                placeholder=" username"
                className="signup-content-input"
                onChange={onChangeHandler}
              ></input>
              {!usernamePop ? <p>too short or invalid characters</p> : null}
            </div>
            <div className="signup-input-group">
              <label className="signup-label">Lastname</label>
              <input
                name="lastname"
                type="text"
                placeholder=" lastname"
                className="signup-content-input"
                onChange={onChangeHandler}
              ></input>
              {!lastnamePop ? <p>too short or invalid characters</p> : null}
            </div>
            <div className="signup-input-group">
              <label className="signup-label">Password</label>
              <input
                name="password"
                type="password"
                placeholder=" password"
                className="signup-content-input"
                onChange={onChangeHandler}
              ></input>
              {!passwordPop ? <p>too short password</p> : null}
            </div>
            <input
              type="submit"
              value="Submit"
              className="signup-submit-button"
            ></input>
          </form>
          <div className="footer">
            <p className="paragraph-signup">You already have an account ?</p>
            <Link to="/Login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

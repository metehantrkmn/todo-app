import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [localVariable, setLocalVariable] = useState(false);
  const [emailPop, setEmailPop] = useState(true);
  const [passwordPop, setPasswordPop] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log(event.target.name);
    console.log(event.target.value);
  };

  var navigate = useNavigate();
  //navigate home if already authenticated
  useEffect(() => {
    if (localStorage.getItem("authenticated") === "true") {
      navigate("/Home");
    }
  }, []);

  async function submitHandler(event) {
    event.preventDefault();

    axios.defaults.withCredentials = true;
    axios
      .post(
        "http://localhost:8080/api/v1/authentication",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          //setToken(response.data.token);
          localStorage.setItem("authenticated", "true");
          navigate("/Home"); //test için
          setLocalVariable(true);
          console.log("SUCCESFULY SUBMİTTED THE AUTHENTICATION FORM");
        } else if (response.status === 404) {
          setEmailPop(false);
        } else if (response.status === 403) {
          setPasswordPop(false);
        }
      })
      .catch((err) => {
        console.log("error block started");
        console.log(err);
        //todo
      });
  }
  /* 
  useEffect(() => {
    if (localVariable === true) {
      localStorage.setItem("authenticated", "true");
      navigate("/Home");
    }
  }, [localVariable]);
 */
  return (
    <div className="signup-outer-container">
      <div className="signup-inner-container">
        <div className="signup-content">
          <h1 className="heading">MyTodoApp</h1>
          <form onSubmit={submitHandler}>
            <div className="signup-input-group">
              <label className="signup-label">Email</label>
              <input
                onChange={onChangeHandler}
                className="signup-content-input"
                type="text"
                name="email"
              ></input>
            </div>
            <div className="signup-input-group">
              <label className="signup-label">Password</label>
              <input
                onChange={onChangeHandler}
                className="signup-content-input"
                type="password"
                name="password"
              ></input>
            </div>
            <input
              type="submit"
              value="Submit"
              className="signup-submit-button"
            ></input>
          </form>
          <p className="login-p">Or</p>
          <div className="login-with-google">
            <Link>
              <button className="login-with-google-button">
                <div className="gmail-inside-button">
                  <img
                    className="gmail-svg"
                    src={require("./gmail-svg.svg").default}
                  ></img>
                  Signin With Google
                </div>
              </button>
            </Link>
          </div>
          <div className="login-footer">
            <p className="login-content-p">Dont have any account ?</p>
            <Link to="/Signup" replace>
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

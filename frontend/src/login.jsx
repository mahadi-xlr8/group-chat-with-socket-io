import React, { Component } from "react";
import "./style.css";
import { useState } from "react";
import axios from "axios";
import Signup from "./components/signup";
import LoginComponent from "./components/login";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");
  const [signup, setSignup] = useState(true);
  const [checkbox, setCheckbox] = useState(false);

  const setCockie = function (numberOfDaysToAdd = 0, accessToken) {
    var someDate = new Date();
    var result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);

    let temp = new Date(result).toUTCString();
    document.cookie = `accessToken=${accessToken}; expires= ${temp}`;
  };

  const handleSignup = () => {
    if (
      password === cpassword &&
      username.length >= 3 &&
      username.length <= 255 &&
      password.length >= 1
    ) {
      
      axios
        .post("/signup", {
          username,
          password,
        })
        .then((res) => {
          const token = res.headers["x-access-token"];
          const color = res.data.color;

          if (checkbox) {
            setCockie(30, token);
          }
          props.changeLogin(username, color);
          setUsername("");
          setPassword("");
          setcPassword("");
        })
        .catch((err) => console.log(err));
    }

    //let x = decodeURIComponent(document.cookie);
  };

  const handleLogin = () => {
    if (
      username.length >= 3 &&
      username.length <= 255 &&
      password.length >= 5 &&
      password.length <= 225
    ) {
      axios
        .post("/login", { username, password })
        .then((res) => {
          const token = res.headers["x-access-token"];
          if (checkbox) {
            setCockie(30, token);
          }
          const color = res.data.color;
          props.changeLogin(username, color);
          setUsername("");
          setPassword("");
          setcPassword("");
        })
        .catch((err) => console.error(err.message));
    }
  };

  return (
    <>
      <div className="body">
        <header className="login-header">
          <div
            className={signup ? "selected" : ""}
            onClick={() => setSignup(true)}
          >
            Signup
          </div>
          <div
            className={!signup ? "selected" : ""}
            onClick={() => setSignup(false)}
          >
            Login
          </div>
        </header>
        {signup ? (
          <Signup
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            cpassword={cpassword}
            setcPassword={setcPassword}
            checkbox={checkbox}
            setCheckbox={setCheckbox}
            handleLogin={handleSignup}
          />
        ) : (
          <LoginComponent
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            checkbox={checkbox}
            setCheckbox={setCheckbox}
            onClick={handleLogin}
          />
        )}
      </div>
    </>
  );
};

export default Login;

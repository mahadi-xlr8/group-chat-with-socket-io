import React, { Component } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");
  const handleLogin = () => {
    if (
      password === cpassword &&
      username.length >= 1 &&
      username.length <= 10
    ) {
      axios
        .post("/login", {
          username,
          password,
        })
        .then((res) => console.log("data added to the database!"))
        .catch((err) => console.log(err));
      var someDate = new Date();
      var numberOfDaysToAdd = 1;
      var result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);

      let temp = new Date(result).toUTCString();
      document.cookie = `username=${username}, password=${password}; expires= ${temp}`;
      props.changeLogin(username);
    }

    //let x = decodeURIComponent(document.cookie);
  };
  return (
    <>
      <div className="body">
        <header>Login Here</header>
        <main>
          <div className="username">
            <input
              type="text"
              name=""
              id=""
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="password">
            <input
              type="password"
              name=""
              id=""
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="password">
            <input
              type="password"
              name=""
              id=""
              placeholder="confirm password"
              value={cpassword}
              onChange={(e) => setcPassword(e.target.value)}
            />
          </div>
        </main>
        <button className="btn btn-login" onClick={handleLogin}>
          Login
        </button>
      </div>
    </>
  );
};

export default Login;

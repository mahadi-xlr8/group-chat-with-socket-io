import React, { Component } from "react";
import Login from "./login";
import Chat from "./chatPage";
import axios from "axios";
class App extends React.Component {
  state = {
    login: false,
    username: "",
  };
  constructor() {
    super();
  }
  validateUserLogin = () => {
    let cookie = document.cookie.split(",");
    const data = {};
    cookie.map((e, index) => {
      let temp = e.split("=");
      let name = "username";
      if (index === 1) {
        name = "password";
      }
      data[name] = temp[1];
    });
    axios
      .post("/login/validate", data)
      .then((res) => {
        if (res.data === true) {
          this.setState({ login: true, username: data.username });
        }
      })
      .catch((err) => console.log(err));
  };

  handleLogin = (username) => {
    this.setState({ login: true, username: username });
  };

  render() {
    this.validateUserLogin()
    return this.state.login ? (
      <Chat username={this.state.username} />
    ) : (
      <Login changeLogin={this.handleLogin} />
    );
  }
}

export default App;

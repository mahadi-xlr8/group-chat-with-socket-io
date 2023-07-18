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
    let cookie = document.cookie.split("=");
    const token = cookie[1];
    axios
      .post("/login/auto", { token })
      .then((res) => {
        this.setState({ username: res.data.username, login: true });
      })
      .catch((err) => console.error(err.message));
  }

  handleLogin = (username) => {
    this.setState({ login: true, username: username });
  };

  render() {
    return this.state.login ? (
      <Chat username={this.state.username} />
    ) : (
      <Login changeLogin={this.handleLogin} />
    );
  }
}

export default App;

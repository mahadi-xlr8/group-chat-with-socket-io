import React, { Component } from "react";
import Login from "./login";
import Chat from "./chatPage";
import axios from "axios";
class App extends React.Component {
  state = {
    login: false,
    username: "",
    color: "",
  };
  constructor() {
    super();
    axios.defaults.withCredentials=true;
    let cookie = document.cookie.split("=");
    const token = cookie[1];
    axios
      .post("/login/auto", { token })
      .then((res) => {
        console.log(res.data)
        this.setState({
          username: res.data.username,
          login: true,
          color: res.data.color,
        });
      })
      .catch((err) => console.error(err.message));
  }

  handleLogin = (username, color) => {
    this.setState({ login: true, username: username, color: color });
  };

  render() {
    return this.state.login ? (
      <Chat username={this.state.username} color={this.state.color}/>
    ) : (
      <Login changeLogin={this.handleLogin} />
    );
  }
}

export default App;

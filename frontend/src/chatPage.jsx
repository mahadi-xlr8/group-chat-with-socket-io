import React, { Component } from "react";
import io from "socket.io-client";
import "./style.css";
import ChatComponent from "./components/chatComponent";
import axios from "axios";
const socket = io("http://localhost:8080");
class Chat extends React.Component {
  state = {
    message: "",
    chat: [],
  };
  constructor() {
    axios
      .get("/chat/all")
      .then((res) => {
        this.setState({ chat: res.data });
      })
      .catch((err) => console.log(err));
    super();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.props.color)
    socket.emit("chat", {
      message: this.state.message,
      username: this.props.username,
      time: new Date().toLocaleString("en-US"),
      color: this.props.color,
    });
    this.setState({ message: "" });
  };
  render() {
    // const username = this.props.username;

    socket.on("chat", (data) => {
      const x = data;
      this.setState({ chat: [...this.state.chat, x] });
    });
    return (
      <div className="chating">
        <header>Chat app</header>
        <div className="text-field">
          {this.state.chat.map((value, index) => {
            return (
              <ChatComponent
                key={index}
                me={value.username === this.props.username}
                text={value.text}
                username={value.username}
                time={value.time}
                color={value.color}
              />
            );
          })}
        </div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="sent text"
            value={this.state.message}
            onChange={(e) => {
              this.setState({ message: e.target.value });
            }}
          />
          <button type="submit">send</button>
        </form>
      </div>
    );
  }
}

export default Chat;

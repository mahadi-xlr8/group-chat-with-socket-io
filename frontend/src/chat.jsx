import { useState, useEffect } from "react";
import io from "socket.io-client";
import "./style.css";


const socket = io("http://localhost:6969");


function Chat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [id, setId] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(message)
    socket.emit("chat", { message });
    setMessage("");
  };
  useEffect(() => {
    socket.on("getId", (id) => {
      setId(id);
    });
    socket.on("chat", (data) => {
      setChat([...chat,data])
    });
  });
  const other='red'
  const me='blue'
  return (
    <div className="App">
      <header>Chat app</header>
      <div className="text-field">
      {chat.map((value, index) => {
        return <p key={index} className={value.id==id?me:other}>{value.text}</p>;
      })}

      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="sent text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button type="submit">send</button>
      </form>
    </div>
  );
}

export default Chat;

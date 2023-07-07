const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const back = require("./server");
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
const fakeData = [];
io.on("connection", (socket) => {
  socket.on("chat", (data) => {
    const obj = {
      text: data.message,
      username: data.username,
      time: data.time,
    };
    async function temp() {
      await back.addText(obj.username, obj.text, obj.time);
    }
    temp()
    // fakeData.push(obj);
    io.emit("chat", obj);
    //console.log(obj)
  });
});

httpServer.listen(8080, () => console.log("listing on port 8080..."));

// backend api

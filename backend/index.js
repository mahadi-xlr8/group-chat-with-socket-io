const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const back = require("./server/db");
const app = express();
const route = require("./routes");
const config = require("config");
if (!config.get("jwtKey")) {
  console.error("jwt key is not set!");
  process.exit(1);
}
const httpServer = createServer(app);

app.use(express.json());
app.use("/", route);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
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
    temp();
    io.emit("chat", obj);
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("listening on port 5000..."));

httpServer.listen(8080, () => console.log("listing on port 8080..."));

// backend api

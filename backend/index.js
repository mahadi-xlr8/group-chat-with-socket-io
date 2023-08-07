require("express-async-errors");
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const helmet = require("helmet");
const config = require("config");
const { chats } = require("./server/db");
const app = express();
const route = require("./routes");
const compression = require("compression");
const error = require("./middleware/error");
const logger = require("./log/logger");

process.on("uncaughtException", (err) => {
  logger.error(err.message, err);
});
process.on("unhandledRejection", (err) => {
  logger.error(err.message, err);
});

require("./middleware/cors")(app);

if (!config.get("jwtKey")) {
  logger.info("jwt key is not set!");
  process.exit(1);
}
if (!config.get("dbPassword")) {
  logger.info("database Password is not set!");
  process.exit(1);
}
const httpServer = createServer(app);

app.use(express.json());
app.use("/", route);
app.use(error);
require("./middleware/prodSecurity")(app);

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
      color: data.color,
    };

    // TODO:
    async function temp() {
      const chat = new chats(obj);
      await chat.save();
    }
    temp();
    io.emit("chat", obj);
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => logger.info(`listening on port ${port}...`));

httpServer.listen(8080, () => logger.info("listing on port 8080..."));

// backend api

require("express-async-errors");
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { chats } = require("./db");
const app = express();
const route = require("./routes");
const error = require("./middleware/error");

process.on("uncaughtException", (err) => {
  console.error(err.message, err);
});
process.on("unhandledRejection", (err) => {
  console.error(err.message, err);
});

// const cors = require('cors');

// const allowedOrigins = ['http://localhost:3000'];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// }));

require("./middleware/cors")(app);

if (!process.env.groupChat_jwtKey) {
  console.log("jwt key is not set!");
  process.exit(1);
}
if (!process.env.groupChat_dbPassword) {
  console.log("database Password is not set!");
  process.exit(1);
}
const httpServer = createServer(app);

app.use(express.json());
app.use("/", route);
app.use(error);
require("./middleware/prodSecurity")(app);

const io = new Server(httpServer, {
  cors: {
    origin: ["https://deploy-mern-1whq.vercel.app","http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
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


httpServer.listen(port, async () => console.log(`listing on port ${port}...`));

// backend api

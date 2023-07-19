const express = require("express");
const app = express.Router();
const { chats, users } = require("./server/db");
const validateUser = require("./validation/validate");
const bcrypt = require("bcrypt");
const { validateToken } = require("./middleware/tokenCheck");
const colors = [
  "rgb(250, 229, 170)",
  "rgb(255, 193, 23)",
  "rgb(252, 210, 146)",
  "rgb(146, 231, 252)",
  "rgb(253, 198, 125)",
  "rgb(253, 133, 125)",
  "rgb(253, 125, 236)",
  "rgb(125, 253, 215)",
  "rgb(125, 155, 253)",
  "rgb(232, 222, 252)",
  "rgb(170, 127, 255)",
];
app.post("/signup", async (req, res) => {
  const validation = validateUser({
    username: req.body.username,
    password: req.body.password,
  });
  if (validation.error)
    return res.status(400).send(validation.error.details[0].message);

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);
  try {
    const color = colors[Math.floor(Math.random() * 10)];
    const user = new users({
      username: req.body.username,
      password: hash,
      color,
    });
    await user.save();
    res
      .header("x-access-token", user.genToken())
      .status(200)
      .json({color:user.color});
  } catch (err) {
    res.status(400).send("username already exist!");
  }
});

app.post("/login", async (req, res) => {
  const validation = validateUser({
    username: req.body.username,
    password: req.body.password,
  });
  if (validation.error) {
    return res.status(400).send(validation.error.details[0].message);
  }
  const user = await users.findOne({ username: req.body.username });
  if (!user) {
    return res.status(401).send("Invalid User!");
  }
  const decodedPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (decodedPassword) {
    res
      .header("x-access-token", user.genToken())
      .status(200)
      .send({ username: user.username, color: user.color });
  } else res.status(400).send("Invalid Username or Password!");
});

app.post("/login/auto", validateToken, async (req, res) => {
  const id = req.user.id;
  const user = await users.findById(id);
  if (!user) {
    return res.status(400).send("Invalid access token!");
  }
  res.status(200).send({ username: user.username, color: user.color });
});

app.get("/chat/all", async (req, res) => {
  const chatList = await chats.find();
  res.status(200).json(chatList);
});

module.exports = app;

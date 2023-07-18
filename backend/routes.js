const express = require("express");
const app = express.Router();
const { chats, users } = require("./server/db");
const validateUser = require("./validation/validate");
const bcrypt = require("bcrypt");
const { validateToken } = require("./middleware/tokenCheck");
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
    const user = new users({
      username: req.body.username,
      password: hash,
    });
    await user.save();
    res
      .header("x-access-token", user.genToken())
      .status(200)
      .send("new user added!");
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
      .send({ username: user.username });
  } else res.status(400).send("Invalid Username or Password!");
});

app.post("/login/auto", validateToken, async (req, res) => {
  const id = req.user.id;
  const user = await users.findById(id);
  if (!user) {
    return res.status(400).send("Invalid access token!");
  }
  res.status(200).send({ username: user.username });
});

app.get("/chat/all", async (req, res) => {
  const chatList = await chats.find();
  res.status(200).json(chatList);
});

module.exports = app;

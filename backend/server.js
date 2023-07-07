const Mongoose = require("mongoose");
Mongoose.connect("mongodb://localhost/groupChat")
  .then(() => console.log("connected to the database"))
  .catch((err) => console.error(err));

const Data = Mongoose.model(
  "chats",
  new Mongoose.Schema({
    text: String,
    time: String,
    username: String,
  })
);
const Login = Mongoose.model(
  "credentials",
  new Mongoose.Schema({
    username: String,
    password: String,
  })
);
async function addText(username, text, time) {
  const data = new Data({
    text,
    time,
    username,
  });
  await data.save();
}
async function getText() {
  return await Data.find();
}
async function addUser(username, password) {
  const user = new Login({ username, password });
  await user.save();
}
async function validateUser(username, password) {
  const data = await Login.find({ username: username, password: password });
  return data.length >= 1;
}

module.exports.addText = addText;
module.exports.getText = getText;
module.exports.addUser = addUser;
module.exports.validateUser = validateUser;

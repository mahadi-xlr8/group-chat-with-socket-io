const { credentials } = require("./db");
const bcrypt = require("bcrypt");
const validate = require("../validation/validate");

async function addUser(user) {
  try {
    const newUser = new credentials(user);
    newUser.save();
    return "new user added successfully!";
  } catch (err) {
    return err.message;
  }
}

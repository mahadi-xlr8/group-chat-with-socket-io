const Mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const password = process.env.groupChat_dbPassword;
const dbUrl = `mongodb+srv://mahadi:${password}@cluster0.dhjpz4e.mongodb.net/groupChat?retryWrites=true&w=majority`;
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
};
Mongoose.connect(dbUrl, connectionParams)
  .then(() => console.log("connected to the database"))
  .catch((err) => console.error(err));

const Chats = Mongoose.model(
  "chats",
  new Mongoose.Schema({
    text: String,
    time: String,
    username: String,
    color: String,
  })
);

const userSchema = new Mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 100,
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 1024,
    required: true,
  },
  color: {
    type: String,
    minlength: 6,
    maxlength: 255,
    required: true,
  },
});

userSchema.methods.genToken = function () {
  return jwt.sign({ id: this._id }, process.env.groupChat_jwtKey);
};

const Users = Mongoose.model("credentials", userSchema);

module.exports.chats = Chats;
module.exports.users = Users;

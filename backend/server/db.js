const Mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const dbUrl =
  "mongodb+srv://mahadi:ird7uiHzKgKrLVgK@cluster-0.zwggrxs.mongodb.net/groupChat?retryWrites=true&w=majority";
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true, //make this also true
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
});

userSchema.methods.genToken = function () {
  return jwt.sign({ id: this._id }, config.get("jwtKey"));
};

const Users = Mongoose.model("credentials", userSchema);

async function getUser(){
  return await Users.find()
}

module.exports.getUser=getUser
module.exports.chats = Chats;
module.exports.users = Users;

const jwt = require("jsonwebtoken");
const config = require("config");
const joi=require('joi')

const validateToken = function (req, res, next) {
  const token = req.header("x-access-token");
  if (!token) res.status(401).send("no token provided!");

  try {
    const validation = jwt.verify(token, config.get("jwtKey"));
    req.user = validation;
    next();
  } catch (err) {
    return res.status(400).send("Invalid access token!");
  }
};

module.exports.validateToken=validateToken;

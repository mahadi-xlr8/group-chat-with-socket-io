const joi = require("joi");

function validateUser(user) {
  const schema = joi.object({
    username: joi.string().min(3).max(255).required(),
    password: joi.string().min(6).max(255).required(),
  });
  return schema.validate(user);
}
module.exports = validateUser;

const logger = require("../log/logger");
module.exports = function (err, req, res, next) {
  logger.error(err.message, err);
  res.status(500).send("something went wrong!");
};

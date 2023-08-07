const cors = require("cors");
module.exports = function (app) {
  app.use(
    cors({
      origin: ["https://deploy-mern-1whq.vercel.app"],
      methods: ["POST", "GET"],
      credentials: true,
    })
  );
};

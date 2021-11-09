const debug = require("debug")("roobot:server:index");
const chalk = require("chalk");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const userRoutes = require("./routes/usersRoutes");
const roobotRoutes = require("./routes/roobotRoutes");
const handlerError = require("./middleware/error");

const app = express();

const initializeServer = (port) => {
  // levanto servidor
  const server = app.listen(port, () => {
    debug(chalk.green(`Lisent the port: ${port}`));
  });
  server.on("error", (error) => {
    debug(chalk.red("Error initialitze sever"));
    if (error.code === "EADDRINUSE") {
      debug.chalk.red(`This port: ${port} is used now`);
    }
  });
};
// primer middleware
app.use(morgan("dev"));
// dejara pasar si le gusta el origen
app.use(cors());
// este modifica la request , lee la req i mete en el body
app.use(express.json());

app.use("/robots", roobotRoutes);
app.use("/user", userRoutes);
app.use(handlerError);

module.exports = initializeServer;

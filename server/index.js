const debug = require("debug")("roobot:server:index");
const chalk = require("chalk");
const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const roobotRoutes = require("./routes/roobotRoutes");

const app = express();

const initializeServer = (port) => {
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

app.use(morgan("dev"));
app.use(express.json());
app.use((req, res, next) => {
  debug("I'm a happy roobot!!!");
  next();
});

app.use("/robots", roobotRoutes);

module.exports = initializeServer;

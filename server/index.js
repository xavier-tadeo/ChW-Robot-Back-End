const debug = require("debug")("roobot:server:index");
const chalk = require("chalk");
const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");

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

module.exports = initializeServer;

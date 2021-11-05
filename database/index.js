const debug = require("debug")("roobot:database:index");
const chalk = require("chalk");
const mongoose = require("mongoose");

const connectDB = () =>
  new Promise((resolve, reject) => {
    mongoose.connect(process.env.MONGODB_STRING, (error) => {
      if (error) {
        debug(chalk.bgBlue.red.bold("Don't initialize database"));
        debug(chalk.red(error.message));
        reject();
        return;
      }
      debug(chalk.bgBlue.yellow("Conecting initialize database"));
      resolve();
    });
  });

module.exports = connectDB;

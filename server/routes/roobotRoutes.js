const express = require("express");

const roobotRoutes = express.Router();

const roobot = 32;

roobotRoutes.get("/", async (req, res) => {
  const roobotBot = 42;
  res.json(roobotBot);
});

module.exports = roobotRoutes;

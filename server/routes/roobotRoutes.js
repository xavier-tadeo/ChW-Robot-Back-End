const express = require("express");
const Roobot = require("../../database/models/roobotModel");

const roobotRoutes = express.Router();

roobotRoutes.get("/", async (req, res) => {
  const roobotBot = await Roobot.find();
  res.json(roobotBot);
});

roobotRoutes.post("/", async (req, res, next) => {
  try {
    const roobot = req.body;
    const newRoobot = await Roobot.create(roobot);
    res.json(newRoobot);
  } catch (error) {
    error.code = 400;
    error.message = "You can't create roobot";
    next(error);
  }
});

module.exports = roobotRoutes;

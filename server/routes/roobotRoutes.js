const express = require("express");
const {
  getRoobots,
  postRoobot,
  getRoobotById,
} = require("../controller/roobotController");

const roobotRoutes = express.Router();

roobotRoutes.get("/", getRoobots);

roobotRoutes.post("/", postRoobot);

roobotRoutes.get("/:idRobot", getRoobotById);

module.exports = roobotRoutes;

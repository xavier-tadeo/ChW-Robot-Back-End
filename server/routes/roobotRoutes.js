const express = require("express");
const {
  getRoobots,
  postRoobot,
  getRoobotById,
} = require("../controller/roobotController");
const middlewareTooken = require("../middleware/roobotMiddleware");

const roobotRoutes = express.Router();

roobotRoutes.get("/", getRoobots);

roobotRoutes.post(
  "/create",

  middlewareTooken,
  postRoobot
);

roobotRoutes.get("/:idRobot", getRoobotById);

module.exports = roobotRoutes;

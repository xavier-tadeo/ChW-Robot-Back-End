const express = require("express");
const { getRoobots, postRoobot } = require("../controller/roobotController");

const roobotRoutes = express.Router();

roobotRoutes.get("/", getRoobots);

roobotRoutes.post("/", postRoobot);

module.exports = roobotRoutes;

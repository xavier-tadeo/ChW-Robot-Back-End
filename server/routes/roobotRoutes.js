const express = require("express");
const { getRoobots, postRoobots } = require("../controller/roobotController");

const roobotRoutes = express.Router();

roobotRoutes.get("/", getRoobots);

roobotRoutes.post("/", postRoobots);

module.exports = roobotRoutes;

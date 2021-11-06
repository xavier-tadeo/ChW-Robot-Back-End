const express = require("express");
const {
  getRoobots,
  postRoobot,
  getRoobotById,
} = require("../controller/roobotController");

const roobotRoutes = express.Router();

const middlewareTooken = (req, res, next) => {
  if (req.query.token === process.env.TOOKEN) {
    next();
  } else {
    const error = new Error();
    error.code = 401;
    error.message = "Your not autoritzate";
    next(error);
  }
};

roobotRoutes.get("/", getRoobots);

roobotRoutes.post("/create", middlewareTooken, postRoobot);

roobotRoutes.get("/:idRobot", getRoobotById);

module.exports = roobotRoutes;

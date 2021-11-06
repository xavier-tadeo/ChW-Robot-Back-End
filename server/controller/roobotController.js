const Roobot = require("../../database/models/roobotModel");

const getRoobots = async (req, res) => {
  const roobotBot = await Roobot.find();
  res.json(roobotBot);
};

const postRoobot = async (req, res, next) => {
  try {
    const roobot = req.body;
    const newRoobot = await Roobot.create(roobot);
    res.json(newRoobot);
  } catch (error) {
    error.code = 400;
    error.message = "You can't create roobot";
    next(error);
  }
};

const getRoobotById = async (req, res, next) => {
  const { idRobot } = req.params;
  try {
    const searchedRoobot = await Roobot.findById(idRobot);
    if (searchedRoobot) {
      res.json(searchedRoobot);
    } else {
      const error = new Error("This id does not match");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    next(error);
  }
};

module.exports = {
  getRoobots,
  postRoobot,
  getRoobotById,
};

const Roobot = require("../../database/models/roobotModel");

const getRoobots = async (req, res) => {
  const roobotBot = await Roobot.find();
  res.json(roobotBot);
};

const postRoobots = async (req, res, next) => {
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

module.exports = {
  getRoobots,
  postRoobots,
};

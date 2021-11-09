const bcrypt = require("bcrypt");
const debug = require("debug")("roobot:server:index");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/user");

const loginUser = async (req, res, next) => {
  debug(req.body);
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      const error = new Error("Don t authoriiiiiitze");

      error.code = 401;
      next(error);
    } else {
      const authPassword = await bcrypt.compare(password, user.password);
      if (!authPassword) {
        console.log("Aqui");
        const error = new Error("Don t authoritze");
        console.log("Hola rei");
        error.code = 404;
        next(error);
      } else {
        const token = jwt.sign({ password }, "secret");
        res.json({ token });
      }
    }
  } catch (error) {
    console.log("message error");
  }
};

module.exports = loginUser;

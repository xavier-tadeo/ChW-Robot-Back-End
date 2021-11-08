const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/user");

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    console.log(username, password);
    const user = await User.findOne({ username });

    if (!user) {
      const error = new Error("Don t authoriiiiiitze");
      error.code = 404;
      next(error);
    } else {
      const authPassword = await bcrypt.compare(password, user.password);
      if (!authPassword) {
        const error = new Error("Don t authoritze");
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

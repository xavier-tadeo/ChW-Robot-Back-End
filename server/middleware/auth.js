const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    const error = new Error("No estas registrado");
    error.code = 401;
    next(error);
  } else {
    const token = authHeader.split("")[1];
    if (!token) {
      const error = new Error("Token incorrecto");
      error.code = 401;
      next(error);
    } else {
      try {
        const user = jwt.verify(token, process.env.SECRET);
        req.userId = user.id;
        next();
      } catch (error) {
        error.message = "Token incorrecto";
        error.code = 401;
        next(error);
      }
    }
  }
};

module.exports = auth;

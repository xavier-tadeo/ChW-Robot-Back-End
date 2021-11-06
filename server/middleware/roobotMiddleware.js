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

module.exports = middlewareTooken;

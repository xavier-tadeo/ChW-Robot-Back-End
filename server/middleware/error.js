const { ValidationError } = require("express-validation");

// eslint-disable-next-line no-unused-vars
const handlerError = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    err.code = 400;
    err.message = "Nopots entrar";
  }
  // const { message } = err;
  return res.status(err.code ?? 500).json(err);
};

module.exports = handlerError;

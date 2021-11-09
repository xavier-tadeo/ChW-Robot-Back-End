const express = require("express");
const { validate } = require("express-validation");
require("dotenv").config();
const loginUser = require("../controller/usersControllers");
const userLoginValidation = require("../schemas/userSchemas");

const router = express.Router();

router.post("/", validate(userLoginValidation), loginUser);

module.exports = router;

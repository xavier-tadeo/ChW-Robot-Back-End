const express = require("express");
require("dotenv").config();
const loginUser = require("../controller/usersControllers");

const router = express.Router();

router.post("/", loginUser);

module.exports = router;

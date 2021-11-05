require("dotenv").config();
const initializeServer = require("./server/index");

const port = process.env.PORT ?? 4597;

initializeServer(port);

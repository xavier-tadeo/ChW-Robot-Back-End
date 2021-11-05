require("dotenv").config();
const connectDB = require("./database/index");
const initializeServer = require("./server/index");

const port = process.env.PORT ?? 4597;

(async () => {
  try {
    await connectDB();
    initializeServer(port);
  } catch (error) {
    process.exit(1);
  }
})();

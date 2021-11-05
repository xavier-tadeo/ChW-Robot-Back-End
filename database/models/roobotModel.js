const { Schema, model } = require("mongoose");

const roobotSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  speed: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  endurance: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  creationDate: {
    type: String,
    required: true,
  },
});

const Roobot = model("Roobot", roobotSchema);

module.exports(Roobot);

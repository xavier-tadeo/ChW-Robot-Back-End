import { datatype, image, lorem, name } from "faker";

const { Factory } = require("fishery");

const factoryRoobot = Factory.define(({ sequence }) => ({
  id: sequence,
  name: name.firstName,
  imageSource: image.imageUrl,
  features: {
    speed: datatype.number({
      min: 0,
      max: 10,
    }),
    endurance: datatype.number({ min: 0, max: 10 }),
    creationDate: lorem.word,
  },
}));

const getRoobots = (total = 5) => factoryRoobot.buildList(total);

const getRoobot = (onlyOne = 1) => factoryRoobot.build(onlyOne);

module.exports = {
  getRoobot,
  getRoobots,
};

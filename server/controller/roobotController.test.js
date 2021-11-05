const Roobot = require("../../database/models/roobotModel");

const { getRoobots } = require("./roobotController");

jest.mock("../../database/models/roobotModel.js");

describe("Given a getRoobot function", () => {
  describe("When it receives a object res", () => {
    test("Then it should invoke the method json", async () => {
      const roobot = [
        {
          name: "C2P2",
          imageSource: "url",
          features: {
            speed: 10,
            endurance: 2,
            creationDate: "1110",
          },
        },
      ];
      Roobot.find = jest.fn().mockResolvedValue(roobot);
      const res = {
        json: jest.fn(),
      };

      await getRoobots(null, res);

      expect(Roobot.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(roobot);
    });
  });
});

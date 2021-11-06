const Roobot = require("../../database/models/roobotModel");
const {
  getRandoomRoobot,
  getRandoomRoobots,
} = require("../../mocks/factories");

const { getRoobots, getRoobotById, postRoobot } = require("./roobotController");

jest.mock("../../database/models/roobotModel.js");

let roobot;
let roobots;

beforeAll(() => {
  roobot = getRandoomRoobot();
  roobots = getRandoomRoobots();
});

describe("Given a getRoobot function", () => {
  describe("When it receives a object res", () => {
    test("Then it should invoke the method json", async () => {
      Roobot.find = jest.fn().mockResolvedValue(roobots);
      const res = {
        json: jest.fn(),
      };

      await getRoobots(null, res);

      expect(Roobot.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(roobots);
    });
  });
});

describe("Given a getRoobotById function", () => {
  describe("When it receives a request with id 10, a res object and next function", () => {
    test("Then it should invoke Roobot.ById with a 10", async () => {
      Roobot.findById = jest.fn().mockResolvedValue({});
      const idRobot = 10;
      const req = {
        params: {
          idRobot,
        },
      };
      const res = {
        json: () => {},
      };
      const next = () => {};

      await getRoobotById(req, res, next);

      expect(Roobot.findById).toBeCalledWith(idRobot);
    });
  });
  describe("When Roobot.findById rejects", () => {
    test("Then it should invoke the next function with the error rejected", async () => {
      const error = {};
      Roobot.findById = jest.fn().mockRejectedValue(error);
      const req = {
        params: {
          idRobot: 10,
        },
      };
      const res = {};
      const next = jest.fn();

      await getRoobotById(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(error.code).toBe(400);
    });
  });
  describe("When Roobot.findById resolves a C2P2", () => {
    test("Then should res.json with C2P2", async () => {
      const idRobot = roobots[0].id;

      Roobot.findById = jest.fn().mockResolvedValue(roobot);
      const req = {
        params: {
          idRobot,
        },
      };
      const res = {
        json: jest.fn(),
      };

      await getRoobotById(req, res);

      expect(res.json).toHaveBeenCalledWith(roobot);
    });
  });
});

describe("Given a postRoobot function", () => {
  describe("When it receives a roobot object", () => {
    test("The it should invoke the method json to create the roobot", async () => {
      Roobot.create = jest.fn().mockResolvedValue(roobot);
      const res = {
        json: jest.fn(),
      };
      const req = {
        body: roobot,
      };

      await postRoobot(req, res);

      expect(Roobot.create).toHaveBeenCalled();
      expect(Roobot.create).toHaveBeenCalledWith(roobot);
    });
  });
  describe("When Roobot.create reject", () => {
    test("Then it should invoke the next function with the error rejected", async () => {
      const error = {};
      Roobot.create = jest.fn().mockRejectedValue(error);
      const req = {
        body: roobot,
      };
      const res = { json: jest.fn() };
      const next = jest.fn();

      await postRoobot(req, res, next);

      expect(Roobot.create).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });
    test("Then it should invoke the next function with the error.code 400", async () => {
      const error = {};
      Roobot.create = jest.fn().mockRejectedValue(error);
      const req = {
        body: roobot,
      };
      const res = { json: jest.fn() };
      const next = jest.fn();

      await postRoobot(req, res, next);

      expect(error.code).toBe(400);
    });
  });
});

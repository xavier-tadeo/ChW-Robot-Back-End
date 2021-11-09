require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../database/models/user");

const loginUser = require("./usersControllers");

jest.mock("../../database/models/user");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("Given a loginUser function", () => {
  describe("When it receives wrong usrname", () => {
    test("Then it should invoke next function with an 401 error", async () => {
      const req = {
        body: {
          username: "luis",
          password: "luis",
        },
      };
      const res = {};

      User.findOne = jest.fn().mockResolvedValue(false);
      const error = new Error("Don t authoriiiiiitze");
      error.code = 401;
      const next = jest.fn();

      await loginUser(req, res, next);

      expect(User.findOne).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });
  describe("When it receives a correct username and wrong authpassaport", () => {
    test("It should respond with next function with error", async () => {
      const req = {
        body: {
          username: "Arlet",
          password: "Arl",
        },
      };
      const res = {};

      User.findOne = jest.fn().mockResolvedValue({
        username: "Arlet",
        password: "Arlet",
      });
      const next = jest.fn();

      bcrypt.compare = jest.fn().mockResolvedValue(false);
      const error = new Error("Don t authoritze");
      error.code = 404;

      await loginUser(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
  describe("When it receives a true username and true password", () => {
    test("It should invoke res.json with token", async () => {
      const req = {
        body: {
          username: "Arlet",
          password: "Arlet",
        },
      };
      const res = {
        json: jest.fn(),
      };

      User.findOne = jest.fn().mockResolvedValue({
        username: "Arlet",
        password: "Arlet",
      });
      // const next = jest.fn();

      bcrypt.compare = jest.fn().mockResolvedValue(true);
      const expectedToken = "Arlet";
      jwt.sing = jest.fn().mockReturnValue(expectedToken);

      const expectedResponse = {
        token: "Arlet",
      };

      await loginUser(req, res, null);

      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });
});

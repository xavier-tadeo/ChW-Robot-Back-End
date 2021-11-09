const loginUser = require("./usersControllers");

jest.mock("./usersControllers.js");

describe("Given a loginUser function", () => {
  describe("When it receives wrong usrname", () => {
    test("Then it should invoke next function with an 401 error", async () => {
      User.findOne = jest.fn().mockResolvedValue(null);
      const req = {
        body: {
          username: "luis",
          password: "luis",
        },
      };
      const next = jest.fn();

      await loginUser(req, null, next);
    });
  });
});

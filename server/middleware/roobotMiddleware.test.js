const middlewareTooken = require("./roobotMiddleware");

describe("Given the middlewareTooken function", () => {
  describe("When it receives the correct token query", () => {
    test("Then it invokes the next function", () => {
      const req = { query: { token: process.env.TOOKEN } };
      const res = {};
      const next = jest.fn();

      middlewareTooken(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
  describe("When it receives the incorrect token query", () => {
    test("Then it invokes the next function with error", () => {
      const req = { query: { token: process.env } };
      const res = {};
      const next = jest.fn();
      const error = new Error("Your not autoritzate");

      middlewareTooken(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

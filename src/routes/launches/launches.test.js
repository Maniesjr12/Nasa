const request = require("supertest");
const app = require("../../app");
const {
  mongooseConnect,
  mongooseDisconnect,
} = require("../../services/mongodb");

describe("Testing launch API", () => {
  beforeAll(async () => {
    await mongooseConnect();
  }, 10000);
  afterAll(async () => {
    await mongooseDisconnect();
  }, 20000);
  describe("Test GET /launches", () => {
    test("It should respond with 200 success", async () => {
      const response = await request(app)
        .get("/v1/launches")
        .expect(200)
        .expect("Content-Type", /json/);
    });
  });

  describe("Test POST /launches", () => {
    const objectWitoutDate = {
      mission: "Newone123",
      rocket: "ZTMISS6",
      target: "Kepler-62 f",
    };
    const objectWithInvalidDate = {
      mission: "Newone123",
      rocket: "ZTMISS6",
      target: "Kepler-62 f",
      launchDate: "januamand34ry, 12 2023",
    };

    const objectWithDate = {
      mission: "Newone123",
      rocket: "ZTMISS6",
      target: "Kepler-62 f",
      launchDate: "january, 12 2023",
    };
    test("It should respond with 201 success", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(objectWithDate)
        .expect(201)
        .expect("Content-Type", /json/);

      const requestDate = new Date(objectWithDate.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
      expect(requestDate).toBe(responseDate);
      expect(response.body).toMatchObject(objectWitoutDate);
    });
    test("It should catch missing required", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(objectWitoutDate)
        .expect(400)
        .expect("Content-Type", /json/);

      expect(response.body).toStrictEqual({
        error: "Missing required launch property",
      });
    });

    test("it should catch invalid dates", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(objectWithInvalidDate)
        .expect(400)
        .expect("Content-Type", /json/);

      expect(response.body).toStrictEqual({
        error: "invalid date property property",
      });
    });
  });
});

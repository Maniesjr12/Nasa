const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches", () => {
  test("It should respond with 200 success", async () => {
    const response = await request(app)
      .get("/launches")
      .expect(200)
      .expect("Content-Type", /json/);
  });
});

describe("Test POST /launches", () => {
  test("It should respond with 201 success", async () => {
    await request(app)
      .post("/launches")
      .send({
        mission: "Newone123",
        rocket: "ZTMISS6",
        target: "KPS142",
        launchDate: "january, 12 2023",
      })
      .expect(201)
      .expect("Content-Type", /json/);
  });
});

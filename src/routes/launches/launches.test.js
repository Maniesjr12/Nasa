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
    const objectWithDate = {
      mission: "Newone123",
      rocket: "ZTMISS6",
      target: "KPS142",
      launchDate: "january, 12 2023",
    };
    const objectWitoutDate = {
      mission: "Newone123",
      rocket: "ZTMISS6",
      target: "KPS142",
    };

    const response = await request(app)
      .post("/launches")
      .send(objectWithDate)
      .expect(201)
      .expect("Content-Type", /json/);

    const requestDate = new Date(objectWithDate.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(requestDate).toBe(responseDate);
    expect(response.body).toMatchObject(objectWitoutDate);
  });
});

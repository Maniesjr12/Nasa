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
  const objectWitoutDate = {
    mission: "Newone123",
    rocket: "ZTMISS6",
    target: "KPS142",
  };
  const objectWithInvalidDate = {
    mission: "Newone123",
    rocket: "ZTMISS6",
    target: "KPS142",
    launchDate: "januamand34ry, 12 2023",
  };

  const objectWithDate = {
    mission: "Newone123",
    rocket: "ZTMISS6",
    target: "KPS142",
    launchDate: "january, 12 2023",
  };
  test("It should respond with 201 success", async () => {
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
  test("It should catch missing required", async () => {
    const response = await request(app)
      .post("/launches")
      .send(objectWitoutDate)
      .expect(400)
      .expect("Content-Type", /json/);

    expect(response.body).toStrictEqual({
      error: "Missing required launch property",
    });
  });

  test("it should catch invalid dates", async () => {
    const response = await request(app)
      .post("/launches")
      .send(objectWithInvalidDate)
      .expect(400)
      .expect("Content-Type", /json/);

    expect(response.body).toStrictEqual({
      error: "invalid date property property",
    });
  });
});

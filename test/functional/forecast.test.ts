import supertest from "supertest";

describe("Beach forecast functional testes", () => {
  it("should return a forecast with just a times", async () => {
    const { body, status } = await supertest(app).get("/forecast");
    expect(status).toBe(200);
    expect(body).toBe([{}]);
  });
});

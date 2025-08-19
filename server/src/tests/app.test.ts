import request from "supertest";
import app from "../app";

describe("App Routes", () => {
  it("GET / should return health check", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "ok" });
  });

  it("GET /api/v1/nonexistent should return 404", async () => {
    const res = await request(app).get("/api/v1/nonexistent");
    expect(res.status).toBe(404);
  });
});

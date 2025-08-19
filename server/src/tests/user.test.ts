import request from "supertest";
import app from "../app";
import { UserService } from "../services/userServices";

// Mock service
jest.mock("../services/userServices");
const MockedUserService = UserService as jest.MockedClass<typeof UserService>;

describe("User Routes", () => {
  beforeEach(() => {
    // Reset mocks before each test
    MockedUserService.mockClear();
  });

  it("GET /api/v1/users/getUser should return logged-in user", async () => {
    MockedUserService.prototype.getUserById.mockResolvedValueOnce({
      id: "xy2Uoi0qwS",
      username: "TestUser",
    } as any);

    const res = await request(app).get("/api/v1/users/getUser");

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual(
      expect.objectContaining({ username: "TestUser" })
    );
  });

  it("GET /api/v1/users/users should return all users except logged in user", async () => {
    MockedUserService.prototype.getAllUsers.mockResolvedValueOnce([
      { id: "xy2Uoi0qwSc1", username: "alice" },
      { id: "xy2Uoi0qwSc2", username: "bob" },
    ] as any);

    const res = await request(app).get("/api/v1/users/users");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(2);
  });
});

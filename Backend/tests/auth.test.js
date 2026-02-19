import request from "supertest";
import app from "../app.js"; // your express app
import { connectDB, closeDB, clearDB } from "./setup.js";

beforeAll(connectDB);
afterEach(clearDB);
afterAll(closeDB);

describe("Auth Routes", () => {
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        username: "testuser",
        firstName: "Test",
        lastName: "User",
        email: "test@example.com",
        phoneNumber: "9876543210",
        rollNo: "CEG123",
        password: "Password123",
        userType: "CEG",
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.user).toHaveProperty("T_ID");
  });

  it("should login a registered user", async () => {
    await request(app).post("/api/auth/register").send({
      username: "testuser",
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
      phoneNumber: "9876543210",
      rollNo: "CEG123",
      password: "Password123",
      userType: "CEG",
    });

    const res = await request(app).post("/api/auth/login").send({
      username: "testuser",
      password: "Password123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});

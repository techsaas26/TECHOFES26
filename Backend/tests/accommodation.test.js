import request from "supertest";
import app from "../app.js";
import User from "../models/User.js";
import { connectDB, closeDB, clearDB } from "./setup.js";

beforeAll(connectDB);
afterEach(clearDB);
afterAll(closeDB);

describe("Accommodation Routes", () => {
  let userId, token;

  beforeEach(async () => {
    const userRes = await request(app).post("/api/auth/register").send({
      username: "accuser",
      firstName: "Acc",
      lastName: "User",
      email: "accuser@example.com",
      phoneNumber: "9876543213",
      rollNo: "CEG125",
      password: "Password123",
      userType: "CEG",
    });
    userId = userRes.body.user._id;

    const loginRes = await request(app).post("/api/auth/login").send({
      username: "accuser",
      password: "Password123",
    });
    token = loginRes.body.token;
  });

  it("should request accommodation", async () => {
    const res = await request(app)
      .post("/api/accommodation/request")
      .set("Authorization", `Bearer ${token}`)
      .send({ userId, gender: "MALE", noOfNights: 3 });

    expect(res.statusCode).toBe(201);
    expect(res.body.accommodation).toHaveProperty("user");
  });
});

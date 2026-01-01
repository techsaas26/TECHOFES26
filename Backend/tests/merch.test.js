import request from "supertest";
import app from "../app.js";
import User from "../models/User.js";
import MerchOrder from "../models/MerchOrder.js";
import { connectDB, closeDB, clearDB } from "./setup.js";

beforeAll(connectDB);
afterEach(clearDB);
afterAll(closeDB);

describe("Merch Routes", () => {
  let token;

  beforeEach(async () => {
    await request(app).post("/api/auth/register").send({
      username: "merchuser",
      firstName: "Merch",
      lastName: "User",
      email: "merchuser@example.com",
      phoneNumber: "9876543212",
      rollNo: "CEG125",
      password: "Password123",
      userType: "CEG",
    });

    const loginRes = await request(app).post("/api/auth/login").send({
      username: "merchuser",
      password: "Password123",
    });

    token = loginRes.body.token;
  });

  it("should create a merch purchase", async () => {
    const res = await request(app)
      .post("/api/merchandise/purchase")
      .set("Authorization", `Bearer ${token}`)
      .send({
        purchaseType: "SINGLE_SHIRT",
        sizes: [{ size: "M", quantity: 1 }],
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("razorpayOrder");
    expect(res.body.merch.paymentStatus).toBe("PENDING");
  });
});

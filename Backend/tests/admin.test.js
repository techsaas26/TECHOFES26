import request from "supertest";
import bcrypt from "bcrypt";
import app from "../app.js";
import User from "../models/User.js";
import { connectDB, closeDB, clearDB } from "./setup.js";

beforeAll(connectDB);
afterEach(clearDB);
afterAll(closeDB);

describe("Admin Routes", () => {
  let adminToken;

  beforeEach(async () => {
    // manually create admin in DB
    const passwordHash = await bcrypt.hash("Password123", 10);
    await User.create({
      username: "admin",
      firstName: "Admin",
      lastName: "User",
      email: "admin@example.com",
      rollNo: "CEG125",
      phoneNumber: "9999999999",
      passwordHash,      // hashed password
      userType: "admin",
      T_ID: "001ADMIN",  // matches adminExtractor
    });

    // login as admin
    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "admin", password: "Password123" });

    adminToken = res.body.token; // should now be valid
  });

  it("should get all users", async () => {
    const res = await request(app)
      .get("/api/admin/users")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should get total registrations", async () => {
    const res = await request(app)
      .get("/api/admin/totalregistrations")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("totalRegistrations");
  });
});

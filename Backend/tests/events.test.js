import request from "supertest";
import app from "../app.js";
import User from "../models/User.js";
import Event from "../models/Event.js";
import { connectDB, closeDB, clearDB } from "./setup.js";

beforeAll(connectDB);
afterEach(clearDB);
afterAll(closeDB);

describe("Event Routes", () => {
  let token;
  beforeEach(async () => {
    const userRes = await request(app).post("/api/auth/register").send({
      username: "eventuser",
      firstName: "Event",
      lastName: "User",
      email: "eventuser@example.com",
      phoneNumber: "9876543211",
      rollNo: "CEG124",
      password: "Password123",
      userType: "CEG",
    });
    const loginRes = await request(app).post("/api/auth/login").send({
      username: "eventuser",
      password: "Password123",
    });
    token = loginRes.body.token;

    await Event.create({
      title: "Sample Event",
      club: "Tech Club",
      imgUrl: "https://example.com/img.jpg",
      category: "Club",
      day: 1,
      time: "Day",
      isPaid: false,
    });
  });

  it("should get all events", async () => {
    const res = await request(app).get("/api/events");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should register for a free event", async () => {
    const event = await Event.findOne();
    const res = await request(app)
      .post("/api/events/register")
      .set("Authorization", `Bearer ${token}`)
      .send({ eventId: event._id });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toMatch(/Free Event/);
  });
});

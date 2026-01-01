import request from "supertest";
import app from "../app.js";
import crypto from "crypto";
import User from "../models/User.js";
import Event from "../models/Event.js";
import { connectDB, closeDB, clearDB } from "./setup.js";

beforeAll(connectDB);
afterEach(clearDB);
afterAll(closeDB);

describe("Razorpay Webhook", () => {
  let userId, eventId;

  beforeEach(async () => {
    const user = await User.create({
      username: "payuser",
      firstName: "Pay",
      lastName: "User",
      email: "payuser@example.com",
      rollNo: "CEG999",
      phoneNumber: "9876543210",
      passwordHash: "$2b$10$dummyhash",
      userType: "CEG",
      T_ID: "TID123",
    });
    userId = user._id.toString();

    const event = await Event.create({
      title: "Paid Event",
      club: "Tech Club",
      imgUrl: "https://example.com/img.jpg",
      category: "Club",
      day: 1,
      time: "Day",
      isPaid: true,
      fee: 200,
    });
    eventId = event._id.toString();
  });

  it("should accept valid payment webhook for event", async () => {
    const payload = {
      event: "payment.captured",
      payload: {
        payment: {
          entity: {
            id: "pay_123",
            amount: 200 * 100,
            order_id: `event_${eventId}_${userId}`,
          },
        },
      },
    };

    const body = JSON.stringify(payload);
    const signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET || "secret")
      .update(body)
      .digest("hex");

    const res = await request(app)
      .post("/api/razorpay/webhook")
      .set("x-razorpay-signature", signature)
      .send(body);

    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("OK");
  });

  it("should reject invalid signature", async () => {
    const payload = { event: "payment.captured" };
    const res = await request(app)
      .post("/api/razorpay/webhook")
      .set("x-razorpay-signature", "invalidsignature")
      .send(JSON.stringify(payload));

    expect(res.statusCode).toBe(400);
    expect(res.text).toBe("Invalid signature");
  });
});

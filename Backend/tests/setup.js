import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer;
jest.setTimeout(600000); 


// Load test environment variables
import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });

// Mock Razorpay
jest.mock('../utils/pay.js', () => {
  return {
    orders: {
      create: jest.fn().mockResolvedValue({
        id: 'order_test_123',
        amount: 1000,
        currency: 'INR',
        receipt: 'test_receipt_123',
      }),
    },
    payments: {
      fetch: jest.fn().mockResolvedValue({
        id: 'payment_test_123',
        amount: 1000,
        currency: 'INR',
        status: 'captured',
      }),
    },
  };
});


export const connectDB = async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export const closeDB = async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
};


export const clearDB = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
};

// test-db.ts
import mongoose from "mongoose";

const run = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI!);
    console.log("✅ Connected to MongoDB:", conn.connection.name);
  } catch (err) {
    console.error("❌ Connection failed:", err);
  } finally {
    mongoose.connection.close();
  }
};

run();

// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/alphadigital";

// if (!MONGODB_URI) {
//   throw new Error("❌ Please define MONGODB_URI in .env.local");
// }

// let cached = (global as any).mongoose || { conn: null, promise: null };

// export async function connectDB() {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
//       console.log("✅ MongoDB Connected");
//       return mongoose;
//     });
//   }
//   cached.conn = await cached.promise;
//   return cached.conn;
// }
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/alphadigital";

if (!MONGODB_URI) {
  throw new Error("❌ Please define the MONGODB_URI in .env.local");
}

// 🔄 Global cache setup (taaki multiple API calls pe multiple DB connections na bane)
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  // ✅ Agar already connected hai to wahi return karo
  if (cached.conn) {
    return cached.conn;
  }

  // ✅ Agar connection promise nahi hai to ek naya create karo
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((mongoose) => {
      console.log("✅ MongoDB Connected");
      return mongoose;
    }).catch((err) => {
      console.error("❌ MongoDB Connection Error:", err);
      throw err;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/earls_group";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

let cached = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

// Keep track of the last failed attempt time to avoid consecutive timeout hangs
let lastAttemptTime = 0;
const RETRY_COOLDOWN = 15000; // 15 seconds cooldown

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  const now = Date.now();
  if (now - lastAttemptTime < RETRY_COOLDOWN) {
    throw new Error("MongoDB connection is in cooldown period after a recent failure.");
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 800, // Timeout connection after 800ms if MongoDB is offline
    };

    lastAttemptTime = now;
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    // Update attempt time on failure to start the cooldown
    lastAttemptTime = Date.now();
    throw e;
  }

  return cached.conn;
}

export default dbConnect;

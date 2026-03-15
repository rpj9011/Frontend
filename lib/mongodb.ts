import mongoose from "mongoose"

declare global {
  var mongooseGlobal: {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
  }
}

if (!global.mongooseGlobal) {
  global.mongooseGlobal = { conn: null, promise: null }
}

export async function connectDB() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI not defined")
  }

  if (global.mongooseGlobal.conn) {
    return global.mongooseGlobal.conn
  }

  if (!global.mongooseGlobal.promise) {
    const opts = {
      bufferCommands: false,
    }
    global.mongooseGlobal.promise = mongoose.connect(
      process.env.MONGODB_URI,
      opts
    )
  }

  global.mongooseGlobal.conn = await global.mongooseGlobal.promise
  return global.mongooseGlobal.conn
}

export default connectDB

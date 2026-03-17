// ПОдключение к БД с кэшированием подключения
//
// Реализация паттерна Singleton (Одиночка). Мы гарантируем, что во всем приложении
// будет существовать только один экземпляр подключения к базе данных.

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Пожалуйста, добавь MONGODB_URI в .env.local");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached!.conn) return cached!.conn;

  if (!cached!.promise) {
    cached!.promise = mongoose.connect(MONGODB_URI!).then((m) => m);
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
}

export default dbConnect;

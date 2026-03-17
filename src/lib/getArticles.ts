// Получение данных из БД

import dbConnect from "./dbConnect";
import mongoose from "mongoose";

export async function getArticles(category: string) {
  await dbConnect();

  if (!mongoose.connection.db) {
    throw new Error("База данных не подключена");
  }

  const collection = mongoose.connection.db.collection("articles");
  const data = await collection.find({ category }).toArray();

  return data.map((item) => ({
    ...item,
    _id: item._id.toString(),
  }));
}

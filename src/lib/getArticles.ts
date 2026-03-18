// Получение данных из БД
import dbConnect from "./dbConnect";
import mongoose from "mongoose";

export async function getArticles<T>(
  category: string,
  collectionName: string = "articles",
): Promise<T[]> {
  await dbConnect();

  const db = mongoose.connection.db;
  if (!db) throw new Error("База данных не найдена");

  const collection = db.collection(collectionName);

  const query = collectionName === "projects" ? {} : { category };
  // console.log(`Запрос к коллекции "${collectionName}" с фильтром:`, query);

  const data = await collection.find(query).toArray();

  return data.map((item) => ({
    ...item,
    _id: item._id.toString(),
  })) as T[];
}

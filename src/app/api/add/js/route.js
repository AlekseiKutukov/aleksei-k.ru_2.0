import dbConnect from "../../../../../lib/mongodb";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    await dbConnect(); // Подключаемся к базе данных
    const data = await req.json(); // Получаем данные из формы

    const collection = mongoose.connection.db.collection("js");

    await collection.insertOne({
      myId: data["myId"],
      title: data["title"],
      description: data["description"],
      exampleCode: data["exampleCode"],
    });

    return new Response(JSON.stringify({ message: "Статья добавлена" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Ошибка сервера" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

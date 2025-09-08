import dbConnect from "../../../../../lib/mongodb";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    await dbConnect(); // Подключаемся к базе данных
    const data = await req.json(); // Получаем данные из формы

    const collection = mongoose.connection.db.collection("react"); // Коллекция 'react'

    await collection.insertOne({
      title: data["title"],
      memorandum: data["memorandum"],
      description: data["description"],
      whatDoesItDo: data["whatDoesItDo"],
      whenToUse: data["whenToUse"],
      example: data["example"],
      important: data["important"],
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

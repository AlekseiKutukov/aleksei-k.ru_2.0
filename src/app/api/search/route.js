import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

// Используем URI из переменных окружения
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// ⭐ ИЗМЕНЕНИЕ: Экспортируем функцию с именем GET
export async function GET(req) {
  // ⭐ ИЗМЕНЕНИЕ: Получаем query-параметр из req.nextUrl.searchParams
  const q = req.nextUrl.searchParams.get("q");

  // Проверяем наличие параметра q
  if (!q) {
    return NextResponse.json({ error: "Неверный запрос" }, { status: 400 });
  }

  try {
    // Подключаемся к базе
    await client.connect();
    const db = client.db("aleksei_db");

    // Настраиваем поисковый запрос, делаем его нечувствительным к регистру
    const regexQuery = new RegExp(q, "i");

    // Ищем в обеих коллекциях одновременно
    const [jsResults, reactResults] = await Promise.all([
      db
        .collection("js")
        .find({ "2_title": { $regex: regexQuery } })
        .toArray(),
      db
        .collection("react")
        .find({ "1_title": { $regex: regexQuery } })
        .toArray(),
    ]);

    // Объединяем результаты и возвращаем их
    const results = [...jsResults, ...reactResults];

    return NextResponse.json(results);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  } finally {
    // Закрываем соединение с базой данных
    await client.close();
  }
}

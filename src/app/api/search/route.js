import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function GET(req) {
  const q = req.nextUrl.searchParams.get("q");

  if (!q) {
    return NextResponse.json({ error: "Неверный запрос" }, { status: 400 });
  }

  try {
    await client.connect();
    const db = client.db("aleksei_db");
    const regexQuery = new RegExp(q, "i");

    // Используем проекцию для выборки только нужных полей
    const projection = { title: 1, _id: 1 };

    const [jsResults, reactResults] = await Promise.all([
      db
        .collection("js")
        .find({ title: { $regex: regexQuery } }, { projection })
        .toArray(),
      db
        .collection("react")
        .find({ title: { $regex: regexQuery } }, { projection })
        .toArray(),
    ]);

    // Добавляем поле `collection` к каждому документу
    const jsResultsWithCollection = jsResults.map((doc) => ({
      ...doc,
      collection: "js",
    }));
    const reactResultsWithCollection = reactResults.map((doc) => ({
      ...doc,
      collection: "react",
    }));

    const results = [...jsResultsWithCollection, ...reactResultsWithCollection];

    return NextResponse.json(results);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  } finally {
    await client.close();
  }
}

import dbConnect from "../../../../../../lib/mongodb";
import mongoose from "mongoose";

export async function GET(req, context) {
  try {
    await dbConnect();

    // Ждем разрешения params
    const params = await context.params;
    if (!params || !params.title) {
      return new Response(
        JSON.stringify({ error: "Название статьи не указано" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const title = params.title;

    const collection = mongoose.connection.db.collection("react");
    const article = await collection.findOne({
      title: { $regex: new RegExp(`^${title}$`, "i") },
    });

    if (!article) {
      return new Response(JSON.stringify({ error: "Статья не найдена" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(article), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Ошибка получения данных",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

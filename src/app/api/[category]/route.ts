import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ category: string }> },
) {
  try {
    await dbConnect();

    const { category } = await params;

    // Список разрешенных категорий (белый список для безопасности)
    const allowedCategories = ["react", "js", "npm", "polezno", "portfolio"];

    if (!allowedCategories.includes(category)) {
      return NextResponse.json(
        { error: "Категория не найдена" },
        { status: 404 },
      );
    }

    // Подключаемся к нужной коллекции
    const collection = mongoose.connection.db!.collection(category);

    // Получаем все документы из этой коллекции
    const data = await collection.find({}).toArray();

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Ошибка сервера", details: error.message },
      { status: 500 },
    );
  }
}

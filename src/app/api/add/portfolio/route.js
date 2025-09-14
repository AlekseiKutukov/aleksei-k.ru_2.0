import dbConnect from "../../../../../lib/mongodb";
import mongoose from "mongoose";
import { createSlug } from "@/utils/slug";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    await dbConnect(); // Подключаемся к базе данных

    const formData = await req.formData();

    // Получаем все поля из FormData
    const title = formData.get("title");
    const description = formData.get("description");
    const technologyStack = formData.get("technologyStack");
    const skrinFile = formData.get("image");
    const linkGit = formData.get("linkGit");
    const linkSite = formData.get("linkSite");

    let uniqueSlug = createSlug(title);

    // Используем skrinUrl для хранения пути к файлу
    let skrinUrl = "";
    if (skrinFile) {
      const bytes = await skrinFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(
        process.cwd(),
        "public",
        "image",
        "portfolio"
      );

      // Создаем уникальное имя файла на основе слага
      const fileExtension = path.extname(skrinFile.name);
      const fileName = `${uniqueSlug}${fileExtension}`;

      const filePath = path.join(uploadDir, fileName);

      await writeFile(filePath, buffer);
      skrinUrl = `/image/portfolio/${fileName}`;
    }

    const collection = mongoose.connection.db.collection("portfolio");

    // Сохраняем все поля в базу данных
    await collection.insertOne({
      title: title,
      description: description,
      technologyStack: technologyStack,
      skrin: skrinUrl,
      linkGit: linkGit,
      linkSite: linkSite,
      slug: uniqueSlug,
    });

    return NextResponse.json({ message: "Статья добавлена" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

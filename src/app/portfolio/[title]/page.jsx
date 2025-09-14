import { notFound } from "next/navigation";
import style from "./page.module.css";

async function fetchArticle(title) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    throw new Error("Базовый URL не указан");
  }

  const res = await fetch(`${baseUrl}/api/get/portfolio/${title}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Статья с названием "${title}" не найдена`);
  }

  return res.json();
}

// Генерация метаданных
export async function generateMetadata(props) {
  const params = await props.params;
  const { title } = params;

  try {
    const article = await fetchArticle(title);

    return {
      title: `Проект ${article["title"]}`,
      description: "Описание проекта",
      //   description: article["description"],
    };
  } catch {
    return {
      title: "Статья не найдена",
      description: "Запрашиваемая статья не существует.",
    };
  }
}

export default async function ArticlePage(props) {
  // "await" для params
  const params = await props.params;
  const { title } = params;

  if (!title) {
    return (
      <div>
        <h1>Ошибка</h1>
        <p>Название статьи не указано</p>
      </div>
    );
  }

  try {
    const article = await fetchArticle(title);

    return (
      <div className={style.content}>
        <h1>{article["title"]}</h1>
      </div>
    );
  } catch {
    notFound();
  }
}

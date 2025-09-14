import { notFound } from "next/navigation";
import style from "./page.module.css";

async function fetchArticle(slug) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    throw new Error("Базовый URL не указан");
  }

  const res = await fetch(`${baseUrl}/api/get/portfolio/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Статья с названием "${slug}" не найдена`);
  }

  return res.json();
}

// Генерация метаданных
export async function generateMetadata(props) {
  const { slug } = await props.params;

  try {
    const article = await fetchArticle(slug);

    return {
      title: `Проект - ${article.title}`,
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
  const { slug } = await props.params;

  if (!slug) {
    return (
      <div>
        <h1>Ошибка</h1>
        <p>Название статьи не указано</p>
      </div>
    );
  }

  try {
    const article = await fetchArticle(slug);

    return (
      <div className={style.content}>
        <h1>{article.title}</h1>
      </div>
    );
  } catch {
    notFound();
  }
}

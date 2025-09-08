import { notFound } from "next/navigation";
// import dbConnect from '../../../../../lib/mongodb';
import style from "./page.module.css";

async function fetchArticle(title) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    throw new Error("Базовый URL не указан");
  }

  const res = await fetch(`${baseUrl}/api/get/react/${title}`, {
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
      title: `React хук ${article["title"]} - что делает, когда использовать, пример кода`, // Заголовок страницы
      description: article["description"], // Описание для мета-тега
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
        {article["memorandum"] && (
          <div
            className={style.memorandum}
            dangerouslySetInnerHTML={{ __html: article["memorandum"] }}
          />
        )}

        <div
          className={style.description}
          dangerouslySetInnerHTML={{ __html: article["description"] }}
        />

        {/* Что делает */}
        {article["whatDoesItDo"] && (
          <div className={style.description}>
            <h2>Что делает {article["title"]}?</h2>
            <div
              dangerouslySetInnerHTML={{ __html: article["whatDoesItDo"] }}
            />
          </div>
        )}

        {/* когда использовать */}
        {article["whenToUse"] && (
          <div className={style.description}>
            <h2>Когда использовать {article["title"]}?</h2>
            <div dangerouslySetInnerHTML={{ __html: article["whenToUse"] }} />
          </div>
        )}

        {/* пример кода */}
        {article["example"] && (
          <div className={style.description}>
            <h3>Пример кода</h3>
            <pre className={style.example_code}>{article["example"]}</pre>
          </div>
        )}

        {/* Важно */}
        {article["important"] && (
          <div className={style.description}>
            <h3>Важно</h3>
            <div
              className={style.important}
              dangerouslySetInnerHTML={{ __html: article["important"] }}
            />
          </div>
        )}
      </div>
    );
  } catch {
    notFound();
  }
}

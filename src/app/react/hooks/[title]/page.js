import { notFound } from 'next/navigation';
// import dbConnect from '../../../../../lib/mongodb';
import style from './page.module.css';

async function fetchArticle(title) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    throw new Error('Базовый URL не указан');
  }

  const res = await fetch(`${baseUrl}/api/get/react/${title}`, {
    cache: 'no-store',
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
      title: `React хук ${article['1_title']} - что делает, когда использовать, пример кода`, // Заголовок страницы
      description: article['3_description'], // Описание для мета-тега
    };
  } catch {
    return {
      title: 'Статья не найдена',
      description: 'Запрашиваемая статья не существует.',
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
        <h1>{article['1_title']}</h1>
        {article['2_memorandum'] && (
          <div
            className={style.memorandum}
            dangerouslySetInnerHTML={{ __html: article['2_memorandum'] }}
          />
        )}

        <div
          className={style.description}
          dangerouslySetInnerHTML={{ __html: article['3_description'] }}
        />

        {/* Что делает */}
        {article['4_whatDoesItDo'] && (
          <div className={style.description}>
            <h2>Что делает {article['1_title']}?</h2>
            <div
              dangerouslySetInnerHTML={{ __html: article['4_whatDoesItDo'] }}
            />
          </div>
        )}

        {/* когда использовать */}
        {article['5_whenToUse'] && (
          <div className={style.description}>
            <h2>Когда использовать {article['1_title']}?</h2>
            <div dangerouslySetInnerHTML={{ __html: article['5_whenToUse'] }} />
          </div>
        )}

        {/* пример кода */}
        {article['6_example'] && (
          <div className={style.description}>
            <h3>Пример кода</h3>
            <pre className={style.example_code}>{article['6_example']}</pre>
          </div>
        )}

        {/* Важно */}
        {article['7_important'] && (
          <div className={style.description}>
            <h3>Важно</h3>
            <div
              className={style.important}
              dangerouslySetInnerHTML={{ __html: article['7_important'] }}
            />
          </div>
        )}
      </div>
    );
  } catch {
    notFound();
  }
}

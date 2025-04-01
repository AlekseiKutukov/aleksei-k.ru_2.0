import Link from 'next/link';
import { notFound } from 'next/navigation';
import style from './page.module.css';

// Функция для получения списка статей
async function fetchArticles() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${baseUrl}/api/get/react`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Ошибка загрузки данных');
  return res.json();
}

// Генерация метаданных (без проверки ошибок)
export async function generateMetadata() {
  const articles = await fetchArticles();
  const articleCount = articles.length;

  return {
    title: 'Всё о React - хуки и примеры кода',
    description: `Изучайте React с описанием и примерами использования.`,
  };
}

// Основная функция страницы
export default async function ReactPage() {
  try {
    const articles = await fetchArticles();

    return (
      <div>
        <h1>Все о React - хуки и примеры кода</h1>
        <h2>Хуки</h2>
        <div className={style.block_hooks}>
          {articles.map((article) => (
            <Link
              key={article._id}
              href={`/react/hooks/${article['1_title']}`}
              className={style.button_hooks}
            >
              <span>{article['1_title']}</span>
            </Link>
          ))}
        </div>
        <h2>Примеры кода</h2>
        <div className={style.block_hooks}>
          {articles.map((article) => (
            <Link
              key={article._id}
              href={`/react/hooks/${article['1_title']}`}
              className={style.button_hooks}
            >
              {article['1_title']}
            </Link>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    notFound(); // При ошибке переходим на 404
  }
}

import { notFound } from 'next/navigation';
import style from './page.module.css';
import QuestionsList from './QuestionsList'; // Новый клиентский компонент

async function fetchArticles() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${baseUrl}/api/get/js`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Статьи не найдены');
  }

  return res.json();
}

// Генерация метаданных
export async function generateMetadata() {
  try {
    const articles = await fetchArticles();
    const articleCount = articles.length;

    return {
      title: `Вопросы для подготовки к собеседованию на JS`,
      description: `Изучите ${articleCount} вопросов для подготовки к собеседованию на позицию фронтенд-разработчика по языку программирования JavaScript`,
    };
  } catch (error) {
    return {
      title: 'Статьи не найдены',
      description: 'Запрашиваемые статьи не существуют.',
    };
  }
}

export default async function ArticlePage() {
  try {
    const articles = await fetchArticles();

    return (
      <div className={style.content}>
        <h1>Вопросы для подготовки к собеседованию на JS</h1>
        {articles.length === 0 ? (
          <p>Статьи не найдены</p>
        ) : (
          <QuestionsList articles={articles} />
        )}
      </div>
    );
  } catch (error) {
    notFound();
  }
}

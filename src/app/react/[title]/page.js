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

export default async function ArticlePage({ params }) {
  try {
    const { title } = params;
    if (!title) {
      throw new Error('Название статьи не указано');
    }

    const article = await fetchArticle(title);

    return (
      <div>
        <h1>{article['1_title']}</h1>
        <p>
          <strong>Кратко:</strong> {article['2_memorandum']}
        </p>
        <p>
          <strong>Описание:</strong> {article['3_description']}
        </p>
        <p>
          <strong>Пример:</strong> {article['4_example']}
        </p>
      </div>
    );
  } catch (error) {
    return (
      <div>
        <h1>Статья не найдена</h1>
        <p>{error.message}</p>
      </div>
    );
  }
}

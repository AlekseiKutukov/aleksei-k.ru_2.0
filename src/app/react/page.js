import Link from 'next/link';

async function fetchArticles() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${baseUrl}/api/get/react`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Ошибка загрузки данных');
  return res.json();
}

export default async function ReactPage() {
  const articles = await fetchArticles();

  return (
    <div>
      <h1>React Хуки</h1>

      {articles.map((article) => (
        <div key={article._id}>
          <Link href={`/react/hooks/${article['1_title']}`}>
            <h2>{article['1_title']}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
}

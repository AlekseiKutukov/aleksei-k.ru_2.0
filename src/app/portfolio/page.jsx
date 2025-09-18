import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

// Функция для получения списка статей
async function fetchArticles() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${baseUrl}/api/get/portfolio`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Ошибка загрузки данных");
  return res.json();
}

export async function generateMetadata() {
  return {
    title: "Мои работы - Портфолио",
    description: `Мои работы и что я делал, также примеры кода`,
  };
}

const page = async () => {
  try {
    const articles = await fetchArticles();

    return (
      <section>
        <h1>Портфолио</h1>
        <div className={styles.block_hooks}>
          {articles.map((article) => (
            <Link
              key={article._id}
              href={`/portfolio/${article.slug}`}
              className={styles.button_hooks}
            >
              <span>{article["title"]}</span>
              <Image
                src="/image/portfolio/prototip-nebolshogo-banka.png"
                alt="Интернет банк"
                width={300}
                height={300}
                className={styles.content__git}
              />
            </Link>
          ))}
        </div>
      </section>
    );
  } catch (error) {
    console.error("Ошибка при получении статей:", error);
    notFound();
  }
};

export default page;

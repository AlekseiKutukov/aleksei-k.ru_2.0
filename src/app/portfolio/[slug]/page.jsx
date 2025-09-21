import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

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
      description: `${article.description.slice(0, 200)}`,
      robots: "noindex", // <-- скрываем от роботов ПС (яндекс, гугл)
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
      <section className={styles.content}>
        <h1 className={styles.content__title}>{article.title}</h1>
        <div
          className={styles.div}
          dangerouslySetInnerHTML={{ __html: article.description }}
        />

        {article.technologyStack ? (
          <div className={styles.content__tehno}>
            <span
              className={styles.content__tehnoSpan}
            >{`Использованно:`}</span>
            <ul className={styles.content__tehnoList}>
              {article.technologyStack.split(",").map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {article.linkGit ? (
          <div className={styles.content__link}>
            <span
              className={styles.content__span}
            >{`Посмотреть репозитарий или реализацию`}</span>

            <Link
              href={article.linkGit}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/image/icons/github.png"
                alt="Иконка GitHub"
                width={100}
                height={50}
                className={styles.content__git}
              />
            </Link>
            <Link
              href={article.linkSite}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/image/icons/linksite.png"
                alt="Иконка на сайт"
                width={100}
                height={50}
                className={styles.content__site}
              />
            </Link>
          </div>
        ) : null}

        {article.logikJob ? (
          <div className={styles.content__logikJob}>
            <span className={styles.content__logikJobSpan}>Логика работы:</span>
            <ol className={styles.content__logikJobList}>
              {article.logikJob.split("|").map((text, index) => (
                <li
                  key={index}
                  dangerouslySetInnerHTML={{ __html: text.trim() }}
                />
              ))}
            </ol>
          </div>
        ) : null}

        {article.linkSite ? (
          <Link
            href={article.linkSite}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.content__skrin}
          >
            <Image
              src={article.skrin}
              alt={article.title}
              fill
              className={styles.content__image}
            />
          </Link>
        ) : (
          <div className={styles.content__skrin}>
            <Image
              src={article.skrin}
              alt={article.title}
              fill
              className={styles.content__image}
            />
          </div>
        )}
      </section>
    );
  } catch {
    notFound();
  }
}

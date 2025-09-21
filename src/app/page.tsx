import Link from "next/link";
import styles from "./page.module.css";

export const metadata = {
  title: "Помощник для frontend-разработчика",
  description:
    "Начни свой путь во frontend-разработке с нами, сайт для начинающих фронтенд разработчиков, который поможет, подскажет и научит всему",
};

export default function Home() {
  return (
    <>
      {/* <Link href="/add">
        <span>add Article</span>
      </Link> */}
      <Link href="/add/hooks" className={styles.linkAdd}>
        <span>Добавить описание хука</span>
      </Link>
      <br />
      <Link href="/add/js" className={styles.linkAdd}>
        <span>Добавить в js</span>
      </Link>
      <br />
      <Link href="/add/portfolio" className={styles.linkAdd}>
        <span>Добавить в портфолио</span>
      </Link>
    </>
  );
}

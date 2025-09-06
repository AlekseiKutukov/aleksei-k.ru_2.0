import Link from "next/link";
import styles from "./page.module.css";

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
    </>
  );
}

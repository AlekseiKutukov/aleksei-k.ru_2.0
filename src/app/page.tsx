import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* <Link href="/add">
        <span>add Article</span>
      </Link> */}
      <Link href="/add/hooks">
        <span>Добавить описание хука</span>
      </Link>
      <br />
      <Link href="/add/js">
        <span>Добавить в js</span>
      </Link>

      <div>
        Если в MongoDB хранится текст с mark, браузер сам его выделит: Это
        обычный текст, а <mark>это подсвеченный текст</mark>. mark
        background-color: yellow; padding: 2px; border-radius: 4px;
      </div>
    </>
  );
}

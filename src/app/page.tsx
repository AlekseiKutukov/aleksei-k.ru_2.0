import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Link href="/addArticle">
        <span>add Article</span>
      </Link>
    </>
  );
}

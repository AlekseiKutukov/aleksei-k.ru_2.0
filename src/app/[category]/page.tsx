import { notFound } from "next/navigation";
import { getArticles } from "@/lib/getArticles";
import QuestionsList from "@/components/Questions/QuestionsList";
import style from "./page.module.css";

interface IArticle {
  _id: string;
  title: string;
  content: string;
  category: string;
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const data = await getArticles<IArticle>(category, "articles");

  // Проверка на пустоту
  if (!data || data.length === 0) notFound();

  return (
    <div className={style.content}>
      <h1 className={style.mainTitle}>Вопросы по {category.toUpperCase()}</h1>
      <QuestionsList articles={data} />
    </div>
  );
}

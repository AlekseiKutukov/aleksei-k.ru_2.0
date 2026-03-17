import { notFound } from "next/navigation";
import { getArticles } from "@/lib/getArticles";
import QuestionsList from "./../../components/Questions/QuestionsList";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const articles = await getArticles(category);

  if (!articles || articles.length === 0) {
    notFound();
  }

  return (
    <div>
      <h1 className="uppercase">Вопросы по {category}</h1>
      <QuestionsList articles={articles} />
    </div>
  );
}

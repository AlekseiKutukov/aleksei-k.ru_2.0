import { notFound } from "next/navigation";
import { getArticles } from "@/lib/getArticles";
import QuestionsList from "@/components/Questions/QuestionsList";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import style from "./page.module.css";

interface IProject {
  _id: string;
  title: string;
  stack: string[];
  shortDescription: string;
  links: {
    github: string;
    live: string;
  };
}

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
  const isPortfolio = category === "portfolio";

  const data = isPortfolio
    ? await getArticles<IProject>("all", "projects")
    : await getArticles<IArticle>(category, "articles");

  // console.log("Category:", category);
  // console.log("Data length:", data.length);

  // Проверка на пустоту
  if (!data || data.length === 0) notFound();

  return (
    <div className={style.content}>
      <h1 className={style.mainTitle}>
        {isPortfolio ? "Мои проекты" : `Вопросы по ${category.toUpperCase()}`}
      </h1>

      {isPortfolio ? (
        <div className={style.projectsGrid}>
          {(data as IProject[]).map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <QuestionsList articles={data as IArticle[]} />
      )}
    </div>
  );
}

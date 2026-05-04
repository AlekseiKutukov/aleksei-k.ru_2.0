import { getArticles } from "@/lib/getArticles";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import { notFound } from "next/navigation";
import style from "./page.module.css"; // Убедись, что скопировал css файл в эту папку

interface IProject {
  _id: string;
  title: string;
  slug: string; // Добавили slug для ссылок
  stack: string[];
  shortDescription: string;
  image: string;
  links: {
    github: string;
    live: string;
  };
}

export default async function PortfolioPage() {
  // Запрашиваем только проекты из коллекции projects
  const projects = await getArticles<IProject>("all", "projects");

  if (!projects || projects.length === 0) {
    notFound();
  }

  return (
    <div className={style.content}>
      <h1 className={style.mainTitle}>Мои проекты</h1>
      <div className={style.projectsGrid}>
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
}

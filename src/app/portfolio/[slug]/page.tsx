import dbConnect from "@/lib/dbConnect";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface ProjectPageProps {
  params: { slug: string };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = params;

  // 1. Ждем подключения
  const mongoose = await dbConnect();
  // 2. Достаем объект базы данных через соединение mongoose
  const db = mongoose.connection.db;
  if (!db) {
    throw new Error("Database not found");
  }

  // 1. Ищем проект в базе по slug
  const project = await db.collection("projects").findOne({ slug });

  // 2. Если проект не найден — показываем 404
  if (!project) {
    notFound();
  }

  return (
    <main className="container">
      <Link href="/portfolio">← Назад к проектам</Link>

      <h1>{project.title}</h1>

      <div className="project-header">
        <Image
          src={project.image}
          alt={project.title}
          width={800}
          height={450}
          priority
        />
      </div>

      <section>
        <h2>О проекте</h2>
        <p>{project.fullDescription}</p>
      </section>

      <section>
        <h2>Технологический стек</h2>
        <ul>
          {project.stack.map((item: string) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Ключевые фичи</h2>
        <ul>
          {project.features.map((feature: string) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </section>

      <div className="links">
        <a href={project.links.github} target="_blank">
          GitHub
        </a>
        <a href={project.links.live} target="_blank">
          Live Demo
        </a>
      </div>
    </main>
  );
}

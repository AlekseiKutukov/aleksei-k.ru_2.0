import style from "./ProjectCard.module.css";

interface ProjectProps {
  project: {
    _id: string;
    title: string;
    stack: string[];
    shortDescription: string;
    links: {
      github: string;
      live: string;
    };
  };
}

const ProjectCard = ({ project }: ProjectProps) => {
  return (
    <div className={style.card}>
      <h3 className={style.title}>{project.title}</h3>
      <p className={style.description}>{project.shortDescription}</p>

      <div className={style.stack}>
        {project.stack.map((tech) => (
          <span key={tech} className={style.tag}>
            {tech}
          </span>
        ))}
      </div>

      <div className={style.actions}>
        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className={style.link}
          >
            GitHub
          </a>
        )}
        {project.links.live && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className={style.link}
          >
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;

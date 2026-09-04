import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/data/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <div className={`project-preview project-preview-${project.tone}`}>
        <div className="preview-browser"><span /><span /><span /><b>{new URL(project.url).hostname}</b></div>
        <a className="project-image-link" href={project.url} target="_blank" rel="noreferrer" aria-label={`Visit the ${project.name} website`}>
          <Image className="project-image" src={project.image} alt={project.imageAlt} width={1400} height={1050} sizes="(max-width: 800px) 100vw, 50vw" />
        </a>
      </div>
      <div className="project-card-body">
        <p className="card-eyebrow">{project.category}</p>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <ul>{project.features.slice(0, 3).map((feature) => <li key={feature}>{feature}</li>)}</ul>
        <div className="project-links"><a href={project.url} target="_blank" rel="noreferrer">Visit Live Website <span aria-hidden="true">↗</span></a><Link href={`/work/${project.slug}`}>View Case Study <span aria-hidden="true">→</span></Link></div>
      </div>
    </article>
  );
}

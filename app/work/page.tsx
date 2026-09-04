/* eslint-disable @next/next/no-html-link-for-pages */
import { ConsultationLink } from "@/components/ConsultationLink";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { Container } from "@/components/ui/Container";
import { projects } from "@/data/projects";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Selected Website Projects | NeuraX", "Explore genuine NeuraX website projects for wellness and industrial businesses, including Shanti Haven and Chandima Industries.", "/work");

export default function WorkPage() {
  return <main><section className="page-hero"><Container className="page-hero-grid"><div><p className="breadcrumb"><a href="/">Home</a><span>/</span><span>Our Work</span></p><p className="eyebrow eyebrow-light"><span />SELECTED WORK</p><h1>Real projects. <em>Practical solutions.</em></h1><p>Genuine examples of businesses using clear design and useful digital technology. No fictional clients or invented results.</p></div><div className="page-hero-aside"><strong>Have a project in mind?</strong><p>Your business could be next. Start with a free conversation about the problem you need to solve.</p><ConsultationLink className="text-link">Start Your Project</ConsultationLink></div></Container></section><section className="section"><Container><div className="projects-grid">{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div></Container></section><ConsultationCTA /></main>;
}

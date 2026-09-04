import type { Metadata } from "next";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ConsultationLink } from "@/components/ConsultationLink";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { Container } from "@/components/ui/Container";
import { getProject, projects } from "@/data/projects";
import { siteConfig } from "@/lib/config";

export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const title = `${project.name} Case Study | NeuraX`;
  const description = project.description;
  const incomingHeaders = await headers();
  const host = incomingHeaders.get("x-forwarded-host") ?? incomingHeaders.get("host") ?? "www.neuraxai.co.uk";
  const protocol = incomingHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const url = `${protocol}://${host}/work/${project.slug}`;
  const image = `${protocol}://${host}${project.image}`;
  return { title, description, alternates: { canonical: `${siteConfig.domain}/work/${project.slug}` }, openGraph: { title, description, url, images: [{ url: image, alt: project.imageAlt }] }, twitter: { card: "summary_large_image", title, description, images: [image] } };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteConfig.domain }, { "@type": "ListItem", position: 2, name: "Our Work", item: `${siteConfig.domain}/work` }, { "@type": "ListItem", position: 3, name: project.name, item: `${siteConfig.domain}/work/${project.slug}` }] };
  return <main><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} /><section className="page-hero"><Container><p className="breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/work">Our Work</Link><span>/</span><span>{project.name}</span></p><p className="eyebrow eyebrow-light"><span />{project.category}</p><h1>{project.name}<br /><em>case study.</em></h1><p>{project.description}</p><div className="hero-actions"><a className="button button-light" href={project.url} target="_blank" rel="noreferrer"><span>Visit Live Website</span><b>↗</b></a><ConsultationLink className="button button-text">Start Your Project</ConsultationLink></div></Container></section><section className="case-study-section"><Container className="case-study-grid"><aside><h2>Services provided</h2><ul>{project.services.map((item) => <li key={item}>{item}</li>)}</ul><h2>Technology</h2><div className="case-study-meta">{project.technology.map((item) => <span key={item}>{item}</span>)}</div></aside><div className="case-study-content"><section><h2>The problem</h2><p>{project.problem}</p></section><section><h2>The solution</h2><p>{project.solution}</p><ul className="feature-list">{project.features.map((item) => <li key={item}>{item}</li>)}</ul></section><section><h2>The outcome</h2><p>{project.outcome}</p></section><div className="case-study-preview"><div className={`project-preview project-preview-${project.tone}`}><div className="preview-browser"><span /><span /><span /><b>{new URL(project.url).hostname}</b></div><a className="project-image-link" href={project.url} target="_blank" rel="noreferrer" aria-label={`Visit the ${project.name} website`}><Image className="project-image" src={project.image} alt={project.imageAlt} width={1400} height={1050} sizes="(max-width: 800px) 100vw, 65vw" /></a></div></div></div></Container></section><ConsultationCTA compact /></main>;
}

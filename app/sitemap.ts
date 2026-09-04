import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { siteConfig } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticRoutes = ["", "/about", "/services", "/pricing", "/work", "/contact", "/privacy-policy", "/cookie-policy", "/terms"];
  return [...staticRoutes.map((path) => ({ url: `${siteConfig.domain}${path}`, lastModified, changeFrequency: path === "" ? "weekly" as const : "monthly" as const, priority: path === "" ? 1 : .7 })), ...services.map((service) => ({ url: `${siteConfig.domain}/services/${service.slug}`, lastModified, changeFrequency: "monthly" as const, priority: .8 })), ...projects.map((project) => ({ url: `${siteConfig.domain}/work/${project.slug}`, lastModified, changeFrequency: "monthly" as const, priority: .7 }))];
}

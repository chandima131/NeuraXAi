import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "shanti-haven",
    name: "Shanti Haven",
    url: "https://shantihaven.co.uk",
    image: "/projects/shanti-haven-homepage.jpg",
    imageAlt: "Shanti Haven wellness website homepage",
    category: "Wellness Website",
    description: "A modern digital presence for a UK wellness business, designed to clearly communicate its services and create a calm, professional visitor experience.",
    features: ["Responsive layout", "Service presentation", "Strong visual identity", "Enquiry-focused design", "Professional business presence"],
    problem: "The business needed an online presence that made its wellness offer easy to understand while reflecting a calm, considered brand.",
    solution: "A responsive service-led website with clear content structure, confident calls to action and a restrained visual direction.",
    services: ["Website strategy", "UX and visual design", "Responsive development"],
    technology: ["Modern web platform", "Responsive front end"],
    outcome: "A clearer professional home for the business and its services. No unverified performance claims are published.",
    tone: "calm",
  },
  {
    slug: "chandima-industries",
    name: "Chandima Industries",
    url: "https://www.chandimaindustries.com",
    image: "/projects/chandima-industries-homepage.jpg",
    imageAlt: "Chandima Industries coconut oil machinery website homepage",
    category: "Industrial Business Website",
    description: "A professional website created to showcase industrial products, machinery and business capabilities while making information easier for potential customers to discover.",
    features: ["Product presentation", "Company information", "Responsive design", "Business enquiry functionality", "Professional industrial branding"],
    problem: "A specialist machinery business needed to present a substantial product range clearly to buyers across multiple markets.",
    solution: "A structured industrial website with product-led navigation, detailed information and visible quotation pathways.",
    services: ["Website strategy", "Product information design", "Responsive development", "Enquiry journeys"],
    technology: ["Modern web platform", "Structured product content"],
    outcome: "A more accessible digital catalogue and clearer route for product enquiries. No unverified performance claims are published.",
    tone: "industrial",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

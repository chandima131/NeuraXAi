export interface NavItem {
  label: string;
  href: string;
}

export interface Service {
  slug: string;
  title: string;
  eyebrow: string;
  shortDescription: string;
  description: string;
  outcome: string;
  items: string[];
  examples?: string[];
  faqs?: FAQItem[];
  cta: string;
  seoTitle: string;
  seoDescription: string;
}

export interface PricingPackage {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  category: "website" | "automation" | "support";
}

export interface Project {
  slug: string;
  name: string;
  url: string;
  image: string;
  imageAlt: string;
  category: string;
  description: string;
  features: string[];
  problem: string;
  solution: string;
  services: string[];
  technology: string[];
  outcome: string;
  tone: "calm" | "industrial";
}

export interface FAQItem {
  question: string;
  answer: string;
}

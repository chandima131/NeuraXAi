import type { ReactNode } from "react";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light" | "text";
  className?: string;
  external?: boolean;
}

export function Button({ href, children, variant = "primary", className = "", external = false }: ButtonProps) {
  return (
    <a className={`button button-${variant} ${className}`.trim()} href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
      <span>{children}</span><b aria-hidden="true">↗</b>
    </a>
  );
}

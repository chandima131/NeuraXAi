import type { ReactNode } from "react";

export function Badge({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <span className={`badge${light ? " badge-light" : ""}`}>{children}</span>;
}

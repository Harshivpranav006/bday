import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = { children: ReactNode; className?: string };

export function GlassCard({ children, className }: Props) {
  return (
    <div className={cn("glass-card rounded-2xl", className)}>{children}</div>
  );
}

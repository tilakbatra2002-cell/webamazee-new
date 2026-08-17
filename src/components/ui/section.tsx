import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function Section({
  id,
  children,
  className,
  container = true,
  as: Tag = "section",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  container?: boolean;
  as?: "section" | "div" | "footer";
}) {
  return (
    <Tag id={id} className={cn("relative py-20 sm:py-28", className)}>
      {container ? (
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">{children}</div>
      ) : (
        children
      )}
    </Tag>
  );
}

export function RevealChildren({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <Reveal className={className}>{children}</Reveal>;
}

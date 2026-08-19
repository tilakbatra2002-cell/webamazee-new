import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Brand logo — uses the provided horizontal logo lockup.
 * Responsive sizing: 52px (desktop) / 46px (tablet) / 40px (mobile).
 * `dark` adjusts the asset for dark backgrounds (footer).
 */
export function Logo({
  className,
  dark = false,
  size = "default",
}: {
  className?: string;
  dark?: boolean;
  size?: "default" | "large";
}) {
  const height =
    size === "large"
      ? "h-[64px] sm:h-[72px]"
      : "h-[40px] sm:h-[46px] lg:h-[52px]";

  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src={dark ? "/images/logo-footer.webp" : "/images/logo-header.webp"}
        alt="Webamazee — AI-Powered Digital Marketing Company"
        width={1339}
        height={336}
        priority
        className={cn("w-auto", height)}
        style={{ objectFit: "contain" }}
      />
    </span>
  );
}

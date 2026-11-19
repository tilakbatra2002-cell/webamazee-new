import { permanentRedirect } from "next/navigation";

/**
 * /newhome has been migrated to the root homepage.
 * The proxy (src/proxy.ts) returns a 301 for /newhome -> / before routing;
 * this permanent redirect is a fallback so the old URL never renders
 * duplicate homepage content.
 */
export default function NewHomeRedirect() {
  permanentRedirect("/");
}

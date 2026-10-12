import { renderLogo } from "@/lib/logo";

// Pre-rendered at build time and served as a static PNG at /logo.png.
export const dynamic = "force-static";

export function GET() {
  return renderLogo(512);
}

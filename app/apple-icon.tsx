import { renderLogo } from "@/lib/logo";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon for iPhone/iPad (iOS applies its own rounded mask, so this is a full square). */
export default function AppleIcon() {
  return renderLogo(180, false);
}

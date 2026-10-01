import Image from "next/image";
import { site } from "@/content/site";

/**
 * The source PNG is white artwork on transparency, so it reads correctly on
 * the dark bands as-is and is inverted to black for the light navbar.
 *
 * tone="dark"  -> black logo, for paper/white backgrounds
 * tone="light" -> white logo, for the ink bands (footer, closing CTA)
 *
 * If you later supply a black-artwork source, flip which tone gets `invert`.
 */
export function Logo({
  tone = "dark",
  priority = false,
  className = "",
}: {
  tone?: "dark" | "light";
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src="/maxinglabslogo.png"
      alt={site.name}
      width={512}
      height={179}
      priority={priority}
      className={`w-auto ${tone === "dark" ? "invert" : ""} ${className}`}
    />
  );
}

import { footer, site } from "@/content/site";
import { Container } from "@/components/ui/Primitives";
import { Logo } from "@/components/ui/Logo";
import {
  Instagram,
  LinkedIn,
  XIcon,
  YouTube,
} from "@/components/ui/Icons";

const SOCIALS = [
  { Icon: YouTube, label: "YouTube", href: "#" },
  { Icon: LinkedIn, label: "LinkedIn", href: "#" },
  { Icon: Instagram, label: "Instagram", href: "#" },
  { Icon: XIcon, label: "X", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-warm bg-elevated">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            {/* White artwork needs no treatment on the ink band */}
            <Logo tone="light" className="h-[34px]" />
            <p className="mt-4 max-w-[300px] text-[14px] leading-relaxed text-body">
              {footer.blurb}
            </p>

            <div className="mt-6 flex items-center gap-2">
              {SOCIALS.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-warm text-muted transition-colors hover:border-accent hover:text-ink"
                >
                  <Icon className="h-[15px] w-[15px]" />
                </a>
              ))}
            </div>
          </div>

          {footer.columns.map((column) => (
            <nav key={column.title} className="md:col-span-2">
              <p className="eyebrow text-muted">{column.title}</p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[14px] text-body transition-colors hover:text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="md:col-span-3">
            <p className="eyebrow text-muted">Contact</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 block text-[14px] text-body transition-colors hover:text-ink"
            >
              {site.email}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-warm pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12.5px] text-muted">
            © {new Date().getFullYear()} {site.name}. {footer.legal}
          </p>
          <p className="text-[12.5px] text-muted">
            Built for founders who&rsquo;d rather be on camera than in Premiere.
          </p>
        </div>
      </Container>
    </footer>
  );
}

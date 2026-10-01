import { site } from "@/content/site";

/**
 * Every CTA on the site routes through here.
 *
 * Set NEXT_PUBLIC_BOOKING_URL and all of them point at your scheduler.
 * Leave it unset and they degrade to a pre-filled mailto: so the page is
 * never a dead end before the Cal.com/Calendly account exists.
 */
export function bookingHref(): string {
  if (site.bookingUrl) return site.bookingUrl;

  const subject = encodeURIComponent("Strategy call request");
  const body = encodeURIComponent(
    [
      "Hi " + site.name + ",",
      "",
      "I'd like to book a strategy call.",
      "",
      "Channel / company:",
      "What we sell:",
      "Where we're at on YouTube:",
    ].join("\n"),
  );

  return `mailto:${site.email}?subject=${subject}&body=${body}`;
}

/** External schedulers open in a new tab; mailto: links must not. */
export function bookingTargetProps() {
  return site.bookingUrl
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};
}

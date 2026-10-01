/** Inline SVGs only - no icon dependency, no layout shift. */

type IconProps = { className?: string };

export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M4.5 11.5L11.5 4.5M11.5 4.5H5.8M11.5 4.5V10.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Check({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M3 8.5L6.2 11.5L13 4.8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Star({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M8 1.5l1.9 4.1 4.6.5-3.4 3.1.9 4.4L8 11.4l-4 2.2.9-4.4L1.5 6.1l4.6-.5L8 1.5z" />
    </svg>
  );
}

export function Play({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M8 5.2v13.6a.8.8 0 001.22.68l10.6-6.8a.8.8 0 000-1.36L9.22 4.52A.8.8 0 008 5.2z" />
    </svg>
  );
}

export function Plus({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path
        d="M8 3.2v9.6M3.2 8h9.6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function YouTube({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M21.6 7.2a2.5 2.5 0 00-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.84.43A2.5 2.5 0 002.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 001.76 1.77C5.75 19 12 19 12 19s6.25 0 7.84-.43a2.5 2.5 0 001.76-1.77C22 15.2 22 12 22 12s0-3.2-.4-4.8zM9.95 15.02V8.98L15.2 12l-5.25 3.02z" />
    </svg>
  );
}

/**
 * The YouTube play badge at true logo proportions (29:20), for use inline
 * inside a headline. The triangle is cut to the page colour rather than
 * painted white so it reads as a knockout on the paper background.
 *
 * For a pixel-exact official lockup, drop the real SVG into /public and
 * swap this out — the letterforms here are the site font, not YouTube's.
 */
export function YouTubeBadge({ className }: IconProps) {
  return (
    <svg viewBox="0 0 29 20" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M28.19 3.13A3.6 3.6 0 0025.66.6C23.42 0 14.5 0 14.5 0S5.58 0 3.34.6A3.6 3.6 0 00.81 3.13C.2 5.37.2 10 .2 10s0 4.63.61 6.87a3.6 3.6 0 002.53 2.53C5.58 20 14.5 20 14.5 20s8.92 0 11.16-.6a3.6 3.6 0 002.53-2.53C28.8 14.63 28.8 10 28.8 10s0-4.63-.61-6.87z"
      />
      <path fill="var(--bg)" d="M11.6 14.29L19.03 10 11.6 5.71v8.58z" />
    </svg>
  );
}

/** Badge + wordmark, sized in em so it scales with the headline. */
export function YouTubeLockup({ className = "" }: IconProps) {
  return (
    <span className={`whitespace-nowrap text-ink ${className}`}>
      <YouTubeBadge className="mr-[0.16em] inline h-[0.64em] w-auto align-[-0.04em]" />
      <span className="font-semibold tracking-[-0.055em]">YouTube</span>
    </span>
  );
}

export function LinkedIn({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.33c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.81V21h-4V9z" />
    </svg>
  );
}

export function Instagram({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.96.24 2.65.51.71.28 1.31.65 1.91 1.25.6.6.97 1.2 1.25 1.91.27.69.46 1.48.51 2.65.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.96-.51 2.65-.28.71-.65 1.31-1.25 1.91-.6.6-1.2.97-1.91 1.25-.69.27-1.48.46-2.65.51-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.96-.24-2.65-.51a5.28 5.28 0 01-1.91-1.25 5.28 5.28 0 01-1.25-1.91c-.27-.69-.46-1.48-.51-2.65C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.24-1.96.51-2.65.28-.71.65-1.31 1.25-1.91.6-.6 1.2-.97 1.91-1.25.69-.27 1.48-.46 2.65-.51C8.42 2.21 8.8 2.2 12 2.2zm0 3.4a6.4 6.4 0 100 12.8 6.4 6.4 0 000-12.8zm0 10.56a4.16 4.16 0 110-8.32 4.16 4.16 0 010 8.32zm8.14-10.86a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.53 3h3.2l-6.99 7.99L22 21h-6.36l-4.6-5.98L5.7 21H2.5l7.3-8.34L2 3h6.5l4.3 5.6L17.53 3zm-1.12 16.1h1.77L7.68 4.8H5.78l10.63 14.3z" />
    </svg>
  );
}

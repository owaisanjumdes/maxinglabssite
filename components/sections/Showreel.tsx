import { showreel } from "@/content/site";
import { Container } from "@/components/ui/Primitives";
import { Play } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

export function Showreel() {
  return (
    <section className="pb-16 sm:pb-24">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-[1000px]">
            <div className="relative aspect-video overflow-hidden rounded-[10px] bg-black">
              {showreel.youtubeId ? (
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${showreel.youtubeId}?rel=0`}
                  title={showreel.overlayTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                /* Placeholder frame. Set showreel.youtubeId to swap in the embed. */
                <div className="group absolute inset-0 flex cursor-pointer flex-col justify-end bg-[#222222]">
                  <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent transition-transform duration-300 group-hover:scale-105 sm:h-[76px] sm:w-[76px]">
                    <Play className="ml-[3px] h-6 w-6 text-on-accent sm:h-7 sm:w-7" />
                  </span>

                  <div className="relative p-5 sm:p-8">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                      {showreel.eyebrow}
                    </p>
                    <h2 className="display mt-2 max-w-[620px] text-[20px] text-ink sm:text-[30px]">
                      {showreel.overlayTitle}
                    </h2>
                    <p className="mt-2 text-[12px] font-medium text-muted">
                      {showreel.overlayMeta}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

import { ScrollEdge } from "@/components/glass/ScrollEdge";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Showreel } from "@/components/sections/Showreel";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { Problem } from "@/components/sections/Problem";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Results } from "@/components/sections/Results";
import { Testimonials } from "@/components/sections/Testimonials";
import { Receipts } from "@/components/sections/Receipts";
import { About } from "@/components/sections/About";
import { Faq } from "@/components/sections/Faq";
import { Closing } from "@/components/sections/Closing";
import { Footer } from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <>
      <ScrollEdge />
      <Navbar />
      <main>
        <Hero />
        <Showreel />
        <LogoMarquee />
        <Problem />
        <Process />
        <Services />
        <Results />
        <Testimonials />
        <Receipts />
        <About />
        <Faq />
        <Closing />
      </main>
      <Footer />
    </>
  );
}

import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import Laneframe from "@/components/site/Laneframe";
import CtaBand from "@/components/site/CtaBand";
import CaseStudies from "@/components/site/CaseStudies";
import Proof from "@/components/site/Proof";
import Skills from "@/components/site/Skills";
import Process from "@/components/site/Process";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import FloatingCta from "@/components/site/FloatingCta";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Laneframe />
        <CtaBand text="Want a build stress-tested like this before it reaches your customers?" />
        <CaseStudies />
        <Proof />
        <Skills />
        <CtaBand text="Not sure which platform fits your process? Let's figure it out together." />
        <Process />
        <Contact />
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}

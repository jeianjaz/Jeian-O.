import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/layout/Hero";
import Footer from "@/components/layout/Footer";
import { Suspense, lazy } from 'react';

// Lazy load heavy components
const About = lazy(() => import("@/components/layout/About"));
const SkillsCircle = lazy(() => import("@/components/layout/Skills_Circle"));
const ClientProjects = lazy(() => import("@/components/layout/ClientProjects"));
const Contact = lazy(() => import("@/components/layout/Contact"));

// Loading fallbacks
const SectionLoader = ({ label }: { label: string }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-pulse text-xl font-light">Loading {label}...</div>
  </div>
);

export default function Home() {
  return (
    <>
      {/* Shooting stars */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
      </div>

      <Navbar />
      <main className="min-h-screen text-white relative">
        {/* Hero is not lazy loaded for fast initial render */}
        <Hero />
        
        {/* Lazy load other sections with suspense boundaries */}
        <Suspense fallback={<SectionLoader label="About" />}>
          <About />
        </Suspense>
        
        <Suspense fallback={<SectionLoader label="Skills" />}>
          <SkillsCircle />
        </Suspense>
        
        <Suspense fallback={<SectionLoader label="Projects" />}>
          <ClientProjects />
        </Suspense>
        
        <Suspense fallback={<SectionLoader label="Contact" />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

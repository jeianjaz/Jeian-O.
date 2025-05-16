import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/layout/Hero";
import Footer from "@/components/layout/Footer";
import { Suspense, lazy } from 'react';

// Lazy load heavy components with loading priority
const About = lazy(() => import("@/components/layout/About"));
const SkillsCircle = lazy(() => 
  Promise.all([
    import("@/components/layout/Skills_Circle"),
    // Add artificial delay to ensure other components load first
    new Promise(resolve => setTimeout(resolve, 300))
  ]).then(([module]) => module)
);
const ClientProjects = lazy(() => import("@/components/layout/ClientProjects"));
const Contact = lazy(() => import("@/components/layout/Contact"));

// Enhanced loading fallbacks with space theme
const SectionLoader = ({ label }: { label: string }) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-black">
    <div className="relative w-16 h-16 mb-4">
      <div className="absolute inset-0 rounded-full bg-blue-500 opacity-50 animate-ping"></div>
      <div className="absolute inset-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300 animate-pulse"></div>
    </div>
    <div className="text-xl font-light text-center">
      <span className="inline-block animate-pulse">Loading {label}</span>
      <span className="inline-block animate-bounce delay-100">.</span>
      <span className="inline-block animate-bounce delay-200">.</span>
      <span className="inline-block animate-bounce delay-300">.</span>
    </div>
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

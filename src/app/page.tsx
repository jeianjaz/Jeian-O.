import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/layout/Hero";
import About from "@/components/layout/About";
import Skills from "@/components/layout/Skills";
import ClientProjects from "@/components/layout/ClientProjects";
import Contact from "@/components/layout/Contact";
import Footer from "@/components/layout/Footer";

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
        <Hero />
        <About />
        <Skills />
        <ClientProjects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/layout/Hero";
import About from "@/components/layout/About";
import Skills from "@/components/layout/Skills";
import Works from "@/components/layout/Works";
import Contact from "@/components/layout/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-black">
        <Hero />
        <About />
        <Skills />
        <Works />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

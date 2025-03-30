import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/layout/Hero";
import About from "@/components/layout/About";
import Works from "@/components/layout/Works";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-black">
        <Hero />
        <About />
        <Works />
      </main>
    </>
  );
}

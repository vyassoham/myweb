"use client";

import Header from "./components/Header";
import Banner from "./components/Banner";
import Experience from "./components/Experience";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import ToolsArsenal from "./components/ToolsArsenal";
import Footer from "./components/Footer";

export default function Home(): React.JSX.Element {
  return (
    <main className="min-h-screen relative z-10">
      <Header />
      <Banner />
      <About />
      <Skills />
      <ToolsArsenal />
      <Experience />
      <Projects />
      <Footer />
    </main>
  );
}

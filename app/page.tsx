"use client";

import Header from "./components/Header";
import Banner from "./components/Banner";
import Experience from "./components/Experience";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import ToolsArsenal from "./components/ToolsArsenal";
import Terminal from "./components/Terminal";
import Footer from "./components/Footer";
import SecurityLayer from "./components/SecurityLayer";

export default function Home(): React.JSX.Element {
  return (
    <>
      <SecurityLayer />
      <Header />
      <main className="w-full flex flex-col items-center min-h-screen relative z-10 overflow-x-hidden pt-20">
        <Banner />
        <About />
        <Skills />
        <Terminal />
        <ToolsArsenal />
        <Experience />
        <Projects />
        <Footer />
      </main>
    </>
  );
}

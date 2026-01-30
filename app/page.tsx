"use client";

import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Content from "./components/Content";
import Footer from "./components/Footer";
import SecurityLayer from "./components/SecurityLayer";

export default function Home(): React.JSX.Element {
  return (
    <>
      <SecurityLayer />
      <div className="page-wrapper">
        <Navigation />
        <main>
          <Hero />
          <Content />
        </main>
        <Footer />
      </div>
    </>
  );
}

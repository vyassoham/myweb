"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const PROJECTS = [
  {
    id: 1,
    title: "Quantum Dashboard",
    category: "Full Stack Development",
    stack: ["Next.js", "Redis", "Apache Kafka", "D3.js"],
    description: "A high-performance real-time data visualization dashboard capable of processing 10k events per second.",
    problem: "Existing solutions couldn't handle the data velocity required for high-frequency trading analytics.",
    solution: "Built a custom event-mesh using Kafka and a reactive frontend that batches DOM updates.",
    image: "/projects/project-1.png",
    link: "#",
    github: "#",
  },
  {
    id: 2,
    title: "CyberLink Platform",
    category: "Product Design & Security",
    stack: ["TypeScript", "WebRTC", "PostgreSQL", "AES-256"],
    description: "An end-to-end encrypted messaging platform featuring a modern glassmorphism UI.",
    problem: "Privacy-focused apps often compromise on user experience and visual aesthetic.",
    solution: "Implemented the double-ratchet algorithm within a stunning, frameless desktop experience.",
    image: "/projects/project-2.png",
    link: "#",
    github: "#",
  }
];

export default function Projects(): React.JSX.Element {
  return (
    <section id="lab" className="section-padding">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center text-center mb-24 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-purple font-black text-sm uppercase tracking-[0.3em]"
          >
            Curated Works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-black font-display tracking-tight"
          >
            Where Code <br className="hidden md:block" /> Meets <span className="text-white/40">Magic</span>
          </motion.h2>
        </div>

        <div className="space-y-32">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={cn(
                "flex flex-col items-center gap-12 lg:gap-20",
                index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
              )}
            >
              {/* Project Visual */}
              <div className="flex-1 w-full group relative aspect-[16/10] rounded-[2.5rem] overflow-hidden glass border-white/10 shadow-3xl">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors duration-500" />

                {/* Hover Quick Link */}
                <motion.div
                  className="absolute top-8 right-8"
                  whileHover={{ scale: 1.1 }}
                >
                  <a
                    href={project.link}
                    className="w-14 h-14 rounded-full bg-white text-brand-dark flex items-center justify-center shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ArrowUpRight className="w-6 h-6" />
                  </a>
                </motion.div>
              </div>

              {/* Project Info */}
              <div className="flex-1 space-y-8 text-center lg:text-left">
                <div className="space-y-4">
                  <span className="px-4 py-1.5 rounded-full glass-pill text-brand-purple text-[10px] font-black uppercase tracking-widest">
                    {project.category}
                  </span>
                  <h3 className="text-4xl md:text-5xl font-black font-display text-white tracking-tight">{project.title}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                  <div className="space-y-2">
                    <h4 className="text-white font-bold uppercase tracking-widest text-[10px] opacity-40">Problem</h4>
                    <p className="text-white/70 leading-relaxed">{project.problem}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-white font-bold uppercase tracking-widest text-[10px] opacity-40">Solution</h4>
                    <p className="text-white/70 leading-relaxed">{project.solution}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2 justify-center lg:justify-start">
                  {project.stack.map(tech => (
                    <span
                      key={tech}
                      className="text-[10px] font-bold text-white/40 uppercase tracking-widest px-3 py-1 border border-white/5 rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-center lg:justify-start gap-6 pt-4">
                  <a href={project.link} className="flex items-center gap-2 text-white font-black hover:text-brand-purple transition-colors text-sm uppercase tracking-widest">
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                  <a href={project.github} className="flex items-center gap-2 text-white/50 font-black hover:text-white transition-colors text-sm uppercase tracking-widest">
                    <Github className="w-4 h-4" />
                    Source
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

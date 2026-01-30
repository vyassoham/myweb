"use client";

import { motion } from "framer-motion";

const STATS = [
  { label: "Years Experience", value: "3+" },
  { label: "Projects Completed", value: "50+" },
];

export default function About(): React.JSX.Element {
  return (
    <section id="about" className="section-padding relative">
      <div className="container mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card p-12 lg:p-16 rounded-3xl"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left: Content */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-tight text-white">
                Building with
                <br />
                <span className="text-gradient">Purpose & Precision</span>
              </h2>

              <p className="text-lg text-white/70 leading-relaxed">
                I believe technology should solve real problems elegantly. My approach combines
                technical excellence with deep user empathy to create software that's both
                powerful and intuitive.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 pt-4">
                {STATS.map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 + 0.3, duration: 0.5 }}
                    className="space-y-1"
                  >
                    <p className="text-4xl font-black text-white">{stat.value}</p>
                    <p className="text-sm text-white/50 uppercase tracking-wider font-semibold">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Image/Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="relative aspect-square lg:aspect-auto lg:h-full min-h-[300px]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-blue-500/20 blur-3xl rounded-full" />
              <img
                src="/assets/illustration.png"
                alt="Architecture"
                className="relative w-full h-full object-contain opacity-80 mix-blend-luminosity"
              />
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

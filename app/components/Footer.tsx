"use client";

import { motion } from "framer-motion";
import { Github, Instagram, Linkedin, Mail, ExternalLink } from "lucide-react";

export default function Footer(): React.JSX.Element {
  return (
    <footer id="contact" className="py-20 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-black font-display tracking-tight text-white">
              Let's build <br className="md:hidden" />
              <span className="text-brand-gradient">Something Insane</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto text-lg">
              Currently open for new opportunities and collaborations.
              Let's turn your vision into a digital masterpiece.
            </p>
          </div>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="mailto:hello@soham.lol"
            className="group relative px-12 py-6 glass rounded-full flex items-center gap-4 border-white/20 hover:border-brand-purple/50 transition-all shadow-2xl"
          >
            <div className="w-12 h-12 rounded-full bg-brand-purple/20 flex items-center justify-center border border-brand-purple/30 group-hover:bg-brand-purple group-hover:text-white transition-all">
              <Mail className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tight text-white uppercase italic">hello@soham.lol</span>
          </motion.a>

          <div className="flex items-center gap-8">
            {[
              { icon: <Github />, href: "https://github.com/vyassoham", label: "GitHub" },
              { icon: <Linkedin />, href: "https://www.linkedin.com/in/vyassoham/", label: "LinkedIn" },
              { icon: <Instagram />, href: "https://www.instagram.com/vyassoham/", label: "Instagram" }
            ].map((social) => (
              <motion.a
                key={social.label}
                whileHover={{ y: -5 }}
                href={social.href}
                className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-white/50 hover:text-white hover:border-brand-purple/50 transition-all border border-white/5"
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          <div className="pt-20 text-white/20 text-[10px] font-black uppercase tracking-[0.2em] flex flex-col items-center gap-4">
            <div className="w-12 h-px bg-white/10" />
            <p>© 2026 SOHAM WORLDWIDE. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Image from "next/image";

export default function About(): React.JSX.Element {
  return (
    <section id="about" className="py-32 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="glass p-12 lg:p-20 rounded-[3rem] border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full"></div>

          <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">
            <div className="flex-1 space-y-8">
              <h2 className="text-5xl lg:text-6xl font-black text-white tracking-tighter">
                Engineering with <br />
                <span className="text-purple-400">Human Focus.</span>
              </h2>
              <p className="text-xl text-white/70 leading-relaxed">
                I believe that technology is only as good as the problems it solves.
                My approach combines logical precision with a deep understanding of user psychology
                to create software that is both powerful and intuitive.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <span className="text-3xl font-black text-white tracking-tight">3+</span>
                  <p className="text-white/50 text-sm font-bold uppercase tracking-widest">Years Experience</p>
                </div>
                <div className="space-y-2">
                  <span className="text-3xl font-black text-white tracking-tight">50+</span>
                  <p className="text-white/50 text-sm font-bold uppercase tracking-widest">Projects Done</p>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full">
              <Image
                src="/assets/illustration.png"
                alt="Architecture"
                width={800}
                height={800}
                className="w-full h-auto opacity-80"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

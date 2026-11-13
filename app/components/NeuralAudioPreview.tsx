"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2 } from "lucide-react";

export default function NeuralAudioPreview(): React.JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const phrase =
    "Neural TTS acoustic pipeline initialized. Synthesized for Soham Vyas, Indian Institute of Technology Jodhpur.";

  const stopAudio = () => {
    setIsPlaying(false);
    setProgress(0);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    } catch (e) {}

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  const startAudio = () => {
    setIsPlaying(true);
    setProgress(0);

    // 1. Play synthesized WAV audio chime if available
    try {
      if (!audioRef.current && typeof Audio !== "undefined") {
        audioRef.current = new Audio("/assets/neural-sample.wav");
        audioRef.current.volume = 0.4;
      }
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
    } catch (e) {}

    // 2. Play Neural Speech Synthesis
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phrase);
      utterance.rate = 0.98;
      utterance.pitch = 1.05;

      const voices = window.speechSynthesis.getVoices();
      const highQualityVoice = voices.find(
        (v) =>
          v.lang.startsWith("en") &&
          (v.name.includes("Natural") ||
            v.name.includes("Google") ||
            v.name.includes("Neural") ||
            v.name.includes("Samantha") ||
            v.name.includes("Daniel"))
      );
      if (highQualityVoice) {
        utterance.voice = highQualityVoice;
      }

      utterance.onend = () => {
        stopAudio();
      };
      utterance.onerror = () => {
        stopAudio();
      };

      window.speechSynthesis.speak(utterance);
    }

    // 3. Update Progress Bar
    const startTime = Date.now();
    const totalDuration = 3500; // 3.5s

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / totalDuration) * 100);
      setProgress(pct);

      if (elapsed >= totalDuration) {
        stopAudio();
      }
    }, 50);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  return (
    <div className="my-3.5 p-3.5 rounded-xl bg-violet-950/20 border border-violet-500/30 text-xs">
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-1.5 text-violet-300 font-semibold font-mono text-[11px]">
          <Volume2 className="w-3.5 h-3.5 text-violet-400" />
          <span>Interactive Neural Speech Demo</span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-500/15 text-violet-300 border border-violet-500/25">
          24kHz HiFi-GAN
        </span>
      </div>

      {/* Audio Controller Bar */}
      <div className="flex items-center gap-3 bg-black/40 p-2.5 rounded-lg border border-white/[0.06]">
        {/* Play / Pause Button */}
        <button
          onClick={togglePlay}
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-sm ${
            isPlaying
              ? "bg-violet-600 text-white shadow-violet-600/40"
              : "bg-white/[0.08] hover:bg-violet-600/80 text-violet-300 hover:text-white"
          }`}
          title={isPlaying ? "Stop Voice Sample" : "Play Synthesized Voice Sample"}
          aria-label={isPlaying ? "Pause voice sample" : "Play voice sample"}
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 fill-current" />
          ) : (
            <Play className="w-3.5 h-3.5 ml-0.5 fill-current" />
          )}
        </button>

        {/* Dynamic Equalizer Waveform Bars */}
        <div className="flex-1 flex items-center gap-1 h-6 px-1">
          {[40, 75, 55, 90, 60, 85, 45, 70, 95, 50, 80, 65].map((h, i) => (
            <div
              key={i}
              className={`flex-1 rounded-full transition-all duration-150 ${
                isPlaying
                  ? "bg-gradient-to-t from-violet-500 to-indigo-400 animate-pulse"
                  : "bg-white/[0.1]"
              }`}
              style={{
                height: isPlaying
                  ? `${Math.max(20, (h * ((progress % 50) + 50)) / 100)}%`
                  : "20%",
                animationDelay: `${i * 0.08}s`,
              }}
            />
          ))}
        </div>

        {/* Time counter */}
        <span className="text-[10px] font-mono text-zinc-400 shrink-0">
          {isPlaying ? `0:0${Math.floor((progress / 100) * 3)}` : "0:00"} / 0:03
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-white/[0.05] h-1 rounded-full mt-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-violet-500 to-indigo-400 h-full transition-all duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Synthesized Phrase Preview */}
      <p className="mt-2 text-[11px] text-zinc-400 italic font-sans leading-tight">
        &ldquo;{phrase}&rdquo;
      </p>
    </div>
  );
}

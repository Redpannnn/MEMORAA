"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { motion } from "framer-motion";

interface JavaneseV2InvitationProps {
  onClose: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

export default function JavaneseV2Invitation({ onClose }: JavaneseV2InvitationProps) {
  const [showCover, setShowCover] = useState(true);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-[60] w-8 h-8 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 transition-colors"
      >
        <X className="h-4 w-4 text-white" />
      </button>

      {/* ====== COVER ====== */}
      {showCover && (
        <div
          className="relative min-h-screen flex flex-col items-center justify-center px-6 cursor-pointer overflow-hidden"
          onClick={() => setShowCover(false)}
        >
          {/* Background image */}
          <Image
            src="/invitations/online/javanese-v2/bg-landscape.jpg"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />

          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Stacked photos top-left */}
          <div className="absolute top-8 left-6 sm:top-10 sm:left-10 z-20 pointer-events-none">
            {/* Back photo (offset down-right) */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0}
              variants={fadeUp}
              className="relative w-28 h-36 sm:w-36 sm:h-44 lg:w-40 lg:h-52"
            >
              <div className="absolute top-4 left-4 w-full h-full rounded-lg overflow-hidden shadow-lg border-2 border-white/30">
                <Image
                  src="/invitations/online/javanese-v2/photo-couple.jpg"
                  alt="Photo 2"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
            {/* Front photo */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0.5}
              variants={fadeUp}
              className="absolute top-0 left-0 w-28 h-36 sm:w-36 sm:h-44 lg:w-40 lg:h-52"
            >
              <div className="relative w-full h-full rounded-lg overflow-hidden shadow-xl border-2 border-white/50">
                <Image
                  src="/invitations/online/javanese-v2/photo-couple.jpg"
                  alt="Photo 1"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Gunungan Wayang */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0}
              variants={fadeUp}
              className="relative w-36 h-44 sm:w-48 sm:h-56 lg:w-56 lg:h-64 mb-4"
            >
              <Image
                src="/invitations/online/javanese-v2/gunungan-wayang.png"
                alt="Gunungan Wayang"
                fill
                className="object-contain"
              />
            </motion.div>

            {/* The Wedding of */}
            <motion.p
              initial="hidden"
              animate="visible"
              custom={1}
              variants={fadeUp}
              className="text-[10px] sm:text-xs tracking-[0.25em] uppercase mb-2 text-white/80"
            >
              The Wedding of
            </motion.p>

            {/* Groom name */}
            <motion.h1
              initial="hidden"
              animate="visible"
              custom={2}
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl text-center leading-tight text-white uppercase"
              style={{
                fontFamily: "var(--font-prata), serif",
                textShadow: "0 2px 8px rgba(0,0,0,0.4)",
              }}
            >
              Renaldi
            </motion.h1>

            {/* Ampersand */}
            <motion.span
              initial="hidden"
              animate="visible"
              custom={2.5}
              variants={fadeUp}
              className="text-xl sm:text-2xl my-1 text-white/70"
              style={{
                fontFamily: "var(--font-prata), serif",
              }}
            >
              &amp;
            </motion.span>

            {/* Bride name */}
            <motion.h1
              initial="hidden"
              animate="visible"
              custom={3}
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl text-center leading-tight text-white uppercase"
              style={{
                fontFamily: "var(--font-prata), serif",
                textShadow: "0 2px 8px rgba(0,0,0,0.4)",
              }}
            >
              Akmalina
            </motion.h1>

            {/* Open Invitation button */}
            <motion.button
              initial="hidden"
              animate="visible"
              custom={4}
              variants={fadeUp}
              className="mt-8 px-8 py-3 rounded-full text-xs sm:text-sm tracking-[0.15em] uppercase font-medium text-white transition-all hover:opacity-90 hover:scale-105 active:scale-95 bg-white/20 backdrop-blur-sm border border-white/30"
            >
              Open Invitation
            </motion.button>

            {/* Tap hint */}
            <motion.p
              initial="hidden"
              animate="visible"
              custom={5}
              variants={fadeUp}
              className="mt-4 text-[10px] tracking-wider text-white/50"
            >
              Tap anywhere to open
            </motion.p>
          </div>
        </div>
      )}

      {/* ====== CONTENT (placeholder) ====== */}
      {!showCover && (
        <div className="min-h-screen flex items-center justify-center bg-stone-100">
          <p className="text-stone-400 text-sm">Content coming soon...</p>
        </div>
      )}
    </div>
  );
}
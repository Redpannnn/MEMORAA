"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface JavaneseInvitationProps {
  onClose: () => void;
}

export default function JavaneseInvitation({ onClose }: JavaneseInvitationProps) {
  const [showCover, setShowCover] = useState(true);
  const [showGift, setShowGift] = useState(false);

  // RSVP / Wishes
  const [wishes, setWishes] = useState<{ id: string; name: string; attendance: string; message: string | null; createdAt: string }[]>([]);
  const [wishName, setWishName] = useState("");
  const [wishAttendance, setWishAttendance] = useState("Hadir");
  const [wishMessage, setWishMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const fetchWishes = useCallback(async () => {
    try {
      const res = await fetch("/api/wishes");
      if (res.ok) {
        const data = await res.json();
        setWishes(data);
      }
    } catch { /* silent */ }
  }, []);

  useEffect(() => {
    fetchWishes();
  }, [fetchWishes]);

  const submitWish = async () => {
    if (!wishName.trim() || submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: wishName.trim(),
          attendance: wishAttendance,
          message: wishMessage.trim() || null,
        }),
      });
      if (res.ok) {
        setWishName("");
        setWishMessage("");
        setSubmitSuccess(true);
        setTimeout(() => setSubmitSuccess(false), 3000);
        fetchWishes();
      }
    } catch { /* silent */ }
    setSubmitting(false);
  };
  const contentRef = useRef<HTMLDivElement>(null);

  // Countdown to Dec 31, 2026 (Asia/Jakarta)
  const weddingDate = new Date("2026-12-31T00:00:00+07:00").getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const updateCountdown = useCallback(() => {
    const now = Date.now();
    const diff = weddingDate - now;
    if (diff <= 0) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }
    setTimeLeft({
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    });
  }, [weddingDate]);

  useEffect(() => {
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [updateCountdown]);

  const openInvitation = () => {
    setShowCover(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#3C2A21]">
      {/* Close button — always on top */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[60] bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white rounded-full p-2 transition-colors"
      >
        <X className="h-5 w-5" />
      </button>

      {/* ======================== COVER OVERLAY ======================== */}
      <AnimatePresence>
        {showCover && (
          <motion.div
            key="cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 z-30"
          >
            {/* Background */}
            <Image
              src="/invitations/online/javanese/bg-cover.png"
              alt="Wedding cover background"
              fill
              className="object-cover object-center"
              priority
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Top-left gold ornament */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0, rotate: [0, 2, -2, 0] }}
              transition={{
                opacity: { delay: 0.5, duration: 0.8 },
                x: { delay: 0.5, duration: 0.8 },
                rotate: { delay: 1.5, duration: 4, repeat: Infinity, ease: "easeInOut" },
              }}
              className="absolute top-0 left-0 w-[80px] sm:w-[100px] lg:w-[120px] h-auto z-10 pointer-events-none"
            >
              <Image
                src="/invitations/online/javanese/ornamen-emas.png"
                alt=""
                width={1024}
                height={1024}
                className="w-full h-auto object-contain"
              />
            </motion.div>

            {/* Top-right gold ornament */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0, rotate: [0, -2, 2, 0] }}
              transition={{
                opacity: { delay: 0.5, duration: 0.8 },
                x: { delay: 0.5, duration: 0.8 },
                rotate: { delay: 1.8, duration: 4, repeat: Infinity, ease: "easeInOut" },
              }}
              className="absolute top-0 right-0 w-[80px] sm:w-[100px] lg:w-[120px] h-auto z-10 pointer-events-none"
            >
              <Image
                src="/invitations/online/javanese/ornamen-emas.png"
                alt=""
                width={1024}
                height={1024}
                className="w-full h-auto object-contain"
              />
            </motion.div>

            {/* Cover Content */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center px-6 z-20 cursor-pointer"
              onClick={openInvitation}
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="font-[family-name:var(--font-cormorant)] text-[#D4AF37] text-sm sm:text-base tracking-[0.35em] uppercase font-light"
              >
                The Wedding Of
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="font-[family-name:var(--font-great-vibes)] text-white text-5xl sm:text-7xl lg:text-8xl mt-3 sm:mt-5 text-center leading-tight"
              >
                Budi &amp; Anisa
              </motion.h1>

              {/* Gold divider line */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="mt-6 sm:mt-8 w-16 sm:w-20 h-px bg-[#D4AF37]/70"
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="font-[family-name:var(--font-cormorant)] text-[#D4AF37] text-xs sm:text-sm tracking-wider mt-4 sm:mt-5"
              >
                31 December 2026
              </motion.p>

              {/* Countdown Timer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                className="flex items-center gap-2 sm:gap-3 mt-8 sm:mt-10"
              >
                {([
                  { value: timeLeft.days, label: "Days" },
                  { value: timeLeft.hours, label: "Hours" },
                  { value: timeLeft.minutes, label: "Minutes" },
                  { value: timeLeft.seconds, label: "Seconds" },
                ] as const).map((item, idx) => (
                  <div key={item.label} className="flex items-center gap-2 sm:gap-3">
                    <div className="flex flex-col items-center">
                      <span className="border border-[#D4AF37]/50 text-white text-xl sm:text-2xl lg:text-3xl font-light w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 flex items-center justify-center rounded-lg bg-black/20 backdrop-blur-sm">
                        {String(item.value).padStart(2, "0")}
                      </span>
                      <span className="text-[#D4AF37] text-[8px] sm:text-[10px] tracking-wider uppercase mt-1 opacity-80">
                        {item.label}
                      </span>
                    </div>
                    {idx < 3 && (
                      <span className="text-[#D4AF37] text-lg sm:text-xl opacity-50 -mt-4">:</span>
                    )}
                  </div>
                ))}
              </motion.div>

              {/* "Klik untuk membuka" text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.8 }}
                className="text-white/60 text-[9px] sm:text-[10px] mt-6 sm:mt-8 tracking-wider"
              >
                Klik untuk membuka undangan
              </motion.p>

              {/* RSVP Buttons (visual only on cover) */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.0, duration: 0.8 }}
                className="flex gap-3 mt-4"
              >
                <span className="bg-white text-[#3C2A21] px-5 py-1.5 text-[10px] sm:text-xs tracking-[0.15em] uppercase font-medium rounded-full">
                  Hadir
                </span>
                <span className="border border-[#D4AF37] text-[#D4AF37] px-5 py-1.5 text-[10px] sm:text-xs tracking-[0.15em] uppercase font-medium rounded-full">
                  Tidak Hadir
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================== SCROLLABLE CONTENT ======================== */}
      <div ref={contentRef} className="h-full overflow-y-auto">

        {/* ---------- Section: Bride & Groom Profile (Slide 1) ---------- */}
        <section className="min-h-screen w-full flex flex-col items-center justify-center px-8 sm:px-12 py-12 bg-[#2C1E16]">
          {/* Gold ornamental top border */}
          <div className="flex items-center gap-3 mb-8 sm:mb-10 w-full max-w-xs">
            <span className="block flex-1 h-px bg-[#D4AF37]/40" />
            <span className="block w-1.5 h-1.5 rounded-full bg-[#D4AF37]/60" />
            <span className="block flex-1 h-px bg-[#D4AF37]/40" />
          </div>

          {/* The Wedding Of */}
          <p className="font-[family-name:var(--font-cormorant)] text-[#D4AF37] text-sm sm:text-base tracking-[0.35em] uppercase font-light mb-8 sm:mb-10">
            The Wedding Of
          </p>

          {/* Groom */}
          <div className="flex flex-col items-center mb-4">
            {/* Groom photo — oval */}
            <div className="relative w-[140px] sm:w-[160px] lg:w-[180px] aspect-[3/4] rounded-full overflow-hidden shadow-lg border-2 border-[#D4AF37]/30">
              <div className="absolute inset-0 bg-[#3C2A21] flex items-center justify-center">
                <div className="text-center text-white/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <p className="text-[10px] tracking-wider uppercase">Foto</p>
                </div>
              </div>
            </div>

            {/* Groom name */}
            <h2 className="font-[family-name:var(--font-great-vibes)] text-white text-4xl sm:text-5xl mt-4">
              Budi
            </h2>

            {/* Groom parents */}
            <p className="text-white text-[10px] sm:text-xs mt-2 tracking-wide opacity-60 text-center">
              Putra Bapak Surya &amp; Ibu Ratna
            </p>
          </div>

          {/* Ampersand */}
          <div className="my-4 sm:my-6">
            <span className="font-[family-name:var(--font-cormorant)] text-[#D4AF37] text-3xl sm:text-4xl font-light opacity-80">&amp;</span>
          </div>

          {/* Bride */}
          <div className="flex flex-col items-center mt-4">
            {/* Bride photo — oval */}
            <div className="relative w-[140px] sm:w-[160px] lg:w-[180px] aspect-[3/4] rounded-full overflow-hidden shadow-lg border-2 border-[#D4AF37]/30">
              <div className="absolute inset-0 bg-[#3C2A21] flex items-center justify-center">
                <div className="text-center text-white/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <p className="text-[10px] tracking-wider uppercase">Foto</p>
                </div>
              </div>
            </div>

            {/* Bride name */}
            <h2 className="font-[family-name:var(--font-great-vibes)] text-white text-4xl sm:text-5xl mt-4">
              Anisa
            </h2>

            {/* Bride parents */}
            <p className="text-white text-[10px] sm:text-xs mt-2 tracking-wide opacity-60 text-center">
              Putri Bapak Agus &amp; Ibu Sari
            </p>
          </div>

          {/* Gold ornamental bottom border */}
          <div className="flex items-center gap-3 mt-8 sm:mt-10 w-full max-w-xs">
            <span className="block flex-1 h-px bg-[#D4AF37]/40" />
            <span className="block w-1.5 h-1.5 rounded-full bg-[#D4AF37]/60" />
            <span className="block flex-1 h-px bg-[#D4AF37]/40" />
          </div>
        </section>

        {/* ---------- Section: Event Details + Hadiah Pernikahan (Slide 2) ---------- */}
        <section className="min-h-screen w-full flex flex-col bg-[#2C1E16]">
          {/* Top — Event Details */}
          <div className="w-full flex flex-col items-center px-6 sm:px-10 py-12 sm:py-16">
            <h2 className="font-[family-name:var(--font-great-vibes)] text-[#D4AF37] text-3xl sm:text-4xl lg:text-5xl text-center mb-3">
              Acara Pernikahan
            </h2>

            <p className="text-white/50 text-[9px] sm:text-[10px] tracking-wider uppercase mb-8 sm:mb-10">
              31 December 2026
            </p>

            {/* Event cards — side by side on desktop, stacked on mobile */}
            <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-6 sm:gap-8 w-full max-w-2xl">
              {/* Akad Nikah */}
              <div className="flex-1 w-full text-center border border-[#D4AF37]/20 rounded-lg bg-[#3C2A21] p-6 sm:p-8">
                <h3 className="font-[family-name:var(--font-great-vibes)] text-[#D4AF37] text-2xl sm:text-3xl mb-4">
                  Akad Nikah
                </h3>
                <div className="flex flex-col items-center gap-1.5 text-white">
                  <p className="text-[10px] sm:text-xs tracking-wider font-light">Thursday, 31 December 2026</p>
                  <div className="w-8 h-px bg-[#D4AF37]/20 my-1" />
                  <p className="text-[10px] sm:text-xs opacity-80">Pukul: 09:00 - 10:00 WIB</p>
                  <div className="w-8 h-px bg-[#D4AF37]/20 my-1" />
                  <p className="text-[10px] sm:text-xs opacity-80">Bertempat di:</p>
                  <p className="text-[10px] sm:text-xs font-medium text-[#D4AF37]">Pendopo Mangkunegaran</p>
                  <p className="text-[9px] sm:text-[10px] opacity-60">Jl. Ronggowarsito No. 3, Surakarta</p>
                </div>
              </div>

              {/* Resepsi */}
              <div className="flex-1 w-full text-center border border-[#D4AF37]/20 rounded-lg bg-[#3C2A21] p-6 sm:p-8">
                <h3 className="font-[family-name:var(--font-great-vibes)] text-[#D4AF37] text-2xl sm:text-3xl mb-4">
                  Resepsi
                </h3>
                <div className="flex flex-col items-center gap-1.5 text-white">
                  <p className="text-[10px] sm:text-xs tracking-wider font-light">Thursday, 31 December 2026</p>
                  <div className="w-8 h-px bg-[#D4AF37]/20 my-1" />
                  <p className="text-[10px] sm:text-xs opacity-80">Pukul: 13:00 - 17:00 WIB</p>
                  <div className="w-8 h-px bg-[#D4AF37]/20 my-1" />
                  <p className="text-[10px] sm:text-xs opacity-80">Bertempat di:</p>
                  <p className="text-[10px] sm:text-xs font-medium text-[#D4AF37]">Pendopo Mangkunegaran</p>
                  <p className="text-[9px] sm:text-[10px] opacity-60">Jl. Ronggowarsito No. 3, Surakarta</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom — Hadiah Pernikahan */}
          <div className="w-full flex flex-col items-center justify-center px-6 sm:px-10 py-12 sm:py-16 border-t border-[#D4AF37]/10">
            <h3 className="font-[family-name:var(--font-great-vibes)] text-[#D4AF37] text-xl sm:text-2xl mb-3">
              Hadiah Pernikahan
            </h3>

            <p className="text-white/50 text-[9px] sm:text-[10px] leading-relaxed text-center max-w-sm mb-4">
              Bagi Bapak/Ibu/Saudara/i yang ingin mengirimkan hadiah pernikahan dapat melalui virtual account di bawah ini:
            </p>

            {/* Kirim Hadiah button / Reveal */}
            {!showGift ? (
              <button
                onClick={() => setShowGift(true)}
                className="border border-[#D4AF37] text-[#D4AF37] px-5 py-1.5 text-[10px] sm:text-xs tracking-[0.15em] uppercase font-medium rounded-full hover:bg-[#D4AF37]/10 transition-all duration-300"
              >
                Kirim Hadiah
              </button>
            ) : (
              <div className="bg-[#3C2A21] border border-[#D4AF37]/20 rounded-lg px-5 py-3 text-center">
                <p className="text-[#D4AF37] text-[9px] sm:text-[10px] opacity-70 mb-1">Bank BCA</p>
                <p className="text-white text-sm sm:text-base font-medium tracking-wider select-all">
                  8765 4321 09
                </p>
                <p className="text-white/50 text-[9px] sm:text-[10px] mt-1">a.n. Budi &amp; Anisa</p>
              </div>
            )}
          </div>
        </section>

        {/* ---------- Section: RSVP / Wishes (Slide 3) ---------- */}
        <section className="min-h-screen w-full flex flex-col bg-[#2C1E16]">
          {/* Top — RSVP Form */}
          <div className="w-full flex flex-col items-center px-6 sm:px-10 pt-10 pb-6">
            <h3 className="font-[family-name:var(--font-cormorant)] text-[#D4AF37] text-2xl sm:text-3xl tracking-[0.3em] uppercase font-semibold mb-2">
              RSVP
            </h3>
            <p className="text-white/50 text-[9px] sm:text-[10px] mb-6">
              Berikan ucapan &amp; konfirmasi kehadiran Anda
            </p>

            <div className="w-full max-w-sm flex flex-col gap-3">
              {/* Name */}
              <input
                type="text"
                placeholder="Nama Anda"
                value={wishName}
                onChange={(e) => setWishName(e.target.value)}
                className="w-full bg-[#3C2A21] border border-[#D4AF37]/20 text-white text-xs sm:text-sm px-4 py-2.5 rounded-lg outline-none placeholder:text-white/30 focus:ring-1 focus:ring-[#D4AF37]/30 transition"
              />

              {/* Attendance toggle */}
              <div className="flex gap-2">
                {(["Hadir", "Tidak Hadir"] as const).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setWishAttendance(opt)}
                    className={`flex-1 py-2 rounded-lg text-[10px] sm:text-xs tracking-wider uppercase font-medium transition-all duration-200 ${
                      wishAttendance === opt
                        ? "bg-[#D4AF37] text-[#2C1E16]"
                        : "bg-[#3C2A21] text-white/40 hover:text-white/60 border border-[#D4AF37]/10"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {/* Message */}
              <textarea
                placeholder="Tulis ucapan..."
                value={wishMessage}
                onChange={(e) => setWishMessage(e.target.value)}
                rows={3}
                className="w-full bg-[#3C2A21] border border-[#D4AF37]/20 text-white text-xs sm:text-sm px-4 py-2.5 rounded-lg outline-none placeholder:text-white/30 focus:ring-1 focus:ring-[#D4AF37]/30 resize-none transition"
              />

              {/* Submit button */}
              <button
                onClick={submitWish}
                disabled={!wishName.trim() || submitting}
                className="w-full bg-[#D4AF37] text-[#2C1E16] py-2.5 rounded-lg text-[10px] sm:text-xs tracking-[0.15em] uppercase font-medium flex items-center justify-center gap-2 hover:bg-[#D4AF37]/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <span className="inline-block w-3 h-3 border-2 border-[#2C1E16]/30 border-t-[#2C1E16] rounded-full animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                {submitSuccess ? "Terkirim!" : "Kirim Ucapan"}
              </button>
            </div>
          </div>

          {/* Bottom — Wishes list */}
          <div className="flex-1 w-full px-6 sm:px-10 pb-10">
            {/* Divider */}
            <div className="flex items-center gap-2 mb-6">
              <span className="block flex-1 h-px bg-[#D4AF37]/15" />
              <span className="text-[#D4AF37] text-[9px] sm:text-[10px] tracking-wider uppercase opacity-50">
                Ucapan &amp; Doa
              </span>
              <span className="block flex-1 h-px bg-[#D4AF37]/15" />
            </div>

            {wishes.length === 0 ? (
              <p className="text-center text-white/20 text-[10px] sm:text-xs">
                Belum ada ucapan. Jadilah yang pertama!
              </p>
            ) : (
              <div className="flex flex-col gap-3 max-w-sm mx-auto max-h-[40vh] overflow-y-auto pr-1">
                {wishes.map((wish) => (
                  <div
                    key={wish.id}
                    className="bg-[#3C2A21] border border-[#D4AF37]/10 rounded-lg px-4 py-3"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white text-xs sm:text-sm font-medium">
                        {wish.name}
                      </span>
                      <span
                        className={`text-[8px] sm:text-[9px] px-2 py-0.5 rounded-full tracking-wider uppercase ${
                          wish.attendance === "Hadir"
                            ? "bg-[#D4AF37]/15 text-[#D4AF37]/80"
                            : "bg-white/5 text-white/30"
                        }`}
                      >
                        {wish.attendance}
                      </span>
                    </div>
                    {wish.message && (
                      <p className="text-white/60 text-[10px] sm:text-xs leading-relaxed">
                        {wish.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
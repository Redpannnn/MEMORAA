"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface OnlineInvitationProps {
  onClose: () => void;
}

export default function OnlineInvitation({ onClose }: OnlineInvitationProps) {
  const [showCover, setShowCover] = useState(true);
  const [showGift, setShowGift] = useState(false);

  // RSVP / Wishes
  const [wishes, setWishes] = useState<{ id: string; name: string; attendance: string; message: string | null; createdAt: string }[]>([]);
  const [wishName, setWishName] = useState("");
  const [wishAttendance, setWishAttendance] = useState("Hadir");
  const [wishMessage, setWishMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/wishes?templateId=serene-love");
        if (res.ok && !cancelled) {
          const data = await res.json();
          setWishes(data);
        }
      } catch { /* silent */ }
    })();
    return () => { cancelled = true; };
  }, []);

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
          templateId: "serene-love",
        }),
      });
      if (res.ok) {
        setWishName("");
        setWishMessage("");
        setSubmitSuccess(true);
        setTimeout(() => setSubmitSuccess(false), 3000);
        // Re-fetch wishes
        try {
          const res2 = await fetch("/api/wishes?templateId=serene-love");
          if (res2.ok) {
            const data = await res2.json();
            setWishes(data);
          }
        } catch { /* silent */ }
      }
    } catch { /* silent */ }
    setSubmitting(false);
  };
  const contentRef = useRef<HTMLDivElement>(null);

  // Countdown to Dec 1, 2026 (Asia/Jakarta)
  const weddingDate = new Date("2026-12-01T00:00:00+07:00").getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
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
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [weddingDate]);

  const openInvitation = () => {
    setShowCover(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black">
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
              src="/invitations/online/demo/bg-cover.png"
              alt="Wedding cover background"
              fill
              className="object-cover object-center"
              priority
            />
            {/* Whitewash overlay */}
            <div className="absolute inset-0 bg-white/55" />

            {/* Left flower ornament */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0, rotate: [0, 2, -2, 0] }}
              transition={{
                opacity: { delay: 0.5, duration: 0.8 },
                x: { delay: 0.5, duration: 0.8 },
                rotate: { delay: 1.5, duration: 4, repeat: Infinity, ease: "easeInOut" },
              }}
              className="absolute top-0 left-0 w-[55px] sm:w-[75px] lg:w-[95px] h-auto z-10 pointer-events-none"
            >
              <Image
                src="/invitations/online/demo/ornamen-bunga.png"
                alt=""
                width={177}
                height={467}
                className="w-full h-auto object-contain"
              />
            </motion.div>

            {/* Right flower ornament */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0, rotate: [0, -2, 2, 0] }}
              transition={{
                opacity: { delay: 0.5, duration: 0.8 },
                x: { delay: 0.5, duration: 0.8 },
                rotate: { delay: 1.8, duration: 4, repeat: Infinity, ease: "easeInOut" },
              }}
              className="absolute top-0 right-0 w-[55px] sm:w-[75px] lg:w-[95px] h-auto z-10 pointer-events-none"
            >
              <Image
                src="/invitations/online/demo/ornamen-bunga.png"
                alt=""
                width={177}
                height={467}
                className="w-full h-auto object-contain"
              />
            </motion.div>

            {/* Cover Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 z-20">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="font-[family-name:var(--font-cormorant)] text-[#57604F] text-sm sm:text-base tracking-[0.35em] uppercase font-light"
              >
                The Wedding Of
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="font-[family-name:var(--font-great-vibes)] text-[#57604F] text-5xl sm:text-7xl lg:text-8xl mt-3 sm:mt-5 text-center leading-tight"
              >
                Tama &amp; Septi
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.8 }}
                className="mt-8 sm:mt-10"
              >
                <button
                  onClick={openInvitation}
                  className="bg-white text-[#57604F] px-4 py-1.5 text-[10px] sm:text-xs tracking-[0.15em] uppercase font-medium rounded-full hover:bg-white/90 transition-all duration-300 shadow-lg"
                >
                  Open Invitation
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================== SCROLLABLE CONTENT ======================== */}
      <div ref={contentRef} className="h-full overflow-y-auto">
        {/* ---------- Section: Blessing (old slide 2) ---------- */}
        <section className="h-screen w-full flex flex-col flex-shrink-0">
          {/* Top 60% — Couple Photo */}
          <div className="relative h-[60%] w-full flex items-center justify-center bg-white bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/bg-mempelai.webp')" }}>
            <div className="relative w-[55%] sm:w-[45%] lg:w-[35%] aspect-[4/5] rounded-[30%] overflow-hidden shadow-xl">
              {/* Placeholder for couple photo */}
              <div className="absolute inset-0 bg-[#e8e0d4] flex items-center justify-center">
                <div className="text-center text-[#57604F]/40">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-xs tracking-wider uppercase">Foto Pengantin</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom 40% — Blessing Text */}
          <div className="relative h-[40%] w-full flex flex-col items-center justify-center px-8 sm:px-12 bg-[#2D4A2B]">
            <div className="text-center max-w-md">
              <p className="text-[#F5E6C8] text-xs sm:text-sm tracking-[0.25em] uppercase font-light mb-3">
                Allah&apos;s Blessings
              </p>

              <p className="font-[family-name:var(--font-cormorant)] text-[#F5E6C8] text-lg sm:text-xl lg:text-2xl leading-relaxed mb-4" dir="rtl">
                يَتَفَكَّرُونَ
              </p>

              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="block w-8 h-px bg-[#F5E6C8]/30" />
                <span className="block w-1.5 h-1.5 rounded-full bg-[#F5E6C8]/40" />
                <span className="block w-8 h-px bg-[#F5E6C8]/30" />
              </div>

              <p className="text-[#F5E6C8] text-[10px] sm:text-xs leading-relaxed opacity-80">
                Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir.
              </p>

              <p className="text-[#F5E6C8] text-[10px] sm:text-xs mt-3 italic opacity-60">
                (QS. Ar-Rum: 21)
              </p>
            </div>
          </div>
        </section>

        {/* ---------- Section: Bride & Groom (slide 3) ---------- */}
        <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-8 sm:px-12 py-12 bg-white bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/bg-mempelai.webp')" }}>
          {/* Ornament behind groom photo — full page width */}
          <img src="/images/divider.webp" alt="" className="absolute top-[22%] left-0 -translate-y-1/2 w-full h-auto opacity-90 -z-10 pointer-events-none" />
          {/* Ornament behind bride photo — full page width */}
          <img src="/images/divider.webp" alt="" className="absolute top-[62%] left-0 -translate-y-1/2 w-full h-auto opacity-90 -z-10 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
          {/* The Wedding Of */}
          <p className="font-[family-name:var(--font-cormorant)] text-[#57604F] text-sm sm:text-base tracking-[0.15em] font-medium mb-8 sm:mb-10">
            The Wedding Of
          </p>

          {/* Groom */}
          <div className="flex flex-col items-center mb-4">
            {/* Groom photo — oval */}
            <div className="relative w-[140px] sm:w-[160px] lg:w-[180px] aspect-[3/4] rounded-full overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-[#e8e0d4] flex items-center justify-center">
                <div className="text-center text-[#57604F]/40">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <p className="text-[10px] tracking-wider uppercase">Foto</p>
                </div>
              </div>
            </div>

            {/* Groom nickname */}
            <h2 className="font-[family-name:var(--font-great-vibes)] text-[#57604F] text-4xl sm:text-5xl mt-4 font-medium">
              Tama
            </h2>

            {/* Groom full name */}
            <p className="text-[#57604F] text-xs sm:text-sm mt-1 font-medium tracking-wide text-center">
              Maestro Ade Pratama
            </p>

            {/* Groom parents */}
            <p className="text-[#57604F] text-[10px] sm:text-xs mt-2 tracking-wide opacity-70 text-center">
              Putra Bapak Arif &amp; Ibu Dewi
            </p>
          </div>

          {/* Ampersand */}
          <div className="my-4 sm:my-6">
            <span className="font-[family-name:var(--font-cormorant)] text-[#57604F] text-3xl sm:text-4xl font-light opacity-50">&amp;</span>
          </div>

          {/* Bride */}
          <div className="flex flex-col items-center mt-4">
            {/* Bride photo — oval */}
            <div className="relative w-[140px] sm:w-[160px] lg:w-[180px] aspect-[3/4] rounded-full overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-[#e8e0d4] flex items-center justify-center">
                <div className="text-center text-[#57604F]/40">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <p className="text-[10px] tracking-wider uppercase">Foto</p>
                </div>
              </div>
            </div>

            {/* Bride nickname */}
            <h2 className="font-[family-name:var(--font-great-vibes)] text-[#57604F] text-4xl sm:text-5xl mt-4 font-medium">
              Septi
            </h2>

            {/* Bride full name */}
            <p className="text-[#57604F] text-xs sm:text-sm mt-1 font-medium tracking-wide text-center">
              Farida Septiani
            </p>

            {/* Bride parents */}
            <p className="text-[#57604F] text-[10px] sm:text-xs mt-2 tracking-wide opacity-70 text-center">
              Putri Bapak Anto &amp; Ibu Eni
            </p>
          </div>
          </div>
        </section>

        {/* ---------- Section: Precious Moment + Save The Date (slide 4) ---------- */}
        <section className="h-screen w-full flex flex-col flex-shrink-0 bg-white bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/bg-precious-moment.webp')" }}>
          {/* Top 70% — Precious Moment + Photo Grid */}
          <div className="h-[70%] w-full flex flex-col items-center justify-center px-8 sm:px-12">
            {/* Heading — Latin/script font */}
            <h2 className="font-[family-name:var(--font-great-vibes)] text-[#57604F] text-3xl sm:text-4xl lg:text-5xl text-center mb-3">
              Precious Moment
            </h2>

            {/* Quote */}
            <p className="text-[#57604F] text-[10px] sm:text-xs leading-relaxed opacity-70 text-center max-w-sm mb-6 sm:mb-8">
              Creating memories is a priceless gift. Memories last a lifetime; objects last only a short time.
            </p>

            {/* 4-photo grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full max-w-xs sm:max-w-sm">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-lg overflow-hidden shadow-md"
                >
                  <div className="absolute inset-0 bg-[#e8e0d4] flex items-center justify-center">
                    <div className="text-center text-[#57604F]/30">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom 30% — Save The Date + Countdown */}
          <div className="h-[30%] w-full flex flex-col items-center justify-center px-8 sm:px-12 bg-[#2D4A2B]">
            {/* Save The Date heading — Latin/script font */}
            <p className="font-[family-name:var(--font-great-vibes)] text-[#F5E6C8] text-xl sm:text-2xl lg:text-3xl mb-4 sm:mb-5">
              Save The Date
            </p>

            {/* Countdown boxes */}
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
              {([
                { value: timeLeft.days, label: "Days" },
                { value: timeLeft.hours, label: "Hours" },
                { value: timeLeft.minutes, label: "Minutes" },
                { value: timeLeft.seconds, label: "Seconds" },
              ] as const).map((item, idx) => (
                <div key={item.label} className="flex items-center gap-2 sm:gap-3">
                  <div className="flex flex-col items-center">
                    <span className="bg-[#F5E6C8]/10 text-[#F5E6C8] text-xl sm:text-2xl lg:text-3xl font-light w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 flex items-center justify-center rounded-lg border border-[#F5E6C8]/20">
                      {String(item.value).padStart(2, "0")}
                    </span>
                    <span className="text-[#F5E6C8] text-[8px] sm:text-[10px] tracking-wider uppercase mt-1 opacity-60">
                      {item.label}
                    </span>
                  </div>
                  {idx < 3 && (
                    <span className="text-[#F5E6C8] text-lg sm:text-xl opacity-30 -mt-4">:</span>
                  )}
                </div>
              ))}
            </div>

            {/* Event date */}
            <p className="text-[#F5E6C8] text-[10px] sm:text-xs tracking-[0.15em] font-light">
              Tuesday, 01 December 2026
            </p>
          </div>
        </section>

        {/* ---------- Section: Event Details + Hadiah Pernikahan (slide 5) ---------- */}
        <section className="h-screen w-full flex flex-col flex-shrink-0 bg-white bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/bg-precious-moment.webp')" }}>
          {/* Top 70% — Event Details */}
          <div className="h-[70%] w-full flex flex-col items-center justify-center px-6 sm:px-10">
            {/* Event cards — side by side on desktop, stacked on mobile */}
            <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-6 sm:gap-8 w-full max-w-2xl">
              {/* Akad Nikah */}
              <div className="flex-1 w-full text-center">
                <h3 className="font-[family-name:var(--font-great-vibes)] text-[#57604F] text-2xl sm:text-3xl mb-4">
                  Akad Nikah
                </h3>
                <div className="flex flex-col items-center gap-1.5 text-[#57604F]">
                  <p className="text-[10px] sm:text-xs tracking-wider font-light">Tuesday, 01 December 2026</p>
                  <div className="w-8 h-px bg-[#57604F]/20 my-1" />
                  <p className="text-[10px] sm:text-xs opacity-80">Pukul: 09:00 - 10:00 WIB</p>
                  <div className="w-8 h-px bg-[#57604F]/20 my-1" />
                  <p className="text-[10px] sm:text-xs opacity-80">Bertempat di:</p>
                  <p className="text-[10px] sm:text-xs font-medium">Ballroom Samudra</p>
                  <p className="text-[9px] sm:text-[10px] opacity-60">Jl. Ahmad Yani No. 5, Semarang</p>
                </div>
              </div>

              {/* Divider line (vertical on desktop, horizontal on mobile) */}
              <div className="hidden sm:block w-px bg-[#57604F]/15 self-stretch" />
              <div className="sm:hidden w-12 h-px bg-[#57604F]/15" />

              {/* Resepsi */}
              <div className="flex-1 w-full text-center">
                <h3 className="font-[family-name:var(--font-great-vibes)] text-[#57604F] text-2xl sm:text-3xl mb-4">
                  Resepsi
                </h3>
                <div className="flex flex-col items-center gap-1.5 text-[#57604F]">
                  <p className="text-[10px] sm:text-xs tracking-wider font-light">Tuesday, 01 December 2026</p>
                  <div className="w-8 h-px bg-[#57604F]/20 my-1" />
                  <p className="text-[10px] sm:text-xs opacity-80">Pukul: 13:00 - 17:00 WIB</p>
                  <div className="w-8 h-px bg-[#57604F]/20 my-1" />
                  <p className="text-[10px] sm:text-xs opacity-80">Bertempat di:</p>
                  <p className="text-[10px] sm:text-xs font-medium">Ballroom Samudra</p>
                  <p className="text-[9px] sm:text-[10px] opacity-60">Jl. Ahmad Yani No. 5, Semarang</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom 30% — Hadiah Pernikahan */}
          <div className="h-[30%] w-full flex flex-col items-center justify-center px-6 sm:px-10 bg-[#2D4A2B]">
            <h3 className="font-[family-name:var(--font-great-vibes)] text-[#F5E6C8] text-xl sm:text-2xl mb-3">
              Hadiah Pernikahan
            </h3>

            <p className="text-[#F5E6C8] text-[9px] sm:text-[10px] leading-relaxed opacity-70 text-center max-w-sm mb-4">
              Bagi Bapak/Ibu/Saudara/i yang ingin mengirimkan hadiah pernikahan dapat melalui virtual account atau e-wallet di bawah ini:
            </p>

            {/* Kirim Hadiah button / Reveal */}
            {!showGift ? (
              <button
                onClick={() => setShowGift(true)}
                className="bg-[#F5E6C8] text-[#2D4A2B] px-5 py-1.5 text-[10px] sm:text-xs tracking-[0.15em] uppercase font-medium rounded-full hover:bg-[#F5E6C8]/90 transition-all duration-300 shadow-sm"
              >
                Kirim Hadiah
              </button>
            ) : (
              <div className="bg-[#F5E6C8]/10 rounded-lg px-5 py-3 border border-[#F5E6C8]/20 text-center">
                <p className="text-[#F5E6C8] text-[9px] sm:text-[10px] opacity-60 mb-1">Bank BCA</p>
                <p className="text-[#F5E6C8] text-sm sm:text-base font-medium tracking-wider select-all">
                  1234 5678 90
                </p>
                <p className="text-[#F5E6C8] text-[9px] sm:text-[10px] opacity-60 mt-1">a.n. Tama &amp; Septi</p>
              </div>
            )}
          </div>
        </section>

        {/* ---------- Section: RSVP / Wishes (slide 6) ---------- */}
        <section className="min-h-screen w-full flex flex-col bg-white bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/bg-precious-moment.webp')" }}>
          {/* Top — RSVP Form */}
          <div className="w-full flex flex-col items-center px-6 sm:px-10 pt-10 pb-6">
            <h3 className="font-[family-name:var(--font-cormorant)] text-[#57604F] text-2xl sm:text-3xl tracking-[0.3em] uppercase font-semibold mb-2">
              RSVP
            </h3>
            <p className="text-[#57604F] text-[9px] sm:text-[10px] opacity-60 mb-6">
              Berikan ucapan &amp; konfirmasi kehadiran Anda
            </p>

            <div className="w-full max-w-sm flex flex-col gap-3">
              {/* Name */}
              <input
                type="text"
                placeholder="Nama Anda"
                value={wishName}
                onChange={(e) => setWishName(e.target.value)}
                className="w-full bg-[#f5f0eb] text-[#57604F] text-xs sm:text-sm px-4 py-2.5 rounded-lg outline-none placeholder:opacity-40 focus:ring-1 focus:ring-[#57604F]/20 transition"
              />

              {/* Attendance toggle */}
              <div className="flex gap-2">
                {(["Hadir", "Tidak Hadir"] as const).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setWishAttendance(opt)}
                    className={`flex-1 py-2 rounded-lg text-[10px] sm:text-xs tracking-wider uppercase font-medium transition-all duration-200 ${
                      wishAttendance === opt
                        ? "bg-[#57604F] text-white"
                        : "bg-[#f5f0eb] text-[#57604F]/60 hover:bg-[#ece5dd]"
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
                className="w-full bg-[#f5f0eb] text-[#57604F] text-xs sm:text-sm px-4 py-2.5 rounded-lg outline-none placeholder:opacity-40 focus:ring-1 focus:ring-[#57604F]/20 resize-none transition"
              />

              {/* Submit button */}
              <button
                onClick={submitWish}
                disabled={!wishName.trim() || submitting}
                className="w-full bg-[#57604F] text-white py-2.5 rounded-lg text-[10px] sm:text-xs tracking-[0.15em] uppercase font-medium flex items-center justify-center gap-2 hover:bg-[#57604F]/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <span className="inline-block w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
              <span className="block flex-1 h-px bg-[#57604F]/15" />
              <span className="text-[#57604F] text-[9px] sm:text-[10px] tracking-wider uppercase opacity-50">
                Ucapan &amp; Doa
              </span>
              <span className="block flex-1 h-px bg-[#57604F]/15" />
            </div>

            {wishes.length === 0 ? (
              <p className="text-center text-[#57604F]/30 text-[10px] sm:text-xs">
                Belum ada ucapan. Jadilah yang pertama! 💐
              </p>
            ) : (
              <div className="flex flex-col gap-3 max-w-sm mx-auto max-h-[40vh] overflow-y-auto pr-1">
                {wishes.map((wish) => (
                  <div
                    key={wish.id}
                    className="bg-[#f5f0eb] rounded-lg px-4 py-3"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[#57604F] text-xs sm:text-sm font-medium">
                        {wish.name}
                      </span>
                      <span
                        className={`text-[8px] sm:text-[9px] px-2 py-0.5 rounded-full tracking-wider uppercase ${
                          wish.attendance === "Hadir"
                            ? "bg-[#57604F]/10 text-[#57604F]/70"
                            : "bg-[#57604F]/5 text-[#57604F]/40"
                        }`}
                      >
                        {wish.attendance}
                      </span>
                    </div>
                    {wish.message && (
                      <p className="text-[#57604F]/70 text-[10px] sm:text-xs leading-relaxed">
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
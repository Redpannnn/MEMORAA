"use client";

import { useState, useRef, useEffect } from "react";
import { Send, MapPin, Calendar, Clock, ArrowRight, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface WhiteFreeInvitationProps {
  onClose: () => void;
}

/* ────── tiny helpers ────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-2">
      <span className="block w-8 h-px bg-[#d1d5db]" />
      <span className="text-[11px] sm:text-xs tracking-[0.2em] uppercase text-[#6b7280] font-medium">
        {children}
      </span>
      <span className="block w-8 h-px bg-[#d1d5db]" />
    </div>
  );
}

function SerifTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`font-[family-name:var(--font-cormorant)] text-[#0f172a] ${className}`}>
      {children}
    </h2>
  );
}

export default function WhiteFreeInvitation({ onClose }: WhiteFreeInvitationProps) {
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
        const res = await fetch("/api/wishes?templateId=white-free");
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
          templateId: "white-free",
        }),
      });
      if (res.ok) {
        setWishName("");
        setWishMessage("");
        setSubmitSuccess(true);
        setTimeout(() => setSubmitSuccess(false), 3000);
        // Re-fetch wishes
        try {
          const res2 = await fetch("/api/wishes?templateId=white-free");
          if (res2.ok) {
            const data = await res2.json();
            setWishes(data);
          }
        } catch { /* silent */ }
      }
    } catch { /* silent */ }
    setSubmitting(false);
  };

  // Countdown to Nov 2, 2026 (Asia/Jakarta)
  const weddingDate = new Date("2026-11-02T00:00:00+07:00").getTime();
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


  return (
    <div className="fixed inset-0 z-50">
      {/* Close button */}
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
            style={{ background: "#0f172a" }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center px-8 z-20">
              {/* THE WEDDING OF */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="flex items-center gap-3 text-white/60 text-[11px] sm:text-xs tracking-[0.25em] uppercase font-medium"
              >
                <span className="block w-6 sm:w-10 h-px bg-white/30" />
                The Wedding Of
                <span className="block w-6 sm:w-10 h-px bg-white/30" />
              </motion.p>

              {/* Names */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mt-5 sm:mt-7 text-center"
              >
                <h1 className="font-[family-name:var(--font-cormorant)] text-white text-4xl sm:text-5xl lg:text-6xl font-light leading-tight">
                  Arya
                </h1>
                <p className="font-[family-name:var(--font-cormorant)] text-white/50 text-2xl sm:text-3xl my-1 sm:my-2 italic">
                  &amp;
                </p>
                <h1 className="font-[family-name:var(--font-cormorant)] text-white text-4xl sm:text-5xl lg:text-6xl font-light leading-tight">
                  Shafira
                </h1>
              </motion.div>

              {/* Guest Name Pill */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="mt-8 sm:mt-10"
              >
                <div className="rounded-full px-6 py-2.5 sm:px-8 sm:py-3 text-center" style={{ background: "#1e293b" }}>
                  <p className="text-white/50 text-[9px] sm:text-[10px] tracking-[0.15em] uppercase mb-0.5">
                    Kepada
                  </p>
                  <p className="text-white text-xs sm:text-sm font-medium tracking-wide">
                    Bapak/Ibu/Saudara/i
                  </p>
                </div>
              </motion.div>

              {/* Buka Undangan Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="mt-6 sm:mt-8"
              >
                <button
                  onClick={() => setShowCover(false)}
                  className="bg-white text-[#0f172a] px-7 sm:px-9 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium tracking-wider uppercase flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg"
                >
                  Buka Undangan
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>

              {/* Hint */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="mt-4 text-white/30 text-[9px] sm:text-[10px]"
              >
                Ketuk untuk membuka undangan
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================== SCROLLABLE CONTENT ======================== */}
      <div className="h-full overflow-y-auto" style={{ background: "#f5f5f7" }}>
        {/* ═══════ Section 1: Doa & Harapan ═══════ */}
        <section className="w-full flex flex-col items-center justify-center px-6 py-14 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-sm w-full max-w-md mx-auto p-8 sm:p-10"
          >
            <SectionLabel>Doa &amp; Harapan</SectionLabel>

            <SerifTitle className="text-2xl sm:text-3xl font-semibold text-center mt-3 mb-4">
              Doa Pernikahan
            </SerifTitle>

            <div className="flex justify-center mb-5">
              <span className="block w-1 h-1 rounded-full bg-[#9ca3af]" />
            </div>

            <p className="text-[#374151] text-xs sm:text-sm leading-relaxed text-center" dir="rtl">
              وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ
            </p>

            <p className="text-[#374151] text-[11px] sm:text-xs leading-relaxed text-center mt-4 opacity-80">
              Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir.
            </p>

            <div className="mt-5">
              <SectionLabel>(QS. Ar-Rum: 21)</SectionLabel>
            </div>
          </motion.div>
        </section>

        {/* ═══════ Section 2: Mempelai ═══════ */}
        <section className="w-full flex flex-col items-center px-6 py-10 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md mx-auto"
          >
            <div className="text-center mb-6 sm:mb-8">
              <SectionLabel>Mempelai</SectionLabel>
              <SerifTitle className="text-xl sm:text-2xl font-semibold mt-2">
                Dengan Cinta
              </SerifTitle>
              <p className="text-[#6b7280] text-[11px] sm:text-xs mt-2">
                Kami bermaksud memberitahukan pernikahan kami.
              </p>
            </div>

            {/* Groom Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 mb-4">
              <div className="text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#f5f5f7] mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#d1d5db]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <SerifTitle className="text-2xl sm:text-3xl font-bold">Arya</SerifTitle>
                <p className="text-[#6b7280] text-xs sm:text-sm mt-1 font-medium">
                  Arya Mahendra, S.T.
                </p>
                <p className="text-[#6b7280] text-[10px] sm:text-xs mt-2 leading-relaxed">
                  Putra pertama dari<br />
                  Bapak Ir. Adi Mahendra<br />
                  &amp; Ibu Dra. Lestari Ayuningrum
                </p>
                <div className="mt-4 inline-flex items-center gap-2 bg-[#0f172a] rounded-full px-4 py-2">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  <span className="text-white text-[10px] sm:text-xs font-medium tracking-wider uppercase">
                    Instagram
                  </span>
                </div>
              </div>
            </div>

            {/* Ampersand */}
            <div className="flex justify-center my-2">
              <span className="font-[family-name:var(--font-cormorant)] text-[#374151] text-3xl sm:text-4xl italic opacity-50">&amp;</span>
            </div>

            {/* Bride Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
              <div className="text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#f5f5f7] mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#d1d5db]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <SerifTitle className="text-2xl sm:text-3xl font-bold">Shafira</SerifTitle>
                <p className="text-[#6b7280] text-xs sm:text-sm mt-1 font-medium">
                  Shafira Rahmayanti, S.Ak.
                </p>
                <p className="text-[#6b7280] text-[10px] sm:text-xs mt-2 leading-relaxed">
                  Putri pertama dari<br />
                  Bapak H. Rahmat Syah<br />
                  &amp; Ibu Hj. Nursela Dewi
                </p>
                <div className="mt-4 inline-flex items-center gap-2 bg-[#0f172a] rounded-full px-4 py-2">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  <span className="text-white text-[10px] sm:text-xs font-medium tracking-wider uppercase">
                    Instagram
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ═══════ Section 3: Event Details ═══════ */}
        <section className="w-full flex flex-col items-center px-6 py-10 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md mx-auto"
          >
            <div className="text-center mb-6 sm:mb-8">
              <SectionLabel>Waktu &amp; Tempat</SectionLabel>
              <SerifTitle className="text-2xl sm:text-3xl font-semibold mt-2">
                Rangkaian Acara
              </SerifTitle>
            </div>

            <div className="flex flex-col gap-4">
              {/* Akad Nikah */}
              <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 text-center">
                <h3 className="font-[family-name:var(--font-cormorant)] text-[#0f172a] text-xl sm:text-2xl font-semibold mb-4">
                  Akad Nikah
                </h3>
                <div className="flex flex-col items-center gap-2 text-[#6b7280]">
                  <div className="flex items-center gap-2 text-[11px] sm:text-xs">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Senin, 2 November 2026</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] sm:text-xs">
                    <Clock className="w-3.5 h-3.5" />
                    <span>08:00 - 10:00 WIB</span>
                  </div>
                  <div className="w-8 h-px bg-[#d1d5db] my-1" />
                  <div className="flex items-center gap-2 text-[11px] sm:text-xs">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Masjid Agung Al-Azhar</span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] opacity-60">
                    Jl. Sisingamangaraja, Kebayoran Baru, Jakarta Selatan
                  </p>
                </div>
              </div>

              {/* Resepsi */}
              <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 text-center">
                <h3 className="font-[family-name:var(--font-cormorant)] text-[#0f172a] text-xl sm:text-2xl font-semibold mb-4">
                  Resepsi
                </h3>
                <div className="flex flex-col items-center gap-2 text-[#6b7280]">
                  <div className="flex items-center gap-2 text-[11px] sm:text-xs">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Senin, 2 November 2026</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] sm:text-xs">
                    <Clock className="w-3.5 h-3.5" />
                    <span>11:00 - 14:00 WIB</span>
                  </div>
                  <div className="w-8 h-px bg-[#d1d5db] my-1" />
                  <div className="flex items-center gap-2 text-[11px] sm:text-xs">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Ballroom Hotel Indonesia Kempinski</span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] opacity-60">
                    Jl. M.H. Thamrin No. 1, Jakarta Pusat
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ═══════ Section 4: Save The Date ═══════ */}
        <section className="w-full flex flex-col items-center justify-center px-6 py-14 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-sm w-full max-w-md mx-auto p-8 sm:p-10 text-center"
          >
            <SectionLabel>Save The Date</SectionLabel>

            <div className="mt-4">
              <SerifTitle className="text-3xl sm:text-4xl font-bold">Arya</SerifTitle>
              <span className="font-[family-name:var(--font-cormorant)] text-[#374151] text-2xl sm:text-3xl italic opacity-50 block my-1">&amp;</span>
              <SerifTitle className="text-3xl sm:text-4xl font-bold">Shafira</SerifTitle>
            </div>

            <div className="flex items-center gap-3 mt-6 mb-8">
              <span className="block w-8 sm:w-12 h-px bg-[#d1d5db]" />
              <span className="text-[#6b7280] text-[10px] sm:text-xs tracking-[0.15em] uppercase font-medium whitespace-nowrap">
                Senin, 2 November 2026
              </span>
              <span className="block w-8 sm:w-12 h-px bg-[#d1d5db]" />
            </div>

            {/* Countdown */}
            <div className="flex items-center justify-center gap-2.5 sm:gap-4 mb-8">
              {([
                { value: timeLeft.days, label: "Hari" },
                { value: timeLeft.hours, label: "Jam" },
                { value: timeLeft.minutes, label: "Menit" },
                { value: timeLeft.seconds, label: "Detik" },
              ] as const).map((item, idx) => (
                <div key={item.label} className="flex items-center gap-2.5 sm:gap-4">
                  <div className="flex flex-col items-center">
                    <span className="bg-[#f5f5f7] text-[#0f172a] text-xl sm:text-2xl lg:text-3xl font-light w-14 sm:w-16 h-14 sm:h-16 flex items-center justify-center rounded-xl">
                      {String(item.value).padStart(2, "0")}
                    </span>
                    <span className="text-[#6b7280] text-[8px] sm:text-[10px] tracking-wider uppercase mt-1.5">
                      {item.label}
                    </span>
                  </div>
                  {idx < 3 && (
                    <span className="text-[#d1d5db] text-lg -mt-4">:</span>
                  )}
                </div>
              ))}
            </div>

            <p className="text-[#374151] text-[11px] sm:text-xs leading-relaxed opacity-80 max-w-sm mx-auto">
              Merupakan kebahagiaan dan kehormatan bagi kami, jika Anda berkenan hadir dan memberikan restu kepada kami.
            </p>
          </motion.div>
        </section>

        {/* ═══════ Section 5: Amplop Digital ═══════ */}
        <section className="w-full flex flex-col items-center px-6 py-10 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-sm w-full max-w-md mx-auto p-8 sm:p-10 text-center"
          >
            <SectionLabel>Wedding Gift</SectionLabel>
            <SerifTitle className="text-2xl sm:text-3xl font-semibold mt-2 mb-3">
              Amplop Digital
            </SerifTitle>
            <p className="text-[#6b7280] text-[10px] sm:text-xs leading-relaxed mb-6 max-w-xs mx-auto">
              Bagi Bapak/Ibu/Saudara/i yang ingin mengirimkan hadiah pernikahan dapat melalui:
            </p>

            {!showGift ? (
              <button
                onClick={() => setShowGift(true)}
                className="bg-[#0f172a] text-white px-6 py-2.5 rounded-full text-[10px] sm:text-xs tracking-wider uppercase font-medium hover:bg-[#1e293b] transition-colors"
              >
                Lihat Rekening
              </button>
            ) : (
              <div className="space-y-3">
                <div className="bg-[#f5f5f7] rounded-xl px-5 py-4">
                  <p className="text-[#6b7280] text-[10px] sm:text-xs mb-1">Bank BCA</p>
                  <p className="text-[#0f172a] text-sm sm:text-base font-medium tracking-wider select-all">
                    1234 5678 90
                  </p>
                  <p className="text-[#6b7280] text-[10px] sm:text-xs mt-1">a.n. Arya Mahendra</p>
                </div>
                <div className="bg-[#f5f5f7] rounded-xl px-5 py-4">
                  <p className="text-[#6b7280] text-[10px] sm:text-xs mb-1">Bank Mandiri</p>
                  <p className="text-[#0f172a] text-sm sm:text-base font-medium tracking-wider select-all">
                    9876 5432 10
                  </p>
                  <p className="text-[#6b7280] text-[10px] sm:text-xs mt-1">a.n. Shafira Rahmayanti</p>
                </div>
              </div>
            )}
          </motion.div>
        </section>

        {/* ═══════ Section 6: RSVP / Wishes ═══════ */}
        <section className="w-full flex flex-col bg-white px-6 py-10 sm:py-16">
          <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-6">
              <SectionLabel>RSVP</SectionLabel>
              <SerifTitle className="text-2xl sm:text-3xl font-semibold mt-2 mb-1">
                Ucapan &amp; Kehadiran
              </SerifTitle>
              <p className="text-[#6b7280] text-[10px] sm:text-xs">
                Berikan ucapan &amp; konfirmasi kehadiran Anda
              </p>
            </div>

            <div className="flex flex-col gap-3 mb-8">
              <input
                type="text"
                placeholder="Nama Anda"
                value={wishName}
                onChange={(e) => setWishName(e.target.value)}
                className="w-full bg-[#f5f5f7] text-[#0f172a] text-xs sm:text-sm px-4 py-2.5 rounded-xl outline-none placeholder:opacity-40 focus:ring-1 focus:ring-[#0f172a]/10 transition"
              />

              <div className="flex gap-2">
                {(["Hadir", "Tidak Hadir"] as const).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setWishAttendance(opt)}
                    className={`flex-1 py-2.5 rounded-xl text-[10px] sm:text-xs tracking-wider uppercase font-medium transition-all duration-200 ${
                      wishAttendance === opt
                        ? "bg-[#0f172a] text-white"
                        : "bg-[#f5f5f7] text-[#6b7280] hover:bg-[#ebebeb]"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <textarea
                placeholder="Tulis ucapan..."
                value={wishMessage}
                onChange={(e) => setWishMessage(e.target.value)}
                rows={3}
                className="w-full bg-[#f5f5f7] text-[#0f172a] text-xs sm:text-sm px-4 py-2.5 rounded-xl outline-none placeholder:opacity-40 focus:ring-1 focus:ring-[#0f172a]/10 resize-none transition"
              />

              <button
                onClick={submitWish}
                disabled={!wishName.trim() || submitting}
                className="w-full bg-[#0f172a] text-white py-2.5 rounded-xl text-[10px] sm:text-xs tracking-wider uppercase font-medium flex items-center justify-center gap-2 hover:bg-[#1e293b] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <span className="inline-block w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                {submitSuccess ? "Terkirim!" : "Kirim Ucapan"}
              </button>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <span className="block flex-1 h-px bg-[#d1d5db]" />
              <span className="text-[#6b7280] text-[9px] sm:text-[10px] tracking-wider uppercase opacity-60">
                Ucapan Tamu
              </span>
              <span className="block flex-1 h-px bg-[#d1d5db]" />
            </div>

            {wishes.length === 0 ? (
              <p className="text-center text-[#6b7280]/40 text-[10px] sm:text-xs py-4">
                Belum ada ucapan. Jadilah yang pertama! <Heart className="w-3 h-3 inline text-rose-300" />
              </p>
            ) : (
              <div className="flex flex-col gap-3 max-h-[40vh] overflow-y-auto pr-1">
                {wishes.map((wish) => (
                  <div key={wish.id} className="bg-[#f5f5f7] rounded-xl px-4 py-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[#0f172a] text-xs sm:text-sm font-medium">
                        {wish.name}
                      </span>
                      <span className={`text-[8px] sm:text-[9px] px-2 py-0.5 rounded-full tracking-wider uppercase ${
                        wish.attendance === "Hadir"
                          ? "bg-[#0f172a]/10 text-[#0f172a]/70"
                          : "bg-[#0f172a]/5 text-[#0f172a]/40"
                      }`}>
                        {wish.attendance}
                      </span>
                    </div>
                    {wish.message && (
                      <p className="text-[#374151] text-[10px] sm:text-xs leading-relaxed">
                        {wish.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ═══════ Footer ═══════ */}
        <footer className="w-full px-6 py-8 text-center" style={{ background: "#0f172a" }}>
          <p className="text-white/40 text-[10px] sm:text-xs mb-3">
            Designed By Memoraa&apos;
          </p>
          <p className="text-white/25 text-[9px] sm:text-[10px]">
            &copy; {new Date().getFullYear()} Memoraa&apos;. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
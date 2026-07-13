"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, X, MapPin, Gift, Play, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface SilentPromiseInvitationProps {
  onClose: () => void;
}

const TEAL = "#3A5E6C";
const TEAL_LIGHT = "#476C7C";
const BROWN = "#8B6F47";
const DARK_TEXT = "#373A38";
const BEIGE = "#F5F2F0";

export default function SilentPromiseInvitation({ onClose }: SilentPromiseInvitationProps) {
  const [showCover, setShowCover] = useState(true);
  const [showGift, setShowGift] = useState(false);

  // RSVP / Wishes
  const [wishes, setWishes] = useState<{ id: string; name: string; attendance: string; message: string | null; createdAt: string }[]>([]);
  const [wishName, setWishName] = useState("");
  const [wishAttendance, setWishAttendance] = useState("Hadir");
  const [wishMessage, setWishMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Countdown to Nov 5, 2026
  const calculateTimeLeft = useCallback(() => {
    const target = new Date("2026-11-05T09:00:00+07:00").getTime();
    const now = Date.now();
    const diff = Math.max(0, target - now);
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }, []);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const loadWishes = useCallback(async () => {
    try {
      const res = await fetch("/api/wishes");
      if (res.ok) {
        const data = await res.json();
        setWishes(data);
      }
    } catch { /* silent */ }
  }, []);

  // Load wishes on mount
  const wishesLoaded = useRef(false);
  useEffect(() => {
    if (!wishesLoaded.current) {
      wishesLoaded.current = true;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      void loadWishes();
    }
  });

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
        setWishAttendance("Hadir");
        setSubmitSuccess(true);
        setTimeout(() => setSubmitSuccess(false), 2000);
        loadWishes();
      }
    } catch { /* silent */ }
    setSubmitting(false);
  };

  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="fixed inset-0 z-50" style={{ fontFamily: "var(--font-lato), sans-serif" }}>
      {/* COVER OVERLAY */}
      <AnimatePresence>
        {showCover && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center"
            style={{
              backgroundImage: "url('/invitations/online/silent-promise/cover-bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Semi-transparent overlay for readability */}
            <div className="absolute inset-0 bg-white/20" />

            <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-sm">
              {/* The Wedding Of */}
              <p
                className="text-xs tracking-[0.3em] uppercase mb-6"
                style={{ color: DARK_TEXT, fontFamily: "var(--font-playfair), serif", fontWeight: 400 }}
              >
                The Wedding of
              </p>

              {/* Couple Photo */}
              <div className="relative w-52 h-72 sm:w-60 sm:h-80 rounded-lg overflow-hidden shadow-lg mb-6 border-2 border-white/80">
                <Image
                  src="/invitations/online/silent-promise/couple-cover.png"
                  alt="Fajar & Zahra"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Names */}
              <h1
                className="text-3xl sm:text-4xl mb-2"
                style={{ color: DARK_TEXT, fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}
              >
                Fajar & Zahra
              </h1>

              {/* Date */}
              <p className="text-xs tracking-wider mb-8" style={{ color: "rgba(55,58,56,0.7)", fontFamily: "var(--font-lato), sans-serif" }}>
                Kamis, 5 November 2026
              </p>

              {/* Dear */}
              <p className="text-xs mb-1" style={{ color: "rgba(55,58,56,0.7)" }}>
                Dear
              </p>
              <p className="text-sm font-medium mb-8" style={{ color: DARK_TEXT }}>
                M Rudi Iskandar
              </p>

              {/* BUKA UNDANGAN Button */}
              <button
                onClick={() => setShowCover(false)}
                className="px-10 py-3 rounded-full text-white font-bold text-sm tracking-wider uppercase transition-transform active:scale-95 shadow-lg"
                style={{ backgroundColor: TEAL, fontFamily: "var(--font-lato), sans-serif" }}
              >
                Buka Undangan
              </button>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-70 w-8 h-8 flex items-center justify-center rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN SCROLLABLE CONTENT */}
      {!showCover && (
        <div className="fixed inset-0 z-50 bg-white">
          {/* Close button (visible after cover) */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-[70] w-8 h-8 flex items-center justify-center rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div
            ref={contentRef}
            className="h-full overflow-y-auto"
            style={{ scrollBehavior: "smooth" }}
          >
            {/* ============================================ */}
            {/* SECTION 1: Landscape / Scene Illustration    */}
            {/* ============================================ */}
            <section className="relative w-full h-[60vh] sm:h-[70vh]">
              <Image
                src="/invitations/online/silent-promise/landscape-scene.png"
                alt="Romantic landscape"
                fill
                className="object-cover"
              />
            </section>

            {/* ============================================ */}
            {/* SECTION 2: Quran Verse                       */}
            {/* ============================================ */}
            <section className="relative py-16 px-6 text-center" style={{ backgroundColor: "rgba(19,33,61,0.91)" }}>
              <div className="max-w-md mx-auto">
                <p
                  className="text-3xl sm:text-4xl mb-4 leading-relaxed"
                  style={{ fontFamily: "var(--font-cormorant), serif", color: "rgba(255,255,255,0.9)", direction: "rtl" }}
                >
                  &#x201C;وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً&#x201D;
                </p>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-12 h-px bg-white/30" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                  <div className="w-12 h-px bg-white/30" />
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-2">
                  &ldquo;Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang.&rdquo;
                </p>
                <p className="text-white/60 text-xs tracking-wider">
                  (QS. Ar-Rum: 21)
                </p>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 3: Assalamu'alaikum + Couple         */}
            {/* ============================================ */}
            <section className="py-14 px-6 text-center" style={{ backgroundColor: BEIGE }}>
              <div className="max-w-md mx-auto">
                <p
                  className="text-sm mb-6"
                  style={{ color: DARK_TEXT, fontFamily: "var(--font-playfair), serif", fontWeight: 400 }}
                >
                  Assalamu&apos;alaikum Wr. Wb.
                </p>
                <p className="text-xs leading-relaxed mb-10" style={{ color: "rgba(55,58,56,0.75)" }}>
                  Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i serta kerabat sekalian untuk menghadiri acara pernikahan kami:
                </p>

                {/* Groom */}
                <div className="flex flex-col items-center mb-4">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-md mb-4 bg-gray-200">
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <span className="text-gray-400 text-xs">Foto Mempelai Pria</span>
                    </div>
                  </div>
                  <h3
                    className="text-2xl sm:text-3xl"
                    style={{ color: BROWN, fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}
                  >
                    Fajar
                  </h3>
                  <p className="text-xs mt-2 leading-relaxed" style={{ color: "rgba(55,58,56,0.7)" }}>
                    Putra pertama dari<br />
                    Bapak H. Nugroho dan<br />
                    Ibu Hj. Ratna Wulandari
                  </p>
                </div>

                {/* Ampersand */}
                <div className="my-4">
                  <span
                    className="text-4xl"
                    style={{ color: BROWN, fontFamily: "var(--font-great-vibes), cursive" }}
                  >
                    &amp;
                  </span>
                </div>

                {/* Bride */}
                <div className="flex flex-col items-center">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-md mb-4 bg-gray-200">
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <span className="text-gray-400 text-xs">Foto Mempelai Wanita</span>
                    </div>
                  </div>
                  <h3
                    className="text-2xl sm:text-3xl"
                    style={{ color: BROWN, fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}
                  >
                    Zahra
                  </h3>
                  <p className="text-xs mt-2 leading-relaxed" style={{ color: "rgba(55,58,56,0.7)" }}>
                    Putri pertama dari<br />
                    Bapak Dr. Hadi Setiawan dan<br />
                    Ibu Andini Prameswari
                  </p>
                </div>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 4: Save The Date + Countdown         */}
            {/* ============================================ */}
            <section className="py-16 px-6 text-center relative overflow-hidden" style={{ backgroundColor: TEAL }}>
              {/* Flourish ornament */}
              <div className="relative w-32 h-10 mx-auto mb-6 opacity-60">
                <Image
                  src="/invitations/online/silent-promise/flourish-white.png"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>

              <h2
                className="text-2xl sm:text-3xl text-white mb-3"
                style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}
              >
                Save the Date
              </h2>
              <p className="text-white/80 text-xs leading-relaxed mb-10 max-w-xs mx-auto">
                Dan kami bersyukur, dipertemukan Allah di waktu terbaik. Kini kami menanti hari istimewa kami.
              </p>

              {/* Countdown */}
              <div className="flex justify-center gap-3 sm:gap-4">
                {[
                  { value: timeLeft.days, label: "Hari" },
                  { value: timeLeft.hours, label: "Jam" },
                  { value: timeLeft.minutes, label: "Menit" },
                  { value: timeLeft.seconds, label: "Detik" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 mb-1">
                      <span className="text-white text-xl sm:text-2xl font-bold tabular-nums">
                        {String(item.value).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="text-white/70 text-[10px] uppercase tracking-wider">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 5: Akad Nikah                       */}
            {/* ============================================ */}
            <section className="py-14 px-6 text-center relative" style={{ backgroundColor: BEIGE }}>
              <div className="max-w-sm mx-auto relative">
                {/* Ornament border background */}
                <div className="absolute -inset-4 opacity-20 pointer-events-none">
                  <Image
                    src="/invitations/online/silent-promise/ornament-event.png"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="relative z-10">
                  <h2
                    className="text-2xl sm:text-3xl mb-2"
                    style={{ color: DARK_TEXT, fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}
                  >
                    Akad Nikah
                  </h2>

                  {/* Divider */}
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <div className="w-10 h-px" style={{ backgroundColor: BROWN }} />
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: BROWN }} />
                    <div className="w-10 h-px" style={{ backgroundColor: BROWN }} />
                  </div>

                  <p className="text-xs font-bold tracking-[0.2em] uppercase mb-1" style={{ color: DARK_TEXT }}>
                    Kamis, 5 November 2026
                  </p>
                  <p className="text-xs mb-1" style={{ color: "rgba(55,58,56,0.7)" }}>
                    Pukul: 09:00 - 10:00 WIB
                  </p>
                  <p className="text-xs mb-6" style={{ color: "rgba(55,58,56,0.7)" }}>
                    Bertempat di: Ballroom Samudra<br />
                    Jl. Ahmad Yani No. 5, Semarang
                  </p>

                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white text-xs font-medium transition-transform active:scale-95 shadow-md"
                    style={{ backgroundColor: TEAL }}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    Lihat Lokasi
                  </a>
                </div>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 6: Resepsi                          */}
            {/* ============================================ */}
            <section className="py-14 px-6 text-center relative" style={{ backgroundColor: BEIGE }}>
              <div className="max-w-sm mx-auto relative">
                <div className="absolute -inset-4 opacity-20 pointer-events-none">
                  <Image
                    src="/invitations/online/silent-promise/ornament-event.png"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="relative z-10">
                  <h2
                    className="text-2xl sm:text-3xl mb-2"
                    style={{ color: DARK_TEXT, fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}
                  >
                    Resepsi
                  </h2>

                  <div className="flex items-center justify-center gap-2 mb-6">
                    <div className="w-10 h-px" style={{ backgroundColor: BROWN }} />
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: BROWN }} />
                    <div className="w-10 h-px" style={{ backgroundColor: BROWN }} />
                  </div>

                  <p className="text-xs font-bold tracking-[0.2em] uppercase mb-1" style={{ color: DARK_TEXT }}>
                    Kamis, 5 November 2026
                  </p>
                  <p className="text-xs mb-1" style={{ color: "rgba(55,58,56,0.7)" }}>
                    Pukul: 13:00 - 17:00 WIB
                  </p>
                  <p className="text-xs mb-6" style={{ color: "rgba(55,58,56,0.7)" }}>
                    Bertempat di: Ballroom Samudra<br />
                    Jl. Ahmad Yani No. 5, Semarang
                  </p>

                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white text-xs font-medium transition-transform active:scale-95 shadow-md"
                    style={{ backgroundColor: TEAL }}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    Lihat Lokasi
                  </a>
                </div>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 7: Live Streaming                    */}
            {/* ============================================ */}
            <section className="py-14 px-6 text-center" style={{ backgroundColor: TEAL }}>
              <div className="max-w-sm mx-auto">
                <h2
                  className="text-2xl sm:text-3xl text-white mb-4"
                  style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}
                >
                  Live Streaming
                </h2>
                <p className="text-white/80 text-xs leading-relaxed mb-8">
                  Kami mengajak Anda yang tidak bisa hadir langsung untuk bergabung pada momen spesial kami melalui siaran langsung secara virtual dengan klik tombol berikut:
                </p>
                <button
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-transform active:scale-95 bg-white shadow-md"
                  style={{ color: TEAL }}
                >
                  <Play className="w-4 h-4" />
                  Live Streaming
                </button>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 8: Love Story                        */}
            {/* ============================================ */}
            <section className="py-14 px-6" style={{ backgroundColor: BEIGE }}>
              <div className="max-w-sm mx-auto text-center">
                <h2
                  className="text-2xl sm:text-3xl mb-10"
                  style={{ color: BROWN, fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}
                >
                  Love Story
                </h2>

                {/* Timeline items */}
                {[
                  {
                    title: "Awal Bertemu",
                    desc: "Awalnya hanya teman perjalanan, lalu menjadi teman hidup yang saling menguatkan.",
                  },
                  {
                    title: "Komitmen",
                    desc: "Kami sepakat membawa hubungan ini ke langkah yang lebih serius dengan restu keluarga.",
                  },
                  {
                    title: "Lamaran",
                    desc: "Kami memilih tanggal istimewa untuk mengikat janji dalam suasana yang penuh haru.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                    className="mb-8 last:mb-0"
                  >
                    {/* Timeline dot and line */}
                    <div className="flex items-start gap-4 text-left">
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                          style={{ backgroundColor: TEAL }}
                        >
                          {i + 1}
                        </div>
                        {i < 2 && <div className="w-px h-16 mt-1" style={{ backgroundColor: "rgba(139,111,71,0.3)" }} />}
                      </div>
                      <div className="pt-1">
                        <h4 className="text-sm font-bold mb-1" style={{ color: DARK_TEXT }}>
                          {item.title}
                        </h4>
                        <p className="text-xs leading-relaxed" style={{ color: "rgba(55,58,56,0.65)" }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 9: Galeri Foto                       */}
            {/* ============================================ */}
            <section className="py-14 px-6" style={{ backgroundColor: BEIGE }}>
              <div className="max-w-sm mx-auto text-center">
                <h2
                  className="text-2xl sm:text-3xl mb-8"
                  style={{ color: BROWN, fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}
                >
                  Galeri Foto
                </h2>

                <div className="grid grid-cols-2 gap-3">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <div
                      key={n}
                      className="aspect-[4/5] rounded-lg overflow-hidden bg-gray-200 shadow-sm"
                    >
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-[10px]">Foto {n}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 10: Wedding Gift                     */}
            {/* ============================================ */}
            <section className="py-14 px-6 text-center" style={{ backgroundColor: TEAL }}>
              <div className="max-w-sm mx-auto">
                <h2
                  className="text-2xl sm:text-3xl text-white mb-4"
                  style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}
                >
                  Wedding Gift
                </h2>
                <p className="text-white/80 text-xs leading-relaxed mb-8">
                  Bagi Bapak/Ibu/Saudara/i yang ingin mengirimkan hadiah pernikahan dapat melalui virtual account atau e-wallet di bawah ini:
                </p>

                <AnimatePresence mode="wait">
                  {!showGift ? (
                    <motion.button
                      key="gift-btn"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setShowGift(true)}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-transform active:scale-95 bg-white shadow-md"
                      style={{ color: TEAL }}
                    >
                      <Gift className="w-4 h-4" />
                      Kirim Hadiah
                    </motion.button>
                  ) : (
                    <motion.div
                      key="gift-info"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                    >
                      <p className="text-white/70 text-xs mb-2">Bank BCA</p>
                      <p className="text-white text-xl font-bold tracking-wider mb-1">1234 5678 90</p>
                      <p className="text-white/60 text-xs mb-4">a.n. Fajar & Zahra</p>
                      <button
                        onClick={() => navigator.clipboard?.writeText("1234567890")}
                        className="text-white/50 text-[10px] underline hover:text-white/80 transition-colors"
                      >
                        Salin Nomor Rekening
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 11: RSVP                             */}
            {/* ============================================ */}
            <section className="py-14 px-6" style={{ backgroundColor: TEAL }}>
              <div className="max-w-sm mx-auto">
                <h2
                  className="text-2xl sm:text-3xl text-white text-center mb-2"
                  style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}
                >
                  Rsvp
                </h2>
                <p className="text-white/70 text-xs text-center mb-6">
                  Konfirmasi Kehadiran & Ucapan Selamat
                </p>

                {/* Attendance stats */}
                <div className="flex justify-center gap-4 mb-8">
                  {["Hadir", "Tidak Hadir", "Masih Ragu"].map((label) => {
                    const count = wishes.filter((w) =>
                      label === "Hadir" ? w.attendance === "Hadir" :
                      label === "Tidak Hadir" ? w.attendance === "Tidak Hadir" :
                      w.attendance === "Masih Ragu"
                    ).length;
                    return (
                      <div key={label} className="text-center">
                        <p className="text-white text-lg font-bold">{count}</p>
                        <p className="text-white/60 text-[10px]">{label}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Form */}
                <div className="space-y-3 mb-8">
                  <input
                    type="text"
                    placeholder="Nama"
                    value={wishName}
                    onChange={(e) => setWishName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs placeholder:text-white/40 outline-none focus:border-white/50 transition-colors"
                  />
                  <textarea
                    placeholder="Ucapan"
                    value={wishMessage}
                    onChange={(e) => setWishMessage(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs placeholder:text-white/40 outline-none focus:border-white/50 transition-colors resize-none"
                  />
                  <select
                    value={wishAttendance}
                    onChange={(e) => setWishAttendance(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs outline-none focus:border-white/50 transition-colors appearance-none"
                  >
                    <option value="Hadir" className="text-gray-800">Akan Hadir</option>
                    <option value="Tidak Hadir" className="text-gray-800">Tidak Hadir</option>
                    <option value="Masih Ragu" className="text-gray-800">Masih Ragu</option>
                  </select>
                  <button
                    onClick={submitWish}
                    disabled={submitting || !wishName.trim()}
                    className="w-full py-2.5 rounded-xl text-xs font-bold transition-all active:scale-[0.98] disabled:opacity-50"
                    style={{ backgroundColor: "#E8C547", color: "#1a1a1a" }}
                  >
                    {submitting ? (
                      <span className="inline-flex items-center gap-1">
                        <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Mengirim...
                      </span>
                    ) : submitSuccess ? "Terkirim!" : "Kirim"}
                  </button>
                </div>

                {/* Wishes list */}
                <div>
                  <p className="text-white text-sm font-bold text-center mb-4">Ucapan</p>
                  <div className="max-h-[40vh] overflow-y-auto space-y-3 pr-1 custom-scrollbar">
                    {wishes.length === 0 ? (
                      <p className="text-white/40 text-xs text-center">Belum ada ucapan</p>
                    ) : (
                      wishes.map((wish) => (
                        <div
                          key={wish.id}
                          className="bg-white/10 rounded-xl p-3 border border-white/10"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-white text-xs font-bold">{wish.name}</span>
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full ${
                                wish.attendance === "Hadir"
                                  ? "bg-green-500/20 text-green-300"
                                  : wish.attendance === "Tidak Hadir"
                                  ? "bg-red-500/20 text-red-300"
                                  : "bg-yellow-500/20 text-yellow-300"
                              }`}
                            >
                              {wish.attendance}
                            </span>
                          </div>
                          {wish.message && (
                            <p className="text-white/70 text-xs leading-relaxed">{wish.message}</p>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 12: Footer / E-Invitation            */}
            {/* ============================================ */}
            <section className="py-14 px-6 text-center" style={{ backgroundColor: TEAL_LIGHT }}>
              <div className="max-w-sm mx-auto">
                <h2
                  className="text-xl text-white mb-3"
                  style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 600 }}
                >
                  E-Invitation
                </h2>
                <div className="w-10 h-px bg-white/30 mx-auto mb-3" />
                <p className="text-white/70 text-[10px] leading-relaxed mb-6">
                  Tunjukan QR code untuk check in lokasi kepada petugas agar discan/dipindai karena data terintegrasi dengan sistem buku tamu digital.
                </p>
                <button
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-medium transition-transform active:scale-95 bg-white shadow-md"
                  style={{ color: TEAL_LIGHT }}
                >
                  Unduh QR
                </button>

                {/* Couple name footer */}
                <div className="mt-10 pt-6 border-t border-white/10">
                  <p
                    className="text-lg text-white"
                    style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 600 }}
                  >
                    Fajar & Zahra
                  </p>
                  <p className="text-white/40 text-[10px] mt-2">
                    Kamis, 5 November 2026
                  </p>
                </div>

                {/* Powered by */}
                <div className="mt-6 flex items-center justify-center gap-1">
                  <ChevronRight className="w-3 h-3 text-white/30" />
                  <span className="text-white/30 text-[10px]">Powered by Memoraa&apos;</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
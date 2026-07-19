"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface PalawaBloomInvitationProps {
  onClose: () => void;
}

// Shared animation variant
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

// Camera placeholder SVG
function CameraPlaceholder({ label = "Foto" }: { label?: string }) {
  return (
    <div className="w-full h-full bg-gray-200 flex flex-col items-center justify-center gap-2">
      <svg
        className="w-8 h-8 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z"
        />
      </svg>
      <span className="text-gray-400 text-xs">{label}</span>
    </div>
  );
}

export default function PalawaBloomInvitation({ onClose }: PalawaBloomInvitationProps) {
  const [showCover, setShowCover] = useState(true);

  // RSVP / Wishes
  const [wishes, setWishes] = useState<
    { id: string; name: string; attendance: string; message: string | null; createdAt: string }[]
  >([]);
  const [wishName, setWishName] = useState("");
  const [wishAttendance, setWishAttendance] = useState("Hadir");
  const [wishMessage, setWishMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Countdown to May 17, 2026
  const calculateTimeLeft = useCallback(() => {
    const target = new Date("2026-05-17T09:00:00+07:00").getTime();
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
      const res = await fetch("/api/wishes?templateId=palawa-bloom");
      if (res.ok) {
        const data = await res.json();
        setWishes(data);
      }
    } catch {
      /* silent */
    }
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
          templateId: "palawa-bloom",
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
    } catch {
      /* silent */
    }
    setSubmitting(false);
  };

  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="fixed inset-0 z-50"
      style={{ fontFamily: "var(--font-lato), sans-serif" }}
    >
      {/* ============================================ */}
      {/* COVER OVERLAY                                */}
      {/* ============================================ */}
      <AnimatePresence>
        {showCover && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center"
          >
            {/* Couple photo background */}
            <Image
              src="/invitations/online/palawa-bloom/couple-cover.png"
              alt="Wisnu & Via"
              fill
              className="object-cover grayscale"
              priority
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Centered content */}
            <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-sm">
              <p
                className="text-xs tracking-[0.3em] uppercase mb-4 text-white/90"
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontWeight: 400,
                }}
              >
                The Wedding of
              </p>

              <h1
                className="text-4xl sm:text-5xl mb-8 text-white"
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontWeight: 700,
                }}
              >
                Wisnu &amp; Via
              </h1>

              <p className="text-xs text-white/80 mb-1">Kepada Yth :</p>
              <p
                className="text-sm sm:text-base text-white mb-8"
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontWeight: 500,
                }}
              >
                M Rudi Iskandar M. Sos
              </p>

              {/* Buka Undangan Button */}
              <button
                onClick={() => setShowCover(false)}
                className="px-8 py-2.5 rounded-full bg-black text-white font-bold text-sm tracking-wider uppercase transition-transform active:scale-95 shadow-lg"
              >
                Buka Undangan
              </button>
            </div>

            {/* Disclaimer at bottom */}
            <p className="absolute bottom-6 text-white/50 text-[9px] text-center px-6 leading-relaxed">
              *Mohon Maaf apabila ada kesalahan nama atau gelar
            </p>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-[70] w-8 h-8 flex items-center justify-center rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================ */}
      {/* MAIN SCROLLABLE CONTENT                      */}
      {/* ============================================ */}
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
            {/* SECTION 1: Couple Portrait                  */}
            {/* ============================================ */}
            <section className="relative min-h-screen flex flex-col items-center justify-center py-16 px-6 overflow-hidden"
              style={{ backgroundColor: "#F0F0F0" }}
            >
              <div className="absolute inset-0 pointer-events-none">
                <Image
                  src="/invitations/online/palawa-bloom/bg-groom.png"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>

              <div className="relative z-10">
                {/* Arch frame */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={0}
                  variants={fadeUp}
                  className="relative w-64 h-[420px] sm:w-72 sm:h-[460px] mx-auto"
                >
                  {/* Arch frame border */}
                  <div className="absolute inset-0 overflow-hidden rounded-t-full rounded-b-[2rem]">
                    <Image
                      src="/invitations/online/palawa-bloom/arch-frame.png"
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Couple photo clipped inside */}
                  <div className="absolute inset-[3%] overflow-hidden rounded-t-full rounded-b-[2rem]">
                    <Image
                      src="/invitations/online/palawa-bloom/couple-cover.png"
                      alt="Wisnu & Via"
                      fill
                      className="object-cover grayscale"
                    />
                  </div>
                </motion.div>

                {/* Bottom area: flower left, text right */}
                <div className="flex items-end justify-between mt-2 px-2 sm:px-0">
                  {/* Flower bouquet bottom-left */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    custom={1}
                    variants={fadeUp}
                    className="relative w-36 h-36 sm:w-44 sm:h-44 -mt-8 -ml-2 sm:-ml-4 flex-shrink-0"
                  >
                    <Image
                      src="/invitations/online/palawa-bloom/bouquet-corner.png"
                      alt=""
                      fill
                      className="object-contain mix-blend-multiply"
                    />
                  </motion.div>

                  {/* Text bottom-right */}
                  <div className="text-right flex-shrink-0 pb-2">
                    <motion.p
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-50px" }}
                      custom={2}
                      variants={fadeUp}
                      className="text-xs tracking-[0.2em] uppercase text-[#666666] mb-1"
                    >
                      The Wedding of
                    </motion.p>
                    <motion.h2
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-50px" }}
                      custom={3}
                      variants={fadeUp}
                      className="text-2xl sm:text-3xl text-black"
                      style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}
                    >
                      Wisnu &amp; Via
                    </motion.h2>
                  </div>
                </div>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 2: Groom Profile                    */}
            {/* ============================================ */}
            <section
              className="min-h-screen flex flex-col items-center justify-center py-16 px-6"
              style={{ backgroundColor: "#F5F5F5" }}
            >
              <div className="max-w-sm w-full text-center">
                {/* Floral ornament at top */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={0}
                  variants={fadeUp}
                  className="relative w-24 h-8 mx-auto mb-8 opacity-40"
                >
                  <Image
                    src="/invitations/online/palawa-bloom/floral-heart.png"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </motion.div>

                {/* Circular photo placeholder */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={1}
                  variants={fadeUp}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-md mx-auto mb-6"
                >
                  <CameraPlaceholder label="Foto" />
                </motion.div>

                <motion.h3
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={2}
                  variants={fadeUp}
                  className="text-3xl sm:text-4xl text-black mb-2"
                  style={{ fontFamily: "var(--font-great-vibes), cursive" }}
                >
                  Wisnu
                </motion.h3>

                <motion.p
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={3}
                  variants={fadeUp}
                  className="text-sm text-[#333333] mb-4"
                  style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 500 }}
                >
                  Wisnu Pangarep S.M
                </motion.p>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={4}
                  variants={fadeUp}
                >
                  <p className="text-xs text-[#666666] mb-1">Putra pertama dari</p>
                  <p className="text-xs text-[#333333] leading-relaxed">
                    Bpk Lukman Nul Hakim S.pd &amp; Ibu Nani Aulia
                  </p>
                </motion.div>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 3: Bride Profile                    */}
            {/* ============================================ */}
            <section
              className="min-h-screen flex flex-col items-center justify-center py-16 px-6"
              style={{ backgroundColor: "#F0F0F0" }}
            >
              <div className="max-w-sm w-full text-center">
                {/* Floral ornament at top */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={0}
                  variants={fadeUp}
                  className="relative w-24 h-8 mx-auto mb-8 opacity-40"
                >
                  <Image
                    src="/invitations/online/palawa-bloom/floral-heart.png"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </motion.div>

                {/* Circular photo placeholder */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={1}
                  variants={fadeUp}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-md mx-auto mb-6"
                >
                  <CameraPlaceholder label="Foto" />
                </motion.div>

                <motion.h3
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={2}
                  variants={fadeUp}
                  className="text-3xl sm:text-4xl text-black mb-2"
                  style={{ fontFamily: "var(--font-great-vibes), cursive" }}
                >
                  Via
                </motion.h3>

                <motion.p
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={3}
                  variants={fadeUp}
                  className="text-sm text-[#333333] mb-4"
                  style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 500 }}
                >
                  Olivia Sungkar Marhani S.Kep
                </motion.p>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={4}
                  variants={fadeUp}
                >
                  <p className="text-xs text-[#666666] mb-1">Putri kedua dari</p>
                  <p className="text-xs text-[#333333] leading-relaxed">
                    Bpk Agus Setiabudi M.Sos &amp; Ibu Syofia Marhani S.Kep.Ners
                  </p>
                </motion.div>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 4: Save The Date + Countdown        */}
            {/* ============================================ */}
            <section
              className="min-h-screen flex flex-col items-center justify-center py-16 px-6"
              style={{ backgroundColor: "#F0F0F0" }}
            >
              <div className="max-w-sm w-full text-center">
                {/* Floral heart wreath */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={0}
                  variants={fadeUp}
                  className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto mb-8"
                >
                  <Image
                    src="/invitations/online/palawa-bloom/floral-heart.png"
                    alt="Floral heart wreath"
                    fill
                    className="object-contain"
                  />
                </motion.div>

                <motion.h2
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={1}
                  variants={fadeUp}
                  className="text-3xl sm:text-4xl text-black mb-3"
                  style={{ fontFamily: "var(--font-great-vibes), cursive" }}
                >
                  Save The Date
                </motion.h2>

                <motion.p
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={2}
                  variants={fadeUp}
                  className="text-xs text-[#666666] leading-relaxed mb-10 max-w-xs mx-auto"
                >
                  Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa tenteram kepadanya.
                </motion.p>

                {/* Countdown */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={3}
                  variants={fadeUp}
                  className="flex justify-center gap-3 sm:gap-4"
                >
                  {[
                    { value: timeLeft.days, label: "Hari" },
                    { value: timeLeft.hours, label: "Jam" },
                    { value: timeLeft.minutes, label: "Menit" },
                    { value: timeLeft.seconds, label: "Detik" },
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col items-center">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-black flex items-center justify-center shadow-md mb-1">
                        <span className="text-white text-xl sm:text-2xl font-bold tabular-nums">
                          {String(item.value).padStart(2, "0")}
                        </span>
                      </div>
                      <span className="text-[#666666] text-[10px] uppercase tracking-wider">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 5: Akad Nikah                       */}
            {/* ============================================ */}
            <section
              className="py-14 px-6"
              style={{ backgroundColor: "#F0F0F0" }}
            >
              <div className="max-w-sm mx-auto text-center">
                {/* Floral heart wreath above card */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={0}
                  variants={fadeUp}
                  className="relative w-20 h-20 mx-auto mb-6 opacity-50"
                >
                  <Image
                    src="/invitations/online/palawa-bloom/floral-heart.png"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </motion.div>

                {/* White card */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={1}
                  variants={fadeUp}
                  className="bg-white rounded-2xl shadow-sm p-8"
                >
                  <h2
                    className="text-3xl sm:text-4xl text-black mb-4"
                    style={{ fontFamily: "var(--font-great-vibes), cursive" }}
                  >
                    Akad Nikah
                  </h2>

                  {/* Divider */}
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <div className="w-10 h-px bg-[#D0D0D0]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D0D0D0]" />
                    <div className="w-10 h-px bg-[#D0D0D0]" />
                  </div>

                  <p className="text-xs font-bold tracking-[0.15em] text-black mb-1">
                    Sabtu, 17 Mei 2026
                  </p>
                  <p className="text-xs text-[#666666] mb-1">09:00 – 11:00 WIB</p>
                  <p className="text-xs text-[#333333] mb-1 font-medium">Masjid An-Nur</p>
                </motion.div>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 6: Resepsi                          */}
            {/* ============================================ */}
            <section
              className="py-14 px-6"
              style={{ backgroundColor: "#F5F5F5" }}
            >
              <div className="max-w-sm mx-auto text-center">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={0}
                  variants={fadeUp}
                  className="relative w-20 h-20 mx-auto mb-6 opacity-50"
                >
                  <Image
                    src="/invitations/online/palawa-bloom/floral-heart.png"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </motion.div>

                {/* White card */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={1}
                  variants={fadeUp}
                  className="bg-white rounded-2xl shadow-sm p-8"
                >
                  <h2
                    className="text-3xl sm:text-4xl text-black mb-4"
                    style={{ fontFamily: "var(--font-great-vibes), cursive" }}
                  >
                    Resepsi
                  </h2>

                  {/* Divider */}
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <div className="w-10 h-px bg-[#D0D0D0]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D0D0D0]" />
                    <div className="w-10 h-px bg-[#D0D0D0]" />
                  </div>

                  <p className="text-xs font-bold tracking-[0.15em] text-black mb-1">
                    Sabtu, 17 Mei 2026
                  </p>
                  <p className="text-xs text-[#666666] mb-1">10:00 – 15:00 WIB</p>
                  <p className="text-xs text-[#333333] mb-1 font-medium">
                    Gedung Balai Kartini
                  </p>
                  <p className="text-xs text-[#666666] leading-relaxed mb-6">
                    Jl. Gatot Subroto No 145, Petamburan
                    <br />
                    Jakarta Pusat
                  </p>

                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-black text-white text-xs font-medium transition-transform active:scale-95 shadow-md"
                  >
                    Lihat Lokasi
                  </a>
                </motion.div>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 7: Gallery / Kebersamaan Kami       */}
            {/* ============================================ */}
            <section
              className="py-14 px-6"
              style={{ backgroundColor: "#F0F0F0" }}
            >
              <div className="max-w-sm mx-auto">
                <motion.h2
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={0}
                  variants={fadeUp}
                  className="text-3xl sm:text-4xl text-black text-center mb-2"
                  style={{ fontFamily: "var(--font-great-vibes), cursive" }}
                >
                  Kebersamaan Kami
                </motion.h2>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={1}
                  variants={fadeUp}
                  className="flex items-center justify-center gap-2 mb-8"
                >
                  <div className="w-10 h-px bg-[#D0D0D0]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D0D0D0]" />
                  <div className="w-10 h-px bg-[#D0D0D0]" />
                </motion.div>

                {/* 3-panel photo grid: 2 top equal, 1 bottom full */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={2}
                  variants={fadeUp}
                  className="grid grid-cols-2 gap-3"
                >
                  {/* Top left */}
                  <div className="aspect-[4/5] rounded-xl overflow-hidden bg-gray-200">
                    <CameraPlaceholder label="Foto" />
                  </div>
                  {/* Top right */}
                  <div className="aspect-[4/5] rounded-xl overflow-hidden bg-gray-200">
                    <CameraPlaceholder label="Foto" />
                  </div>
                  {/* Bottom full width */}
                  <div className="col-span-2 aspect-[16/9] rounded-xl overflow-hidden bg-gray-200">
                    <CameraPlaceholder label="Foto" />
                  </div>
                </motion.div>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 8: Wedding Live                      */}
            {/* ============================================ */}
            <section
              className="py-14 px-6"
              style={{ backgroundColor: "#F5F5F5" }}
            >
              <div className="max-w-sm mx-auto text-center">
                <motion.h2
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={0}
                  variants={fadeUp}
                  className="text-3xl sm:text-4xl text-black mb-4"
                  style={{ fontFamily: "var(--font-great-vibes), cursive" }}
                >
                  Wedding Live
                </motion.h2>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={1}
                  variants={fadeUp}
                >
                  <p className="text-xs text-[#666666] leading-relaxed mb-8 max-w-xs mx-auto">
                    Bagi Bapak/Ibu yang berhalangan hadir bisa mengikuti acara pernikahan kami secara virtual.
                  </p>

                  <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-black text-white text-xs font-medium transition-transform active:scale-95 shadow-md">
                    Live Streaming
                  </button>
                </motion.div>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 9: RSVP                              */}
            {/* ============================================ */}
            <section
              className="py-14 px-6"
              style={{ backgroundColor: "#F0F0F0" }}
            >
              <div className="max-w-sm mx-auto">
                <motion.h2
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={0}
                  variants={fadeUp}
                  className="text-3xl sm:text-4xl text-black text-center mb-2"
                  style={{ fontFamily: "var(--font-great-vibes), cursive" }}
                >
                  RSVP
                </motion.h2>
                <motion.p
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={1}
                  variants={fadeUp}
                  className="text-xs text-[#666666] text-center mb-8"
                >
                  Konfirmasi Kehadiran &amp; Ucapan Selamat
                </motion.p>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={2}
                  variants={fadeUp}
                >
                  {/* Form */}
                  <div className="space-y-3 mb-8">
                    <input
                      type="text"
                      placeholder="Nama"
                      value={wishName}
                      onChange={(e) => setWishName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D0D0D0] text-black text-xs placeholder:text-[#999999] outline-none focus:border-black transition-colors"
                    />
                    <select
                      value={wishAttendance}
                      onChange={(e) => setWishAttendance(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D0D0D0] text-black text-xs outline-none focus:border-black transition-colors appearance-none"
                    >
                      <option value="Hadir">Hadir</option>
                      <option value="Tidak Hadir">Tidak Hadir</option>
                    </select>
                    <textarea
                      placeholder="Ucapan"
                      value={wishMessage}
                      onChange={(e) => setWishMessage(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D0D0D0] text-black text-xs placeholder:text-[#999999] outline-none focus:border-black transition-colors resize-none"
                    />
                    <button
                      onClick={submitWish}
                      disabled={submitting || !wishName.trim()}
                      className="w-full py-2.5 rounded-full bg-black text-white text-xs font-bold transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <span className="inline-flex items-center gap-1">
                          <svg
                            className="animate-spin w-3.5 h-3.5"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                          Mengirim...
                        </span>
                      ) : submitSuccess ? (
                        "Terkirim!"
                      ) : (
                        <>
                          Kirim
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Wishes list */}
                  <div>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <div className="w-10 h-px bg-[#D0D0D0]" />
                      <p className="text-xs font-bold text-black">Ucapan</p>
                      <div className="w-10 h-px bg-[#D0D0D0]" />
                    </div>
                    <div className="max-h-[40vh] overflow-y-auto space-y-3 pr-1 palawa-scrollbar">
                      {wishes.length === 0 ? (
                        <p className="text-[#999999] text-xs text-center py-4">
                          Belum ada ucapan
                        </p>
                      ) : (
                        wishes.map((wish) => (
                          <div
                            key={wish.id}
                            className="bg-white rounded-xl p-3 shadow-sm border border-[#F0F0F0]"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-black text-xs font-bold">
                                {wish.name}
                              </span>
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded-full ${
                                  wish.attendance === "Hadir"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {wish.attendance}
                              </span>
                            </div>
                            {wish.message && (
                              <p className="text-[#666666] text-xs leading-relaxed">
                                {wish.message}
                              </p>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 10: Footer                           */}
            {/* ============================================ */}
            <section
              className="py-14 px-6 text-center"
              style={{ backgroundColor: "#333333" }}
            >
              <div className="max-w-sm mx-auto">
                <p className="text-white/70 text-xs leading-relaxed mb-6">
                  Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
                  Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu
                  kepada kami.
                </p>

                <h2
                  className="text-xl text-white mb-8"
                  style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 600 }}
                >
                  Wisnu &amp; Via
                </h2>

                <div className="flex items-center justify-center gap-1">
                  <span className="text-white/30 text-[10px]">
                    Powered by Memoraa&apos;
                  </span>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}

      {/* Custom scrollbar styles */}
      <style jsx global>{`
        .palawa-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .palawa-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .palawa-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.15);
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}
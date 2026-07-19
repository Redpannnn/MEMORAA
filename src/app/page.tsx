"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Download,
  Eye,
  Menu,
  Printer,
  Globe,
  MessageCircle,
  ClipboardList,
  FileEdit,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import OnlineInvitation from "@/components/online-invitation";
import JavaneseInvitation from "@/components/javanese-invitation";
import SilentPromiseInvitation from "@/components/silent-promise-invitation";
import PalawaBloomInvitation from "@/components/palawa-bloom-invitation";
import WhiteFreeInvitation from "@/components/white-free-invitation";
import JavaneseV2Invitation from "@/components/javanese-v2-invitation";

import MusicPlayer from "@/components/music-player";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type TemplateType = "cetak" | "online";

interface PageItem {
  label: string;
  src: string;
}

interface SpecItem {
  label: string;
  value: string;
}

interface Template {
  id: number;
  name: string;
  category: string;
  description: string;
  size: string;
  color: string;
  pages: PageItem[];
  specs?: SpecItem[];
  link?: string;
}

const cetakTemplates: Template[] = [
  // === CANTIK ===
  {
    id: 7, name: "CANTIK 81", category: "Cantik",
    description: "Desain undangan cantik dengan tampilan elegan dan modern. Cocok untuk pernikahan yang berkesan indah dan berkelas.",
    size: "13.5 x 21 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrjnd8tndx156xuo/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "13.5cm x 21cm" },
      { label: "Ukuran Terbuka", value: "21cm x 24cm" },
      { label: "Plastik OPP", value: "14cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.700/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 8, name: "CANTIK 82", category: "Cantik",
    description: "Desain undangan cantik dengan tampilan elegan dan modern. Cocok untuk pernikahan yang berkesan indah dan berkelas.",
    size: "13.5 x 21 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrifxroc7ozi7m9n/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "13.5cm x 21cm" },
      { label: "Ukuran Terbuka", value: "21cm x 24cm" },
      { label: "Plastik OPP", value: "14cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.700/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 9, name: "CANTIK 83", category: "Cantik",
    description: "Desain undangan cantik dengan tampilan elegan dan modern. Cocok untuk pernikahan yang berkesan indah dan berkelas.",
    size: "13.5 x 21 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrifxt9c2hmgjn97/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "13.5cm x 21cm" },
      { label: "Ukuran Terbuka", value: "21cm x 24cm" },
      { label: "Plastik OPP", value: "14cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.700/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 10, name: "CANTIK 84", category: "Cantik",
    description: "Desain undangan cantik dengan tampilan elegan dan modern. Cocok untuk pernikahan yang berkesan indah dan berkelas.",
    size: "14.5 x 20.3 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrifxumq0ra8wqur/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "14.5cm x 20.3cm" },
      { label: "Ukuran Terbuka", value: "20.3cm x 29cm" },
      { label: "Plastik OPP", value: "15cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.700/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 11, name: "CANTIK 85", category: "Cantik",
    description: "Desain undangan cantik dengan tampilan elegan dan modern. Cocok untuk pernikahan yang berkesan indah dan berkelas.",
    size: "13 x 19.8 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrifxvkud2ghxsi6/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "13cm x 19.8cm" },
      { label: "Ukuran Terbuka", value: "19.8cm x 29.3cm" },
      { label: "Plastik OPP", value: "13.5cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.700/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 12, name: "CANTIK 86", category: "Cantik",
    description: "Desain undangan cantik dengan tampilan elegan dan modern. Cocok untuk pernikahan yang berkesan indah dan berkelas.",
    size: "13 x 19.8 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrifxx5gk2fikdlt/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "13cm x 19.8cm" },
      { label: "Ukuran Terbuka", value: "19.8cm x 29.3cm" },
      { label: "Plastik OPP", value: "13.5cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.700/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 13, name: "CANTIK 94", category: "Cantik",
    description: "Desain undangan cantik dengan tampilan elegan dan modern. Cocok untuk pernikahan yang berkesan indah dan berkelas.",
    size: "11.6 x 19.5 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrjrsvskx95zbp63/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "11.6cm x 19.5cm" },
      { label: "Ukuran Terbuka", value: "19.5cm x 20.8cm" },
      { label: "Plastik OPP", value: "12cm x 20cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.700/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 14, name: "CANTIK 95", category: "Cantik",
    description: "Desain undangan cantik dengan tampilan elegan dan modern. Cocok untuk pernikahan yang berkesan indah dan berkelas.",
    size: "11.6 x 19.5 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrjrsxae3lajkaex/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "11.6cm x 19.5cm" },
      { label: "Ukuran Terbuka", value: "19.5cm x 20.8cm" },
      { label: "Plastik OPP", value: "12cm x 20cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.700/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 15, name: "CANTIK 96", category: "Cantik",
    description: "Desain undangan cantik dengan tampilan elegan dan modern. Cocok untuk pernikahan yang berkesan indah dan berkelas.",
    size: "11.6 x 19.5 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrjrsyp9gx6z6ps9/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "11.6cm x 19.5cm" },
      { label: "Ukuran Terbuka", value: "19.5cm x 20.8cm" },
      { label: "Plastik OPP", value: "12cm x 20cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.700/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 16, name: "CANTIK 97", category: "Cantik",
    description: "Desain undangan cantik dengan tampilan elegan dan modern. Cocok untuk pernikahan yang berkesan indah dan berkelas.",
    size: "11.6 x 19.5 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrjrt006mc23pppi/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "11.6cm x 19.5cm" },
      { label: "Ukuran Terbuka", value: "19.5cm x 20.8cm" },
      { label: "Plastik OPP", value: "12cm x 20cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.700/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 17, name: "CANTIK 98", category: "Cantik",
    description: "Desain undangan cantik dengan tampilan elegan dan modern. Cocok untuk pernikahan yang berkesan indah dan berkelas.",
    size: "12.2 x 20.7 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrjrt0tiom92475f/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "12.2cm x 20.7cm" },
      { label: "Ukuran Terbuka", value: "20.7cm x 23.9cm" },
      { label: "Plastik OPP", value: "12.5cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.700/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 18, name: "CANTIK 99", category: "Cantik",
    description: "Desain undangan cantik dengan tampilan elegan dan modern. Cocok untuk pernikahan yang berkesan indah dan berkelas.",
    size: "12.2 x 20.7 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrjrt1rpjvtxhy3i/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "12.2cm x 20.7cm" },
      { label: "Ukuran Terbuka", value: "20.7cm x 23.9cm" },
      { label: "Plastik OPP", value: "12.5cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.700/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 19, name: "CANTIK 100", category: "Cantik",
    description: "Desain undangan cantik dengan tampilan elegan dan modern. Cocok untuk pernikahan yang berkesan indah dan berkelas.",
    size: "11.5 x 19 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrjrt34ag7f92jcl/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "11.5cm x 19cm" },
      { label: "Ukuran Terbuka", value: "19cm x 20.3cm" },
      { label: "Plastik OPP", value: "12.5cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.700/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 20, name: "CANTIK 101", category: "Cantik",
    description: "Desain undangan cantik dengan tampilan elegan dan modern. Cocok untuk pernikahan yang berkesan indah dan berkelas.",
    size: "11.5 x 19.5 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrjrt476ji0rutj2/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "11.5cm x 19.5cm" },
      { label: "Ukuran Terbuka", value: "19.5cm x 20.6cm" },
      { label: "Plastik OPP", value: "12.5cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.700/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 21, name: "CANTIK 102", category: "Cantik",
    description: "Desain undangan cantik dengan tampilan elegan dan modern. Cocok untuk pernikahan yang berkesan indah dan berkelas.",
    size: "15.5 x 13.3 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrjrt7n71l75osrx/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "15.5cm x 13.3cm" },
      { label: "Ukuran Terbuka", value: "13.3cm x 28.8cm" },
      { label: "Plastik OPP", value: "14cm x 18cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.700/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 22, name: "CANTIK 103", category: "Cantik",
    description: "Desain undangan cantik dengan tampilan elegan dan modern. Cocok untuk pernikahan yang berkesan indah dan berkelas.",
    size: "13 x 18.5 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrjrt98xynt1kpx2/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "13cm x 18.5cm" },
      { label: "Ukuran Terbuka", value: "18.5cm x 26cm" },
      { label: "Plastik OPP", value: "13.5cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.700/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 23, name: "CANTIK 104", category: "Cantik",
    description: "Desain undangan cantik dengan tampilan elegan dan modern. Cocok untuk pernikahan yang berkesan indah dan berkelas.",
    size: "14 x 15.2 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrjrtagcp4l5q212/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "14cm x 15.2cm" },
      { label: "Ukuran Terbuka", value: "15.2cm x 31cm" },
      { label: "Plastik OPP", value: "14.5cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.700/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 24, name: "CANTIK 105", category: "Cantik",
    description: "Desain undangan cantik dengan tampilan elegan dan modern. Cocok untuk pernikahan yang berkesan indah dan berkelas.",
    size: "13 x 19.8 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrjrtbl25rqexp8y/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "13cm x 19.8cm" },
      { label: "Ukuran Terbuka", value: "19.8cm x 29cm" },
      { label: "Plastik OPP", value: "13.5cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.700/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 25, name: "CANTIK 106", category: "Cantik",
    description: "Desain undangan cantik dengan tampilan elegan dan modern. Cocok untuk pernikahan yang berkesan indah dan berkelas.",
    size: "13 x 19.8 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrjrtcp80sag9y6m/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "13cm x 19.8cm" },
      { label: "Ukuran Terbuka", value: "19.8cm x 29cm" },
      { label: "Plastik OPP", value: "13.5cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.700/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 26, name: "CANTIK 107", category: "Cantik",
    description: "Desain undangan cantik dengan tampilan elegan dan modern. Cocok untuk pernikahan yang berkesan indah dan berkelas.",
    size: "13 x 19.8 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrjrtdlvu1gbdvii/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "13cm x 19.8cm" },
      { label: "Ukuran Terbuka", value: "19.8cm x 29cm" },
      { label: "Plastik OPP", value: "13.5cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.700/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  // === HEPI ===
  {
    id: 27, name: "HEPI 26.036", category: "Hepi",
    description: "Template undangan modern dan ceria dengan desain colorful. Pilihan tepat untuk pernikahan yang menyenangkan.",
    size: "13.4 x 20 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrifyqihy56la0jl/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "13.4cm x 20cm" },
      { label: "Ukuran Terbuka", value: "20cm x 29.5cm" },
      { label: "Plastik OPP", value: "14cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.700/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 28, name: "HEPI 26.037", category: "Hepi",
    description: "Template undangan modern dan ceria dengan desain colorful. Pilihan tepat untuk pernikahan yang menyenangkan.",
    size: "11 x 20 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrifys8hdet3lg4p/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "11cm x 20cm" },
      { label: "Ukuran Terbuka", value: "20cm x 20.3cm" },
      { label: "Plastik OPP", value: "11.5cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.700/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 29, name: "HEPI 26.038", category: "Hepi",
    description: "Template undangan modern dan ceria dengan desain colorful. Pilihan tepat untuk pernikahan yang menyenangkan.",
    size: "16 x 13.4 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrifyte46233hjz6/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "16cm x 13.4cm" },
      { label: "Ukuran Terbuka", value: "13.4cm x 29.5cm" },
      { label: "Plastik OPP", value: "14cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.700/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 30, name: "HEPI 26.039", category: "Hepi",
    description: "Template undangan modern dan ceria dengan desain colorful. Pilihan tepat untuk pernikahan yang menyenangkan.",
    size: "13 x 20 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrifyu7ovmdcwleh/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "13cm x 20cm" },
      { label: "Ukuran Terbuka", value: "20cm x 30cm" },
      { label: "Plastik OPP", value: "14cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.700/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 31, name: "HEPI 26.040", category: "Hepi",
    description: "Template undangan modern dan ceria dengan desain colorful. Pilihan tepat untuk pernikahan yang menyenangkan.",
    size: "13 x 20 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrifyvhdw43kqnk5/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "13cm x 20cm" },
      { label: "Ukuran Terbuka", value: "20cm x 30cm" },
      { label: "Plastik OPP", value: "14cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.700/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  // === MALIQ ===
  {
    id: 32, name: "MQ 108", category: "Maliq",
    description: "Desain undangan mewah dengan sentuhan premium. Elegan dan berkelas untuk pernikahan impian Anda.",
    size: "15.8 x 13.5 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrig02onlapunw4z/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "15.8cm x 13.5cm" },
      { label: "Ukuran Terbuka", value: "13.5cm x 29cm" },
      { label: "Plastik OPP", value: "14cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.600/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 33, name: "MQ 109", category: "Maliq",
    description: "Desain undangan mewah dengan sentuhan premium. Elegan dan berkelas untuk pernikahan impian Anda.",
    size: "15.8 x 13.5 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrig048dcj4lqa7q/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "15.8cm x 13.5cm" },
      { label: "Ukuran Terbuka", value: "13.5cm x 29cm" },
      { label: "Plastik OPP", value: "14cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.600/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 34, name: "MQ 110", category: "Maliq",
    description: "Desain undangan mewah dengan sentuhan premium. Elegan dan berkelas untuk pernikahan impian Anda.",
    size: "13.6 x 20 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrig05ddc22w89bi/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "13.6cm x 20cm" },
      { label: "Ukuran Terbuka", value: "20cm x 29.8cm" },
      { label: "Plastik OPP", value: "14cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.700/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 35, name: "MQ 111", category: "Maliq",
    description: "Desain undangan mewah dengan sentuhan premium. Elegan dan berkelas untuk pernikahan impian Anda.",
    size: "14 x 20.3 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrig06hudq8xcahl/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "14cm x 20.3cm" },
      { label: "Ukuran Terbuka", value: "20.3cm x 29cm" },
      { label: "Plastik OPP", value: "14.5cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.700/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 36, name: "MQ 112", category: "Maliq",
    description: "Desain undangan mewah dengan sentuhan premium. Elegan dan berkelas untuk pernikahan impian Anda.",
    size: "14 x 20.3 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrig07bdqjny8a3y/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "14cm x 20.3cm" },
      { label: "Ukuran Terbuka", value: "20.3cm x 29cm" },
      { label: "Plastik OPP", value: "14.5cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.700/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  // === LINTANG ===
  {
    id: 40, name: "LG 104", category: "Lintang",
    description: "Template undangan eksklusif format square. Desain unik dan modern untuk hari spesial Anda.",
    size: "11.2 x 19 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrifzk6z6kyuosqk/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "11.2cm x 19cm" },
      { label: "Ukuran Terbuka", value: "19cm x 20.3cm" },
      { label: "Plastik OPP", value: "12cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.650/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 41, name: "LG 105", category: "Lintang",
    description: "Template undangan eksklusif format square. Desain unik dan modern untuk hari spesial Anda.",
    size: "11.2 x 19 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrifzlpp3dedmi6b/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "11.2cm x 19cm" },
      { label: "Ukuran Terbuka", value: "19cm x 20.3cm" },
      { label: "Plastik OPP", value: "12cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.650/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 42, name: "LG 106", category: "Lintang",
    description: "Template undangan eksklusif format square. Desain unik dan modern untuk hari spesial Anda.",
    size: "11.2 x 19 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrifzmplictwwh0t/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "11.2cm x 19cm" },
      { label: "Ukuran Terbuka", value: "19cm x 20.3cm" },
      { label: "Plastik OPP", value: "12cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.650/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 43, name: "LG 107", category: "Lintang",
    description: "Template undangan eksklusif format square. Desain unik dan modern untuk hari spesial Anda.",
    size: "11.2 x 19 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrifznmtfl05tzb1/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "11.2cm x 19cm" },
      { label: "Ukuran Terbuka", value: "19cm x 20.3cm" },
      { label: "Plastik OPP", value: "12cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.650/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 44, name: "LG 108", category: "Lintang",
    description: "Template undangan eksklusif format square. Desain unik dan modern untuk hari spesial Anda.",
    size: "11.2 x 19 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrifzoxb4o88gqwj/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "11.2cm x 19cm" },
      { label: "Ukuran Terbuka", value: "19cm x 20.3cm" },
      { label: "Plastik OPP", value: "12cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.650/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 45, name: "LG 109", category: "Lintang",
    description: "Template undangan eksklusif format square. Desain unik dan modern untuk hari spesial Anda.",
    size: "13 x 18.5 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrifzq1v95a5byoj/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "13cm x 18.5cm" },
      { label: "Ukuran Terbuka", value: "18.5cm x 26cm" },
      { label: "Plastik OPP", value: "13.5cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.650/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 46, name: "LG 110", category: "Lintang",
    description: "Template undangan eksklusif format square. Desain unik dan modern untuk hari spesial Anda.",
    size: "13 x 18.5 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrifzr9kiif6pecn/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "13cm x 18.5cm" },
      { label: "Ukuran Terbuka", value: "18.5cm x 26cm" },
      { label: "Plastik OPP", value: "13.5cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.650/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 47, name: "LG 111", category: "Lintang",
    description: "Template undangan eksklusif format square. Desain unik dan modern untuk hari spesial Anda.",
    size: "14 x 13.5 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrifzs6beal6bh1j/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "14cm x 13.5cm" },
      { label: "Ukuran Terbuka", value: "13.5cm x 29cm" },
      { label: "Plastik OPP", value: "14cm x 20cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.650/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 48, name: "LG 112", category: "Lintang",
    description: "Template undangan eksklusif format square. Desain unik dan modern untuk hari spesial Anda.",
    size: "16 x 13.5 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrifztfjr2hwa342/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "16cm x 13.5cm" },
      { label: "Ukuran Terbuka", value: "13.5cm x 29cm" },
      { label: "Plastik OPP", value: "14cm x 20cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.650/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 49, name: "LG 113", category: "Lintang",
    description: "Template undangan eksklusif format square. Desain unik dan modern untuk hari spesial Anda.",
    size: "16 x 13.5 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrifzuohtxaleeeo/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "16cm x 13.5cm" },
      { label: "Ukuran Terbuka", value: "13.5cm x 29cm" },
      { label: "Plastik OPP", value: "14cm x 20cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.650/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 50, name: "LG 114", category: "Lintang",
    description: "Template undangan eksklusif format square. Desain unik dan modern untuk hari spesial Anda.",
    size: "16 x 13.5 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrifzvlvheu95o0t/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "16cm x 13.5cm" },
      { label: "Ukuran Terbuka", value: "13.5cm x 29cm" },
      { label: "Plastik OPP", value: "14cm x 20cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.650/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 51, name: "LG 115", category: "Lintang",
    description: "Template undangan eksklusif format square. Desain unik dan modern untuk hari spesial Anda.",
    size: "16 x 13.5 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrifzwuyaiyrxam7/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "16cm x 13.5cm" },
      { label: "Ukuran Terbuka", value: "13.5cm x 29cm" },
      { label: "Plastik OPP", value: "14cm x 20cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.650/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  // === RAYYA ===
  {
    id: 52, name: "RAYYA 376", category: "Rayya",
    description: "Desain undangan anggun dengan sentuhan floral. Cocok untuk pernikahan dengan tema romantis.",
    size: "12.5 x 21 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrig0fdqcqivcdvl/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "12.5cm x 21cm" },
      { label: "Ukuran Terbuka", value: "21cm x 23.7cm" },
      { label: "Plastik OPP", value: "13cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.700/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 53, name: "RAYYA 377", category: "Rayya",
    description: "Desain undangan anggun dengan sentuhan floral. Cocok untuk pernikahan dengan tema romantis.",
    size: "12.5 x 21 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrig0gqzxtnopb4g/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "12.5cm x 21cm" },
      { label: "Ukuran Terbuka", value: "21cm x 23.7cm" },
      { label: "Plastik OPP", value: "13cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.700/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 54, name: "RAYYA 378", category: "Rayya",
    description: "Desain undangan anggun dengan sentuhan floral. Cocok untuk pernikahan dengan tema romantis.",
    size: "13.5 x 19 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrig0i6422695f2b/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "13.5cm x 19cm" },
      { label: "Ukuran Terbuka", value: "19cm x 20.3cm" },
      { label: "Plastik OPP", value: "14cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.700/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 55, name: "RAYYA 379", category: "Rayya",
    description: "Desain undangan anggun dengan sentuhan floral. Cocok untuk pernikahan dengan tema romantis.",
    size: "13.5 x 19 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrig0jewyy4pg80s/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "13.5cm x 19cm" },
      { label: "Ukuran Terbuka", value: "19cm x 20.3cm" },
      { label: "Plastik OPP", value: "14cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.700/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  // === RIZKI ===
  {
    id: 56, name: "RIZKI 57", category: "Rizki",
    description: "Template undangan cantik dengan desain timeless. Elegan dan cocok untuk berbagai tema pernikahan.",
    size: "11.2 x 19 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrig0rhznzmpgrz5/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "11.2cm x 19cm" },
      { label: "Ukuran Terbuka", value: "19cm x 20.3cm" },
      { label: "Plastik OPP", value: "12cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.600/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 57, name: "RIZKI 58", category: "Rizki",
    description: "Template undangan cantik dengan desain timeless. Elegan dan cocok untuk berbagai tema pernikahan.",
    size: "11.2 x 19 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrig0swsutj2jdo1/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "11.2cm x 19cm" },
      { label: "Ukuran Terbuka", value: "19cm x 20.3cm" },
      { label: "Plastik OPP", value: "12cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.600/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 58, name: "RIZKI 59", category: "Rizki",
    description: "Template undangan cantik dengan desain timeless. Elegan dan cocok untuk berbagai tema pernikahan.",
    size: "13.5 x 19 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrig0uc6wc69tlts/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "13.5cm x 19cm" },
      { label: "Ukuran Terbuka", value: "19cm x 20.3cm" },
      { label: "Plastik OPP", value: "14cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.600/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 59, name: "RIZKI 60", category: "Rizki",
    description: "Template undangan cantik dengan desain timeless. Elegan dan cocok untuk berbagai tema pernikahan.",
    size: "13.5 x 19 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrig0veax6p032of/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "13.5cm x 19cm" },
      { label: "Ukuran Terbuka", value: "19cm x 20.3cm" },
      { label: "Plastik OPP", value: "14cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.600/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 60, name: "RIZKI 61", category: "Rizki",
    description: "Template undangan cantik dengan desain timeless. Elegan dan cocok untuk berbagai tema pernikahan.",
    size: "13.5 x 19 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrig0wgk3d0lihpf/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "13.5cm x 19cm" },
      { label: "Ukuran Terbuka", value: "19cm x 20.3cm" },
      { label: "Plastik OPP", value: "14cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.750/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  {
    id: 61, name: "RIZKI 62", category: "Rizki",
    description: "Template undangan cantik dengan desain timeless. Elegan dan cocok untuk berbagai tema pernikahan.",
    size: "13.5 x 19 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrig0xe6bpc3m62h/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "13.5cm x 19cm" },
      { label: "Ukuran Terbuka", value: "19cm x 20.3cm" },
      { label: "Plastik OPP", value: "14cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.750/pcs" },
      { label: "Pre Order", value: "3-7 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Note", value: "Sudah termasuk plastik OPP" },
    ],
  },
  // === JAVANESE ===
  {
    id: 62, name: "JR 1", category: "Javanese",
    description: "Undangan bertema Jawa dengan sentuhan batik dan nuansa keraton yang mewah dan penuh tradisi.",
    size: "14 x 20 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrifz176pcqkb9ob/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "14cm x 20cm" },
      { label: "Ukuran Terbuka", value: "20cm x 28cm" },
      { label: "Plastik OPP", value: "14cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.500/pcs" },
      { label: "Pre Order", value: "5-10 Hari" },
      { label: "Min Order", value: "100 Pcs" },
      { label: "Free Buku Tamu", value: "Min Order 300 Pcs" },
      { label: "Note", value: "Belum termasuk plastik OPP | Free plastik OPP untuk order kelipatan 100" },
    ],
  },
  {
    id: 63, name: "JR 2", category: "Javanese",
    description: "Undangan bertema Jawa dengan sentuhan batik dan nuansa keraton yang mewah dan penuh tradisi.",
    size: "14 x 20 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrifz2rpy2jm7a80/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "14cm x 20cm" },
      { label: "Ukuran Terbuka", value: "20cm x 28cm" },
      { label: "Plastik OPP", value: "14cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.500/pcs" },
      { label: "Pre Order", value: "5-10 Hari" },
      { label: "Min Order", value: "100 Pcs" },
      { label: "Free Buku Tamu", value: "Min Order 300 Pcs" },
      { label: "Note", value: "Belum termasuk plastik OPP | Free plastik OPP untuk order kelipatan 100" },
    ],
  },
  {
    id: 64, name: "JR 3", category: "Javanese",
    description: "Undangan bertema Jawa dengan sentuhan batik dan nuansa keraton yang mewah dan penuh tradisi.",
    size: "14 x 20 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrifz3pjzmjjvjdh/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "14cm x 20cm" },
      { label: "Ukuran Terbuka", value: "20cm x 28cm" },
      { label: "Plastik OPP", value: "14cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.500/pcs" },
      { label: "Pre Order", value: "5-10 Hari" },
      { label: "Min Order", value: "100 Pcs" },
      { label: "Free Buku Tamu", value: "Min Order 300 Pcs" },
      { label: "Note", value: "Belum termasuk plastik OPP | Free plastik OPP untuk order kelipatan 100" },
    ],
  },
  {
    id: 65, name: "JR 4", category: "Javanese",
    description: "Undangan bertema Jawa dengan sentuhan batik dan nuansa keraton yang mewah dan penuh tradisi.",
    size: "14 x 20 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrifz4nyati3eehs/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "14cm x 20cm" },
      { label: "Ukuran Terbuka", value: "20cm x 28cm" },
      { label: "Plastik OPP", value: "14cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.500/pcs" },
      { label: "Pre Order", value: "5-10 Hari" },
      { label: "Min Order", value: "100 Pcs" },
      { label: "Free Buku Tamu", value: "Min Order 300 Pcs" },
      { label: "Note", value: "Belum termasuk plastik OPP | Free plastik OPP untuk order kelipatan 100" },
    ],
  },
  {
    id: 66, name: "JR 5", category: "Javanese",
    description: "Undangan bertema Jawa dengan sentuhan batik dan nuansa keraton yang mewah dan penuh tradisi.",
    size: "14 x 20 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrifz5l8w8wr01eo/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "14cm x 20cm" },
      { label: "Ukuran Terbuka", value: "20cm x 28cm" },
      { label: "Plastik OPP", value: "14cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.500/pcs" },
      { label: "Pre Order", value: "5-10 Hari" },
      { label: "Min Order", value: "100 Pcs" },
      { label: "Free Buku Tamu", value: "Min Order 300 Pcs" },
      { label: "Note", value: "Belum termasuk plastik OPP | Free plastik OPP untuk order kelipatan 100" },
    ],
  },
  // === RUSTIK ===
  {
    id: 67, name: "R8", category: "Rustik",
    description: "Desain undangan rustic yang hangat dan natural. Pilihan sempurna untuk pernikahan outdoor atau garden party.",
    size: "14 x 20 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrig11giskp36rjo/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "14cm x 20cm" },
      { label: "Ukuran Terbuka", value: "20cm x 28cm" },
      { label: "Plastik OPP", value: "14cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.500/pcs" },
      { label: "Pre Order", value: "5-10 Hari" },
      { label: "Min Order", value: "100 Pcs" },
      { label: "Free Buku Tamu", value: "Min Order 300 Pcs" },
      { label: "Note", value: "Belum termasuk plastik OPP | Free plastik OPP untuk order kelipatan 100" },
    ],
  },
  {
    id: 68, name: "R9", category: "Rustik",
    description: "Desain undangan rustic yang hangat dan natural. Pilihan sempurna untuk pernikahan outdoor atau garden party.",
    size: "14 x 20 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrig132ak26y2fp2/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "14cm x 20cm" },
      { label: "Ukuran Terbuka", value: "20cm x 28cm" },
      { label: "Plastik OPP", value: "14cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.500/pcs" },
      { label: "Pre Order", value: "5-10 Hari" },
      { label: "Min Order", value: "100 Pcs" },
      { label: "Free Buku Tamu", value: "Min Order 300 Pcs" },
      { label: "Note", value: "Belum termasuk plastik OPP | Free plastik OPP untuk order kelipatan 100" },
    ],
  },
  {
    id: 69, name: "R11", category: "Rustik",
    description: "Desain undangan rustic yang hangat dan natural. Pilihan sempurna untuk pernikahan outdoor atau garden party.",
    size: "14 x 20 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrig146weq9gj9wg/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "14cm x 20cm" },
      { label: "Ukuran Terbuka", value: "20cm x 28cm" },
      { label: "Plastik OPP", value: "14cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.500/pcs" },
      { label: "Pre Order", value: "5-10 Hari" },
      { label: "Min Order", value: "100 Pcs" },
      { label: "Free Buku Tamu", value: "Min Order 300 Pcs" },
      { label: "Note", value: "Belum termasuk plastik OPP | Free plastik OPP untuk order kelipatan 100" },
    ],
  },
  {
    id: 70, name: "R22", category: "Rustik",
    description: "Desain undangan rustic yang hangat dan natural. Pilihan sempurna untuk pernikahan outdoor atau garden party.",
    size: "14 x 20 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrig150twas22jep/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "14cm x 20cm" },
      { label: "Ukuran Terbuka", value: "20cm x 28cm" },
      { label: "Plastik OPP", value: "14cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.500/pcs" },
      { label: "Pre Order", value: "5-10 Hari" },
      { label: "Min Order", value: "100 Pcs" },
      { label: "Free Buku Tamu", value: "Min Order 300 Pcs" },
      { label: "Note", value: "Belum termasuk plastik OPP | Free plastik OPP untuk order kelipatan 100" },
    ],
  },
  {
    id: 71, name: "R24", category: "Rustik",
    description: "Desain undangan rustic yang hangat dan natural. Pilihan sempurna untuk pernikahan outdoor atau garden party.",
    size: "14 x 20 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrig16a83bxfmgqi/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "14cm x 20cm" },
      { label: "Ukuran Terbuka", value: "20cm x 28cm" },
      { label: "Plastik OPP", value: "14cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.500/pcs" },
      { label: "Pre Order", value: "5-10 Hari" },
      { label: "Min Order", value: "100 Pcs" },
      { label: "Free Buku Tamu", value: "Min Order 300 Pcs" },
      { label: "Note", value: "Belum termasuk plastik OPP | Free plastik OPP untuk order kelipatan 100" },
    ],
  },
  {
    id: 72, name: "R26", category: "Rustik",
    description: "Desain undangan rustic yang hangat dan natural. Pilihan sempurna untuk pernikahan outdoor atau garden party.",
    size: "14 x 20 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrig17d703raola3/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "14cm x 20cm" },
      { label: "Ukuran Terbuka", value: "20cm x 28cm" },
      { label: "Plastik OPP", value: "14cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.500/pcs" },
      { label: "Pre Order", value: "5-10 Hari" },
      { label: "Min Order", value: "100 Pcs" },
      { label: "Free Buku Tamu", value: "Min Order 300 Pcs" },
      { label: "Note", value: "Belum termasuk plastik OPP | Free plastik OPP untuk order kelipatan 100" },
    ],
  },
  {
    id: 73, name: "R27", category: "Rustik",
    description: "Desain undangan rustic yang hangat dan natural. Pilihan sempurna untuk pernikahan outdoor atau garden party.",
    size: "14 x 20 cm", color: "Softcover BC 150G",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrig18ehxfnhlx6n/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "14cm x 20cm" },
      { label: "Ukuran Terbuka", value: "20cm x 28cm" },
      { label: "Plastik OPP", value: "14cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 1.500/pcs" },
      { label: "Pre Order", value: "5-10 Hari" },
      { label: "Min Order", value: "100 Pcs" },
      { label: "Free Buku Tamu", value: "Min Order 300 Pcs" },
      { label: "Note", value: "Belum termasuk plastik OPP | Free plastik OPP untuk order kelipatan 100" },
    ],
  },
  // === ELEGAN ===
  {
    id: 80, name: "AI1", category: "Elegan",
    description: "Desain undangan elegan dengan sentuhan minimalis dan sophisticated. Pilihan tepat untuk pernikahan berkelas.",
    size: "13 x 19,9 cm", color: "Softcover BC",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrify83civ5s0ie5/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "14cm x 20cm" },
      { label: "Ukuran Terbuka", value: "20cm x 28cm" },
      { label: "Plastik OPP", value: "14cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 4.000/pcs" },
      { label: "Pre Order", value: "7-14 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Free Buku Tamu", value: "Min Order 200 Pcs" },
      { label: "Note", value: "Belum termasuk plastik OPP | Free plastik OPP untuk order kelipatan 100" },
    ],
  },
  {
    id: 81, name: "AI2", category: "Elegan",
    description: "Desain undangan elegan dengan sentuhan minimalis dan sophisticated. Pilihan tepat untuk pernikahan berkelas.",
    size: "13 x 19,9 cm", color: "Softcover BC",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrify9h11fa0cuaa/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "14cm x 20cm" },
      { label: "Ukuran Terbuka", value: "20cm x 28cm" },
      { label: "Plastik OPP", value: "14cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 4.000/pcs" },
      { label: "Pre Order", value: "7-14 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Free Buku Tamu", value: "Min Order 200 Pcs" },
      { label: "Note", value: "Belum termasuk plastik OPP | Free plastik OPP untuk order kelipatan 100" },
    ],
  },
  {
    id: 82, name: "AI3", category: "Elegan",
    description: "Desain undangan elegan dengan sentuhan minimalis dan sophisticated. Pilihan tepat untuk pernikahan berkelas.",
    size: "13 x 19,9 cm", color: "Softcover BC",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrifyb2ft33w1fju/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "14cm x 20cm" },
      { label: "Ukuran Terbuka", value: "20cm x 28cm" },
      { label: "Plastik OPP", value: "14cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 4.000/pcs" },
      { label: "Pre Order", value: "7-14 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Free Buku Tamu", value: "Min Order 200 Pcs" },
      { label: "Note", value: "Belum termasuk plastik OPP | Free plastik OPP untuk order kelipatan 100" },
    ],
  },
  {
    id: 83, name: "AI4", category: "Elegan",
    description: "Desain undangan elegan dengan sentuhan minimalis dan sophisticated. Pilihan tepat untuk pernikahan berkelas.",
    size: "13 x 19,9 cm", color: "Softcover BC",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrifyc3sxyfowsry/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "14cm x 20cm" },
      { label: "Ukuran Terbuka", value: "20cm x 28cm" },
      { label: "Plastik OPP", value: "14cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 4.000/pcs" },
      { label: "Pre Order", value: "7-14 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Free Buku Tamu", value: "Min Order 200 Pcs" },
      { label: "Note", value: "Belum termasuk plastik OPP | Free plastik OPP untuk order kelipatan 100" },
    ],
  },
  {
    id: 84, name: "AI6", category: "Elegan",
    description: "Desain undangan elegan dengan sentuhan minimalis dan sophisticated. Pilihan tepat untuk pernikahan berkelas.",
    size: "13 x 19,9 cm", color: "Softcover BC",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrifydcz0i3m3ryy/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "14cm x 20cm" },
      { label: "Ukuran Terbuka", value: "20cm x 28cm" },
      { label: "Plastik OPP", value: "14cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 4.000/pcs" },
      { label: "Pre Order", value: "7-14 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Free Buku Tamu", value: "Min Order 200 Pcs" },
      { label: "Note", value: "Belum termasuk plastik OPP | Free plastik OPP untuk order kelipatan 100" },
    ],
  },
  {
    id: 85, name: "AI8", category: "Elegan",
    description: "Desain undangan elegan dengan sentuhan minimalis dan sophisticated. Pilihan tepat untuk pernikahan berkelas.",
    size: "13 x 19,9 cm", color: "Softcover BC",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrifyekxnxyj0p4e/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "14cm x 20cm" },
      { label: "Ukuran Terbuka", value: "20cm x 28cm" },
      { label: "Plastik OPP", value: "14cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 4.000/pcs" },
      { label: "Pre Order", value: "7-14 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Free Buku Tamu", value: "Min Order 200 Pcs" },
      { label: "Note", value: "Belum termasuk plastik OPP | Free plastik OPP untuk order kelipatan 100" },
    ],
  },
  {
    id: 86, name: "AI10", category: "Elegan",
    description: "Desain undangan elegan dengan sentuhan minimalis dan sophisticated. Pilihan tepat untuk pernikahan berkelas.",
    size: "13 x 19,9 cm", color: "Softcover BC",
    pages: [{ label: "Pembuka", src: "https://imglinkv-3.vercel.app/api/images/cmrifyfc2w1dks5em/file" }],
    specs: [
      { label: "Ukuran Lipat", value: "14cm x 20cm" },
      { label: "Ukuran Terbuka", value: "20cm x 28cm" },
      { label: "Plastik OPP", value: "14cm x 22cm" },
      { label: "Jenis Kertas", value: "BC 150G" },
      { label: "Jenis Blangko", value: "Softcover" },
      { label: "Foil", value: "Tidak ada" },
      { label: "Harga", value: "Rp 4.000/pcs" },
      { label: "Pre Order", value: "7-14 Hari" },
      { label: "Min Order", value: "50 Pcs" },
      { label: "Free Buku Tamu", value: "Min Order 200 Pcs" },
      { label: "Note", value: "Belum termasuk plastik OPP | Free plastik OPP untuk order kelipatan 100" },
    ],
  },
];

const onlineTemplates: Template[] = [
  {
    id: 201,
    name: "Serene Love",
    category: "Semua",
    description: "Undangan website elegan dengan nuansa botani yang tenang dan romantis. Desain minimalis dengan sentuhan script font klasik.",
    size: "Responsive Web",
    color: "Botanical & Cream",
    pages: [
      { label: "Cover", src: "/invitations/online/demo/cover-ornament.png" },
    ],
  },
  {
    id: 202,
    name: "Javanese",
    category: "Semua",
    description: "Undangan digital bertema Jawa dengan sentuhan batik emas dan nuansa keraton yang mewah. Elegan dan penuh tradisi.",
    size: "Responsive Web",
    color: "Gold & Dark Brown",
    pages: [
      { label: "Cover", src: "/invitations/online/javanese/thumb-ornament.png" },
    ],
  },
  {
    id: 203,
    name: "Silent Promise",
    category: "Semua",
    description: "Undangan digital bergaya vintage watercolor dengan nuansa teal dan sentuhan tradisional. Romantis, elegan, dan penuh makna.",
    size: "Responsive Web",
    color: "Teal & Beige Vintage",
    pages: [
      { label: "Cover", src: "/invitations/online/silent-promise/thumb-ornament.png" },
    ],
  },
  {
    id: 204,
    name: "Palawa Bloom",
    category: "Semua",
    description: "Undangan digital bergaya monokromatik hitam putih yang minimalis dan elegan. Desain timeless dengan sentuhan floral watercolor yang lembut.",
    size: "Responsive Web",
    color: "Black & White Minimalist",
    pages: [
      { label: "Cover", src: "/invitations/online/palawa-bloom/thumb-ornament.png" },
    ],
  },
  {
    id: 205,
    name: "White Free",
    category: "Semua",
    description: "Undangan digital bergaya minimalis modern dengan dominasi warna putih dan navy. Desain bersih, elegan, dan profesional dengan tipografi serif yang sophisticated.",
    size: "Responsive Web",
    color: "White & Navy Minimalist",
    pages: [
      { label: "Cover", src: "/invitations/online/white-free/thumb-ornament.png" },
    ],
  },
  {
    id: 206,
    name: "Javanese V2",
    category: "Semua",
    description: "Undangan digital bertema Jawa versi terbaru. Sentuhan tradisional dengan desain modern.",
    size: "Responsive Web",
    color: "Javanese Modern",
    pages: [
      { label: "Cover", src: "/invitations/online/javanese/thumb-ornament.png" },
    ],
  },
];

const cetakCategories = ["Semua", "Cantik", "Hepi", "Maliq", "Lintang", "Rayya", "Rizki", "Javanese", "Rustik", "Elegan"];
const onlineCategories = ["Semua"];

const cetakCategoryMeta: { name: string; color: string; description: string; emoji: string; image: string }[] = [
  { name: "Cantik", color: "rose", description: "Desain elegan dan modern", emoji: "🌸", image: "https://imglinkv-3.vercel.app/api/images/cmro2bnpy0emsv7xm/file" },
  { name: "Hepi", color: "amber", description: "Desain ceria dan berwarna", emoji: "🎉", image: "https://imglinkv-3.vercel.app/api/images/cmro2bsdkw8jrutvo/file" },
  { name: "Maliq", color: "emerald", description: "Desain maskulin dan sophisticated", emoji: "💎", image: "https://imglinkv-3.vercel.app/api/images/cmro2bw8oa57mijyt/file" },
  { name: "Lintang", color: "violet", description: "Desain bintang dan kemewahan", emoji: "✨", image: "https://imglinkv-3.vercel.app/api/images/cmro2c2227ispwivk/file" },
  { name: "Rayya", color: "pink", description: "Desain mewah dan anggun", emoji: "🌹", image: "https://imglinkv-3.vercel.app/api/images/cmro2by5f3j9a579c/file" },
  { name: "Rizki", color: "sky", description: "Desain kekinian dan stylish", emoji: "🌺", image: "https://imglinkv-3.vercel.app/api/images/cmro2c02ggm8faazc/file" },
  { name: "Javanese", color: "yellow", description: "Sentuhan batik dan tradisi", emoji: "🏛️", image: "https://imglinkv-3.vercel.app/api/images/cmro2c3ti8ybjfxth/file" },
  { name: "Rustik", color: "orange", description: "Nuansa alam dan natural", emoji: "🌿", image: "https://imglinkv-3.vercel.app/api/images/cmro2buf7y63rfty5/file" },
  { name: "Elegan", color: "stone", description: "Minimalis dan sophisticated", emoji: "🖤", image: "https://imglinkv-3.vercel.app/api/images/cmro2bqa5unebq4xn/file" },
];

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [templateType, setTemplateType] = useState<TemplateType>("cetak");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [selectedPageIndex, setSelectedPageIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showOnlinePreview, setShowOnlinePreview] = useState(false);
  const [onlinePreviewId, setOnlinePreviewId] = useState<number | null>(null);

  const [showShowcase, setShowShowcase] = useState(false);
  const [showCaraPemesanan, setShowCaraPemesanan] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [cetakSelectedTemplate, setCetakSelectedTemplate] = useState<Template | null>(null);
  const [cetakSelectedPage, setCetakSelectedPage] = useState(0);

  const templates = templateType === "cetak" ? cetakTemplates : onlineTemplates;

  const categoryTemplateCount = (cat: string) => cetakTemplates.filter((t) => t.category === cat).length;

  const cetakCategoryTemplates = activeCategory
    ? cetakTemplates.filter((t) => t.category === activeCategory)
    : [];

  const toggleShowcase = () => {
    if (showShowcase) {
      setShowShowcase(false);
      setShowGrid(false);
    } else {
      setShowGrid(false);
      setShowShowcase(true);
      setTimeout(() => {
        document.getElementById("showcase-section")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const toggleCaraPemesanan = () => {
    if (showCaraPemesanan) {
      setShowCaraPemesanan(false);
    } else {
      setShowCaraPemesanan(true);
      setTimeout(() => {
        document.getElementById("cara-pemesanan")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const toggleGrid = (type: TemplateType) => {
    if (showGrid && templateType === type) {
      setShowGrid(false);
      setActiveCategory(null);
      setCetakSelectedTemplate(null);
    } else {
      switchType(type);
      setShowGrid(true);
      setActiveCategory(null);
      setCetakSelectedTemplate(null);
      setTimeout(() => {
        document.getElementById("grid-section")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };
  const categories = templateType === "cetak" ? cetakCategories : onlineCategories;

  const filteredTemplates =
    selectedCategory === "Semua"
      ? templates
      : templates.filter((t) => t.category === selectedCategory);

  const openModal = (template: Template, index: number) => {
    if (template.link) {
      window.open(template.link, "_blank");
      return;
    }
    if (templateType === "online") {
      setShowOnlinePreview(true);
      setOnlinePreviewId(template.id);
      return;
    }
    setSelectedTemplate(template);
    setSelectedPageIndex(0);
    setCurrentIndex(index);
  };

  const navigateTemplate = (direction: "prev" | "next") => {
    if (direction === "prev") {
      const newIdx = currentIndex === 0 ? filteredTemplates.length - 1 : currentIndex - 1;
      setCurrentIndex(newIdx);
      setSelectedTemplate(filteredTemplates[newIdx]);
      setSelectedPageIndex(0);
    } else {
      const newIdx = currentIndex === filteredTemplates.length - 1 ? 0 : currentIndex + 1;
      setCurrentIndex(newIdx);
      setSelectedTemplate(filteredTemplates[newIdx]);
      setSelectedPageIndex(0);
    }
  };

  const navigateCetakTemplate = (direction: "prev" | "next") => {
    const list = cetakCategoryTemplates;
    if (list.length <= 1) return;
    const currentIdx = list.findIndex(t => t.id === cetakSelectedTemplate?.id);
    let newIdx: number;
    if (direction === "prev") {
      newIdx = currentIdx <= 0 ? list.length - 1 : currentIdx - 1;
    } else {
      newIdx = currentIdx >= list.length - 1 ? 0 : currentIdx + 1;
    }
    setCetakSelectedTemplate(list[newIdx]);
    setCetakSelectedPage(0);
  };

  const switchType = (type: TemplateType) => {
    setTemplateType(type);
    setSelectedCategory("Semua");
    setActiveCategory(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5F7]">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-rose-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-rose-500 fill-rose-500" />
              <span className="text-lg font-bold tracking-tight text-stone-900">
                Memoraa'
              </span>
            </div>
            <nav className="hidden sm:flex items-center gap-6 text-sm text-stone-600">
              <button onClick={() => toggleShowcase()} className="hover:text-rose-600 transition-colors">Template</button>
              <a href="#kontak" className="hover:text-rose-600 transition-colors">Kontak</a>
            </nav>
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden h-9 w-9 rounded-full hover:bg-rose-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5 text-stone-600" /> : <Menu className="h-5 w-5 text-stone-600" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden overflow-hidden border-b border-rose-100 bg-white/95 backdrop-blur-md"
          >
            <nav className="flex flex-col px-4 py-3 gap-1">
              {[
                { label: "Template", href: "#templates" },
                { label: "Kontak", href: "#kontak" },
              ].map((item) => (
                item.label === "Template" ? (
                  <button
                    key={item.label}
                    onClick={() => { toggleShowcase(); setMobileMenuOpen(false); }}
                    className="text-left text-stone-600 hover:text-rose-600 hover:bg-rose-50 transition-colors rounded-lg px-3 py-2.5 text-sm font-medium w-full"
                  >
                    {item.label}
                  </button>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-stone-600 hover:text-rose-600 hover:bg-rose-50 transition-colors rounded-lg px-3 py-2.5 text-sm font-medium"
                  >
                    {item.label}
                  </a>
                )
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-rose-50/60 via-rose-100/30 to-[#FFF5F7] z-10 pointer-events-none" />
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="text-center lg:text-left order-2 lg:order-1"
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-tight">
                  Template Undangan{" "}
                  <span className="text-rose-500">Pernikahan Elegan</span>
                </h1>
                <p className="mt-4 sm:mt-6 text-base sm:text-lg text-stone-500 max-w-xl mx-auto lg:mx-0">
                  Pilihan template undangan cetak & online premium. Detil eksklusif untuk hari istimewa Anda.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-rose-300 text-rose-600 hover:bg-rose-50 rounded-full px-8 bg-white"
                    onClick={() => toggleShowcase()}
                  >
                    {showShowcase ? "Tutup Koleksi" : "Lihat Koleksi"}
                    <Eye className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    size="lg"
                    className="bg-rose-500 hover:bg-rose-600 text-white rounded-full px-8"
                    onClick={() => toggleCaraPemesanan()}
                  >
                    {showCaraPemesanan ? "Tutup" : "Cara Pemesanan"}
                    <MessageCircle className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="order-1 lg:order-2 flex justify-center"
              >
                <div className="relative w-full max-w-md lg:max-w-lg">
                  <div className="absolute -inset-4 bg-gradient-to-br from-rose-200/40 via-amber-100/30 to-rose-100/40 rounded-3xl blur-2xl" />
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-rose-900/10 border border-white/60">
                    <Image
                      src="/invitations/hero.png"
                      alt="Koleksi undangan pernikahan"
                      width={1344}
                      height={768}
                      className="w-full h-auto object-cover"
                      priority
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Cetak vs Digital Intro Section */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-3 sm:gap-8">
              {/* Undangan Cetak */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                  <Image src="/images/hero-cetak.webp" alt="Undangan Cetak Premium" fill className="object-cover" sizes="(max-width: 640px) 90vw, 45vw" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-stone-900 mt-4">Undangan Cetak</h3>
                <p className="text-sm text-stone-500 leading-relaxed mt-2">
                  Sentuhan fisik yang abadi. Undangan kertas premium dengan kualitas cetak tajam dan finishing eksklusif. Hadirkan kesan mewah, intim, dan personal untuk para tamu istimewa Anda.
                </p>
              </motion.div>

              {/* Undangan Digital */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                  <Image src="/images/hero-digital.webp" alt="Undangan Digital Interaktif" fill className="object-cover" sizes="(max-width: 640px) 90vw, 45vw" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-stone-900 mt-4">Undangan Digital</h3>
                <p className="text-sm text-stone-500 leading-relaxed mt-2">
                  Bagikan kebahagiaan tanpa batas. Undangan website interaktif modern yang mudah diakses via link. Dilengkapi fitur musik latar, galeri foto cerita cinta, countdown, hingga RSVP online.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Template Showcase Section */}
        <AnimatePresence>
        {showShowcase && (
        <motion.section
          id="showcase-section"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="overflow-hidden py-12 sm:py-16"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-3 sm:gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                onClick={() => toggleGrid("cetak")}
                className="cursor-pointer group relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-rose-400 to-rose-600 z-0" />
                <div className="relative z-10 p-4 sm:p-8 lg:p-10 text-white">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-2.5">
                      <Printer className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <h3 className="text-base sm:text-2xl font-bold leading-tight">Undangan Cetak</h3>
                  </div>
                  <p className="text-rose-100 text-xs sm:text-base leading-relaxed line-clamp-2 sm:line-clamp-none">
                    Template undangan cetak premium dengan berbagai pilihan desain eksklusif.
                  </p>
                  <div className="mt-2 sm:mt-4 flex items-center gap-1 text-white/90 text-xs sm:text-sm font-medium group-hover:gap-2 transition-all">
                    {showGrid && templateType === "cetak" ? "Tutup" : "Lihat Koleksi"} {showGrid && templateType === "cetak" ? <ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                onClick={() => toggleGrid("online")}
                className="cursor-pointer group relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-stone-800 to-stone-950 z-0" />
                <div className="relative z-10 p-4 sm:p-8 lg:p-10 text-white">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-2.5">
                      <Globe className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <h3 className="text-base sm:text-2xl font-bold leading-tight">Undangan Digital</h3>
                  </div>
                  <p className="text-stone-300 text-xs sm:text-base leading-relaxed line-clamp-2 sm:line-clamp-none">
                    Undangan website interaktif dengan fitur RSVP, countdown, amplop digital, dan galeri.
                  </p>
                  <div className="mt-2 sm:mt-4 flex items-center gap-1 text-white/90 text-xs sm:text-sm font-medium group-hover:gap-2 transition-all">
                    {showGrid && templateType === "online" ? "Tutup" : "Lihat Koleksi"} {showGrid && templateType === "online" ? <ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Template Grid Section */}
          <AnimatePresence>
          {showGrid && (
          <motion.div
            id="grid-section"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
          <section id="templates" className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* ===== CETAK: Category Cover Cards ===== */}
            {templateType === "cetak" && !activeCategory && (
              <>
                <div className="text-center mb-10">
                  <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
                    Template Undangan Cetak
                  </h2>
                  <p className="mt-3 text-stone-500 max-w-2xl mx-auto">
                    Koleksi template undangan cetak premium untuk hari istimewa
                  </p>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-6">
                  <AnimatePresence>
                    {cetakCategoryMeta.map((cat, i) => {
                      const borderColor: Record<string, string> = {
                        rose: "border-rose-300",
                        amber: "border-amber-300",
                        emerald: "border-emerald-300",
                        violet: "border-violet-300",
                        pink: "border-pink-300",
                        sky: "border-sky-300",
                        yellow: "border-yellow-300",
                        orange: "border-orange-300",
                      };
                      const bgColor: Record<string, string> = {
                        rose: "bg-rose-50",
                        amber: "bg-amber-50",
                        emerald: "bg-emerald-50",
                        violet: "bg-violet-50",
                        pink: "bg-pink-50",
                        sky: "bg-sky-50",
                        yellow: "bg-yellow-50",
                        orange: "bg-orange-50",
                      };
                      const badgeBg: Record<string, string> = {
                        rose: "bg-rose-500",
                        amber: "bg-amber-500",
                        emerald: "bg-emerald-500",
                        violet: "bg-violet-500",
                        pink: "bg-pink-500",
                        sky: "bg-sky-500",
                        yellow: "bg-yellow-500",
                        orange: "bg-orange-500",
                      };
                      return (
                        <motion.button
                          key={cat.name}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.4, delay: i * 0.06 }}
                          onClick={() => {
                            setActiveCategory(cat.name);
                            const first = cetakTemplates.find((t) => t.category === cat.name);
                            setCetakSelectedTemplate(first || null);
                            setCetakSelectedPage(0);
                            setTimeout(() => document.getElementById("grid-section")?.scrollIntoView({ behavior: "smooth" }), 100);
                          }}
                          className={`group relative text-left rounded-xl sm:rounded-3xl overflow-hidden border-2 ${borderColor[cat.color] || "border-stone-300"} hover:shadow-xl transition-all duration-300 cursor-pointer`}
                        >
                          {/* Cover Image */}
                          <div className="relative w-full">
                            <Image src={cat.image} alt={cat.name} width={812} height={822} className="w-full h-auto" sizes="(max-width: 640px) 30vw, 200px" />
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pt-10 pb-2 px-3">
                              <h3 className="text-sm sm:text-lg font-bold text-white leading-tight">{cat.name}</h3>
                              <p className="text-[10px] sm:text-xs text-white/80 mt-0.5 line-clamp-1">{cat.description}</p>
                            </div>
                            {/* CETAK badge */}
                            <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                              <span className={`text-[8px] sm:text-[10px] font-bold tracking-widest text-white ${badgeBg[cat.color] || "bg-stone-500"} px-1.5 sm:px-2 py-0.5 rounded-md`}>CETAK</span>
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </>
            )}

            {/* ===== CETAK: Category Detail View ===== */}
            {templateType === "cetak" && activeCategory && (
              <>
                {/* Header */}
                <div className="mb-8">
                  <button
                    onClick={() => { setActiveCategory(null); setCetakSelectedTemplate(null); }}
                    className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-rose-600 transition-colors mb-4"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Kembali ke Kategori
                  </button>
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
                    <div>
                      <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">{activeCategory}</h2>
                      <p className="mt-1 text-stone-500 text-sm">{cetakCategoryTemplates.length} template tersedia di kategori ini.</p>
                    </div>
                    <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100 border-rose-200 text-xs self-start w-fit">{activeCategory}</Badge>
                  </div>
                </div>

                {/* Two-column layout: Preview left + Cards right */}
                <div className="grid lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_440px] gap-6 lg:gap-8">
                  {/* Left: Large preview */}
                  <div className="relative bg-white rounded-2xl border border-rose-100/60 overflow-hidden shadow-sm">
                    {cetakSelectedTemplate ? (
                      <>
                        {/* Image carousel */}
                        <div className="relative bg-stone-50 overflow-hidden flex items-center justify-center py-4 px-4 sm:px-6">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={`${cetakSelectedTemplate.id}-${cetakSelectedPage}`}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="relative w-full max-w-[440px] sm:max-w-[500px] aspect-[812/822]"
                            >
                              <Image
                                src={cetakSelectedTemplate.pages[cetakSelectedPage].src}
                                alt={cetakSelectedTemplate.pages[cetakSelectedPage].label}
                                fill
                                className="object-contain"
                                sizes="(max-width: 1024px) 80vw, 440px"
                                priority
                              />
                            </motion.div>
                          </AnimatePresence>
                          {/* Template prev/next arrows on image */}
                          {cetakCategoryTemplates.length > 1 && (
                            <>
                              <button
                                onClick={() => navigateCetakTemplate("prev")}
                                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-9 w-9 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm border border-stone-200 shadow-md hover:bg-white hover:shadow-lg transition-all duration-200"
                              >
                                <ChevronLeft className="h-5 w-5 text-stone-700" />
                              </button>
                              <button
                                onClick={() => navigateCetakTemplate("next")}
                                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-9 w-9 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm border border-stone-200 shadow-md hover:bg-white hover:shadow-lg transition-all duration-200"
                              >
                                <ChevronRight className="h-5 w-5 text-stone-700" />
                              </button>
                              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full">
                                {cetakCategoryTemplates.findIndex(t => t.id === cetakSelectedTemplate.id) + 1} / {cetakCategoryTemplates.length}
                              </div>
                            </>
                          )}
                          {/* Page indicator */}
                          {cetakSelectedTemplate.pages.length > 1 && (
                            <div className="absolute bottom-2 right-2 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded-full z-10">
                              {cetakSelectedPage + 1} / {cetakSelectedTemplate.pages.length}
                            </div>
                          )}
                        </div>
                        {/* Template info */}
                        <div className="p-4 sm:p-5 border-t border-rose-50">
                          <h3 className="text-lg sm:text-xl font-bold text-stone-900">{cetakSelectedTemplate.name}</h3>

                          {cetakSelectedTemplate.specs && cetakSelectedTemplate.specs.length > 0 ? (
                            <div className="mt-3 grid grid-cols-3 gap-x-3 gap-y-2 text-[11px] sm:text-xs">
                              {cetakSelectedTemplate.specs.map((spec, i) => (
                                <div key={i}>
                                  <p className="text-stone-400">{spec.label}</p>
                                  <p className="font-medium text-stone-700 mt-0.5">{spec.value}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="mt-3 grid grid-cols-3 gap-x-3 gap-y-2 text-[11px] sm:text-xs">
                              <div>
                                <p className="text-stone-400">Ukuran</p>
                                <p className="font-medium text-stone-700 mt-0.5">{cetakSelectedTemplate.size}</p>
                              </div>
                              <div>
                                <p className="text-stone-400">Warna</p>
                                <p className="font-medium text-stone-700 mt-0.5">{cetakSelectedTemplate.color}</p>
                              </div>
                            </div>
                          )}

                          <div className="mt-4">
                            <a
                              href={`https://wa.me/6282133356710?text=${encodeURIComponent(`Halo, saya tertarik dengan template ${cetakSelectedTemplate.name} (ID: ${cetakSelectedTemplate.id}). Bisa dibantu?`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex"
                            >
                              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full w-full sm:w-auto px-4 h-7 text-[11px]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="currentColor" className="mr-1.5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                                Konsultasi / Pemesanan Via Whatsapp
                              </Button>
                            </a>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-20 sm:py-28 text-stone-400">
                        <Eye className="h-12 w-12 mb-4 opacity-30" />
                        <p className="text-sm">Pilih template di samping untuk melihat preview</p>
                      </div>
                    )}
                  </div>

                  {/* Right: Template cards */}
                  <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 lg:max-h-[75vh] lg:overflow-y-auto lg:pr-1 content-start">
                    <AnimatePresence>
                      {cetakCategoryTemplates.map((template, i) => (
                        <motion.button
                          key={template.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: i * 0.04 }}
                          onClick={() => { setCetakSelectedTemplate(template); setCetakSelectedPage(0); }}
                          className={`group relative rounded-lg border-2 overflow-hidden transition-all duration-200 cursor-pointer aspect-[3/4] w-[calc(25%-6px)] sm:w-[calc(25%-8px)] ${
                            cetakSelectedTemplate?.id === template.id
                              ? "border-rose-400 ring-2 ring-rose-200 shadow-md"
                              : "border-stone-200 hover:border-rose-300 hover:shadow-sm"
                          }`}
                        >
                          <Image src={template.pages[0].src} alt={template.name} fill className="object-cover object-top" sizes="100px" />
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pt-6 pb-1.5 px-1.5">
                            <p className="text-[9px] sm:text-[10px] font-semibold text-white leading-tight truncate">{template.name}</p>
                          </div>
                          {cetakSelectedTemplate?.id === template.id && (
                            <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 rounded-full flex items-center justify-center shadow">
                              <ChevronRight className="h-2.5 w-2.5 text-white" />
                            </div>
                          )}
                        </motion.button>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </>
            )}

            {/* ===== ONLINE: Flat grid (unchanged) ===== */}
            {templateType === "online" && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-8"
                >
                  <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
                    Pilih Template Favoritmu
                  </h2>
                  <p className="mt-3 text-stone-500 max-w-2xl mx-auto">
                    Template undangan website interaktif. Klik untuk preview tampilannya.
                  </p>
                </motion.div>
                <div className="grid grid-cols-2 gap-2.5 sm:gap-6 lg:grid-cols-3 lg:gap-8">
                  <AnimatePresence mode="popLayout">
                    {filteredTemplates.map((template, index) => (
                      <motion.div
                        key={template.id}
                        layout
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4, delay: index * 0.08 }}
                        className="group cursor-pointer"
                        onClick={() => openModal(template, index)}
                      >
                        <div className="relative bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-rose-100/50">
                          <div className="relative aspect-[3/4] sm:aspect-[768/1344] bg-rose-50 overflow-hidden">
                            <Image
                              src={template.pages[0].src}
                              alt={template.name}
                              fill
                              className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                              sizes="(max-width: 1024px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 hidden sm:flex items-center justify-center">
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                                  <Eye className="h-5 w-5 text-rose-600" />
                                </div>
                              </div>
                            </div>
                            <Badge className="absolute top-2 right-2 bg-emerald-500/90 text-white border-0 text-[10px] px-1.5 py-0.5">
                              ONLINE
                            </Badge>
                          </div>
                          <div className="p-2.5 sm:p-5">
                            <h3 className="font-semibold text-stone-900 text-sm sm:text-lg leading-tight truncate">
                              {template.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                              {template.size}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </>
            )}

          </div>
        </section>
          </motion.div>
          )}
          </AnimatePresence>
        </motion.section>
        )}
        </AnimatePresence>

        {/* Why Choose Us Section */}
        <section id="tentang" className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
                Kenapa Pilih <span className="text-rose-500">Memoraa'</span>?
              </h2>
            </motion.div>
            <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
              {[
                { icon: "🎨", title: "Desain Eksklusif", desc: "Template dirancang desainer profesional dengan perhatian pada setiap detail." },
                { icon: "🖨️", title: "Siap Cetak", desc: "File resolusi tinggi, siap cetak di percetakan manapun tanpa editing." },
                { icon: "✨", title: "Kualitas Premium", desc: "Palet warna teruji dan tipografi elegan untuk kesan premium." },
                { icon: "📦", title: "Format Lengkap", desc: "Berbagai ukuran standar undangan pernikahan tersedia." },
                { icon: "💰", title: "Harga Terjangkau", desc: "Desain premium tanpa menguras kantong." },
                { icon: "🤝", title: "Konsultasi Gratis", desc: "Tim kami siap bantu pilih template yang tepat." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center p-3 sm:p-6 rounded-2xl hover:bg-rose-50/50 transition-colors duration-300"
                >
                  <div className="text-2xl sm:text-4xl mb-2 sm:mb-4">{item.icon}</div>
                  <h3 className="font-semibold text-stone-900 text-xs sm:text-lg mb-1 sm:mb-2">{item.title}</h3>
                  <p className="text-stone-500 text-[10px] sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-none">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Cara Pemesanan Section */}
        <AnimatePresence>
        {showCaraPemesanan && (
        <motion.section
          id="cara-pemesanan"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="overflow-hidden py-10 sm:py-14"
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                Cara Pemesanan
              </h2>
              <p className="text-stone-500 text-sm sm:text-base mt-2">
                Ikuti langkah-langkah berikut untuk memesan undangan
              </p>
            </motion.div>

            {/* Steps */}
            <div className="relative">
              {/* Vertical connector line (desktop) */}
              <div className="hidden md:block absolute left-8 top-10 bottom-10 w-0.5 bg-gradient-to-b from-rose-200 via-rose-300 to-rose-200" />

              <div className="space-y-6 md:space-y-8">
                {/* Step 1 - ORDER */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                  className="relative md:pl-20"
                >
                  <div className="hidden md:flex absolute left-0 top-2 w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 items-center justify-center">
                    <ClipboardList className="h-7 w-7 text-rose-500" />
                  </div>
                  <div className="bg-white rounded-2xl border border-rose-100/60 p-5 sm:p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="md:hidden w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center shrink-0">
                        <ClipboardList className="h-5 w-5 text-rose-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-rose-500 tracking-wider">STEP 1</span>
                        </div>
                        <h3 className="text-lg font-bold text-stone-900">ORDER</h3>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2.5 text-sm text-stone-600 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                        Pilih template undangan yang diinginkan
                      </li>
                      <li className="flex items-start gap-2.5 text-sm text-stone-600 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                        Konfirmasi ketersediaan &amp; harga via WhatsApp
                      </li>
                      <li className="flex items-start gap-2.5 text-sm text-stone-600 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                        Kirimkan data lengkap pengantin (nama, orang tua, tanggal, dll)
                      </li>
                    </ul>
                  </div>
                </motion.div>

                {/* Step 2 - PENGISIAN DATA */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="relative md:pl-20"
                >
                  <div className="hidden md:flex absolute left-0 top-2 w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 items-center justify-center">
                    <FileEdit className="h-7 w-7 text-amber-500" />
                  </div>
                  <div className="bg-white rounded-2xl border border-amber-100/60 p-5 sm:p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="md:hidden w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                        <FileEdit className="h-5 w-5 text-amber-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-amber-500 tracking-wider">STEP 2</span>
                        </div>
                        <h3 className="text-lg font-bold text-stone-900">PENGISIAN DATA</h3>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2.5 text-sm text-stone-600 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                        Tim kami akan menginput data ke template pilihan Anda
                      </li>
                      <li className="flex items-start gap-2.5 text-sm text-stone-600 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                        Proses pengerjaan desain sesuai antrian
                      </li>
                      <li className="flex items-start gap-2.5 text-sm text-stone-600 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                        Estimasi waktu pengerjaan akan dikomunikasikan
                      </li>
                    </ul>
                  </div>
                </motion.div>

                {/* Step 3 - PREVIEW DESIGN */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative md:pl-20"
                >
                  <div className="hidden md:flex absolute left-0 top-2 w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 items-center justify-center">
                    <Eye className="h-7 w-7 text-emerald-500" />
                  </div>
                  <div className="bg-white rounded-2xl border border-emerald-100/60 p-5 sm:p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="md:hidden w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                        <Eye className="h-5 w-5 text-emerald-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-emerald-500 tracking-wider">STEP 3</span>
                        </div>
                        <h3 className="text-lg font-bold text-stone-900">PREVIEW DESIGN</h3>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2.5 text-sm text-stone-600 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                        Anda akan menerima preview design untuk dicek
                      </li>
                      <li className="flex items-start gap-2.5 text-sm text-stone-600 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                        Periksa seluruh detail (nama, tanggal, alamat, dll)
                      </li>
                      <li className="flex items-start gap-2.5 text-sm text-stone-600 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                        Berikan feedback jika ada perbaikan
                      </li>
                      <li className="flex items-start gap-2.5 text-sm text-stone-600 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                        Setelah ACC, design akan diproses ke tahap cetak/delivery
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Warning Notice */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8"
            >
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0">
                    <AlertTriangle className="h-4.5 w-4.5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-800 text-sm mb-1.5">Perhatian</h4>
                    <p className="text-sm text-amber-700 leading-relaxed">
                      Revisi design maksimal 3x setelah ACC pertama. Lebih dari itu akan dikenakan biaya tambahan. Pastikan semua data sudah benar sebelum memberikan ACC final.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
        )}
        </AnimatePresence>

        {/* Contact Section */}
        <section id="kontak" className="py-16 sm:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-4">
                Hubungi Kami
              </h2>
              <p className="text-stone-500 max-w-xl mx-auto mb-10">
                Ada pertanyaan atau ingin konsultasi? Jangan ragu untuk menghubungi kami melalui media sosial berikut.
              </p>
              <div className="flex justify-center gap-6">
                <a
                  href="https://wa.me/6282133356710"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-2"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 group-hover:scale-105 transition-all duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="#25D366" className="sm:w-8 sm:h-8">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-stone-500 group-hover:text-emerald-600 transition-colors">WhatsApp</span>
                </a>
                <a
                  href="https://instagram.com/maesprtm_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-2"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-pink-50 flex items-center justify-center group-hover:bg-pink-100 group-hover:scale-105 transition-all duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E1306C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-8 sm:h-8">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-stone-500 group-hover:text-pink-600 transition-colors">Instagram</span>
                </a>
                <a
                  href="https://tiktok.com/@tmprtm__"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-2"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-stone-100 flex items-center justify-center group-hover:bg-stone-200 group-hover:scale-105 transition-all duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="#010101" className="sm:w-8 sm:h-8">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.39a8.16 8.16 0 0 0 4.76 1.52V7.47a4.83 4.83 0 0 1-1-.78z"/>
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-stone-500 group-hover:text-stone-800 transition-colors">TikTok</span>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#FFF5F7] border-t border-rose-100 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-rose-500 fill-rose-500" />
              <span className="font-bold text-stone-900 text-sm">Memoraa'</span>
            </div>
            <p className="text-xs text-stone-400 text-center">
              &copy; {new Date().getFullYear()} Memoraa'. Template undangan pernikahan cetak & online premium.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://wa.me/6282133356710" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-rose-500 transition-colors" aria-label="WhatsApp">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              <a href="https://instagram.com/maesprtm_/" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-rose-500 transition-colors" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://tiktok.com/@tmprtm__" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-rose-500 transition-colors" aria-label="TikTok">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.39a8.16 8.16 0 0 0 4.76 1.52V7.47a4.83 4.83 0 0 1-1-.78z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Template Detail Dialog */}
      <Dialog
        open={!!selectedTemplate}
        onOpenChange={(open) => {
          if (!open) { setSelectedTemplate(null); setSelectedPageIndex(0); }
        }}
      >
        <DialogContent showCloseButton={false} className="max-w-5xl w-[96vw] sm:w-[92vw] lg:w-[85vw] h-[90vh] sm:h-[88vh] p-0 bg-white overflow-hidden flex flex-col">
          <VisuallyHidden>
            <DialogTitle>Detail Template Undangan</DialogTitle>
          </VisuallyHidden>

          {selectedTemplate && (
            <>
              {/* Top bar */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-stone-100 shrink-0">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-stone-100" onClick={(e) => { e.stopPropagation(); navigateTemplate("prev"); }}>
                  <ChevronLeft className="h-4 w-4 text-stone-500" />
                </Button>
                <div className="flex items-center gap-2">
                  <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100 border-rose-200 text-xs">
                    {selectedTemplate.category}
                  </Badge>
                  {templateType === "online" && (
                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200 text-xs">Online</Badge>
                  )}
                  <span className="text-sm text-stone-400 font-medium">{currentIndex + 1} / {filteredTemplates.length}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-stone-100" onClick={(e) => { e.stopPropagation(); navigateTemplate("next"); }}>
                    <ChevronRight className="h-4 w-4 text-stone-500" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-stone-100" onClick={() => { setSelectedTemplate(null); setSelectedPageIndex(0); }}>
                    <X className="h-4 w-4 text-stone-500" />
                  </Button>
                </div>
              </div>

              {/* Main: thumbnails left + preview right */}
              <div className="flex-1 flex flex-col sm:flex-row min-h-0 overflow-hidden">
                {/* Left — Page thumbnails */}
                <div className="sm:w-[100px] lg:w-[120px] shrink-0 flex sm:flex-col gap-1 sm:gap-2 px-2.5 py-2 sm:p-4 overflow-x-auto sm:overflow-x-visible sm:overflow-y-auto border-b sm:border-b-0 sm:border-r border-stone-100">
                  {selectedTemplate.pages.map((page, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setSelectedPageIndex(i); }}
                      className={`relative shrink-0 sm:shrink w-12 h-[60px] sm:w-full sm:h-auto sm:aspect-[768/1344] rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        selectedPageIndex === i
                          ? "border-rose-500 ring-2 ring-rose-200 shadow-md"
                          : "border-transparent hover:border-stone-300 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image src={page.src} alt={page.label} fill className="object-cover object-top" sizes="56px" />
                      <div className={`absolute bottom-0 inset-x-0 text-center py-0.5 text-[9px] font-medium ${
                        selectedPageIndex === i ? "bg-rose-500 text-white" : "bg-black/50 text-white"
                      }`}>{page.label}</div>
                    </button>
                  ))}
                </div>

                {/* Right — Large preview + bottom info */}
                <div className="flex-1 flex flex-col min-h-0">
                  <div className="flex-1 relative min-h-0">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${selectedTemplate.id}-${selectedPageIndex}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 flex items-center justify-center p-1.5 sm:p-6"
                      >
                        <div className="relative w-full h-full">
                          <Image
                            src={selectedTemplate.pages[selectedPageIndex].src}
                            alt={selectedTemplate.pages[selectedPageIndex].label}
                            fill
                            className="object-contain"
                            sizes="(max-width: 640px) 90vw, 60vw"
                            priority
                          />
                        </div>
                      </motion.div>
                    </AnimatePresence>
                    {/* Prev / Next page buttons */}
                    {selectedTemplate.pages.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPageIndex((prev) =>
                              prev === 0 ? selectedTemplate.pages.length - 1 : prev - 1
                            );
                          }}
                          disabled={selectedTemplate.pages.length <= 1}
                          className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 z-10 h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm border border-stone-200 shadow-md hover:bg-white hover:shadow-lg transition-all duration-200 disabled:opacity-0 disabled:pointer-events-none"
                        >
                          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-stone-700" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPageIndex((prev) =>
                              prev === selectedTemplate.pages.length - 1 ? 0 : prev + 1
                            );
                          }}
                          disabled={selectedTemplate.pages.length <= 1}
                          className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 z-10 h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm border border-stone-200 shadow-md hover:bg-white hover:shadow-lg transition-all duration-200 disabled:opacity-0 disabled:pointer-events-none"
                        >
                          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-stone-700" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Bottom info */}
                  <div className="shrink-0 border-t border-stone-100 bg-white px-4 py-3 sm:px-6 sm:py-4">
                    <div className="max-w-3xl mx-auto">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-tight">{selectedTemplate.name}</h3>
                          <p className="text-xs text-stone-500 mt-0.5 line-clamp-1">{selectedTemplate.description}</p>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <a
                            href={`https://wa.me/6282133356710?text=${encodeURIComponent(`Halo, saya tertarik dengan template ${selectedTemplate.name} (ID: ${selectedTemplate.id}). Bisa dibantu?`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex"
                          >
                            <Button
                              size="sm"
                              className="bg-rose-500 hover:bg-rose-600 text-white rounded-full h-8 text-xs shadow-sm shadow-rose-200"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Download className="mr-1.5 h-3.5 w-3.5" />Pesan
                            </Button>
                          </a>
                          <Button variant="outline" size="sm" className="rounded-full h-8 text-xs border-stone-200 text-stone-500 hover:bg-stone-50" onClick={() => { setSelectedTemplate(null); setSelectedPageIndex(0); }}>
                            Tutup
                          </Button>
                        </div>
                      </div>
                      {selectedTemplate.specs ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 text-xs sm:text-sm">
                          {selectedTemplate.specs.map((spec, i) => (
                            <div key={i}>
                              <span className="text-stone-400">{spec.label} </span>
                              <span className="font-medium text-stone-700">{spec.value}</span>
                            </div>
                          ))}
                          <div>
                            <span className="text-stone-400">Halaman </span>
                            <span className="font-medium text-stone-700">{selectedTemplate.pages.length} halaman</span>
                          </div>
                          <div>
                            <span className="text-stone-400">Tipe </span>
                            <span className="font-medium text-stone-700">{templateType === "cetak" ? "Undangan Cetak" : "Undangan Online"}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs sm:text-sm">
                          <div><span className="text-stone-400">Ukuran </span><span className="font-medium text-stone-700">{selectedTemplate.size}</span></div>
                          <div><span className="text-stone-400">Warna </span><span className="font-medium text-stone-700">{selectedTemplate.color}</span></div>
                          <div><span className="text-stone-400">Halaman </span><span className="font-medium text-stone-700">{selectedTemplate.pages.length} halaman</span></div>
                          <div><span className="text-stone-400">Tipe </span><span className="font-medium text-stone-700">{templateType === "cetak" ? "Undangan Cetak" : "Undangan Online"}</span></div>
                        </div>
                      )}

                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Online Invitation Previews */}
      {showOnlinePreview && onlinePreviewId === 201 && (
        <OnlineInvitation onClose={() => { setShowOnlinePreview(false); setOnlinePreviewId(null); }} />
      )}
      {showOnlinePreview && onlinePreviewId === 202 && (
        <JavaneseInvitation onClose={() => { setShowOnlinePreview(false); setOnlinePreviewId(null); }} />
      )}
      {showOnlinePreview && onlinePreviewId === 203 && (
        <SilentPromiseInvitation onClose={() => { setShowOnlinePreview(false); setOnlinePreviewId(null); }} />
      )}
      {showOnlinePreview && onlinePreviewId === 204 && (
        <PalawaBloomInvitation onClose={() => { setShowOnlinePreview(false); setOnlinePreviewId(null); }} />
      )}
      {showOnlinePreview && onlinePreviewId === 205 && (
        <WhiteFreeInvitation onClose={() => { setShowOnlinePreview(false); setOnlinePreviewId(null); }} />
      )}
      {showOnlinePreview && onlinePreviewId === 206 && (
        <JavaneseV2Invitation onClose={() => { setShowOnlinePreview(false); setOnlinePreviewId(null); }} />
      )}

      <MusicPlayer autoPlay />

      {/* Dev-only download button — hidden in production */}
      {process.env.NODE_ENV === "development" && (
        <a
          href="/api/deploy-zip"
          download="memoraa-deploy.zip"
          className="fixed bottom-6 right-6 z-50 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2.5 rounded-full shadow-lg text-xs font-medium tracking-wide uppercase flex items-center gap-2 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3" />
          </svg>
          Download ZIP
        </a>
      )}
    </div>
  );
}
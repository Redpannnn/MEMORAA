import type { Metadata } from "next";
import { Geist, Geist_Mono, Great_Vibes, Cormorant_Garamond, Playfair_Display, Lato, Prata } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const prata = Prata({
  variable: "--font-prata",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Memoraa' - Template Undangan Pernikahan",
  description: "Koleksi template undangan pernikahan cetak eksklusif. Desain elegan dan premium untuk hari spesial Anda.",
  keywords: ["undangan pernikahan", "template undangan", "wedding invitation", "undangan cetak", "kartu pernikahan"],
  authors: [{ name: "Memoraa'" }],
  icons: {
    icon: "/ring.png",
  },
  openGraph: {
    title: "Memoraa' - Template Undangan Pernikahan",
    description: "Koleksi template undangan pernikahan cetak eksklusif.",
    siteName: "Memoraa'",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Memoraa' - Template Undangan Pernikahan",
    description: "Koleksi template undangan pernikahan cetak eksklusif.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${greatVibes.variable} ${cormorant.variable} ${playfair.variable} ${lato.variable} ${prata.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Nunito, Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  preload: true,
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Happy Birthday Shamm 🎀",
  description: "A cute birthday surprise made with love",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffd6e7",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="min-h-full scroll-smooth">
      <body
        className={`${poppins.variable} ${nunito.variable} min-h-full touch-pan-y antialiased`}
      >
        <div
          id="app-boot"
          suppressHydrationWarning
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#ffd6e7] transition-opacity duration-300"
          role="status"
          aria-live="polite"
        >
          <p className="animate-bounce-cute text-5xl" aria-hidden>
            🎀
          </p>
          <p className="mt-6 font-[family-name:var(--font-nunito)] text-base font-semibold text-[#7a4d5c]">
            Loading your surprise…
          </p>
        </div>
        {children}
      </body>
    </html>
  );
}

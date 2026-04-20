import { Toaster } from "react-hot-toast";
// import FooterBar from "./_components/Footer/FooterBar";
import SmoothScroll from "./_components/LenisScroll/SmoothScroll";
import UserContextProvider from "./contexts/UserContextProvider";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "sans-serif"],
  display: "swap",
});

export const metadata = {
  title: "HireMind AI - AI-Powered Interview Preparation",
  description:
    "HireMind AI is the best AI-powered interview preparation platform helping students and professionals ace their job interviews.",
  keywords:
    "interview preparation, AI interview, job interview, mock interview, career preparation",
  authors: [{ name: "HireMind AI" }],
  creator: "HireMind AI",
  publisher: "HireMind AI",
  robots: "index, follow",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`bg-[#e0e0e0] ${inter.className}`}
        suppressHydrationWarning
      >
        <UserContextProvider>
          <SmoothScroll />
          {children}
          <Toaster
            position="top-right"
            containerStyle={{
              pointerEvents: "none",

              zIndex: 100,
            }}
            toastOptions={{
              duration: 3000,
              style: {
                background: "#111",
                color: "#fff",
                borderRadius: "10px",
                padding: "12px 16px",
                pointerEvents: "auto", // ✅ allow click inside toast only
              },
              success: {
                style: {
                  background: "#16a34a",
                },
              },
              error: {
                style: {
                  background: "#dc2626",
                },
              },
            }}
          />
        </UserContextProvider>
      </body>
    </html>
  );
}

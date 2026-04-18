import { Toaster } from "react-hot-toast";
import FooterBar from "./_components/Footer/FooterBar";
import SmoothScroll from "./_components/LenisScroll/SmoothScroll";
import UserContextProvider from "./contexts/UserContextProvider";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "sans-serif"],
  display: "swap",
});

export const metadata = {
  title: "HireMind Ai",
  description:
    "HireMind Ai is all time best Interview preparation solution, Which help college students and freshers to grab there first dream job. You can use HireMind Ai both free and paid version which affect user Experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-[#e0e0e0] ${inter.className}`}>
        <UserContextProvider>
          <SmoothScroll />
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#111",
                color: "#fff",
                borderRadius: "10px",
                padding: "12px 16px",
                zIndex: 300,
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

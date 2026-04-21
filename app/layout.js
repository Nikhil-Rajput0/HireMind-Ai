import { Toaster } from "react-hot-toast";
import UserContextProvider from "./contexts/UserContextProvider";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "sans-serif"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://hiremind-ai-org.vercel.app"),

  title: {
    default: "HireMind AI – AI Interview Preparation Platform",
    template: "%s | HireMind AI",
  },

  description:
    "HireMind AI helps students and professionals crack interviews with AI mock interviews, resume analysis, and real-time feedback.",

  keywords: [
    "AI interview",
    "mock interview",
    "resume analyzer",
    "interview preparation India",
    "AI HR interview",
    "HireMind AI",
  ],

  applicationName: "HireMind AI",

  authors: [{ name: "HireMind AI" }],
  creator: "HireMind AI",
  publisher: "HireMind AI",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  openGraph: {
    title: "HireMind AI – AI Interview Preparation",
    description:
      "Practice interviews with AI, analyze resumes, and get job-ready faster.",
    url: "https://hiremind-ai-org.vercel.app",
    siteName: "HireMind AI",
    images: [
      {
        url: "/og.png", // add this image in /public
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "HireMind AI",
    description:
      "AI-powered interview preparation platform for students & professionals.",
    images: ["/og.png"],
  },

  verification: {
    google: "2hQYmh2OwwmU8z9KbFtNF3TiR7QnjZVJ3mI6qmneDhQ",
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "HireMind AI",
              url: "https://hiremind-ai-org.vercel.app",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://hiremind-ai-org.vercel.app/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "HireMind AI",
              url: "https://hiremind-ai-org.vercel.app",
              logo: "https://hiremind-ai-org.vercel.app/logo.png",
              sameAs: ["https://linkedin.com/in/nikhil-rajput-a14716275"],
            }),
          }}
        />
      </body>
    </html>
  );
}

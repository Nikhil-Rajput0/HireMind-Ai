import { Toaster } from "react-hot-toast";
import UserContextProvider from "./contexts/UserContextProvider";
import "./globals.css";
import { Inter } from "next/font/google";
// import SplashWrapper from "./_components/Loader/SplashWrapper";

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
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes, viewport-fit=cover"
        />

        <meta
          name="theme-color"
          content="#ffffff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#1a1a1a"
          media="(prefers-color-scheme: dark)"
        />
        <meta name="color-scheme" content="light dark" />
        <meta name="display" content="standalone" />

        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="HireMind AI" />

        <title>HireMind AI - AI Powered Interview Preparation</title>
        <meta
          name="description"
          content="HireMind AI is the best AI-powered interview preparation platform helping students and professionals ace their job interviews."
        />
        <meta
          name="keywords"
          content="interview preparation, AI interview, job interview, mock interview, career preparation"
        />
        <meta name="author" content="HireMind AI" />
        <meta name="robots" content="index, follow" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hiremind.ai/" />
        <meta
          property="og:title"
          content="HireMind AI - AI Interview Preparation"
        />
        <meta
          property="og:description"
          content="Practice interviews with AI and ace your dream job"
        />
        <meta property="og:image" content="/og-image.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://hiremind.ai/" />
        <meta
          name="twitter:title"
          content="HireMind AI - AI Interview Preparation"
        />
        <meta
          name="twitter:description"
          content="Practice interviews with AI and ace your dream job"
        />
        <meta name="twitter:image" content="/twitter-image.png" />

        {/* Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/favicon-32x32.png"
          type="image/png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
          sizes="180x180"
        />
        <link rel="manifest" href="/site.webmanifest" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`bg-[#e0e0e0] ${inter.className}`}
        suppressHydrationWarning={true}
      >
        <UserContextProvider>
          {children}
          <Toaster
            position="top-right"
            containerStyle={{
              pointerEvents: "none",

              zIndex: 800,
            }}
            toastOptions={{
              duration: 3000,
              style: {
                background: "#111",
                color: "#fff",
                borderRadius: "10px",
                padding: "12px 16px",
                pointerEvents: "auto",
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

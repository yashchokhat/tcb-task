import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MouseGlow from "@/component/MouseGlow";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Codebreakers | Team Code Breaker RBU RCOEM - Competitive Programming & Coding Club",
  description: "Codebreakers - India's leading competitive programming and coding club. Join Yash Chokhat and Team Code Breaker at Ramdeobaba University (RBU), RCOEM Nagpur for coding competitions, workshops, and career growth.",
  keywords: "Codebreakers, Codebreakers RBU, Codebreakers RCOEM, Yash Chokhat, Team Code Breaker, RBU Nagpur, RCOEM Nagpur, Ramdeobaba University, competitive programming, coding club, TCB",
  authors: [{ name: "Yash Chokhat" }],
  creator: "Yash Chokhat",
  publisher: "Codebreakers Team",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  metadataBase: new URL("https://code-breakers.yashchokhat.in/"),
  openGraph: {
    type: "website",
    url: "https://code-breakers.yashchokhat.in/",
    title: "Codebreakers | Team Code Breaker RBU RCOEM - Competitive Programming",
    description: "Join Codebreakers - the premier coding club at RBU and RCOEM Nagpur. Competitive programming, coding contests, and career development.",
    siteName: "Codebreakers",
    images: [
      {
        url: "https://code-breakers.yashchokhat.in//og-image.png",
        width: 1200,
        height: 630,
        alt: "Codebreakers - Team Code Breaker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Codebreakers | Team Code Breaker RBU RCOEM",
    description: "Competitive programming and coding club at Ramdeobaba University",
    creator: "@codebreakersrbu",
  },
  alternates: {
    canonical: "https://code-breakers.yashchokhat.in/",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-300`}
      >
        <ThemeProvider>
          <AuthProvider>
            <MouseGlow />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

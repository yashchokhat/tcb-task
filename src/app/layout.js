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
  title: "VETRIC - Blockchain Solutions",
  description: "Build the Future with Web3",
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

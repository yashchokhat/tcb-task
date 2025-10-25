"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function CtaSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <section className="relative w-full flex items-center justify-center px-6 sm:px-10 py-10 sm:py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.01 }}
        className="relative flex flex-col md:flex-row items-center justify-between w-full max-w-6xl rounded-2xl p-[2px] 
                   transition-all duration-300"
        style={{
          backgroundImage: isDark 
            ? "linear-gradient(to right, rgba(150,234,99,0.7), rgba(180,255,159,0.5), transparent)"
            : "linear-gradient(to right, rgba(99,102,241,0.5), rgba(129,140,248,0.3), transparent)",
          boxShadow: isDark
            ? "0 0 30px rgba(150,234,99,0.15)"
            : "0 0 30px rgba(99,102,241,0.1)"
        }}
      >
        <div 
          className="relative flex flex-col md:flex-row items-center justify-between w-full h-full rounded-2xl p-6 sm:p-10 md:p-12 overflow-hidden"
          style={{ backgroundColor: "var(--section-bg)" }}
        >
          <div 
            className="absolute inset-0 blur-[90px] opacity-70 pointer-events-none"
            style={{
              backgroundImage: isDark
                ? "linear-gradient(to bottom right, transparent, rgba(150,234,99,0.08), transparent)"
                : "linear-gradient(to bottom right, transparent, rgba(99,102,241,0.05), transparent)"
            }}
          />

          <div className="z-10 text-center md:text-left space-y-3 sm:space-y-4">
            <h2 
              className="font-[Blanc Groove] text-2xl sm:text-3xl md:text-4xl font-extrabold"
              style={{ color: "var(--text-primary)" }}
            >
              Unlock the Power of Web3 Today!
            </h2>
            <p 
              className="font-manrope text-base sm:text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              Join us on the journey to the decentralized future.
            </p>
          </div>

          <motion.a
            href="#"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            className="z-10 mt-6 md:mt-0 inline-flex items-center justify-center gap-2 font-manrope text-base sm:text-lg font-medium px-6 py-3 rounded-lg transition-all"
            style={{
              backgroundColor: "var(--accent-color)",
              color: isDark ? "black" : "white",
              boxShadow: isDark
                ? "0 0 25px rgba(150,234,99,0.45)"
                : "0 0 25px rgba(99,102,241,0.3)"
            }}
          >
            Get Started
            <ArrowUpRight className="w-5 h-5" />
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}

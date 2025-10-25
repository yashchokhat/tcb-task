"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, Youtube, Linkedin, Twitter } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();
  const navLinks = [
    { name: "Solutions", href: "#solutions" },
    { name: "Pricing", href: "#pricing" },
    { name: "Get Started", href: "#get-started" },
    { name: "Use cases", href: "#use-cases" },
    { name: "Documentation", href: "#documentation" }
  ];

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const dividerVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 1, ease: "easeInOut" }
    }
  };

  return (
    <footer 
      className="relative w-full border-t backdrop-blur-[5.45px] overflow-hidden transition-colors duration-300"
      style={{
        backgroundColor: "var(--section-bg)",
        borderColor: "var(--divider)"
      }}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 py-8 sm:py-10 lg:py-12"
      >
        
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-12 mb-8 lg:mb-10">
          
          <motion.div variants={itemVariants}>
            <Link href="/" className="flex items-center gap-[5px] group">
              <motion.div 
                className="flex items-center justify-center w-[44.54px] h-[35.31px] rounded-[5px] p-2"
                whileHover={{ scale: 1.08, rotate: 3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                style={{ backgroundColor: "var(--accent-color)" }}
              >
                <div 
                  className="w-[28.54px] h-[19.31px] rounded-sm" 
                  style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
                />
              </motion.div>
              <motion.span 
                className="text-[17.09px] font-bold font-[Manrope] tracking-wide"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
                style={{ color: "var(--text-primary)" }}
              >
                VETRIC
              </motion.span>
            </Link>
          </motion.div>

          {/* Navigation Links */}
          <motion.nav 
            variants={itemVariants}
            className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6 xl:gap-8"
          >
            {navLinks.map((link, idx) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
              >
                <Link
                  href={link.href}
                  className="relative text-sm font-normal font-[Manrope] transition-colors duration-300 py-2 px-2 group"
                  style={{
                    color: "var(--footer-link)"
                  }}
                  onMouseEnter={(e) => e.target.style.color = "var(--text-primary)"}
                  onMouseLeave={(e) => e.target.style.color = "var(--footer-link)"}
                >
                  {link.name}
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-300"
                    style={{ backgroundColor: "var(--accent-color)" }}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.nav>
        </div>

        <motion.div
          variants={dividerVariants}
          className="w-full h-[1px] backdrop-blur-[5.45px] mb-8 lg:mb-10 origin-left"
          style={{ backgroundColor: "var(--divider)" }}
        />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-8 lg:gap-12">
          
          <motion.p
            variants={itemVariants}
            className="text-sm font-normal font-[Manrope] text-center sm:text-left"
            style={{ color: "var(--footer-link)" }}
          >
            VETRIC - 2024
          </motion.p>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-[34px] cursor-pointer transition-colors duration-300"
            style={{
              borderColor: "var(--divider)"
            }}
          >
            <motion.div 
              className="w-1.5 h-1.5 rounded-full bg-[#11A844]"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [1, 0.7, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <span 
              className="text-sm font-normal font-[Manrope] whitespace-nowrap"
              style={{ color: "var(--footer-link)" }}
            >
              Operating System
            </span>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-4 sm:gap-6 lg:gap-8"
          >
            {socialLinks.map((social, idx) => (
              <motion.div
                key={social.label}
                initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: idx * 0.1,
                  type: "spring",
                  stiffness: 200
                }}
                viewport={{ once: true }}
              >
                <Link
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-300"
                  style={{ color: "var(--footer-link)" }}
                  onMouseEnter={(e) => e.target.style.color = "var(--accent-color)"}
                  onMouseLeave={(e) => e.target.style.color = "var(--footer-link)"}
                  aria-label={social.label}
                >
                  <motion.div
                    whileHover={{ 
                      scale: 1.25, 
                      rotate: [0, -10, 10, 0],
                      y: -3
                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <social.icon size={22} strokeWidth={1.5} />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] blur-[100px] pointer-events-none"
        style={{ 
          backgroundColor: theme === "dark" ? "rgb(150, 234, 99)" : "rgb(99, 102, 241)"
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.03, 0.05, 0.03]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </footer>
  );
}
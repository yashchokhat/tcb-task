"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import logo from "../../public/images/logo.svg";
import { Globe, ChevronDown, Moon, Sun, LogOut, Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: "Product", href: "#" },
    { name: "Solutions", href: "#" },
    { name: "Resources", href: "#" },
    { name: "Pricing", href: "#" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-[var(--navbar-bg)] border-b border-[var(--navbar-border)] backdrop-blur-[5.45px] transition-colors duration-300">
      <div className="flex justify-between items-center px-4 sm:px-6 md:px-8 lg:px-[166px] py-3 h-[71px]">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition flex-shrink-0">
          <div className="w-[44.54px] h-[35.31px] bg-[var(--accent-color)] rounded-[5px] flex justify-center items-center transition-colors duration-300">
            <Image src={logo} alt="Logo" width={28.54} height={19.31} />
          </div>
          <span className="text-[var(--navbar-text)] text-base sm:text-[17px] font-medium tracking-wide transition-colors duration-300 hidden sm:inline">
            VETRIC
          </span>
        </Link>

        {/* NAV LINKS - Hidden on mobile, visible on md and up */}
        <nav className="hidden md:flex gap-6 lg:gap-[89px] text-[var(--navbar-link)]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm lg:text-[14px] font-[400] hover:text-[var(--navbar-link-hover)] transition-colors duration-200 whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* RIGHT SECTION - Flexible layout */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-[40px] ml-auto">
          {/* AUTH BUTTONS - Hidden on mobile for unauthenticated, email hidden on mobile for authenticated */}
          {!user ? (
            <div className="hidden sm:flex items-center gap-2 sm:gap-3 md:gap-4">
              <Link href="/auth">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-[var(--navbar-text)] text-xs sm:text-[14px] font-[400] px-3 sm:px-[35px] py-2 sm:py-[16px] rounded-[8px] hover:bg-[var(--navbar-border)] transition-colors duration-200"
                >
                  Login
                </motion.button>
              </Link>
              <Link href="/auth">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-[#11111C] text-xs sm:text-[14px] font-[400] px-3 sm:px-[35px] py-2 sm:py-[10px] rounded-[8px] bg-[var(--accent-color)] hover:opacity-90 transition-all duration-200"
                >
                  Sign Up
                </motion.button>
              </Link>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2 sm:gap-[20px]">
              <span className="text-[var(--navbar-text)] text-xs sm:text-[14px] hidden md:inline truncate max-w-xs">
                {user.email}
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="text-[var(--navbar-text)] text-xs sm:text-[14px] font-[400] px-2 sm:px-[35px] py-2 sm:py-[16px] rounded-[8px] hover:bg-[var(--navbar-border)] transition-colors duration-200 flex items-center gap-1 sm:gap-2 flex-shrink-0"
              >
                <LogOut size={14} className="sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Logout</span>
              </motion.button>
            </div>
          )}

          {/* DIVIDER - Hidden on mobile */}
          <div className="hidden md:block h-6 w-px bg-[var(--navbar-border)]" />

          {/* THEME TOGGLE */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative flex items-center justify-center w-8 sm:w-10 h-8 sm:h-10 rounded-[8px] bg-[var(--navbar-border)] hover:bg-[var(--navbar-border)] transition-all duration-200 flex-shrink-0"
            title={mounted ? `Switch to ${theme === "dark" ? "light" : "dark"} mode` : "Toggle theme"}
          >
            {mounted && (
              <motion.div
                initial={{ rotate: 0, opacity: 1 }}
                animate={{ rotate: theme === "dark" ? 0 : 360, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {theme === "dark" ? (
                  <Moon size={16} className="sm:w-[18px] sm:h-[18px]" color="var(--navbar-text)" />
                ) : (
                  <Sun size={16} className="sm:w-[18px] sm:h-[18px]" color="var(--navbar-text)" />
                )}
              </motion.div>
            )}
          </motion.button>

          {/* LANGUAGE SELECTOR - Hidden on mobile */}
          <div className="hidden sm:flex items-center gap-[4px] px-[8px] py-[8px] rounded-[8px] cursor-pointer hover:bg-[var(--navbar-border)] transition-colors duration-200 flex-shrink-0">
            <Globe size={20} color="var(--navbar-text)" />
            <ChevronDown size={18} color="var(--navbar-text)" />
          </div>

          {/* HAMBURGER MENU - Visible only on mobile */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden flex items-center justify-center w-8 sm:w-10 h-8 sm:h-10 rounded-[8px] bg-[var(--navbar-border)] hover:bg-[var(--navbar-border)] transition-all duration-200 flex-shrink-0"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X size={20} color="var(--navbar-text)" />
            ) : (
              <Menu size={20} color="var(--navbar-text)" />
            )}
          </motion.button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="md:hidden border-t border-[var(--navbar-border)] bg-[var(--navbar-bg)]"
        >
          <div className="px-4 py-4 space-y-3">
            {/* MOBILE NAV LINKS */}
            <nav className="flex flex-col gap-3 pb-4 border-b border-[var(--navbar-border)]">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-[400] text-[var(--navbar-link)] hover:text-[var(--navbar-link-hover)] transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* MOBILE AUTH */}
            {!user ? (
              <div className="flex flex-col gap-2 sm:flex-row">
                <Link href="/auth" className="w-full sm:flex-1">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full text-[var(--navbar-text)] text-sm font-[400] px-4 py-2 rounded-[8px] hover:bg-[var(--navbar-border)] transition-colors duration-200"
                  >
                    Login
                  </motion.button>
                </Link>
                <Link href="/auth" className="w-full sm:flex-1">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full text-[#11111C] text-sm font-[400] px-4 py-2 rounded-[8px] bg-[var(--accent-color)] hover:opacity-90 transition-all duration-200"
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="text-[var(--navbar-text)] text-sm px-2 py-1 truncate">
                  {user.email}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogout}
                  className="text-[var(--navbar-text)] text-sm font-[400] px-4 py-2 rounded-[8px] hover:bg-[var(--navbar-border)] transition-colors duration-200 flex items-center gap-2 justify-center"
                >
                  <LogOut size={16} />
                  Logout
                </motion.button>
              </div>
            )}

            {/* MOBILE ADDITIONAL OPTIONS */}
            <div className="pt-4 border-t border-[var(--navbar-border)] space-y-2 flex items-center gap-3">
              <Globe size={18} color="var(--navbar-text)" />
              <span className="text-[var(--navbar-text)] text-sm">Language</span>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}

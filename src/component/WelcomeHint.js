"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function WelcomeHint({ onLoginClick }) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed top-[85px] left-1/2 transform -translate-x-1/2 z-30 max-w-sm"
        >
          <div className="bg-[var(--navbar-bg)] border border-[var(--navbar-border)] rounded-[8px] px-4 py-3 flex items-center justify-between gap-3 backdrop-blur-sm">
            <button
              onClick={onLoginClick}
              className="text-sm text-[var(--accent-color)] font-semibold hover:opacity-80 transition whitespace-nowrap"
            >
              👉 Login here
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="text-[var(--navbar-text)] hover:opacity-70 transition flex-shrink-0"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

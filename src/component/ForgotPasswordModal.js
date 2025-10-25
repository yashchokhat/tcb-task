"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function ForgotPasswordModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
      setMessage("Password reset email sent! Check your inbox.");
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setMessage("");
    setError("");
    setSent(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-[var(--navbar-bg)] border border-[var(--navbar-border)] rounded-[12px] p-8 relative">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-[var(--navbar-text)] hover:opacity-70 transition"
              >
                <X size={20} />
              </button>

              <h2 className="text-2xl font-bold text-[var(--navbar-text)] mb-2">
                Reset Password
              </h2>
              <p className="text-sm text-[var(--navbar-link)] mb-6">
                Enter your email to receive a password reset link
              </p>

              <form onSubmit={handleReset} className="space-y-4">
                <div>
                  <label className="block text-sm text-[var(--navbar-text)] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 rounded-[8px] bg-[var(--navbar-border)] text-[var(--navbar-text)] placeholder-gray-500 outline-none focus:ring-2 focus:ring-[var(--accent-color)] transition"
                    required
                    disabled={sent}
                  />
                </div>

                {message && (
                  <div className="p-3 rounded-[8px] bg-green-500/20 text-green-400 text-sm">
                    {message}
                  </div>
                )}

                {error && (
                  <div className="p-3 rounded-[8px] bg-red-500/20 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                {!sent && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 rounded-[8px] bg-[var(--accent-color)] text-[#11111C] font-semibold hover:opacity-90 transition disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Send Reset Link"}
                  </motion.button>
                )}
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

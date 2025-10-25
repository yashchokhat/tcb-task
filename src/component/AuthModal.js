"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle } from "lucide-react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function AuthModal({ isOpen, onClose, mode = "login", onForgotPassword }) {
  const router = useRouter();
  const [currentMode, setCurrentMode] = useState(mode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const getErrorMessage = (errMsg) => {
    if (errMsg.includes("invalid-credential")) {
      return "Wrong email or password";
    } else if (errMsg.includes("user-not-found")) {
      return "User not found";
    } else if (errMsg.includes("wrong-password")) {
      return "Wrong password";
    } else if (errMsg.includes("email-already-in-use")) {
      return "Email already in use";
    } else if (errMsg.includes("weak-password")) {
      return "Password is too weak";
    }
    return errMsg;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess(true);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        onClose();
        router.push("/");
      }, 1500);
    } catch (err) {
      setError(getErrorMessage(err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess(true);
      setEmail("");
      setPassword("");
      setTimeout(() => {
        onClose();
        router.push("/");
      }, 1500);
    } catch (err) {
      setError(getErrorMessage(err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
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

              <h2 className="text-2xl font-bold text-[var(--navbar-text)] mb-6">
                {currentMode === "login" ? "Login" : "Sign Up"}
              </h2>

              <form
                onSubmit={currentMode === "login" ? handleLogin : handleSignUp}
                className="space-y-4"
              >
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
                  />
                </div>

                <div>
                  <label className="block text-sm text-[var(--navbar-text)] mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 rounded-[8px] bg-[var(--navbar-border)] text-[var(--navbar-text)] placeholder-gray-500 outline-none focus:ring-2 focus:ring-[var(--accent-color)] transition"
                    required
                    disabled={success}
                  />

                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 p-3 rounded-[8px] bg-green-500/20 text-green-400 text-sm flex items-center gap-2"
                    >
                      <CheckCircle size={16} />
                      {currentMode === "login" ? "Login successful!" : "Account created!"}
                    </motion.div>
                  )}

                  {error && !success && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 p-3 rounded-[8px] bg-red-500/20 text-red-400 text-sm"
                    >
                      {error}
                    </motion.div>
                  )}
                </div>

                {currentMode === "login" && onForgotPassword && !success && (
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => {
                        onForgotPassword();
                        handleClose();
                      }}
                      className="text-xs text-[var(--navbar-link)] hover:text-[var(--accent-color)] transition"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                {currentMode === "signup" && (
                  <div>
                    <label className="block text-sm text-[var(--navbar-text)] mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      className="w-full px-4 py-2 rounded-[8px] bg-[var(--navbar-border)] text-[var(--navbar-text)] placeholder-gray-500 outline-none focus:ring-2 focus:ring-[var(--accent-color)] transition"
                      required
                      disabled={success}
                    />
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading || success}
                  className="w-full py-2 rounded-[8px] bg-[var(--accent-color)] text-[#11111C] font-semibold hover:opacity-90 transition disabled:opacity-50"
                >
                  {success
                    ? "Redirecting..."
                    : loading
                    ? "Processing..."
                    : currentMode === "login"
                    ? "Login"
                    : "Sign Up"}
                </motion.button>
              </form>

              {currentMode === "login" && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => setCurrentMode("signup")}
                    className="text-sm text-[var(--navbar-link)] hover:text-[var(--navbar-link-hover)] transition"
                  >
                    Don&apos;t have an account? Sign up
                  </button>
                </div>
              )}

              {currentMode === "signup" && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => setCurrentMode("login")}
                    className="text-sm text-[var(--navbar-link)] hover:text-[var(--navbar-link-hover)] transition"
                  >
                    Already have an account? Login
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

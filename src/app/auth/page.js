"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

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
      setMessage("Account created successfully! Redirecting...");
      setTimeout(() => router.push("/"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("Login successful! Redirecting...");
      setTimeout(() => router.push("/"), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email first");
      return;
    }

    setError("");
    setMessage("");
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] transition-colors duration-300 flex items-center justify-center px-4 py-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-2 mb-8"
        >
          <Link
            href="/"
            className="p-2 rounded-lg hover:bg-[var(--navbar-border)] transition-colors"
            title="Back to home"
          >
            <ArrowLeft
              size={20}
              color="var(--navbar-text)"
              className="text-[var(--navbar-text)]"
            />
          </Link>
          <h1 className="text-3xl font-bold text-[var(--navbar-text)]">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h1>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-[var(--navbar-bg)] border border-[var(--navbar-border)] rounded-[16px] p-8"
        >
          <form
            onSubmit={mode === "login" ? handleLogin : handleSignUp}
            className="space-y-5"
          >
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-[var(--navbar-text)] mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-3 text-[var(--navbar-link)]"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-2.5 rounded-[8px] bg-[var(--navbar-border)] text-[var(--navbar-text)] placeholder-[var(--navbar-link)] outline-none focus:ring-2 focus:ring-[var(--accent-color)] transition"
                  required
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-[var(--navbar-text)] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-3 text-[var(--navbar-link)]"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-[8px] bg-[var(--navbar-border)] text-[var(--navbar-text)] placeholder-[var(--navbar-link)] outline-none focus:ring-2 focus:ring-[var(--accent-color)] transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-[var(--navbar-link)] hover:text-[var(--navbar-text)] transition"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </motion.div>

            {mode === "signup" && (
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-[var(--navbar-text)] mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3 top-3 text-[var(--navbar-link)]"
                  />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-[8px] bg-[var(--navbar-border)] text-[var(--navbar-text)] placeholder-[var(--navbar-link)] outline-none focus:ring-2 focus:ring-[var(--accent-color)] transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3 top-3 text-[var(--navbar-link)] hover:text-[var(--navbar-text)] transition"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div
                variants={itemVariants}
                className="p-3 rounded-[8px] bg-red-500/20 text-red-400 text-sm border border-red-500/30"
              >
                {error}
              </motion.div>
            )}

            {message && (
              <motion.div
                variants={itemVariants}
                className="p-3 rounded-[8px] bg-green-500/20 text-green-400 text-sm border border-green-500/30"
              >
                {message}
              </motion.div>
            )}

            <motion.div variants={itemVariants}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-[8px] bg-[var(--accent-color)] text-[#11111C] font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Processing..."
                  : mode === "login"
                  ? "Sign In"
                  : "Create Account"}
              </motion.button>
              <p className="text-xs text-[var(--navbar-link)] mt-2 text-center">
                {mode === "login"
                  ? "✓ Secure login with Firebase"
                  : "✓ Your data is encrypted and secure"}
              </p>
            </motion.div>

            {mode === "login" && (
              <motion.button
                variants={itemVariants}
                type="button"
                onClick={handleForgotPassword}
                disabled={loading}
                className="w-full py-2 text-sm text-[var(--navbar-link)] hover:text-[var(--accent-color)] transition disabled:opacity-50"
              >
                Forgot Password?
              </motion.button>
            )}

            <motion.div variants={itemVariants} className="pt-2">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-[var(--navbar-border)]" />
                <span className="text-xs text-[var(--navbar-link)]">OR</span>
                <div className="flex-1 h-px bg-[var(--navbar-border)]" />
              </div>
            </motion.div>

            <motion.button
              variants={itemVariants}
              type="button"
              onClick={() =>
                setMode(mode === "login" ? "signup" : "login")
              }
              className="w-full py-2.5 rounded-[8px] border border-[var(--navbar-border)] text-[var(--navbar-text)] font-medium hover:bg-[var(--navbar-border)] transition"
            >
              {mode === "login"
                ? "Create New Account"
                : "Already Have Account?"}
            </motion.button>
          </form>

          <motion.div variants={itemVariants} className="mt-6 text-center">
            <p className="text-xs text-[var(--navbar-link)]">
              {mode === "login"
                ? "New user? "
                : "Already have an account? "}
              <button
                onClick={() =>
                  setMode(mode === "login" ? "signup" : "login")
                }
                className="text-[var(--accent-color)] hover:underline transition"
              >
                {mode === "login" ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-6 text-center text-xs text-[var(--navbar-link)]"
        >
          <p>
            By signing up, you agree to our Terms of Service and Privacy
            Policy
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function Contact() {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitted(false);
    }, 2000);
  };

  const isDark = theme === "dark";

  return (
    <section className={`relative w-full min-h-screen flex items-center justify-center px-6 sm:px-10 lg:px-16 py-16 sm:py-20 transition-colors duration-300 ${
      isDark ? "bg-[#0D0E14]" : "bg-white"
    }`}>
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Section - Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h3 className={`text-2xl sm:text-4xl lg:text-5xl leading-relaxed font-bold mb-4 transition-colors duration-300 ${
              isDark ? "text-white" : "text-gray-900"
            }`}>
              Get in touch
            </h3>
            <p className={`text-lg sm:text-xl lg:text-2xl font-light leading-relaxed transition-colors duration-300 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}>
              Contact us for additional details or assistance.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-col gap-6 lg:gap-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className={`w-full px-6 py-5 rounded-2xl text-base sm:text-lg border focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${
                  isDark 
                    ? "bg-[#1A1B23] border-[#2A2B35] text-white placeholder-gray-500 focus:ring-blue-500" 
                    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-blue-500"
                }`}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="E-mail"
                required
                className={`w-full px-6 py-5 rounded-2xl text-base sm:text-lg border focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${
                  isDark 
                    ? "bg-[#1A1B23] border-[#2A2B35] text-white placeholder-gray-500 focus:ring-blue-500" 
                    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-blue-500"
                }`}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Add your message"
                required
                rows={8}
                className={`w-full px-6 py-5 rounded-2xl text-base sm:text-lg border resize-none focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${
                  isDark 
                    ? "bg-[#1A1B23] border-[#2A2B35] text-white placeholder-gray-500 focus:ring-blue-500" 
                    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-blue-500"
                }`}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex justify-end"
            >
              <motion.button
                type="submit"
                disabled={isSubmitted}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-12 py-4 rounded-xl font-normal text-lg border-none transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg ${
                  isDark
                    ? "bg-blue-500 text-white hover:bg-blue-600 shadow-blue-500/20"
                    : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/30"
                }`}
              >
                {isSubmitted ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    ✓ Sent
                  </motion.span>
                ) : (
                  "Submit"
                )}
              </motion.button>
            </motion.div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

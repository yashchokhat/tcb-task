"use client";

import { motion } from "framer-motion";
import { memo, useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const pricingPlans = [
  {
    name: "Basic",
    monthlyPrice: "$9.99",
    yearlyPrice: "$95.90",
    description: "Essential features for beginners.",
    features: [
      "Basic Platform Access",
      "Email Support",
      "Limited Data Storage",
    ],
    buttonText: "Get Started with Basic",
    isPopular: false,
    buttonStyle: "border",
  },
  {
    name: "Pro",
    monthlyPrice: "$19.99",
    yearlyPrice: "$191.90",
    description: "Advanced tools for growth.",
    features: [
      "Full Platform Access",
      "Email and Chat Support",
      "Unlimited Data Storage",
    ],
    buttonText: "Get Started with Pro",
    isPopular: true,
    buttonStyle: "accent",
  },
  {
    name: "Premium",
    monthlyPrice: "$29.99",
    yearlyPrice: "$287.90",
    description: "Top-tier support and customization.",
    features: [
      "Advanced Platform Access",
      "24/7 Support via Chat, and Phone",
      "Customized Features",
    ],
    buttonText: "Get Started with Premium",
    isPopular: false,
    buttonStyle: "border",
  },
];

const PricingCard = memo(({ plan, isYearly, index, theme }) => {
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  const accentColor = theme === "dark" ? "#96EA63" : "#6366F1";
  const accentDark = theme === "dark" ? "#1E2F14" : "#4338CA";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      viewport={{ once: true }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className={`relative flex flex-col justify-between p-5 sm:p-6 rounded-xl h-auto min-h-[440px] sm:min-h-[460px] w-full ${
        plan.isPopular
          ? "border-none shadow-2xl"
          : "border backdrop-blur-sm transition-colors duration-300"
      }`}
      style={{
        background:
          plan.isPopular
            ? theme === "dark"
              ? "#07070A"
              : "#F5F5F5"
            : theme === "dark"
            ? "rgba(0,0,0,0.05)"
            : "rgba(255,255,255,0.5)",
        borderColor:
          plan.isPopular
            ? "transparent"
            : theme === "dark"
            ? "rgba(255,255,255,0.2)"
            : "rgba(17,17,28,0.15)",
        isolation: plan.isPopular ? "isolate" : "auto",
      }}
    >
      {/* Glow effect for Pro plan */}
      {plan.isPopular && (
        <>
          <motion.div
            className="absolute rounded-full blur-[50px] pointer-events-none"
            style={{
              width: "200px",
              height: "150px",
              left: "50%",
              top: "-100px",
              transform: "translateX(-50%)",
              background: accentColor,
              opacity: 0.12,
              zIndex: 2,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.12, 0.16, 0.12],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}

      {/* Content */}
      <div className="flex flex-col gap-4 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between min-h-[28px]">
          <h3 className="text-[var(--hero-heading)] font-manrope font-semibold text-xl sm:text-2xl leading-tight">
            {plan.name}
          </h3>
          {plan.isPopular && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex items-center justify-center px-2.5 py-1 rounded-md"
              style={{
                background: theme === "dark" ? "#1E2F14" : "#EEF2FF",
              }}
            >
              <span
                className="font-manrope font-medium text-xs sm:text-sm whitespace-nowrap"
                style={{
                  color: accentColor,
                }}
              >
                Most popular
              </span>
            </motion.div>
          )}
        </div>

        {/* Price */}
        <div>
          <span className="text-[var(--hero-heading)] font-manrope font-semibold text-3xl sm:text-4xl leading-tight">
            {price}
          </span>
          <span className="text-[var(--hero-subheading)] font-normal text-base sm:text-lg ml-1">
            /month
          </span>
        </div>

        {/* Description */}
        <p className="text-[var(--hero-subheading)] font-[Urbanist] text-base sm:text-lg leading-relaxed">
          {plan.description}
        </p>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex items-center justify-center gap-2 w-full h-11 sm:h-12 rounded-lg font-manrope font-medium text-sm sm:text-base transition-all ${
            plan.buttonStyle === "accent"
              ? "text-white shadow-lg"
              : "border-2 text-[var(--hero-heading)] hover:bg-white/5 dark:hover:bg-white/5"
          }`}
          style={
            plan.buttonStyle === "accent"
              ? {
                  background: accentColor,
                  color: accentDark,
                  borderColor: accentColor,
                }
              : {
                  borderColor: "rgba(255, 255, 255, 0.3)",
                }
          }
        >
          {plan.buttonText}
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </motion.button>
      </div>

      {/* Features */}
      <div className="flex flex-col gap-2 relative z-10 mt-4">
        {plan.features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.12 + i * 0.08 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 min-h-[36px]"
          >
            <motion.div
              className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-md"
              style={{
                background:
                  theme === "dark"
                    ? "rgba(150, 234, 99, 0.15)"
                    : "rgba(99, 102, 241, 0.15)",
              }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Check
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                strokeWidth={2.5}
                style={{ color: accentColor }}
              />
            </motion.div>
            <span className="text-[var(--hero-heading)] font-manrope text-sm sm:text-base leading-relaxed">
              {feature}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
});

PricingCard.displayName = "PricingCard";

function Pricing() {
  const [isYearly, setIsYearly] = useState(true);
  const { theme } = useTheme();

  const accentColor = theme === "dark" ? "#96EA63" : "#6366F1";

  return (
    <section className="relative flex flex-col items-center justify-center w-full bg-[var(--background)] py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300 mt-16 sm:mt-20">
      {/* Background Glow */}
      <motion.div
        className="absolute rounded-full blur-[150px] sm:blur-[180px]"
        style={{
          width: "700px",
          height: "500px",
          top: "-180px",
          left: "50%",
          transform: "translateX(-50%)",
          background:
            theme === "dark"
              ? "radial-gradient(50% 50% at 50% 50%, #96EA63 0%, rgba(0,0,0,0) 100%)"
              : "radial-gradient(50% 50% at 50% 50%, #6366F1 0%, rgba(255,255,255,0) 100%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: theme === "dark" ? 0.15 : 0.1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex flex-col items-center gap-6 sm:gap-8 mb-12 sm:mb-16 z-10"
      >
        <h2 className="text-[var(--hero-heading)] font-manrope font-bold text-3xl sm:text-4xl md:text-5xl leading-tight text-center">
          Pricing
        </h2>

        <div className="flex flex-col items-center gap-4 sm:gap-5">
          <p className="text-[var(--hero-subheading)] font-[DM Sans] text-base sm:text-lg md:text-xl leading-relaxed text-center max-w-[520px] px-4">
            Explore our pricing plans tailored to fit your needs.
          </p>

          {/* Toggle */}
          <motion.div
            className="flex items-center gap-2 border rounded-full p-1.5 w-auto transition-colors duration-300"
            style={{
              backgroundColor:
                theme === "dark" ? "#07070A" : "#F5F5F5",
              borderColor: theme === "dark" ? "#4D4F5C" : "#E5E7EB",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => setIsYearly(false)}
              className={`flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-manrope font-medium text-xs sm:text-sm transition-all whitespace-nowrap ${
                !isYearly
                  ? "shadow-md"
                  : ""
              }`}
              style={
                !isYearly
                  ? {
                      background:
                        theme === "dark" ? "white" : "#11111C",
                      color: theme === "dark" ? "#0D0E14" : "white",
                    }
                  : {
                      color:
                        theme === "dark"
                          ? "#7A7B85"
                          : "rgba(17,17,28,0.7)",
                    }
              }
              whileHover={{ scale: isYearly ? 1.05 : 1 }}
              whileTap={{ scale: 0.95 }}
            >
              Monthly
            </motion.button>
            <motion.button
              onClick={() => setIsYearly(true)}
              className={`flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-manrope font-medium text-xs sm:text-sm transition-all whitespace-nowrap ${
                isYearly
                  ? "shadow-md"
                  : ""
              }`}
              style={
                isYearly
                  ? {
                      background:
                        theme === "dark" ? "white" : "#11111C",
                      color: theme === "dark" ? "#0D0E14" : "white",
                    }
                  : {
                      color:
                        theme === "dark"
                          ? "#7A7B85"
                          : "rgba(17,17,28,0.7)",
                    }
              }
              whileHover={{ scale: !isYearly ? 1.05 : 1 }}
              whileTap={{ scale: 0.95 }}
            >
              Yearly •20% off
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 max-w-[1200px] w-full z-10">
        {pricingPlans.map((plan, index) => (
          <PricingCard
            key={plan.name}
            plan={plan}
            isYearly={isYearly}
            index={index}
            theme={theme}
          />
        ))}
      </div>
    </section>
  );
}

export default memo(Pricing);
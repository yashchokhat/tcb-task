"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

export default function Features() {
  const { theme } = useTheme();
  const topFeatures = [
    {
      id: 1,
      src: "/Features/1.svg",
      alt: "Ready to go services - Streamlining solutions for swift success"
    },
    {
      id: 2,
      src: "/Features/2.svg",
      alt: "For growing teams - Tailored support to give you progress"
    }
  ];

  const bottomFeatures = [
    {
      id: 3,
      src: "/Features/3.svg",
      alt: "Powerful APIs for developers - Seamless Integration for your company"
    },
    {
      id: 4,
      src: "/Features/4.svg",
      alt: "The best blockchains out there - Pioneering paths in decentralized solutions"
    },
    {
      id: 5,
      src: "/Features/5.svg",
      alt: "Web 3.0 development - Crafting tomorrow's digital landscape today"
    }
  ];

  return (
    <section className="relative w-full bg-[var(--background)] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 overflow-hidden transition-colors duration-300">
      <motion.div
        className="flex flex-col items-center gap-4 sm:gap-6 mb-10 sm:mb-14 lg:mb-16 max-w-[600px] mx-auto px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <h2 
          className="font-bold text-3xl sm:text-4xl lg:text-[40px] leading-tight lg:leading-[48px] text-center font-[Manrope]"
          style={{ color: "var(--text-primary)" }}
        >
          Explore Our Feature
        </h2>
        <p 
          className="font-normal text-base sm:text-lg leading-relaxed lg:leading-[25px] text-center font-[DM_Sans] max-w-[536px]"
          style={{ color: "var(--text-tertiary)" }}
        >
          Discover the powerful features that make our platform stand out
        </p>
      </motion.div>

      {/* Features Container */}
      <div className="max-w-[1216px] mx-auto px-4">
        <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4">
          
          {/* Top Row - 2 Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
            {topFeatures.map((feature, idx) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: idx * 0.1,
                  ease: "easeOut"
                }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="relative overflow-hidden rounded-2xl cursor-pointer"
              >
                <motion.div 
                  className="relative w-full h-[280px] sm:h-[320px] lg:h-[340px]"
                  whileHover={{ scale: 0.93 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={feature.src}
                    alt={feature.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover scale-[0.92]"
                    quality={90}
                    priority
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Row - 3 Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
            {bottomFeatures.map((feature, idx) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: (idx + 2) * 0.1,
                  ease: "easeOut"
                }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="relative overflow-hidden rounded-2xl cursor-pointer"
              >
                <motion.div 
                  className="relative w-full h-[280px] sm:h-[320px] lg:h-[340px]"
                  whileHover={{ scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={feature.src}
                    alt={feature.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain scale-95"
                    quality={90}
                    priority={idx === 0}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
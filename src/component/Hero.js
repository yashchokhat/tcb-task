"use client";

import { motion } from "framer-motion";
import { memo } from "react";
import { useTheme } from "@/context/ThemeContext";
import {
  Share2,
  UserCheck,
  Settings2,
  Users,
  Coins,
  Shuffle,
} from "lucide-react";

import image1 from "../../public/TrustedBy/1.svg";
import image2 from "../../public/TrustedBy/2.svg";
import image3 from "../../public/TrustedBy/3.svg";
import image4 from "../../public/TrustedBy/4.svg";
import image5 from "../../public/TrustedBy/5.svg";
import image6 from "../../public/TrustedBy/6.svg";

const perks = [
  {
    icon: <Shuffle className="w-5 h-5 text-[var(--accent-color)]" />,
    title: "Cross-Chain Access",
    description: "Seamlessly interact with diverse blockchain networks.",
  },
  {
    icon: <UserCheck className="w-5 h-5 text-[var(--accent-color)]" />,
    title: "Decentralized Identity",
    description: "Securely manage your digital identity across applications.",
  },
  {
    icon: <Settings2 className="w-5 h-5 text-[var(--accent-color)]" />,
    title: "Smart Contract Automation",
    description: "Streamline operations with automated smart contracts.",
  },
  {
    icon: <Users className="w-5 h-5 text-[var(--accent-color)]" />,
    title: "Community Governance",
    description: "Participate in decentralized decision-making through voting.",
  },
  {
    icon: <Coins className="w-5 h-5 text-[var(--accent-color)]" />,
    title: "Asset Tokenization",
    description: "Digitally tokenize real-world assets for efficient management.",
  },
  {
    icon: <Share2 className="w-5 h-5 text-[var(--accent-color)]" />,
    title: "Interoperable Data Exchange",
    description: "Exchange data seamlessly between applications for collaboration.",
  },
];

const companyLogos = [image1, image2, image3, image4, image5, image6];

const PerkCard = memo(({ perk, index }) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="flex flex-col gap-3 text-left"
  >
    <div className="flex items-center gap-3">
      <motion.div
        whileHover={{ scale: 1.1, rotate: 2 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        className="relative flex items-center justify-center w-[34px] h-[34px] rounded-md
        bg-[rgba(255,255,255,0.05)] backdrop-blur-sm
        shadow-[inset_0_-2px_2px_32px_rgba(255,255,255,0.05)]"
      >
        <motion.div
          className="absolute w-[40px] h-[20px] bg-[var(--accent-color)] opacity-40 blur-[10px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        {perk.icon}
      </motion.div>
      <h3 className="text-[16px] font-bold font-[Blanc Groove] leading-tight text-[var(--hero-heading)]">
        {perk.title}
      </h3>
    </div>
    <p className="text-[var(--hero-subheading)] text-[13px] leading-[20px] font-medium font-[Urbanist] max-w-[260px]">
      {perk.description}
    </p>
  </motion.div>
));

PerkCard.displayName = "PerkCard";

function Hero({ onLoginClick }) {
  const { theme } = useTheme();
  
  const accentColor = theme === "dark" ? "#96EA63" : "#6366F1";
  const bgColor = theme === "dark" ? "#000000" : "#ffffff";

  return (
    <section className="relative flex flex-col items-center justify-start min-h-screen w-full bg-[var(--background)] text-[var(--hero-heading)] text-center overflow-hidden pb-5 transition-colors duration-300">
     
      <motion.div
        className="absolute rounded-full blur-[200px] pointer-events-none"
        style={{
          width: "1288px",
          height: "971px",
          top: "-300px",
          left: "50%",
          transform: "translateX(-50%)",
          background:
            theme === "dark"
              ? "radial-gradient(50% 50% at 50% 50%, #96EA63 0%, rgba(0, 0, 0, 0) 100%)"
              : "radial-gradient(50% 50% at 50% 50%, #96EA63 0%, #FFFFFF 100%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: theme === "dark" ? 0.35 : 0.4 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      <motion.div
        className="absolute rounded-full blur-[150px] pointer-events-none"
        style={{
          width: "900px",
          height: "700px",
          top: "-150px",
          left: "50%",
          transform: "translateX(-50%)",
          background:
            theme === "dark"
              ? "radial-gradient(60% 60% at 50% 50%, rgba(150, 234, 99, 0.2) 0%, rgba(150, 234, 99, 0.05) 50%, rgba(0,0,0,0) 100%)"
              : "radial-gradient(60% 60% at 50% 50%, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0.05) 50%, rgba(255,255,255,0) 100%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: theme === "dark" ? 0.25 : 0.15 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
      />

      <div className="z-10 flex flex-col items-center mt-24">
        <motion.h1
          className="text-5xl sm:text-6xl md:text-8xl font-extrabold leading-tight text-[var(--hero-heading)]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Build the Future
          <br />
          <span className="text-[var(--hero-heading)]">with Web3</span>
        </motion.h1>

        <motion.p
          className="text-[var(--hero-subheading)] mt-6 text-base sm:text-lg md:text-xl max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Discover how we can help you connect with the next generation of the
          internet.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4 mt-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={onLoginClick}
            className="bg-[var(--accent-color)] text-black font-medium px-6 py-3 rounded-lg hover:opacity-90 transition-all flex items-center gap-2"
          >
            Sign up <span>→</span>
          </motion.button>
          <motion.button
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255,255,255,0.05)",
            }}
            whileTap={{ scale: 0.97 }}
            className="border border-[var(--navbar-border)] text-[var(--hero-heading)] px-6 py-3 rounded-lg hover:bg-[var(--navbar-border)] transition-all"
          >
            Contact sales
          </motion.button>
        </motion.div>
      </div>

      <div className="relative z-10 mt-20 flex flex-col items-center justify-center w-full px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-12 max-w-6xl">
          {perks.map((perk, i) => (
            <PerkCard key={i} perk={perk} index={i} />
          ))}
        </div>
      </div>

      <motion.div
        className="mt-24 flex flex-col justify-center items-center gap-8 px-6 w-full max-w-[1246px]"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-[var(--hero-heading)] font-[Manrope] text-center"
          style={{
            width: "244px",
            height: "26px",
            fontWeight: 700,
            fontSize: "17.86px",
            lineHeight: "25.2px",
            opacity: 1,
            transform: "rotate(0deg)",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Trusted by the world leaders
        </motion.h2>

        <motion.div
          className="flex flex-nowrap justify-between items-center gap-10 w-full max-w-[1200px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {companyLogos.map((logo, i) => (
            <motion.img
              key={i}
              src={logo.src}
              alt={`Company ${i + 1}`}
              className="w-[150px] sm:w-[155px] md:w-[160px] opacity-80 hover:opacity-100 transition-opacity duration-300"
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.9 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default memo(Hero);

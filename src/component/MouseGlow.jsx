"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { useTheme } from "@/context/ThemeContext";

const MouseGlow = () => {
  const { theme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const glowConfig = useMemo(() => {
    return theme === "dark"
      ? {
          color: "#96EA63",
          size: 400,
          opacity: 0.4,
          blur: 100,
        }
      : {
          color: "#6366F1",
          size: 350,
          opacity: 0.35,
          blur: 90,
        };
  }, [theme]);

  useEffect(() => {
    let animationFrameId;

    const handleMouseMove = (e) => {
      animationFrameId = requestAnimationFrame(() => {
        setMousePosition({
          x: e.clientX,
          y: e.clientY,
        });
        setIsVisible(true);
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      cancelAnimationFrame(animationFrameId);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{
        zIndex: 1,
      }}
    >
      <motion.div
        className="absolute rounded-full"
        style={{
          width: glowConfig.size,
          height: glowConfig.size,
          background: `radial-gradient(circle, ${glowConfig.color}cc 0%, ${glowConfig.color}66 40%, ${glowConfig.color}00 70%)`,
          filter: `blur(${glowConfig.blur}px)`,
          mixBlendMode: "screen",
          willChange: "transform",
          pointerEvents: "none",
        }}
        animate={{
          left: mousePosition.x - glowConfig.size / 2,
          top: mousePosition.y - glowConfig.size / 2,
          opacity: isVisible ? glowConfig.opacity : 0,
        }}
        transition={{
          default: {
            type: "spring",
            stiffness: 300,
            damping: 35,
            mass: 0.5,
          },
          opacity: {
            duration: 0.2,
            ease: "easeOut",
          },
        }}
      />
    </motion.div>
  );
};

export default MouseGlow;

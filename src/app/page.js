"use client";

import { useState } from "react";
import Pricing from "@/component/Pricing";
import Hero from "@/component/Hero";
import Navbar from "@/component/navbar";
import CtaSection from "@/component/CtaSection";
import Features from "@/component/Features";
import Contact from "@/component/Contact";
import Footer from "@/component/Footer";
import AuthModal from "@/component/AuthModal";
import ForgotPasswordModal from "@/component/ForgotPasswordModal";
import WelcomeHint from "@/component/WelcomeHint";

export default function Home() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const handleOpenAuth = (mode = "login") => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleForgotPassword = () => {
    setIsAuthOpen(false);
    setIsForgotPasswordOpen(true);
  };

  const handleCloseAuth = () => {
    setIsAuthOpen(false);
  };

  const handleCloseForgotPassword = () => {
    setIsForgotPasswordOpen(false);
  };

  return (
    <>
      <Navbar />
      <main className="pt-[71px]">
        <Hero onLoginClick={() => handleOpenAuth("signup")} />
        <WelcomeHint onLoginClick={() => handleOpenAuth("login")} />
        <Pricing />
        <CtaSection />
        <Features />
        <Contact />
        <Footer />
      </main>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={handleCloseAuth}
        mode={authMode}
        onForgotPassword={handleForgotPassword}
      />

      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={handleCloseForgotPassword}
      />
    </>
  );
}

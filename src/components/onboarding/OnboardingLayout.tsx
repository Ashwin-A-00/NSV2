import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { FlickeringGrid } from "../ui/flickering-grid-hero";

type OnboardingLayoutProps = {
  children: React.ReactNode;
  maxWidth?: string;
  onBack?: () => void;
  showBackButton?: boolean;
  wideMask?: boolean;
};

const GRID_CONFIG = {
  color: "#FFFFFF",
  maxOpacity: 0.3,
  flickerChance: 0.15,
  squareSize: 4,
  gridGap: 6,
} as const;

export const OnboardingLayout = ({
  children,
  maxWidth = "max-w-md",
  onBack,
  showBackButton = true,
  wideMask = false,
}: OnboardingLayoutProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-8 bg-black overflow-hidden">
      {/* Shared Flickering Grid Background */}
      <div className="absolute inset-0 z-0">
        <FlickeringGrid
          className="absolute inset-0 opacity-40"
          {...GRID_CONFIG}
        />
        {/* Inverted Radial Overlay: Dark in center (hides dots), Transparent at edges (shows dots) */}
        {/* If wideMask is true, we push the transparent part further out (from 45% to 65%) to clear wider cards */}
        <div 
          className={`absolute inset-0 pointer-events-none transition-all duration-700 ${
            wideMask 
              ? "bg-[radial-gradient(circle_at_center,black_65%,transparent_100%)]" 
              : "bg-[radial-gradient(circle_at_center,black_45%,transparent_95%)]"
          }`} 
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={maxWidth}
          initial={{ opacity: 0, filter: "blur(20px)", y: 20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          exit={{ opacity: 0, filter: "blur(20px)", y: -20 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className={`relative z-10 w-full ${maxWidth} drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]`}
        >
          {showBackButton && onBack && (
            <button
              className="mb-6 inline-flex items-center px-3 py-1.5 text-xs text-white/60 border border-white/15 rounded-full bg-white/5 backdrop-blur-md hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 active:scale-95 shadow-lg"
              onClick={onBack}
            >
              ← Back
            </button>
          )}

          {children}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

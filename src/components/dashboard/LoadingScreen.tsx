import { motion } from "motion/react";

type LoadingScreenProps = {
  title?: string;
  subtitle?: string;
  highlight?: string;
};

/**
 * Premium pulsing orbit loader with animated rings and floating particles.
 * Used across all dashboard loading states.
 */
export const LoadingScreen = ({
  title = "Loading...",
  subtitle,
  highlight,
}: LoadingScreenProps) => {
  return (
    <section className="relative min-h-screen bg-black text-white flex items-center justify-center px-4 overflow-hidden">
      {/* Ambient radial glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(167,45,37,0.07),transparent_60%)] pointer-events-none" />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-accent/40"
          style={{
            top: `${20 + Math.sin(i * 1.2) * 30 + i * 8}%`,
            left: `${15 + Math.cos(i * 0.9) * 25 + i * 12}%`,
          }}
          animate={{
            y: [-8, 8, -8],
            opacity: [0.2, 0.6, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3 + i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.35,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center text-center"
      >
        {/* Orbit Spinner */}
        <div className="relative w-24 h-24 mb-10">
          {/* Outer ring – slow */}
          <motion.div
            className="absolute inset-0 rounded-full border border-white/8"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white/20" />
          </motion.div>

          {/* Middle ring – medium */}
          <motion.div
            className="absolute inset-3 rounded-full border border-accent/20"
            animate={{ rotate: -360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent/60" />
          </motion.div>

          {/* Inner ring – fast */}
          <motion.div
            className="absolute inset-6 rounded-full border border-accent/40"
            animate={{ rotate: 360 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
          </motion.div>

          {/* Center pulse dot */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-3 h-3 rounded-full bg-accent shadow-[0_0_12px_rgba(167,45,37,0.8)]" />
          </motion.div>
        </div>

        {/* Text */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-lg md:text-xl font-light tracking-tight text-white/80 mb-2"
        >
          {title}
        </motion.h2>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="text-sm text-white/35 max-w-xs leading-relaxed"
          >
            {subtitle}{" "}
            {highlight && (
              <span className="text-accent/70 italic">{highlight}</span>
            )}
          </motion.p>
        )}

        {/* Animated dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-1.5 mt-6"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-1 h-1 rounded-full bg-accent/50"
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

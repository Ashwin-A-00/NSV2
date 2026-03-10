import { motion } from "motion/react";
import { BlurText } from "./UI";

type HeroProps = {
  onStartJourney?: () => void;
};

export const Hero = ({ onStartJourney }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-end p-6 md:p-10 overflow-hidden">
      {/* Background Image with Parallax-like effect */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <img
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop"
          alt="City aerial view"
          className="w-full h-full object-cover opacity-40 grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      <div className="relative z-10 max-w-7xl">
        <BlurText>
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-light leading-[0.85] tracking-tighter mb-12">
            NextStep <br />
            <span className="font-normal italic text-accent">Career</span> Guidance
          </h1>
        </BlurText>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-6">
            <BlurText delay={0.2}>
              <p className="text-sm md:text-base max-w-md text-white/80 leading-relaxed">
                You don't need another course recommendation or a feel-good career quiz. You need to know exactly what you're missing, exactly why it matters, and exactly what to do next. That's all NextStep does. Nothing more. Nothing less.
              </p>
            </BlurText>
          </div>

          <div className="md:col-span-6 flex justify-end">
            <motion.div
              whileHover={{ scale: 0.95, y: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={onStartJourney}
              className="w-32 h-32 md:w-48 md:h-48 bg-white/10 backdrop-blur-xl border border-white/30 rounded-3xl flex items-center justify-center cursor-pointer group p-6 shadow-2xl hover:border-accent/50 transition-all duration-300"
            >
              <img 
                src="/logons.png" 
                alt="Start Journey" 
                className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-all duration-300"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

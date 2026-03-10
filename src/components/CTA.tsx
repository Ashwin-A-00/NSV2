import { motion } from "motion/react";
import { BlurText } from "./UI";
import { ShinyButton } from "./ui/shiny-button";

export const CTA = ({ onStartJourney }: { onStartJourney?: () => void }) => {
  return (
    <section id="start-journey" className="p-6 md:p-10 bg-black py-32 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <BlurText>
          <h2 className="text-5xl md:text-8xl font-light tracking-tighter mb-8">
            Ready to <span className="italic font-normal text-accent">begin?</span>
          </h2>
        </BlurText>
        
        <BlurText delay={0.2}>
          <p className="text-sm md:text-base text-white/60 max-w-lg mb-12 leading-relaxed">
            Take the first step towards redefining your professional trajectory. Let's build a path that aligns with your true potential.
          </p>
        </BlurText>
 
        <BlurText delay={0.4}>
          <ShinyButton 
            onClick={onStartJourney}
            className="uppercase tracking-widest text-xs"
          >
            Start your journey now
          </ShinyButton>
        </BlurText>
      </div>
    </section>
  );
};

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { BlurText } from "./UI";
import { FloatingPaths } from "./ui/background-paths";

export const Mission = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate transforms for each card
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.3, 0.35], [0, 1, 1, 1]);
  const y1 = useTransform(scrollYProgress, [0, 0.1, 0.3], [40, 0, 0]);

  const opacity2 = useTransform(scrollYProgress, [0.33, 0.43, 0.6, 0.65], [0, 1, 1, 1]);
  const y2 = useTransform(scrollYProgress, [0.33, 0.43, 0.6], [40, 0, 0]);

  const opacity3 = useTransform(scrollYProgress, [0.66, 0.76, 0.95, 1], [0, 1, 1, 1]);
  const y3 = useTransform(scrollYProgress, [0.66, 0.76, 0.95], [40, 0, 0]);

  return (
    <section 
      ref={containerRef} 
      id="ourmission" 
      className="relative bg-black border-t border-white/5 h-[400vh]"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div className="absolute inset-0 z-0">
          <FloatingPaths position={1} />
          <FloatingPaths position={-1} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full">
          <div className="mb-16 md:mb-24 text-center md:text-left">
            <BlurText>
              <h2 className="text-4xl md:text-6xl font-light leading-tight tracking-tighter mb-6 relative inline-block">
                How It <span className="text-red-500 italic font-normal">Works</span>
                <span className="absolute -top-6 -right-8 text-accent/40 text-sm font-mono tracking-widest hidden md:block">
                  SYSTEM
                </span>
              </h2>
              <p className="text-white/40 text-lg md:text-xl max-w-2xl leading-relaxed">
                Three precise steps to redefine your trajectory.<br />
                No fluff, just data-driven direction.
              </p>
            </BlurText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
            {/* Subtle connecting line for desktop */}
            <div className="hidden md:block absolute top-8 left-0 w-full h-px bg-gradient-to-r from-white/0 via-white/10 to-white/0 -z-10" />

            {/* Step 1 */}
            <motion.div
              style={{ opacity: opacity1, y: y1 }}
              className="group relative p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl transition-all duration-500 h-full hover:bg-white/10 hover:border-white/20"
            >
              <div className="text-4xl font-light text-red-500 mb-6 font-mono group-hover:text-red-400 transition-colors duration-500">
                01
              </div>
              <h3 className="text-xl md:text-2xl font-medium text-white mb-4 tracking-tight">
                Skill Assessment
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Take our comprehensive AI-driven assessment to precisely identify your core strengths and hidden talents.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              style={{ opacity: opacity2, y: y2 }}
              className="group relative p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl transition-all duration-500 h-full hover:bg-white/10 hover:border-white/20"
            >
              <div className="text-4xl font-light text-red-500 mb-6 font-mono group-hover:text-red-400 transition-colors duration-500">
                02
              </div>
              <h3 className="text-xl md:text-2xl font-medium text-white mb-4 tracking-tight">
                Path Discovery
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Explore curated career paths actively aligned with your profile, current market demand, and future tech growth.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              style={{ opacity: opacity3, y: y3 }}
              className="group relative p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl transition-all duration-500 h-full hover:bg-white/10 hover:border-white/20"
            >
              <div className="text-4xl font-light text-red-500 mb-6 font-mono group-hover:text-red-400 transition-colors duration-500">
                03
              </div>
              <h3 className="text-xl md:text-2xl font-medium text-white mb-4 tracking-tight">
                Growth Roadmap
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Get an actionable, step-by-step roadmap to bridge your specific skill gaps and land your target role.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

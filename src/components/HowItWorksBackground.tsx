import { ShadowOverlay } from "./ui/etheral-shadow";
import { BlurText } from "./UI";

export function HowItWorksBackground() {
  return (
    <section id="how-it-works" className="relative w-full min-h-screen flex items-center bg-black overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 opacity-40">
        <ShadowOverlay
          color="rgba(128, 128, 128, 1)"
          animation={{ scale: 100, speed: 60 }}
          noise={{ opacity: 0.5, scale: 1.2 }}
          sizing="fill"
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full text-left">
        <BlurText>
          <h2 className="text-4xl md:text-6xl font-light leading-tight mb-6 tracking-tighter">
            Get Hired. <span className="text-red-500 italic font-normal">Not Inspired.</span>
          </h2>
          <p className="text-white/40 text-lg md:text-xl max-w-3xl leading-relaxed">
            The internet will give you a thousand reasons to feel motivated. NextStep gives you something worth more — the exact skills standing between you and your dream role, ranked by what hiring managers are actually looking for right now.
          </p>
        </BlurText>
      </div>
    </section>
  );
}

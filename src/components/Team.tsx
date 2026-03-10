import { motion } from "motion/react";
import { BlurText, LinkSlide } from "./UI";

const team = [
  {
    name: "Adarsh Subhash",
    role: "Ideation Lead",
    bio: "Adarsh specializes in transforming abstract concepts into structured and innovative solutions. He drives the creative direction of the project by identifying impactful ideas, refining problem statements, and shaping the overall vision of the product.",
    image: "/Adarsh.jpeg"
  },
  {
    name: "Karthik L",
    role: "Feature Development Engineer",
    bio: "Karthik focuses on translating concepts into functional product capabilities. He works on implementing new features, ensuring they integrate smoothly with existing systems while maintaining performance, reliability, and scalability..",
    image: "/Karthik.jpeg"
  },
  {
    name: "Ashwin A",
    role: "UI/UX Designer",
    bio: "Ashwin crafts intuitive and visually engaging user experiences that transform complex ideas into seamless digital interactions. His focus lies in creating clean, user-centered designs that enhance usability while maintaining aesthetic precision.",
    image: "/Ashwin.jpeg"
  },
  {
    name: "Adwaith K S",
    role: "AI Implementation Engineer",
    bio: "Adwaith integrates intelligent systems into the product by designing and implementing AI-driven functionalities. His work focuses on leveraging machine learning and automation to enhance the platform’s capabilities and deliver smarter user experiences.",
    image: "/Adwaith.jpeg"
  }
];

export const Team = () => {
  return (
    <section id="team" className="p-6 md:p-10 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="py-20 border-t border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20">
            <div className="md:col-span-6">
              <BlurText>
                <h2 className="text-5xl md:text-7xl font-light tracking-tighter">
                  A team <br />
                  <span className="text-red-500 italic">that reveals</span>
                </h2>
              </BlurText>
            </div>
            <div className="md:col-span-6">
              <BlurText delay={0.2}>
                <p className="text-sm md:text-base text-white/60 max-w-md leading-relaxed">
                  We are a company of mentors and aesthetes. People for whom form, silence and attention to detail are more important than loud words.
                </p>
              </BlurText>
            </div>
          </div>

          <div className="space-y-1">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                className="group border-b border-white/10 py-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center cursor-pointer relative overflow-hidden"
                whileHover="hover"
                initial="initial"
              >
                {/* White background block that slides up from bottom */}
                <motion.div
                  className="absolute inset-0 bg-white z-0"
                  variants={{
                    initial: { y: "100%" },
                    hover: { y: 0 }
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />

                <motion.div
                  className="md:col-span-4 relative z-20 px-4"
                  variants={{
                    initial: { color: "#ffffff" },
                    hover: { color: "#000000" }
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="text-3xl md:text-5xl font-light">{member.name}</span>
                </motion.div>

                <motion.div
                  className="md:col-span-3 relative z-20 px-4"
                  variants={{
                    initial: { color: "rgba(255, 255, 255, 0.4)" },
                    hover: { color: "rgba(0, 0, 0, 0.6)" }
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="text-sm uppercase tracking-widest">{member.role}</span>
                </motion.div>

                <motion.div
                  className="md:col-span-5 relative z-20 px-4"
                  variants={{
                    initial: { color: "rgba(255, 255, 255, 0.6)" },
                    hover: { color: "rgba(0, 0, 0, 0.7)" }
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-sm max-w-sm">{member.bio}</p>
                </motion.div>

                {/* Floating Image on Hover */}
                <motion.div
                  variants={{
                    hover: { opacity: 1, scale: 1, y: 0 }
                  }}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  className="hidden lg:block absolute right-20 top-1/2 -translate-y-1/2 w-40 h-56 pointer-events-none z-20"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

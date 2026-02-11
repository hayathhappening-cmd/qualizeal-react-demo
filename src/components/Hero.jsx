import { motion } from "framer-motion";
import { FiArrowDown } from "react-icons/fi";
import HeroScene from "./HeroScene";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export default function Hero() {
  const handleScroll = () => {
    gsap.to(window, {
      scrollTo: { y: "#services", autoKill: false },
      duration: 1.2,
      ease: "power2.out",
    });
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#020617]">

      {/* ================= THREE.JS BACKGROUND ================= */}
      <HeroScene />

      {/* ================= READABILITY OVERLAY ================= */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none
                   bg-gradient-to-b
                   from-black/40 via-transparent to-black/60"
      />

      {/* ================= HERO CONTENT ================= */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-6
                   pt-40 pb-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex px-4 py-2 rounded-full
                     border border-white/10 bg-white/5
                     text-sm text-gray-300 mb-6"
        >
          AI-Powered Quality Engineering
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl
                     text-4xl md:text-6xl lg:text-7xl
                     font-extrabold leading-tight text-white"
        >
          Engineering Trust in{" "}
          <span className="text-[#00AEEF]">Digital Quality</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 max-w-xl
                     text-lg md:text-xl
                     text-gray-300"
        >
          AI-driven test automation, intelligent quality insights,
          and continuous assurance for modern enterprises.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex flex-wrap gap-6"
        >
          <button
            className="px-8 py-4 rounded-xl font-semibold text-black
                       bg-[#00AEEF]
                       hover:scale-105
                       hover:shadow-2xl hover:shadow-cyan-500/40
                       transition"
          >
            Schedule a Call
          </button>

          <button
            className="px-8 py-4 rounded-xl
                       border border-white/20 text-white
                       hover:bg-white/10 transition"
          >
            Explore Services
          </button>
        </motion.div>
      </div>

      {/* ================= SCROLL INDICATOR ================= */}
      <motion.button
        type="button"
        aria-label="Scroll to services"
        onClick={handleScroll}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        className="
          absolute bottom-8 left-1/2
          -translate-x-1/2 z-20
          flex flex-col items-center
          text-gray-400 text-xs
          cursor-pointer
          hover:text-white
          focus:outline-none
        "
      >
        <span className="mb-2">Scroll</span>
        <FiArrowDown size={18} />
      </motion.button>

    </section>
  );
}

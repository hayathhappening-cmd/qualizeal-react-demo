import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "QUALITY ENGINEERING",
    desc:
      "AI-powered quality engineering with intelligent automation, predictive insights, and continuous assurance.",
    slug: "/case-studies/quality-engineering",
    glow: "rgba(0,174,239,0.6)",
  },
  {
    title: "EMERGING TECH TESTING",
    desc:
      "Quality assurance for AI, Blockchain, IoT, and next-gen platforms at enterprise scale.",
    slug: "/case-studies/emerging-tech",
    glow: "rgba(168,85,247,0.6)",
  },
  {
    title: "ADVISORY & TRANSFORMATION",
    desc:
      "Strategic advisory to help enterprises modernize, transform, and scale with confidence.",
    slug: "/case-studies/advisory",
    glow: "rgba(16,185,129,0.6)",
  },
  {
    title: "DIGITAL ENGINEERING",
    desc:
      "Design and engineering of cloud-native, scalable, and high-performance digital systems.",
    slug: "/case-studies/digital-engineering",
    glow: "rgba(59,130,246,0.6)",
  },
];

export default function Services() {
  const sectionRef = useRef(null);
  const direction = useRef(1);
  const lastIndex = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  /* ============================
     GSAP SCROLL PIN + SNAP
  ============================ */
  useEffect(() => {
    const total = services.length;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${window.innerHeight * total}`,
      pin: true,
      scrub: 1.4,
      snap: {
        snapTo: 1 / (total - 1),
        duration: 0.5,
        ease: "power2.out",
      },
      onUpdate: (self) => {
        const index = Math.min(
          total - 1,
          Math.floor(self.progress * total)
        );

        direction.current = index > lastIndex.current ? 1 : -1;
        lastIndex.current = index;
        setActiveIndex(index);
      },
    });

    return () => {
      trigger.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  /* ============================
     MAGNETIC PARALLAX
  ============================ */
  useEffect(() => {
    const move = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 25,
        y: (e.clientY / window.innerHeight - 0.5) * 25,
      });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const handleClick = () => {
    console.log("Navigate later to:", services[activeIndex].slug);
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-[#020617] text-white overflow-hidden"
    >
      {/* ================= Background Glow Mesh ================= */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-1/3 -left-1/4 w-[700px] h-[700px] bg-cyan-500/10 blur-[180px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-sky-400/10 blur-[180px] rounded-full animate-pulse delay-1000" />
      </div>

      {/* ================= Animated Tech Grid ================= */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none animate-gridMove">
        <div className="w-full h-full bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 h-full grid lg:grid-cols-2 gap-24 items-center">

        {/* ================= LEFT CONTENT ================= */}
        <div className="space-y-10">
          <p className="uppercase tracking-widest text-sm text-cyan-400">
            What can we do for you
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Our <span className="text-cyan-400">Service</span>
            <br /> Offerings
          </h2>

          <p className="text-gray-300 max-w-md leading-relaxed">
            We help enterprises engineer trust, quality, and
            digital excellence through AI-driven innovation.
          </p>

          {/* ================= PREMIUM PROGRESS RAIL ================= */}
          <div className="relative h-40 w-[3px] bg-white/10 rounded-full mt-12">
            <motion.div
              className="absolute top-0 left-0 w-full bg-cyan-400 rounded-full"
              animate={{
                height: `${((activeIndex + 1) / services.length) * 100}%`,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* ================= RIGHT CARD ================= */}
        <div className="relative min-h-[520px] flex items-center">

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{
                opacity: 0,
                y: direction.current === 1 ? 120 : -120,
                rotateX: direction.current === 1 ? -15 : 15,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: mouse.y * 0.6,
                x: mouse.x * 0.6,
                rotateX: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: direction.current === 1 ? -120 : 120,
                rotateX: direction.current === 1 ? 15 : -15,
                scale: 0.98,
                filter: "blur(3px)",
              }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                transformPerspective: 1200,
                boxShadow: `0 80px 200px -60px ${services[activeIndex].glow}`,
              }}
              whileHover={{
                scale: 1.02,
              }}
              onClick={handleClick}
              className="
                cursor-pointer
                w-full p-16 rounded-3xl
                bg-gradient-to-br from-[#0B1224] to-[#020617]
                border border-white/10
                backdrop-blur-xl
                transition-all duration-500
              "
            >
              {/* ===== Service Counter ===== */}
              <motion.div
                key={`counter-${activeIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-cyan-400 text-sm mb-4 tracking-widest"
              >
                0{activeIndex + 1} / 0{services.length}
              </motion.div>

              <motion.h3
                animate={{
                  x: mouse.x * 0.2,
                  y: mouse.y * 0.2,
                }}
                transition={{ type: "spring", stiffness: 80 }}
                className="text-2xl font-semibold mb-6"
              >
                {services[activeIndex].title}
              </motion.h3>

              <p className="text-gray-300 leading-relaxed max-w-lg">
                {services[activeIndex].desc}
              </p>

              <div className="mt-12 text-cyan-400 font-semibold tracking-wide">
                View Case Study →
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>

      {/* ================= SCROLL HINT ================= */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-widest animate-pulse">
        Scroll to Explore ↓
      </div>
    </section>
  );
}

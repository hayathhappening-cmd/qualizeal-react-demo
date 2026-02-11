import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const solutions = [
  {
    name: "QualiCentral",
    tagline: "Unified AI Test Management",
    desc:
      "Centralized AI-driven platform to manage test planning, execution, governance, and reporting across enterprise QA ecosystems.",
    logo: "/QualiCentral-Logo.png",
    glow: "rgba(0,174,239,0.35)",
  },
  {
    name: "QMentisAI",
    tagline: "Predictive Quality Intelligence",
    desc:
      "AI-powered insights enabling risk-aware quality decisions, observability, and continuous optimization.",
    logo: "/qmentisai-logo-pill.webp",
    glow: "rgba(168,85,247,0.35)",
  },
  {
    name: "NexaAI",
    tagline: "Enterprise AI Engineering",
    desc:
      "Design, build, and scale secure, governed, enterprise-grade AI systems with performance at the core.",
    logo: "/Nexa-White-logo (1).png",
    glow: "rgba(16,185,129,0.35)",
  },
  {
    name: "QE for GenAI",
    tagline: "Quality Engineering for GenAI",
    desc:
      "Advanced testing for GenAI systems including LLM validation, bias detection, hallucination control, and compliance.",
    logo: "/Logo-01-02-1024x290.png",
    glow: "rgba(59,130,246,0.35)",
  },
];

export default function AISolutions() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  /* ============================
     Scroll Activation
  ============================ */
  useEffect(() => {
    const total = solutions.length;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${window.innerHeight * 3}`,
      scrub: true,
      pin: true,
      onUpdate: (self) => {
        const index = Math.min(
          total - 1,
          Math.floor(self.progress * total)
        );
        setActiveIndex(index);
      },
    });

    return () => trigger.kill();
  }, []);

  /* ============================
     Animate Cards on Active Change
  ============================ */
  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      if (i === activeIndex) {
        gsap.to(card, {
          y: 0,
          scale: 1,
          opacity: 1,
          zIndex: 100,
          duration: 0.6,
          ease: "power3.out",
        });
      } else {
        gsap.to(card, {
          y: 40 + i * 20,
          scale: 0.92,
          opacity: 0.5,
          zIndex: 10 - i,
          duration: 0.6,
          ease: "power3.out",
        });
      }
    });
  }, [activeIndex]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-[#020617] text-white overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
      <div className="absolute top-[50%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-cyan-500/10 blur-[240px] rounded-full" />

      {/* =========================
          HEADING
      ========================== */}
      <div className="relative z-30 pt-28 pb-16 text-center">
        <p className="uppercase tracking-[0.4em] text-sm text-cyan-400 mb-6">
          Enterprise AI Stack
        </p>

        <h2 className="text-5xl md:text-6xl font-semibold max-w-4xl mx-auto leading-tight">
          AI Solutions Designed for{" "}
          <span className="text-cyan-400">
            Trust, Scale & Precision
          </span>
        </h2>
      </div>

      {/* =========================
          CARD STACK
      ========================== */}
      <div className="relative flex justify-center mt-8">
        <div className="relative w-full max-w-[680px] h-[420px]">

          {solutions.map((s, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              onClick={() => setActiveIndex(i)}
              className={`
                absolute left-1/2 -translate-x-1/2
                w-[680px] h-[420px]
                rounded-[26px]
                px-12 py-10
                cursor-pointer
                backdrop-blur-xl
                border
                flex flex-col
                justify-between
                transition-all duration-500
                ${
                  i === activeIndex
                    ? "bg-white/10 border-cyan-400/40 shadow-[0_0_80px_rgba(0,174,239,0.5)]"
                    : "bg-white/5 border-white/10"
                }
              `}
            >
              {/* Logo */}
              <img
                src={s.logo}
                alt={s.name}
                className="h-12 object-contain"
              />

              <div>
                <h3 className="text-3xl font-semibold mb-3 text-white">
                  {s.name}
                </h3>

                <p className="text-cyan-300 mb-4">
                  {s.tagline}
                </p>

                <p className="text-gray-300 leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="text-sm text-cyan-400 tracking-wide">
                Explore Platform →
              </div>
            </div>
          ))}

          {/* Shadow */}
          <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 w-[420px] h-[70px] bg-black/40 blur-3xl rounded-full opacity-40 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(ScrollTrigger, Draggable);

const industries = [
  {
    title: "Healthcare & Life Sciences",
    desc: "AI-driven quality engineering for healthcare ecosystems.",
    icon: "🧬",
  },
  {
    title: "Travel & Hospitality",
    desc: "Seamless digital transformation across travel platforms.",
    icon: "✈️",
  },
  {
    title: "Hi-Tech ISVs",
    desc: "Scale next-gen platforms with predictive intelligence.",
    icon: "💻",
  },
  {
    title: "Telecom, Media & Entertainment",
    desc: "Resilient systems for connected ecosystems.",
    icon: "📡",
  },
  {
    title: "Consumer Goods",
    desc: "Optimize retail and supply chain ecosystems.",
    icon: "🛒",
  },
];

export default function IndustriesStack() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ===============================
         INITIAL STACK POSITION
      =============================== */
      cardsRef.current.forEach((card, i) => {
        gsap.set(card, {
          y: i * 20,
          scale: 1 - i * 0.02,
          zIndex: industries.length - i,
        });
      });

      /* ===============================
         SCROLL STACKING
      =============================== */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${industries.length * 500}`,
          scrub: 1,
          pin: true,
        },
      });

      cardsRef.current.forEach((card, i) => {
        if (i === 0) return;

        tl.to(
          card,
          {
            y: i * 100,
            ease: "power3.out",
          },
          i * 0.8
        );

        tl.to(
          cardsRef.current.slice(0, i),
          {
            y: `-=${30}`,
            scale: `-=${0.02}`,
            ease: "power2.out",
          },
          i * 0.8
        );
      });

      /* ===============================
         DRAG FUNCTIONALITY
      =============================== */
      cardsRef.current.forEach((card) => {
        Draggable.create(card, {
          type: "y",
          bounds: sectionRef.current,
          inertia: true,
          onPress() {
            gsap.to(card, {
              scale: 1.05,
              duration: 0.2,
            });
          },
          onRelease() {
            gsap.to(card, {
              y: gsap.getProperty(card, "y"),
              scale: 1,
              duration: 0.4,
              ease: "elastic.out(1, 0.4)",
            });
          },
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-[#050B14] text-white overflow-hidden"
    >
      {/* Heading */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 text-center z-30">
        <p className="uppercase tracking-[0.4em] text-sm text-cyan-400 mb-4">
          Industries We Serve
        </p>
        <h2 className="text-5xl font-semibold">
          For Their Specialized Needs
        </h2>
      </div>

      {/* Card Stack */}
      <div className="relative h-full flex items-center justify-center">
        <div className="relative w-full max-w-[900px] h-[500px]">

          {industries.map((item, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="
                absolute left-1/2 -translate-x-1/2
                w-[900px] h-[500px]
                rounded-[30px]
                bg-white/5
                backdrop-blur-xl
                border border-white/10
                shadow-[0_60px_140px_rgba(0,0,0,0.6)]
                flex
                cursor-grab
              "
            >
              {/* Icon Area */}
              <div className="w-[180px] bg-white/10 flex items-center justify-center text-6xl">
                {item.icon}
              </div>

              {/* Content */}
              <div className="flex-1 p-16 flex flex-col justify-center">
                <h3 className="text-3xl font-semibold mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-lg max-w-xl">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "QUALITY ENGINEERING",
    desc:
      "AI-powered quality engineering with intelligent automation, predictive insights, and continuous assurance.",
    glow: "#00AEEF",
  },
  {
    title: "EMERGING TECH TESTING",
    desc:
      "Quality assurance for AI, Blockchain, IoT, and next-gen platforms at enterprise scale.",
    glow: "#A855F7",
  },
  {
    title: "ADVISORY & TRANSFORMATION",
    desc:
      "Strategic advisory to help enterprises modernize, transform, and scale with confidence.",
    glow: "#10B981",
  },
  {
    title: "DIGITAL ENGINEERING",
    desc:
      "Design and engineering of cloud-native, scalable, and high-performance digital systems.",
    glow: "#3B82F6",
  },
];

export default function Services() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;

      const scrollLength = totalWidth - viewportWidth;

      // 🔥 Compress scroll distance (60% of full width)
      const compressedScroll = scrollLength * 0.6;

      gsap.to(track, {
        x: -scrollLength,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${compressedScroll}`,
          scrub: 2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-[#020617] text-white overflow-hidden"
    >
      <div
        ref={trackRef}
        className="flex items-center gap-16 h-full px-[8vw]"
        style={{ willChange: "transform" }}
      >
        {services.map((service, index) => (
          <div
            key={index}
            className="
              flex-shrink-0
              w-[600px]
              h-[420px]
              p-12
              rounded-3xl
              bg-gradient-to-br from-[#0B1224] to-[#020617]
              border border-white/10
              backdrop-blur-xl
              flex flex-col justify-between
            "
            style={{
              boxShadow: `0 80px 140px -50px ${service.glow}`,
            }}
          >
            <div>
              <div className="text-sm tracking-widest text-white/60 mb-4">
                0{index + 1} / 0{services.length}
              </div>

              <h3 className="text-2xl font-semibold mb-4">
                {service.title}
              </h3>

              <p className="text-white/70 text-sm leading-relaxed">
                {service.desc}
              </p>
            </div>

            <button className="mt-6 inline-flex items-center gap-2 font-semibold text-cyan-400 text-sm">
              View Case Study →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

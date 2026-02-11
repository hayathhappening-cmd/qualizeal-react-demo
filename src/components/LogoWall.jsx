import { useEffect, useRef } from "react";
import gsap from "gsap";

const logos = [
  "/logos/Clients 3.png",
  "/logos/Clients 6.png",
  "/logos/Clients  5.png",
  "/logos/Clients 1.png",
  
];

export default function LogoWall() {
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  useEffect(() => {
    const animateRow = (row, duration, reverse = false) => {
      const width = row.scrollWidth / 2;

      gsap.to(row, {
        x: reverse ? `+=${width}` : `-=${width}`,
        duration,
        ease: "none",
        repeat: -1,
      });
    };

    animateRow(row1Ref.current, 35, false);
    animateRow(row2Ref.current, 45, true);
  }, []);

  return (
    <section className="relative py-40 bg-[#050B14] overflow-hidden">

      {/* ===== Heading ===== */}
      <div className="text-center mb-24">
        <p className="uppercase tracking-[0.4em] text-sm text-cyan-400 mb-4">
          Trusted By
        </p>
        <h2 className="text-5xl md:text-6xl font-semibold text-white">
          Global Enterprises & Innovators
        </h2>
      </div>

      {/* ===== Fade Edges ===== */}
      <div className="absolute left-0 top-0 h-full w-48 bg-gradient-to-r from-[#050B14] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-48 bg-gradient-to-l from-[#050B14] to-transparent z-10 pointer-events-none" />

      <div className="space-y-20">

        {/* ===== Row 1 ===== */}
        <div className="overflow-hidden">
          <div
            ref={row1Ref}
            className="flex items-center gap-40 w-max"
          >
            {[...logos, ...logos].map((logo, i) => (
              <div
                key={`row1-${i}`}
                className="flex items-center justify-center hover:scale-110 transition-transform duration-500"
              >
                <img
                  src={logo}
                  alt="client"
                  className="
                    h-20 md:h-24
                    w-auto
                    object-contain
                    opacity-60
                    hover:opacity-100
                    grayscale
                    hover:grayscale-0
                    transition-all duration-500
                  "
                />
              </div>
            ))}
          </div>
        </div>

        {/* ===== Row 2 (Reverse) ===== */}
        <div className="overflow-hidden">
          <div
            ref={row2Ref}
            className="flex items-center gap-40 w-max"
          >
            {[...logos.reverse(), ...logos.reverse()].map((logo, i) => (
              <div
                key={`row2-${i}`}
                className="flex items-center justify-center hover:scale-110 transition-transform duration-500"
              >
                <img
                  src={logo}
                  alt="client"
                  className="
                    h-20 md:h-24
                    w-auto
                    object-contain
                    opacity-60
                    hover:opacity-100
                    grayscale
                    hover:grayscale-0
                    transition-all duration-500
                  "
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

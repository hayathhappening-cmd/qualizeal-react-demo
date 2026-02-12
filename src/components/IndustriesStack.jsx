import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(Draggable);

const industriesData = [
  {
    title: "Healthcare & Medical",
    desc: "Healthcare and Medical companies are breathing life into the world and economies. Software is key to exponential growth.",
    image: "/Industries/Health.webp",
  },
  {
    title: "Travel & Hospitality",
    desc: "Overcome the challenges faced by the Travel & Hospitality Industry through innovation, new technologies, and systems.",
    image: "/Industries/Travel.jpg",
  },
  {
    title: "Hi-Tech ISVs",
    desc: "Rapid innovation in the Hi-Tech industry has spurred Independent Software Vendors (ISVs) to develop products at scale.",
    image: "/Industries/Hightech.jpg",
  },
  {
    title: "Telecom, Media, & Entertainment Sector",
    desc: "As the Telecom, Media, & Entertainment industry undergoes rapid transformations in the digital era, staying ahead of the curve is crucial for sustaining growth and customer satisfaction.",
    image: "/Industries/Telecom.png",
  },
  {
    title: "Consumer Goods",
    desc: "As the consumer goods industry navigates a landscape of evolving consumer preferences and market dynamics, QualiZeal stands as a partner in innovation, efficiency, and adaptability.",
    image: "/Industries/Consumer.png",
  },
];

export default function IndustriesStack() {
  const [cards, setCards] = useState(industriesData);
  const cardRefs = useRef([]);
  const dragInstance = useRef(null);

  /* ================= STACK POSITION ================= */
  useEffect(() => {
    cardRefs.current.forEach((card, index) => {
      gsap.set(card, {
        y: index * 15,
        scale: 1 - index * 0.05,
        zIndex: cards.length - index,
        x: 0,
        rotate: 0,
        opacity: 1,
      });
    });
  }, [cards]);

  /* ================= MOVE TO BACK ================= */
  const moveToBack = () => {
    const updated = [...cards];
    const first = updated.shift();
    updated.push(first);
    setCards(updated);
  };

  /* ================= MOVE TO FRONT ================= */
  const moveToFront = () => {
    const updated = [...cards];
    const last = updated.pop();
    updated.unshift(last);
    setCards(updated);
  };

  /* ================= DRAG ================= */
  useEffect(() => {
    if (dragInstance.current) {
      dragInstance.current.kill();
      dragInstance.current = null;
    }

    const topCard = cardRefs.current[0];
    if (!topCard) return;

    dragInstance.current = Draggable.create(topCard, {
      type: "x",
      inertia: true,
      onPress() {
        gsap.to(topCard, { scale: 1.05, duration: 0.2 });
      },
      onDrag() {
        gsap.to(topCard, {
          rotate: this.x / 15,
          duration: 0.1,
        });
      },
      onRelease() {
        if (Math.abs(this.x) > 120) {
          gsap.to(topCard, {
            x: this.x > 0 ? 800 : -800,
            opacity: 0,
            duration: 0.4,
            ease: "power3.out",
            onComplete: moveToBack,
          });
        } else {
          gsap.to(topCard, {
            x: 0,
            rotate: 0,
            scale: 1,
            duration: 0.5,
            ease: "elastic.out(1, 0.6)",
          });
        }
      },
    })[0];
  }, [cards]);

  return (
    <section className="relative py-32 bg-[#050B14] text-white overflow-hidden select-none">

      {/* Heading */}
      <div className="text-center mb-16 px-6">
        <p className="uppercase tracking-[0.4em] text-xs text-cyan-400 mb-4">
          Industries We Serve
        </p>
        <h2 className="text-4xl md:text-5xl font-semibold">
          Interactive Industry Deck
        </h2>
      </div>

      {/* Card Stack */}
      <div className="relative flex justify-center items-center h-[500px]">

        {cards.map((item, index) => (
          <div
            key={item.title}
            ref={(el) => (cardRefs.current[index] = el)}
            className="
              absolute
              w-[90vw] md:w-[700px]
              h-[420px] md:h-[500px]
              rounded-3xl
              overflow-hidden
              shadow-[0_50px_140px_rgba(0,0,0,0.7)]
              cursor-grab active:cursor-grabbing
              select-none
            "
          >
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              draggable="false"
            />

            <div className="absolute inset-0 bg-black/60" />

            <div className="relative h-full flex flex-col justify-end p-10">
              <h3 className="text-3xl font-semibold mb-4">
                {item.title}
              </h3>

              <p className="text-gray-300 mb-6">
                {item.desc}
              </p>

              <button className="w-fit px-6 py-2 bg-cyan-500 rounded-full hover:bg-cyan-400 transition">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="flex justify-center gap-10 mt-12">
        <button
          onClick={moveToFront}
          className="p-4 rounded-full border border-white/20 hover:bg-white/10 transition"
        >
          <ChevronLeft size={28} />
        </button>

        <button
          onClick={moveToBack}
          className="p-4 rounded-full border border-white/20 hover:bg-white/10 transition"
        >
          <ChevronRight size={28} />
        </button>
      </div>

    </section>
  );
}

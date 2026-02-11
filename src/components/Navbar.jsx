import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/qualizeal.png";
import ScheduleCallModal from "./ScheduleCallModal";

const BRAND = "#00AEEF";

const NAV_ITEMS = [
  "Services",
  "Industries",
  "AI & Quality",
  "Products",
  "Resources",
  "Company",
];

export default function Navbar() {
  const [active, setActive] = useState(null);
  const [locked, setLocked] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileActive, setMobileActive] = useState(null);
  const [openCall, setOpenCall] = useState(false);

  // Close desktop mega menu on outside click
  useEffect(() => {
    const handleClick = () => {
      setActive(null);
      setLocked(false);
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      {/* ================= HEADER ================= */}
      <header
        className="fixed top-0 left-0 w-full z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="backdrop-blur-xl bg-black/70 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

            {/* LOGO */}
            <img
              src={logo}
              alt="Qualizeal"
              className="h-8 w-auto cursor-pointer"
            />

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-10 text-sm font-medium text-gray-300">
              {NAV_ITEMS.map((item) => (
                <NavItem
                  key={item}
                  label={item}
                  active={active}
                  setActive={setActive}
                  setLocked={setLocked}
                  locked={locked}
                />
              ))}
            </nav>

            {/* DESKTOP CTA */}
            <button
              onClick={() => setOpenCall(true)}
              className="hidden lg:inline-flex px-6 py-2 rounded-md font-semibold text-black
                         hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30 transition"
              style={{ backgroundColor: BRAND }}
            >
              Schedule a Call
            </button>

            {/* MOBILE TOGGLE */}
            <button
              className="lg:hidden text-white"
              onClick={() => setMobileOpen(true)}
            >
              ☰
            </button>
          </div>
        </div>

        {/* ================= DESKTOP MEGA MENUS ================= */}
        <AnimatePresence>
          {active && (
            <MegaMenuWrapper
              active={active}
              locked={locked}
              onClose={() => !locked && setActive(null)}
            />
          )}
        </AnimatePresence>
      </header>

      {/* ================= MOBILE DRAWER ================= */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="absolute right-0 top-0 h-full w-[85%] max-w-sm
                         bg-[#050B14] border-l border-white/10 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* CLOSE */}
              <button
                className="text-gray-400 mb-6"
                onClick={() => setMobileOpen(false)}
              >
                ✕ Close
              </button>

              {/* MOBILE MENU */}
              <div className="space-y-4">
                {NAV_ITEMS.map((item) => (
                  <div key={item}>
                    <button
                      onClick={() =>
                        setMobileActive(mobileActive === item ? null : item)
                      }
                      className="w-full text-left text-white font-medium flex justify-between items-center"
                    >
                      {item}
                      <span>{mobileActive === item ? "−" : "+"}</span>
                    </button>

                    <AnimatePresence>
                      {mobileActive === item && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-3 ml-4 space-y-2 text-sm text-gray-400"
                        >
                          <div>Overview</div>
                          <div>Capabilities</div>
                          <div>Solutions</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* MOBILE CTA */}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setOpenCall(true);
                }}
                className="mt-10 w-full py-3 rounded-md font-semibold text-black"
                style={{ backgroundColor: BRAND }}
              >
                Schedule a Call
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= SCHEDULE CALL MODAL ================= */}
      <ScheduleCallModal
        open={openCall}
        onClose={() => setOpenCall(false)}
      />
    </>
  );
}

/* ================= NAV ITEM (DESKTOP) ================= */
function NavItem({ label, active, setActive, setLocked, locked }) {
  const isActive = active === label;

  return (
    <span
      onMouseEnter={() => !locked && setActive(label)}
      onClick={() => {
        setActive(label);
        setLocked(true);
      }}
      className={`cursor-pointer relative ${isActive ? "text-white" : ""}`}
    >
      {label}
      <span
        className={`absolute left-0 -bottom-1 h-[2px] bg-[#00AEEF] transition-all duration-300
          ${isActive ? "w-full" : "w-0"}
        `}
      />
    </span>
  );
}

/* ================= MEGA MENU WRAPPER ================= */
function MegaMenuWrapper({ active, onClose, locked }) {
  const contentMap = {
    Services: {
      title: "Quality Engineering Services",
      description:
        "End-to-end software quality, automation, and AI-powered testing services.",
      items: [
        "Software Testing Services",
        "Test Automation",
        "Performance Testing",
        "Security Testing",
        "AI-ML Model Testing",
        "Digital Assurance & QE",
      ],
    },
    Industries: {
      title: "Industry Expertise",
      description:
        "Quality solutions tailored for regulated and digital-first industries.",
      items: [
        "Banking & Financial Services",
        "Healthcare & Life Sciences",
        "Retail & E-commerce",
        "Telecom",
        "Manufacturing",
        "SaaS & Technology",
      ],
    },
    "AI & Quality": {
      title: "AI & Quality Innovation",
      description:
        "Intelligent QA powered by analytics, AI, and continuous monitoring.",
      items: [
        "AI-Driven Test Automation",
        "Predictive Quality Analytics",
        "Cognitive Testing",
        "Continuous AI Monitoring",
      ],
    },
    Products: {
      title: "Platforms & Accelerators",
      description:
        "Proprietary platforms built to accelerate quality transformation.",
      items: ["QMentisAI", "QualiCentral", "Automation Accelerators"],
    },
    Resources: {
      title: "Insights & Knowledge",
      description:
        "Thought leadership, case studies, and deep technical insights.",
      items: ["Blogs & Insights", "Case Studies", "Whitepapers", "Webinars"],
    },
    Company: {
      title: "About Qualizeal",
      description: "Who we are, what we believe in, and how we grow.",
      items: ["About Us", "Leadership", "Careers", "Partners", "Contact"],
    },
  };

  const data = contentMap[active];

  return (
    <MegaMenu
      title={data.title}
      description={data.description}
      items={data.items}
      locked={locked}
      onClose={onClose}
    />
  );
}

/* ================= MEGA MENU ================= */
function MegaMenu({ title, description, items, onClose, locked }) {
  return (
    <motion.div
      onMouseLeave={() => !locked && onClose()}
      onClick={(e) => e.stopPropagation()}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.3 }}
      className="absolute top-full left-0 w-full"
    >
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <div className="rounded-2xl bg-[#050B14]/95 backdrop-blur-xl
                        border border-white/10 shadow-2xl shadow-cyan-500/10
                        p-10 grid grid-cols-3 gap-10">
          <div>
            <h3 className="text-white text-xl font-semibold">{title}</h3>
            <p className="text-gray-400 text-sm mt-3">{description}</p>
          </div>

          <div className="col-span-2 grid grid-cols-2 gap-6">
            {items.map((item) => (
              <div
                key={item}
                className="p-5 rounded-xl bg-white/5 hover:bg-white/10
                           cursor-pointer transition"
              >
                <div className="text-white font-medium hover:text-[#00AEEF]">
                  {item}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Enterprise-ready capability
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

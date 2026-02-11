export default function Footer() {
  return (
    <footer className="relative bg-[#050E22] text-white pt-36 pb-24 overflow-hidden">

      {/* ===== Ambient Glow Background ===== */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-cyan-500/10 blur-[180px] rounded-full" />
      </div>

      {/* ===== Animated Top Gradient Line ===== */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* ================= TOP GRID ================= */}
        <div className="grid lg:grid-cols-5 gap-24">

          {/* Brand */}
          <div className="space-y-10">
            <h2 className="text-5xl font-semibold leading-tight tracking-tight">
              Quality Is <br />
              Core<span className="text-cyan-400">.</span>
            </h2>

            <div>
              <p className="text-sm text-gray-400 mb-6 tracking-wide">
                Follow Us
              </p>

              <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm text-cyan-400">
                {["LinkedIn", "X", "Facebook", "Instagram", "YouTube"].map(
                  (item, i) => (
                    <span
                      key={i}
                      className="relative cursor-pointer group"
                    >
                      {item}
                      <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          <FooterColumn
            title="Services"
            items={[
              "Quality Engineering",
              "Emerging Tech Testing",
              "Advisory and Transformation",
              "Digital Engineering",
            ]}
          />

          <FooterColumn
            title="Industries"
            items={[
              "Banking & Financial",
              "Retail",
              "Utilities & Energy",
              "Healthcare & Life Sciences",
              "Travel & Hospitality",
              "Hi-Tech ISVs",
            ]}
          />

          <FooterColumn
            title="Insights"
            items={[
              "Blogs",
              "Case Studies",
              "Whitepapers",
              "Qualibytes",
              "Tech Bites",
            ]}
          />

          <div>
            <FooterColumn
              title="About Us"
              items={["Who We Are", "Partners"]}
            />

            <div className="mt-12">
              <h4 className="font-semibold mb-6 tracking-wide">
                Work With Us
              </h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li className="relative group cursor-pointer">
                  Careers
                  <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ================= LOCATIONS ================= */}
        <div className="mt-36 grid lg:grid-cols-3 gap-24 text-sm">

          {/* US */}
          <div>
            <h4 className="text-white font-semibold mb-8 tracking-wide">
              United States
            </h4>

            <div className="space-y-8 text-gray-400">
              <div>
                <p className="text-gray-300 font-medium mb-2">Texas:</p>
                <p>
                  9901 Valley Ranch Pkwy, Suite 2037, Irving, Texas 75063
                </p>
                <p className="mt-3">Phone: +1 469-816-4010</p>
              </div>

              <div>
                <p className="text-gray-300 font-medium mb-2">
                  Pennsylvania:
                </p>
                <p>
                  250 Sugartown Road, Suite 215, Wayne PA - 19087
                </p>
              </div>
            </div>
          </div>

          {/* India */}
          <div>
            <h4 className="text-white font-semibold mb-8 tracking-wide">
              India
            </h4>

            <div className="text-gray-400 space-y-4">
              <p>
                iLabs Centre, Block B, 2nd Floor, Software Unit Layout,
                Madhapur, Hyderabad, Telangana – 500081
              </p>
              <p>Phone: +91 7351414126</p>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h4 className="text-white font-semibold mb-8 tracking-wide">
              Certified By
            </h4>

            <div className="flex flex-wrap gap-5">
              {[
                "ISO 13485:2016",
                "ISO 9001:2015",
                "ISO/IEC 27001:2022",
                "SOC 2 Type II",
                "Great Place To Work",
                "ANAB Accredited",
              ].map((cert, index) => (
                <span
                  key={index}
                  className="
                    px-6 py-2
                    rounded-full
                    border border-white/10
                    text-xs
                    text-gray-300
                    backdrop-blur-sm
                    hover:border-cyan-400
                    hover:text-white
                    hover:shadow-[0_0_20px_rgba(0,255,255,0.2)]
                    transition-all duration-300
                  "
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ================= DIVIDER ================= */}
        <div className="mt-32 border-t border-white/10" />

        {/* ================= BOTTOM BAR ================= */}
        <div className="mt-10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-6">

          <p>© 2025 Qualizeal. All Rights Reserved.</p>

          <div className="flex gap-10">
            <span className="relative cursor-pointer group">
              Sitemap
              <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
            </span>

            <span className="relative cursor-pointer group">
              Privacy Policy
              <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
            </span>
          </div>
        </div>

        <div className="mt-10 text-xs text-gray-500 leading-relaxed max-w-6xl">
          Disclaimer: The contents of this website, such as text,
          graphics, images, case studies, and other material on the Site
          (“Content”), are for informational purposes only. You may not
          sell, modify, reproduce, copy, adapt, display, publicly
          perform, distribute, or otherwise use the Content in any way
          for any public or commercial purpose.
        </div>

      </div>
    </footer>
  );
}


function FooterColumn({ title, items }) {
  return (
    <div>
      <h4 className="font-semibold mb-8 tracking-wide">
        {title}
      </h4>

      <ul className="space-y-5 text-gray-400 text-sm">
        {items.map((item, index) => (
          <li key={index} className="relative group cursor-pointer">
            {item}
            <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
          </li>
        ))}
      </ul>
    </div>
  );
}

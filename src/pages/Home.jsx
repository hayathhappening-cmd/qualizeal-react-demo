import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import AISolutions from "../components/AISolutions";
import IndustriesStack from "../components/IndustriesStack"; // ✅ Added
import LogoWall from "../components/LogoWall";
import Footer from "../components/Footer";


export default function Home() {
  return (
    <main className="bg-[#050B14] text-white">
      <Navbar />
      <Hero />
      <Services />
      <AISolutions />
      <IndustriesStack />   {/* ✅ Now properly included */}
      <LogoWall />
      <Footer />
    </main>
  );
}

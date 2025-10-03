import HeroSection from "./HeroSection.js";
import FeaturesSection from "./FeaturesSection";
import StatsSection from "./StatsSection";
import ContactSection from "./ContactSection.js";
import Footer from "./Footer.js";
import { SidebarMenu } from "../../components/SidebarMenu";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex">
      <SidebarMenu />
      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden md:ml-64">
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}

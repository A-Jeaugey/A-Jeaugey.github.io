import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import LabSection from "@/components/LabSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import EcosystemSection from "@/components/EcosystemSection";
import FloatingOrbs from "@/components/FloatingOrbs";
import Marquee from "@/components/Marquee";
import SectionDivider from "@/components/SectionDivider";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <FloatingOrbs />
      <Navbar />
      <HeroSection />
      <Marquee />
      <EcosystemSection />
      <SectionDivider />
      <ProjectsSection />
      <SectionDivider />
      <LabSection />
      <SectionDivider />
      <AboutSection />
      <ContactSection />
    </div>
  );
};

export default Index;

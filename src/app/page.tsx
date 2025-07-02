import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ExperienceSection } from "@/components/experience-section"
import { WorkSection } from "@/components/work-section"
import { ConquerSection } from "@/components/conquer-section"
import { SoftexpertSection } from "@/components/softexpert-section"
import { NautixSection } from "@/components/nautix-section"
import { OtherExperiencesSection } from "@/components/other-experiences-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen ">
      <Navbar />
      <HeroSection />
      <ExperienceSection />
      <WorkSection />
      <ConquerSection />
      <SoftexpertSection />
      <NautixSection />
      <OtherExperiencesSection />
      <Footer />
    </div>
  );
}

import { CTASection } from "../components/cta-section";
import { FeaturesSection } from "../components/features-section";
import { Footer } from "../components/footer";
import { HeroSection } from "../components/hero-section";
import { Navbar } from "../components/navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

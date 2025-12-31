import { HeroCarousel } from "@/components/marketing/hero-carousel";
import { ClientLogos } from "@/components/marketing/client-logos";
import { ServicesOverview } from "@/components/marketing/services-overview";
import { StatsSection } from "@/components/marketing/stats-section";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { CertificationsBadges } from "@/components/marketing/certifications-badges";
import { Testimonials } from "@/components/marketing/testimonials";
import { CareersSection } from "@/components/marketing/careers-section";
import { CTASection } from "@/components/marketing/cta-section";

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <ClientLogos />
      <ServicesOverview />
      <StatsSection />
      <HowItWorks />
      <CertificationsBadges />
      <Testimonials />
      <CareersSection />
      <CTASection />
    </>
  );
}

import { Metadata } from "next";
import { ITCalculator } from "@/components/marketing/it-calculator";

export const metadata: Metadata = {
  title: "IT Transformation Calculator | XProtege",
  description:
    "Calculate your potential IT savings and get personalized recommendations for cloud migration, cybersecurity, and AI integration. Free assessment tool by XProtege.",
  keywords: [
    "IT calculator",
    "cloud migration ROI",
    "cybersecurity assessment",
    "AI readiness",
    "digital transformation",
    "IT cost savings",
    "technology assessment",
  ],
};

export default function CalculatorPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-slate-50 via-white to-sky-50 overflow-hidden">
        {/* Floating gradient orbs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-sky-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-3xl" />
        
        <div className="container relative">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 text-sky-700 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              Free IT Assessment Tool
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              IT Transformation{" "}
              <span className="text-sky-500">Calculator</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover your potential IT savings, identify security gaps, and get 
              personalized recommendations for cloud, AI, and cybersecurity improvements. 
              Takes less than 2 minutes.
            </p>
          </div>

          <ITCalculator />
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="container">
          <div className="text-center">
            <p className="text-sm text-slate-500 mb-6">
              Trusted by organizations across federal, state, and commercial sectors
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-800">GovCloud IL6</div>
                <div className="text-xs text-slate-500">Certified</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-800">DISA STIG</div>
                <div className="text-xs text-slate-500">Compliant</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-800">Woman-Owned</div>
                <div className="text-xs text-slate-500">Small Business</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-800">10+ Years</div>
                <div className="text-xs text-slate-500">Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Phone } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-50 via-sky-50 to-cyan-50 text-slate-800 overflow-hidden">
      {/* Floating gradient orbs for AI/cloud feel */}
      <div className="absolute top-10 left-20 w-64 h-64 bg-sky-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-20 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl" />
      
      <div className="container relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-slate-900">
            Ready to Transform Your Digital Journey?
          </h2>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
            Take the first step toward innovation. Get a free consultation 
            to explore how AI, cloud, and cybersecurity solutions can accelerate your business.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="text-lg px-8 bg-sky-500 text-white hover:bg-sky-600"
              asChild
            >
              <Link href="/contact">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Free Consultation
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-slate-300 text-slate-700 hover:bg-slate-100"
              asChild
            >
              <Link href="tel:+1-510-435-7930">
                <Phone className="mr-2 h-5 w-5" />
                Call +1-510-435-7930
              </Link>
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-8 max-w-lg mx-auto text-center">
            <div>
              <div className="text-3xl font-bold text-sky-600">Free</div>
              <div className="text-sm text-slate-500">Consultation</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-sky-600">45 min</div>
              <div className="text-sm text-slate-500">Strategy Session</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-sky-600">No</div>
              <div className="text-sm text-slate-500">Obligation</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

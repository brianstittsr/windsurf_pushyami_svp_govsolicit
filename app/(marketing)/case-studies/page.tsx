import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight,
  Building2,
  Cloud,
  Shield,
  Brain,
  TrendingUp,
  CheckCircle,
  Quote
} from "lucide-react";

export const metadata: Metadata = {
  title: "Case Studies | XProtege",
  description: "Explore how XProtege has helped federal agencies and commercial organizations achieve digital transformation success.",
};

const caseStudies = [
  {
    title: "Federal Agency Cloud Migration",
    client: "U.S. Department of Defense",
    industry: "Federal Government",
    icon: Cloud,
    challenge: "Legacy on-premise infrastructure causing performance issues and high maintenance costs.",
    solution: "Migrated 200+ applications to AWS GovCloud with IL5 compliance, implementing modern DevOps practices.",
    results: [
      "45% reduction in infrastructure costs",
      "99.99% system availability achieved",
      "60% faster deployment cycles",
      "Full FedRAMP High compliance"
    ],
    tags: ["Cloud Migration", "GovCloud", "DevOps"]
  },
  {
    title: "AI-Powered Document Processing",
    client: "State Government Agency",
    industry: "State & Local Government",
    icon: Brain,
    challenge: "Manual document processing creating bottlenecks and errors in citizen services.",
    solution: "Implemented intelligent document processing using NLP and machine learning to automate classification and extraction.",
    results: [
      "80% reduction in processing time",
      "95% accuracy in document classification",
      "40% cost savings in operations",
      "Improved citizen satisfaction scores"
    ],
    tags: ["AI/ML", "Automation", "NLP"]
  },
  {
    title: "Zero Trust Security Implementation",
    client: "Federal Financial Agency",
    industry: "Federal Government",
    icon: Shield,
    challenge: "Outdated perimeter-based security model vulnerable to modern threats.",
    solution: "Designed and implemented comprehensive Zero Trust architecture with identity-based access controls.",
    results: [
      "70% reduction in security incidents",
      "100% compliance with federal mandates",
      "Real-time threat detection enabled",
      "Seamless user experience maintained"
    ],
    tags: ["Cybersecurity", "Zero Trust", "Compliance"]
  },
  {
    title: "Enterprise Data Analytics Platform",
    client: "Healthcare Organization",
    industry: "Healthcare",
    icon: TrendingUp,
    challenge: "Siloed data preventing insights and evidence-based decision making.",
    solution: "Built unified data platform with executive dashboards, predictive analytics, and self-service BI capabilities.",
    results: [
      "360° view of operations achieved",
      "50% faster reporting cycles",
      "Data-driven decisions enabled",
      "ROI realized within 6 months"
    ],
    tags: ["Data Analytics", "BI", "Healthcare"]
  }
];

const testimonials = [
  {
    quote: "XProtege's team delivered our cloud migration ahead of schedule and under budget. Their expertise in GovCloud environments was invaluable.",
    author: "IT Director",
    organization: "Federal Agency"
  },
  {
    quote: "The AI solution transformed our document processing. What used to take days now happens in minutes with greater accuracy.",
    author: "Operations Manager",
    organization: "State Government"
  }
];

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-50 via-white to-sky-50 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-sky-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />
        
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-sky-100 text-sky-700 hover:bg-sky-100">
              <Building2 className="w-3 h-3 mr-1" />
              Success Stories
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Case{" "}
              <span className="text-sky-500">Studies</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Discover how XProtege has helped federal agencies and commercial organizations 
              achieve their digital transformation goals with measurable results.
            </p>
            <Button size="lg" className="bg-sky-500 hover:bg-sky-600" asChild>
              <Link href="/contact">
                Discuss Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="space-y-12">
            {caseStudies.map((study, index) => (
              <Card key={index} className="border-slate-200 overflow-hidden">
                <div className="grid lg:grid-cols-3 gap-0">
                  <div className="bg-gradient-to-br from-sky-500 to-cyan-500 p-8 text-white">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                      <study.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{study.title}</h3>
                    <p className="text-sky-100 mb-4">{study.client}</p>
                    <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                      {study.industry}
                    </Badge>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {study.tags.map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="border-white/30 text-white text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="lg:col-span-2 p-8">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-2">Challenge</h4>
                        <p className="text-slate-600">{study.challenge}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-2">Solution</h4>
                        <p className="text-slate-600">{study.solution}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-2">Results</h4>
                        <ul className="grid sm:grid-cols-2 gap-2">
                          {study.results.map((result, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                              <CheckCircle className="h-4 w-4 text-sky-500 flex-shrink-0" />
                              {result}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What Our Clients Say
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-slate-200">
                <CardContent className="pt-6">
                  <Quote className="h-8 w-8 text-sky-300 mb-4" />
                  <p className="text-slate-600 mb-4 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold text-slate-800">{testimonial.author}</p>
                    <p className="text-sm text-slate-500">{testimonial.organization}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Let's discuss how XProtege can help your organization achieve 
              similar transformative results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-sky-500 hover:bg-sky-600" asChild>
                <Link href="/contact">
                  Start Your Transformation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <Link href="/calculator">
                  Calculate Your ROI
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

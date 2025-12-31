import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  RefreshCw, 
  Layers, 
  Code, 
  ArrowRight,
  CheckCircle,
  Smartphone,
  Globe,
  Cpu,
  Workflow
} from "lucide-react";

export const metadata: Metadata = {
  title: "Digital Modernization | XProtege",
  description: "Transform legacy systems into agile, cloud-native solutions. Application modernization, DevOps, and digital transformation services for federal and commercial organizations.",
};

const modernizationServices = [
  {
    icon: RefreshCw,
    title: "Legacy Modernization",
    description: "Transform outdated systems into modern, maintainable applications without disrupting operations.",
    features: ["Application assessment", "Replatforming", "Refactoring", "Containerization"]
  },
  {
    icon: Code,
    title: "Cloud-Native Development",
    description: "Build new applications using modern architectures designed for scalability and resilience.",
    features: ["Microservices architecture", "Serverless solutions", "API-first design", "Event-driven systems"]
  },
  {
    icon: Workflow,
    title: "DevOps & CI/CD",
    description: "Accelerate delivery with automated pipelines and modern development practices.",
    features: ["Pipeline automation", "Infrastructure as Code", "Automated testing", "Release management"]
  },
  {
    icon: Smartphone,
    title: "User Experience Modernization",
    description: "Create intuitive, accessible interfaces that improve productivity and user satisfaction.",
    features: ["UI/UX redesign", "Mobile-first design", "Accessibility compliance", "User research"]
  }
];

const benefits = [
  { metric: "50%", label: "Faster time to market" },
  { metric: "70%", label: "Reduced technical debt" },
  { metric: "99.9%", label: "System availability" },
  { metric: "40%", label: "Lower maintenance costs" },
];

const approaches = [
  {
    title: "Rehost",
    description: "Lift-and-shift to cloud with minimal changes"
  },
  {
    title: "Replatform",
    description: "Optimize for cloud without major code changes"
  },
  {
    title: "Refactor",
    description: "Redesign applications for cloud-native benefits"
  },
  {
    title: "Rebuild",
    description: "Create new cloud-native applications from scratch"
  }
];

export default function DigitalModernizationPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-50 via-white to-orange-50 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl" />
        
        <div className="container relative">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-100">
              <Zap className="w-3 h-3 mr-1" />
              Digital Transformation
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Digital{" "}
              <span className="text-orange-500">Modernization</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl">
              Transform legacy systems into agile, future-ready solutions. XProtege 
              specializes in modernization within Azure and AWS GovCloud PaaS environments, 
              helping organizations embrace digital innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600" asChild>
                <Link href="/contact">
                  Start Modernization Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/calculator">
                  Calculate Modernization ROI
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Stats */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-400">{benefit.metric}</div>
                <div className="text-sm text-slate-300">{benefit.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Comprehensive Modernization Services
            </h2>
            <p className="text-lg text-slate-600">
              From legacy assessment to cloud-native development, we provide end-to-end 
              modernization services that minimize risk and maximize value.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {modernizationServices.map((service, index) => (
              <Card key={index} className="border-slate-200 hover:border-orange-300 hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle className="h-4 w-4 text-orange-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modernization Approaches */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Right Approach for Your Needs
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                We assess your applications and recommend the optimal modernization 
                strategy based on business value, technical complexity, and risk tolerance.
              </p>
              <div className="space-y-4">
                {approaches.map((approach, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-lg border border-slate-200">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">{approach.title}</h4>
                      <p className="text-sm text-slate-600">{approach.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">GovCloud Modernization</h3>
              <p className="mb-6 opacity-90">
                Modernize your applications within secure Azure and AWS GovCloud 
                environments, meeting all federal compliance requirements.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  IL4/IL5/IL6 compliant deployments
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  FedRAMP authorized platforms
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Zero-downtime migrations
                </li>
              </ul>
              <Button variant="secondary" className="w-full" asChild>
                <Link href="/contact">Discuss Your Modernization</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Modernize Your Systems?
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Get a free modernization assessment and discover the best path forward 
              for your legacy applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600" asChild>
                <Link href="/contact">
                  Get Free Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <Link href="/calculator">
                  Calculate Your Savings
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

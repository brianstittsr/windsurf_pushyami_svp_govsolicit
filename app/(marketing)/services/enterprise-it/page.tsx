import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Server, 
  Settings, 
  Headphones, 
  Shield, 
  ArrowRight,
  CheckCircle,
  Monitor,
  Wrench,
  Clock,
  Users
} from "lucide-react";

export const metadata: Metadata = {
  title: "Enterprise IT Services | XProtege",
  description: "Comprehensive IT sustainment, support, and management services. 24/7 help desk, infrastructure management, and IT operations for federal agencies.",
};

const itServices = [
  {
    icon: Headphones,
    title: "IT Service Desk",
    description: "24/7 multi-tier support with rapid response times and high first-call resolution rates.",
    features: ["Tier 1-3 support", "24/7 availability", "Multi-channel access", "Knowledge management"]
  },
  {
    icon: Server,
    title: "Infrastructure Management",
    description: "Proactive monitoring and management of your IT infrastructure for optimal performance.",
    features: ["Server management", "Network operations", "Storage management", "Capacity planning"]
  },
  {
    icon: Settings,
    title: "IT Operations",
    description: "Streamlined IT operations with ITIL-aligned processes and continuous improvement.",
    features: ["Incident management", "Change management", "Problem management", "Service catalog"]
  },
  {
    icon: Shield,
    title: "Security Operations",
    description: "Integrated security operations to protect your IT environment from threats.",
    features: ["Security monitoring", "Patch management", "Vulnerability scanning", "Access management"]
  }
];

const benefits = [
  { metric: "99.9%", label: "System uptime" },
  { metric: "< 15min", label: "Response time" },
  { metric: "85%", label: "First-call resolution" },
  { metric: "24/7", label: "Support coverage" },
];

const capabilities = [
  "Federal agency IT support",
  "ITSM implementation",
  "ServiceNow expertise",
  "Asset management",
  "Configuration management",
  "Performance monitoring",
  "Disaster recovery",
  "Business continuity"
];

export default function EnterpriseITPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl" />
        
        <div className="container relative">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">
              <Server className="w-3 h-3 mr-1" />
              Enterprise IT
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Enterprise IT{" "}
              <span className="text-blue-500">Services</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl">
              Comprehensive IT sustainment, cybersecurity, RMF support, and modernization 
              services for federal agencies. XProtege delivers reliable IT operations 
              with a proven track record of excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600" asChild>
                <Link href="/contact">
                  Discuss IT Requirements
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/calculator">
                  Calculate IT Savings
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
                <div className="text-3xl md:text-4xl font-bold text-blue-400">{benefit.metric}</div>
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
              Full-Spectrum IT Services
            </h2>
            <p className="text-lg text-slate-600">
              From help desk to infrastructure management, we provide comprehensive 
              IT services that keep your operations running smoothly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {itServices.map((service, index) => (
              <Card key={index} className="border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle className="h-4 w-4 text-blue-500" />
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

      {/* Capabilities */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Proven Federal IT Expertise
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Our team has extensive experience supporting federal agencies with 
                mission-critical IT operations and compliance requirements.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {capabilities.map((capability, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-slate-200">
                    <CheckCircle className="h-5 w-5 text-blue-500" />
                    <span className="text-sm font-medium text-slate-700">{capability}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Managed IT Services</h3>
              <p className="mb-6 opacity-90">
                Let XProtege manage your IT operations so you can focus on your mission. 
                Our managed services provide predictable costs and reliable performance.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Dedicated support team
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Proactive monitoring
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  SLA-backed performance
                </li>
              </ul>
              <Button variant="secondary" className="w-full" asChild>
                <Link href="/contact">Learn About Managed Services</Link>
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
              Ready to Optimize Your IT Operations?
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Schedule a consultation to discuss how XProtege can improve your IT 
              service delivery and reduce operational costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600" asChild>
                <Link href="/contact">
                  Schedule IT Consultation
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

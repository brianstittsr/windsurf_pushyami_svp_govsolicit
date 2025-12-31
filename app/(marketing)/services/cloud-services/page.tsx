import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Cloud, 
  Server, 
  Shield, 
  Zap, 
  ArrowRight,
  CheckCircle,
  Lock,
  Globe,
  Database,
  RefreshCw
} from "lucide-react";

export const metadata: Metadata = {
  title: "Cloud Services | XProtege",
  description: "Enterprise cloud solutions with GovCloud IL6 certification. Cloud migration, security, governance, and ATO support for federal and commercial organizations.",
};

const cloudServices = [
  {
    icon: RefreshCw,
    title: "Cloud Migration",
    description: "Seamlessly migrate your workloads to AWS, Azure, or GovCloud with minimal disruption and maximum security.",
    features: ["Assessment & planning", "Lift-and-shift migration", "Application modernization", "Data migration"]
  },
  {
    icon: Shield,
    title: "Cloud Security & Compliance",
    description: "Implement robust security controls and achieve compliance with federal standards including FedRAMP and FISMA.",
    features: ["Security architecture", "Compliance automation", "Continuous monitoring", "Incident response"]
  },
  {
    icon: Server,
    title: "GovCloud IL6 Support",
    description: "Deploy mission-critical workloads in secure government cloud environments meeting DoD IL6 requirements.",
    features: ["IL4/IL5/IL6 deployments", "ATO acceleration", "Security documentation", "Ongoing compliance"]
  },
  {
    icon: Database,
    title: "Cloud Governance",
    description: "Establish policies, controls, and best practices for effective cloud resource management.",
    features: ["Cost optimization", "Resource tagging", "Policy enforcement", "Multi-cloud management"]
  }
];

const benefits = [
  { metric: "40%", label: "Infrastructure cost reduction" },
  { metric: "99.99%", label: "Uptime SLA" },
  { metric: "IL6", label: "Security clearance" },
  { metric: "50%", label: "Faster deployment" },
];

const certifications = [
  "AWS GovCloud Certified",
  "Azure Government Partner",
  "FedRAMP High Authorized",
  "DISA STIG Compliant",
  "SOC 2 Type II",
  "ISO 27001"
];

export default function CloudServicesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-50 via-white to-cyan-50 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl" />
        
        <div className="container relative">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-cyan-100 text-cyan-700 hover:bg-cyan-100">
              <Cloud className="w-3 h-3 mr-1" />
              Cloud Solutions
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Enterprise{" "}
              <span className="text-cyan-500">Cloud Services</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl">
              Accelerate your cloud journey with XProtege's certified cloud experts. 
              From migration to optimization, we deliver secure, scalable cloud 
              solutions for federal and commercial organizations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600" asChild>
                <Link href="/contact">
                  Start Cloud Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/calculator">
                  Calculate Cloud Savings
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
                <div className="text-3xl md:text-4xl font-bold text-cyan-400">{benefit.metric}</div>
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
              Comprehensive Cloud Solutions
            </h2>
            <p className="text-lg text-slate-600">
              Whether you're starting your cloud journey or optimizing existing deployments, 
              our experts deliver solutions tailored to your mission requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {cloudServices.map((service, index) => (
              <Card key={index} className="border-slate-200 hover:border-cyan-300 hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-cyan-600" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle className="h-4 w-4 text-cyan-500" />
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

      {/* Certifications */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Certified for Government & Enterprise
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Our cloud team holds the certifications and clearances required for 
                the most demanding federal and enterprise deployments.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-slate-200">
                    <Lock className="h-5 w-5 text-cyan-500" />
                    <span className="text-sm font-medium text-slate-700">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-cyan-500 to-sky-500 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">ATO Acceleration Program</h3>
              <p className="mb-6 opacity-90">
                Reduce your Authority to Operate timeline by up to 60% with our 
                proven ATO acceleration methodology and pre-approved security controls.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Pre-built security documentation
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Automated compliance scanning
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Continuous monitoring setup
                </li>
              </ul>
              <Button variant="secondary" className="w-full" asChild>
                <Link href="/contact">Learn About ATO Acceleration</Link>
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
              Ready to Accelerate Your Cloud Journey?
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Get a free cloud assessment and discover how XProtege can help you 
              achieve your cloud objectives securely and efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600" asChild>
                <Link href="/contact">
                  Get Free Cloud Assessment
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

import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Lock, 
  Eye, 
  AlertTriangle, 
  ArrowRight,
  CheckCircle,
  FileCheck,
  Search,
  Activity,
  ShieldCheck
} from "lucide-react";

export const metadata: Metadata = {
  title: "Cybersecurity Services | XProtege",
  description: "Enterprise cybersecurity solutions with DISA STIG compliance. Security assessments, threat detection, incident response, and compliance services.",
};

const securityServices = [
  {
    icon: Search,
    title: "Security Assessments",
    description: "Comprehensive vulnerability assessments and penetration testing to identify and remediate security gaps.",
    features: ["Vulnerability scanning", "Penetration testing", "Risk assessments", "Security audits"]
  },
  {
    icon: Eye,
    title: "Threat Detection & Response",
    description: "24/7 security monitoring with advanced threat detection and rapid incident response capabilities.",
    features: ["SIEM implementation", "SOC services", "Threat hunting", "Incident response"]
  },
  {
    icon: FileCheck,
    title: "Compliance & RMF",
    description: "Navigate complex compliance requirements with our Risk Management Framework expertise.",
    features: ["NIST RMF support", "FISMA compliance", "FedRAMP authorization", "Continuous monitoring"]
  },
  {
    icon: ShieldCheck,
    title: "DISA STIG Implementation",
    description: "Implement and maintain DISA Security Technical Implementation Guides for hardened systems.",
    features: ["STIG assessments", "Remediation support", "Automated compliance", "Documentation"]
  }
];

const benefits = [
  { metric: "65%", label: "Risk reduction" },
  { metric: "24/7", label: "Security monitoring" },
  { metric: "< 1hr", label: "Incident response" },
  { metric: "100%", label: "Compliance rate" },
];

const frameworks = [
  "NIST Cybersecurity Framework",
  "NIST 800-53",
  "DISA STIGs",
  "FedRAMP",
  "FISMA",
  "CMMC",
  "Zero Trust Architecture",
  "ISO 27001"
];

export default function CybersecurityPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-50 via-white to-emerald-50 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl" />
        
        <div className="container relative">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
              <Shield className="w-3 h-3 mr-1" />
              Cybersecurity
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Enterprise{" "}
              <span className="text-emerald-500">Cybersecurity</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl">
              Protect your mission-critical assets with XProtege's comprehensive 
              cybersecurity services. From threat detection to compliance, we deliver 
              security solutions that meet the highest federal standards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600" asChild>
                <Link href="/contact">
                  Get Security Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/calculator">
                  Calculate Security ROI
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
                <div className="text-3xl md:text-4xl font-bold text-emerald-400">{benefit.metric}</div>
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
              Comprehensive Security Solutions
            </h2>
            <p className="text-lg text-slate-600">
              Our cybersecurity experts deliver end-to-end security services designed 
              to protect federal agencies and commercial enterprises from evolving threats.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {securityServices.map((service, index) => (
              <Card key={index} className="border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
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

      {/* Frameworks */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Compliance Frameworks We Support
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Our team has deep expertise across all major federal and industry 
                security frameworks, ensuring your organization meets compliance requirements.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {frameworks.map((framework, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-slate-200">
                    <Shield className="h-5 w-5 text-emerald-500" />
                    <span className="text-sm font-medium text-slate-700">{framework}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Zero Trust Security</h3>
              <p className="mb-6 opacity-90">
                Implement a modern Zero Trust architecture that verifies every user, 
                device, and connection before granting access to your resources.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Identity-based access control
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Micro-segmentation
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Continuous verification
                </li>
              </ul>
              <Button variant="secondary" className="w-full" asChild>
                <Link href="/contact">Learn About Zero Trust</Link>
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
              Strengthen Your Security Posture Today
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Don't wait for a breach. Get a comprehensive security assessment and 
              discover vulnerabilities before attackers do.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600" asChild>
                <Link href="/contact">
                  Request Security Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <Link href="/calculator">
                  Calculate Risk Reduction
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

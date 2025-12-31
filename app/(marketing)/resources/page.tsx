import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen,
  FileText,
  Video,
  Download,
  ArrowRight,
  Cloud,
  Shield,
  Brain,
  BarChart3,
  Zap,
  Calculator
} from "lucide-react";

export const metadata: Metadata = {
  title: "Resources | XProtege",
  description: "Access guides, whitepapers, tools, and resources to help you navigate digital transformation, cloud migration, cybersecurity, and AI adoption.",
};

const resources = [
  {
    title: "IT Transformation Calculator",
    description: "Calculate your potential IT savings and get personalized recommendations for cloud, security, and AI improvements.",
    icon: Calculator,
    type: "Tool",
    href: "/calculator",
    featured: true
  },
  {
    title: "Cloud Migration Guide",
    description: "A comprehensive guide to planning and executing successful cloud migrations for federal and commercial organizations.",
    icon: Cloud,
    type: "Guide",
    href: "/contact"
  },
  {
    title: "Zero Trust Security Playbook",
    description: "Step-by-step guidance for implementing Zero Trust architecture in your organization.",
    icon: Shield,
    type: "Playbook",
    href: "/contact"
  },
  {
    title: "AI Readiness Assessment",
    description: "Evaluate your organization's readiness for AI adoption and identify key areas for improvement.",
    icon: Brain,
    type: "Assessment",
    href: "/calculator"
  },
  {
    title: "Federal Compliance Checklist",
    description: "Essential compliance requirements for FedRAMP, FISMA, and CMMC certifications.",
    icon: FileText,
    type: "Checklist",
    href: "/contact"
  },
  {
    title: "Data Analytics Best Practices",
    description: "Learn how to build effective data pipelines and create actionable insights from your data.",
    icon: BarChart3,
    type: "Guide",
    href: "/contact"
  },
  {
    title: "Digital Modernization Roadmap",
    description: "A framework for modernizing legacy systems and embracing digital transformation.",
    icon: Zap,
    type: "Framework",
    href: "/contact"
  },
  {
    title: "GovCloud Deployment Guide",
    description: "Technical guidance for deploying workloads in AWS and Azure GovCloud environments.",
    icon: Cloud,
    type: "Technical Guide",
    href: "/contact"
  }
];

const categories = [
  { name: "All", count: resources.length },
  { name: "Guides", count: resources.filter(r => r.type === "Guide" || r.type === "Technical Guide").length },
  { name: "Tools", count: resources.filter(r => r.type === "Tool" || r.type === "Assessment").length },
  { name: "Playbooks", count: resources.filter(r => r.type === "Playbook" || r.type === "Framework").length },
];

export default function ResourcesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-50 via-white to-sky-50 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-sky-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />
        
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-sky-100 text-sky-700 hover:bg-sky-100">
              <BookOpen className="w-3 h-3 mr-1" />
              Knowledge Center
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Resources &{" "}
              <span className="text-sky-500">Guides</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Access expert guides, tools, and resources to help you navigate 
              digital transformation, cloud migration, cybersecurity, and AI adoption.
            </p>
            <Button size="lg" className="bg-sky-500 hover:bg-sky-600" asChild>
              <Link href="/calculator">
                <Calculator className="mr-2 h-5 w-5" />
                Try IT Calculator
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Resource */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="container">
          <Card className="border-sky-200 bg-gradient-to-r from-sky-50 to-cyan-50 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <CardContent className="p-8">
                <Badge className="mb-4 bg-sky-500 text-white">Featured Tool</Badge>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  IT Transformation Calculator
                </h3>
                <p className="text-slate-600 mb-6">
                  Discover your potential IT savings, identify security gaps, and get 
                  personalized recommendations for cloud, AI, and cybersecurity improvements. 
                  Takes less than 2 minutes.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 bg-sky-500 rounded-full" />
                    Calculate potential cost savings
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 bg-sky-500 rounded-full" />
                    Assess security and AI readiness
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 bg-sky-500 rounded-full" />
                    Get personalized recommendations
                  </li>
                </ul>
                <Button className="bg-sky-500 hover:bg-sky-600" asChild>
                  <Link href="/calculator">
                    Start Free Assessment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
              <div className="bg-gradient-to-br from-sky-500 to-cyan-500 p-8 text-white flex flex-col justify-center">
                <div className="text-center">
                  <Calculator className="h-16 w-16 mx-auto mb-4 opacity-90" />
                  <div className="text-4xl font-bold mb-2">Free</div>
                  <div className="text-sky-100">No signup required</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map((category) => (
              <Badge 
                key={category.name}
                variant="outline" 
                className="px-4 py-2 cursor-pointer hover:bg-sky-50 hover:border-sky-300"
              >
                {category.name} ({category.count})
              </Badge>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.filter(r => !r.featured).map((resource, index) => (
              <Card key={index} className="border-slate-200 hover:border-sky-300 hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                      <resource.icon className="h-5 w-5 text-sky-600" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {resource.type}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg mt-4">{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={resource.href}>
                      {resource.href === "/calculator" ? "Try Now" : "Request Access"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Stay Updated
            </h2>
            <p className="text-slate-600 mb-8">
              Get the latest insights on cloud, AI, cybersecurity, and digital transformation 
              delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-sky-500 hover:bg-sky-600" asChild>
                <Link href="/contact">
                  Subscribe to Updates
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
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
              Need Personalized Guidance?
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Our experts are ready to help you navigate your digital transformation journey. 
              Schedule a free consultation to discuss your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-sky-500 hover:bg-sky-600" asChild>
                <Link href="/contact">
                  Schedule Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <Link href="/case-studies">
                  View Case Studies
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

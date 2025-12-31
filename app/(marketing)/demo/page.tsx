import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  FileText,
  Settings,
  Zap,
  Shield,
  ArrowRight,
  CheckCircle,
  Lock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Platform Demo | ITMC Solutions",
  description:
    "Explore the ITMC Solutions platform capabilities. See how we help federal CIO organizations manage IT portfolios, track programs, and optimize technology investments.",
};

const features = [
  {
    icon: LayoutDashboard,
    title: "Command Center Dashboard",
    description: "Real-time visibility into IT portfolio performance, budget tracking, and program status.",
    capabilities: [
      "Executive dashboards with KPIs",
      "Budget vs. actual tracking",
      "Program health indicators",
      "Risk and issue monitoring",
    ],
  },
  {
    icon: BarChart3,
    title: "Portfolio Management",
    description: "Comprehensive CPIC and IT portfolio management tools for federal agencies.",
    capabilities: [
      "Investment lifecycle management",
      "Business case development",
      "Cost-benefit analysis",
      "Portfolio optimization",
    ],
  },
  {
    icon: FileText,
    title: "Program & Project Tracking",
    description: "Track programs, projects, milestones, and deliverables across your IT portfolio.",
    capabilities: [
      "Project planning and scheduling",
      "Milestone tracking",
      "Resource allocation",
      "Status reporting",
    ],
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Collaborate with team members, stakeholders, and leadership on IT initiatives.",
    capabilities: [
      "Role-based access control",
      "Team workspaces",
      "Document sharing",
      "Activity tracking",
    ],
  },
  {
    icon: Zap,
    title: "Automation & Workflows",
    description: "Automate manual processes and streamline IT governance workflows.",
    capabilities: [
      "Automated reporting",
      "Approval workflows",
      "Notification systems",
      "Integration capabilities",
    ],
  },
  {
    icon: Shield,
    title: "Compliance & Security",
    description: "Ensure compliance with federal IT requirements and security standards.",
    capabilities: [
      "Audit trails",
      "Security controls",
      "Compliance reporting",
      "Data encryption",
    ],
  },
];

const stats = [
  { label: "Federal Agencies", value: "20+", description: "Served successfully" },
  { label: "IT Portfolios", value: "$3B+", description: "Managed annually" },
  { label: "Projects Tracked", value: "500+", description: "Across all clients" },
  { label: "User Satisfaction", value: "98%", description: "Client retention rate" },
];

export default function DemoPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6">
              Platform Demo
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              See the ITMC Solutions{" "}
              <span className="text-primary">Platform in Action</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover how federal CIO organizations use our platform to manage IT portfolios,
              track programs, optimize budgets, and ensure compliance with federal requirements.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/sign-up">
                  Request Full Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-black text-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="font-semibold mb-1">{stat.label}</div>
                <div className="text-sm text-gray-400">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Platform Capabilities
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools designed specifically for federal IT portfolio management
              and program execution.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.capabilities.map((capability) => (
                      <li key={capability} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>{capability}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Access Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-primary/20">
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Ready to See More?</CardTitle>
                <CardDescription className="text-base">
                  Get a personalized demo tailored to your agency's specific needs and requirements.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      What You'll Get
                    </h3>
                    <ul className="space-y-2 ml-7 text-sm text-muted-foreground">
                      <li>• Personalized walkthrough with our team</li>
                      <li>• Live demonstration of key features</li>
                      <li>• Q&A session with our experts</li>
                      <li>• Custom use case discussion</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Who Should Attend
                    </h3>
                    <ul className="space-y-2 ml-7 text-sm text-muted-foreground">
                      <li>• CIOs and IT Directors</li>
                      <li>• CPIC Managers</li>
                      <li>• Program/Project Managers</li>
                      <li>• IT Portfolio Managers</li>
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="flex-1" asChild>
                      <Link href="/contact">
                        Schedule Demo
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="flex-1" asChild>
                      <Link href="/sign-up">Create Free Account</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
              Trusted by Federal CIO Organizations
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              With 35+ years of experience serving federal agencies, we understand the unique
              challenges of government IT portfolio management.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Badge variant="outline" className="px-4 py-2">
                SBA 8(a) Certified
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                Veteran-Owned
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                Woman-Owned
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                GSA MAS Contract
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                SWAM #69476
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Transform Your IT Portfolio Management?
          </h2>
          <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">
            Join the federal agencies that trust ITMC Solutions for their IT portfolio
            management and program execution needs.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90"
              asChild
            >
              <Link href="/contact">
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              asChild
            >
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

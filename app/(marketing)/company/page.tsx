import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  DollarSign,
  Globe,
  Factory,
  TrendingUp,
  Award,
  Bot,
  Users,
  Handshake,
  Target,
  CheckCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Meet Our Team | ITMC Solutions Leadership",
  description:
    "Meet the ITMC Solutions team - a mother-daughter led team of expert consultants with decades of experience serving federal CIO organizations including HUD, DHS, and DOD.",
};

const expertiseAreas = [
  {
    icon: Target,
    title: "Strategic Planning",
    description:
      "Our seasoned experts help Senior Executives identify improvement areas, manage risks, and optimize IT services to meet new legislative and organizational demands with confidence.",
  },
  {
    icon: DollarSign,
    title: "IT Portfolio Management & TBM",
    description:
      "Drawing on decades of experience, we help CIOs and CFOs minimize risks and successfully implement IT initiatives. We help you understand where your technology dollars are going and how to make every investment count.",
  },
  {
    icon: TrendingUp,
    title: "Data Analytics & Reporting",
    description:
      "Transform raw data into powerful insights with our veteran team. We turn complex information into clear, actionable recommendations that support your strategic goals.",
  },
  {
    icon: Globe,
    title: "Solution & Data Architecture",
    description:
      "Future-proof your technology infrastructure with our enterprise architecture expertise. We focus on delivering tangible business outcomes, reducing redundancy, and accelerating value.",
  },
  {
    icon: Bot,
    title: "Intelligent Automation & Low-Code",
    description:
      "Quality software is the backbone of efficient operations. Our comprehensive approach accelerates delivery and reduces operational burden through smart automation.",
  },
  {
    icon: Award,
    title: "Program / Project Management",
    description:
      "From $100M+ engagements to $3B+ budgets, we've mastered the art of complex project delivery. Our mother-daughter led team brings a personal touch to every project.",
  },
];

const values = [
  {
    icon: Users,
    title: "35+ Years of Federal Experience",
    description:
      "Our team has provided principled partnership to hundreds of clients at HUD, DHS, DOD, Lockheed Martin, Disney, and beyond. We've managed $3B+ budgets and years-long engagements exceeding $100M.",
  },
  {
    icon: Handshake,
    title: "Reachable, Reliable Partners",
    description:
      "We're well-known for being accessible and dependable. Our mother-daughter led team brings a personal touch to every project, ensuring your objectives are met with precision and care—every step of the way.",
  },
  {
    icon: Target,
    title: "Strategy to Execution",
    description:
      "We don't just plan—we deliver. From strategic planning through implementation, we guide federal IT leaders to optimize processes, ensure compliance, and consistently reach targets.",
  },
];

export default function CompanyPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-black text-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 border-primary/50 text-primary">
              Our Leadership Team
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              A Mother-Daughter Led Team{" "}
              <span className="text-primary">of Expert Consultants</span>
            </h1>
            <p className="mt-6 text-xl text-gray-300 font-medium">
              Providing 70+ years of combined experience for Federal CIO organizations
            </p>
            <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
              We've helped IT leaders successfully manage $3B+ budgets, thousands of processes, 
              and hundreds of thousands of employees—and we've done it as reachable, reliable 
              partners every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Key Capabilities */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-6 text-center">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span className="font-medium">CPIC/Portfolio Management</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span className="font-medium">Technology Business Management</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span className="font-medium">Data Analytics</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span className="font-medium">Solution Architecture</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span className="font-medium">Digital Transformation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span className="font-medium">FinOps & Cost Optimization</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span className="font-medium">Low-Code Development</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span className="font-medium">Program/Project Management</span>
            </div>
          </div>
        </div>
      </section>

      {/* Complementary Expertise */}
      <section className="py-20 md:py-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Comprehensive IT & Management Consulting
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              As experts in CPIC/portfolio management, Business and Solution architecture, Technology 
              Business Management (TBM), Data Analytics, and a wide range of program/project management 
              capabilities, we guide government IT leaders to optimize processes, ensure compliance, and 
              consistently reach targets.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expertiseAreas.map((area) => (
              <Card key={area.title} className="h-full">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <area.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{area.title}</h3>
                  <p className="text-muted-foreground">{area.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <Card key={value.title} className="border-2 border-primary/10">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Let's Meet Your Milestones Together
          </h2>
          <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">
            If you're ready for a team you can count on, we're here to serve. Connect with us to 
            discuss how we can help you optimize processes, ensure compliance, and reach your IT goals.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="mt-8 text-lg px-8 bg-white text-primary hover:bg-white/90"
            asChild
          >
            <Link href="/contact">
              Connect with Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <p className="mt-4 text-sm opacity-80">Strategy | Partnership | Peace of Mind</p>
        </div>
      </section>
    </>
  );
}

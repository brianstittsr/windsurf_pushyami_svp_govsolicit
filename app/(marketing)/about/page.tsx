import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  Eye,
  Heart,
  Users,
  Award,
  Factory,
  ArrowRight,
} from "lucide-react";
import { LeadershipTeam } from "@/components/marketing/leadership-team";

export const metadata: Metadata = {
  title: "About ITMC Solutions | Trusted IT Consulting Partner",
  description:
    "Discover ITMC Solutions, a veteran-, woman-, and minority-owned small business providing top-tier IT consulting services to federal agencies. Learn about our commitment to excellence, our team, and our proven track record in program management, data analytics, and more.",
};

const values = [
  {
    icon: Target,
    title: "Ethical Leadership",
    description:
      "We lead with integrity, honesty, and a commitment to doing what's right for our clients and their missions.",
  },
  {
    icon: Users,
    title: "Service & Stewardship",
    description:
      "We serve federal agencies with dedication and care, acting as responsible stewards of taxpayer resources.",
  },
  {
    icon: Heart,
    title: "Partnership Mindset",
    description:
      "We believe in the power of partnership. Two are better than one—we're here to help you succeed every step of the way.",
  },
  {
    icon: Award,
    title: "Excellence & Respect",
    description:
      "We deliver excellence in every engagement while treating everyone with dignity and respect.",
  },
];


export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-black text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 border-primary/50 text-primary">
              About ITMC Solutions
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Trusted by Federal CIO Organizations{" "}
              <span className="text-primary">for Decades</span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
              We're a proudly veteran-, woman-, and minority-owned small business delivering 
              partnership and peace of mind through expert IT & management consulting.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <Card className="border-2 border-primary/20">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-muted-foreground">
                  We empower federal, state, and local government agencies with strategic financial 
                  and IT solutions and services that drive mission success. We help agencies achieve 
                  smarter IT investments, optimize processes, ensure compliance, and consistently 
                  reach targets—every step of the way.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-secondary/20">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-6">
                  <Eye className="h-6 w-6 text-secondary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Our Belief</h2>
                <p className="text-muted-foreground italic mb-4">
                  "Two are better than one, because they have a good return for their labor: 
                  If either of them falls down, one can help the other up."
                </p>
                <p className="text-muted-foreground text-sm">
                  — Ecclesiastes 4:9-12
                </p>
                <p className="text-muted-foreground mt-4">
                  The peace and power that comes from partnership guides our work with you.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Story</h2>
            </div>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground text-lg leading-relaxed">
                ITMC Solutions was founded in 2010 with a commitment to serve federal CIO 
                organizations with integrity, expertise, and partnership. As a mother-daughter 
                led team of experts, we lead in ways inspired by our personal faith and hope 
                to give back to the country that's given us so much.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mt-6">
                With over 35 years of government consulting expertise, we specialize in optimizing 
                IT spend, improving operational efficiency, and automating manual processes to reduce 
                rework and enhance service delivery. We've helped IT leaders successfully manage $3B+ 
                budgets, thousands of processes, and hundreds of thousands of employees.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mt-6">
                We're well-known for multiple years-long engagements exceeding $100M for major clients 
                including HUD, DHS, DOD, and global organizations like Lockheed Martin, Disney, Raytheon, 
                Newport News Shipbuilding, LMI, and Singer Link. Today, this mission of principled 
                partnership guides our future of helping leaders like you meet your goals with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Values</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <Card key={value.title} className="text-center">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20 md:py-28 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Leadership Team</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Experienced professionals dedicated to your success.
            </p>
          </div>

          <LeadershipTeam />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="container text-center">
          <Target className="h-16 w-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready for a Team You Can Count On?
          </h2>
          <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">
            Let's meet your milestones together. We're here to serve as your reachable, 
            reliable, expert partners from strategy to execution.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="mt-8 text-lg px-8 bg-white text-primary hover:bg-white/90"
            asChild
          >
            <Link href="/contact">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}

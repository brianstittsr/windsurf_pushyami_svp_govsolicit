"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Wrench, Cpu, Brain, CheckCircle } from "lucide-react";

const services = [
  {
    title: "Strategic Planning & CPIC",
    tagline: "Navigate Change with Confidence",
    description:
      "Our seasoned experts help Senior Executives identify improvement areas, manage risks, and optimize IT services to meet new legislative and organizational demands.",
    icon: Wrench,
    color: "text-primary",
    bgColor: "bg-primary/10",
    href: "/company",
    features: [
      "IT Portfolio Management",
      "Technology Business Management (TBM)",
      "Cost optimization strategies",
      "Risk management and compliance",
    ],
  },
  {
    title: "Data Analytics & Architecture",
    tagline: "Transform Data into Insights",
    description:
      "Turn complex information into clear, actionable recommendations. Future-proof your technology infrastructure with our enterprise architecture expertise.",
    icon: Cpu,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    href: "/company",
    features: [
      "Data analytics and reporting",
      "Solution and data architecture",
      "Business outcome delivery",
      "Scalable infrastructure design",
    ],
  },
  {
    title: "Program Management",
    tagline: "From Strategy to Execution",
    description:
      "From $100M+ engagements to $3B+ budgets, we've mastered complex project delivery. Our team brings precision and care to every project.",
    icon: Brain,
    color: "text-accent",
    bgColor: "bg-accent/10",
    href: "/company",
    features: [
      "Program and project management",
      "Intelligent automation and low-code",
      "Digital transformation",
      "Operational excellence",
    ],
  },
];

export function ServicesOverview() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4">
            Comprehensive IT & Management Consulting
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            What We Do
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            As a veteran-, woman-, and minority-owned small business, we specialize in CPIC/portfolio management, 
            Business and Solution architecture, Technology Business Management (TBM), Data Analytics, and a wide 
            range of program/project management capabilities.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.title} className="relative overflow-hidden group hover:shadow-lg transition-shadow">
              <div className={`absolute top-0 left-0 w-full h-1 ${service.bgColor}`} />
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${service.bgColor} flex items-center justify-center mb-4`}>
                  <service.icon className={`h-6 w-6 ${service.color}`} />
                </div>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
                <CardDescription className="text-base font-medium">
                  {service.tagline}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <CheckCircle className={`h-4 w-4 mt-0.5 shrink-0 ${service.color}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="ghost" className="group/btn p-0 h-auto" asChild>
                  <Link href={service.href}>
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Ready for a team you can count on?
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">
              Connect with Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

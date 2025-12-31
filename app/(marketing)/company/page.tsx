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
  title: "Meet Our Team | XProtege Leadership",
  description:
    "Meet the XProtege team - innovative technology professionals delivering AI, cloud services, cybersecurity, and digital modernization solutions to federal agencies and commercial clients.",
};

const expertiseAreas = [
  {
    icon: Bot,
    title: "Artificial Intelligence",
    description:
      "XProtege leverages AI to drive smart automation, enhance decision-making, and optimize business processes with Generative AI, MLOps, NLP, and Robotic Process Automation.",
  },
  {
    icon: Globe,
    title: "Cloud Services",
    description:
      "Experience seamless cloud transition with ATO support for GovCloud environments up to IL6, cloud migration, security, enterprise architecture, and governance.",
  },
  {
    icon: Target,
    title: "Cybersecurity",
    description:
      "Cutting-edge security solutions to protect businesses from cyber threats, ensuring data integrity and compliance with DISA STIG practices and industry certifications.",
  },
  {
    icon: TrendingUp,
    title: "Data Analytics & Engineering",
    description:
      "Unleash insights with KPIs, executive dashboards, and dynamic reporting tools using Python, PySpark, R, PowerBI, and cloud computing ETL tools.",
  },
  {
    icon: DollarSign,
    title: "ERP Implementations",
    description:
      "Robust ERP implementation services including SAP and Microsoft Dynamics 365 & Power Platform with strategic consulting, system integration, and managed services.",
  },
  {
    icon: Award,
    title: "Enterprise IT & Training",
    description:
      "Comprehensive IT sustainment, RMF support, accreditation assistance, and professional training programs in Project Management, IT, and Business Development.",
  },
];

const values = [
  {
    icon: Users,
    title: "Superior Agile Methodology",
    description:
      "XProtege's use of agile methodology delivers efficient and reliable capabilities, providing highest ROI through a highly flexible, adaptive, and interactive process with experienced consultants.",
  },
  {
    icon: Handshake,
    title: "Extraordinary Customer Service",
    description:
      "Project progress is transparent and measurable, making it a key factor in client satisfaction. We empower our clients to remain competitive and embrace a rapid pace of digital disruption.",
  },
  {
    icon: Target,
    title: "Modern Innovative Solutions",
    description:
      "Maximize your service impact by transitioning to modern innovative solutions. We design tailored solutions that meet your mission requirements and eliminate project bottlenecks.",
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
              Innovation Meets{" "}
              <span className="text-primary">Excellence</span>
            </h1>
            <p className="mt-6 text-xl text-gray-300 font-medium">
              Technology agnostic experts delivering cutting-edge solutions
            </p>
            <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
              XProtege is a technology agnostic company that helps clients deploy Cloud Solutions, 
              Big Data and Data Science solutions by incorporating full automation. We have the 
              industry experience and technical expertise to guide you along every step of your journey.
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
              <span className="font-medium">Artificial Intelligence</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span className="font-medium">Cloud Services</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span className="font-medium">Cybersecurity</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span className="font-medium">Data Analytics</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span className="font-medium">Digital Modernization</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span className="font-medium">Enterprise IT</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span className="font-medium">ERP Implementations</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span className="font-medium">Training Services</span>
            </div>
          </div>
        </div>
      </section>

      {/* Complementary Expertise */}
      <section className="py-20 md:py-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What We Do
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              We enable our customers to accelerate the benefits of cloud, reduce maintenance cost, 
              and achieve high availability. Our team of experienced professionals combines creativity, 
              technical expertise, and market insight to help you navigate the complex journey of 
              bringing your technology vision to life.
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
            Ready to Transform Your Digital Journey?
          </h2>
          <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">
            Let's build innovative solutions together. Reach out to us for a consultation 
            or project estimate. We're here to help you unfold the power of excellence.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="mt-8 text-lg px-8 bg-white text-primary hover:bg-white/90"
            asChild
          >
            <Link href="/contact">
              Contact Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <p className="mt-4 text-sm opacity-80">Unfold the Power of Excellence</p>
        </div>
      </section>
    </>
  );
}

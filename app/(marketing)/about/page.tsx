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
  title: "About XProtege | Unfold the Power of Excellence",
  description:
    "Discover XProtege (XITM), a woman- and minority-owned technology company providing innovative IT solutions, AI, cloud services, cybersecurity, and digital modernization to federal agencies and commercial clients.",
};

const values = [
  {
    icon: Target,
    title: "Commitment to Excellence",
    description:
      "We pursue the highest standards in everything we do—striving for outstanding performance, quality, and continuous improvement.",
  },
  {
    icon: Users,
    title: "Integrity and Trust",
    description:
      "We act with honesty, transparency, and strong moral principles, earning trust through every interaction.",
  },
  {
    icon: Heart,
    title: "Customer Focus",
    description:
      "We put our clients at the center of everything—listening actively, delivering on our promises, and building lasting partnerships.",
  },
  {
    icon: Award,
    title: "Teamwork and Accountability",
    description:
      "We collaborate with respect and take full ownership of our actions, always supporting one another to achieve shared goals.",
  },
];


export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-purple-950 via-purple-900 to-purple-800 text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 border-primary/50 text-primary">
              About XProtege
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Where Innovation Meets{" "}
              <span className="text-primary">Execution</span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
              We're a proudly woman- and minority-owned technology company delivering 
              innovative IT solutions that transform ideas into market-ready solutions.
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
                  At XProtege, our mission is to be a leader in the IT industry by delivering top-tier 
                  staffing solutions and expanding our footprint through bidding and securing contracts 
                  with the State of Maryland, federal agencies, and the commercial sector. Through our 
                  deep industry knowledge and results-driven approach, we connect exceptional IT talent 
                  with organizations while taking on complex projects that drive technological advancements.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-secondary/20">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-6">
                  <Eye className="h-6 w-6 text-secondary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                <p className="text-muted-foreground">
                  Our vision is to become a premier technology partner, recognized for our excellence 
                  in IT staffing, innovative solutions, and successful project execution across public 
                  and private sectors. We aspire to establish a strong presence in government contracting 
                  by continuing to secure and deliver high-impact projects as a prime contractor with 
                  the State of Maryland, while expanding into federal and commercial markets.
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
                Welcome to XProtege, where innovation seamlessly integrates with execution. We are a 
                team of highly skilled professionals committed to transforming your ideas into impactful, 
                market-ready solutions. With expertise in comprehensive product development, we guide 
                you through every phase of the lifecycle, from initial concept to successful launch.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mt-6">
                Our success is driven by a strong foundation of experience, industry knowledge, and a 
                dedication to delivering measurable results. At XProtege, we don't just develop products—we 
                build the future of your business. We combine deep industry knowledge, technology expertise, 
                and a passion for innovation to deliver value-driven solutions tailored to your needs.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mt-6">
                As a company that has already bid on multiple contracts with the State of Maryland as a 
                prime contractor, we are committed to leveraging our expertise to drive success in both 
                workforce solutions and project execution. With a strong foundation built on integrity, 
                innovation, and collaboration, XProtege is dedicated to becoming a trusted partner for 
                public and private sector clients.
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
              Contact Us Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}

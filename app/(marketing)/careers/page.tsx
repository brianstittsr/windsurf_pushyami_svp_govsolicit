import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JobListings } from "@/components/marketing/job-listings";
import { 
  Briefcase, 
  ArrowRight,
  Heart,
  Zap,
  Users,
  GraduationCap,
  Globe,
  Shield
} from "lucide-react";

export const metadata: Metadata = {
  title: "Careers | XProtege",
  description: "Join the XProtege team. Explore exciting career opportunities in AI, cloud, cybersecurity, and digital transformation.",
};

const benefits = [
  {
    icon: Heart,
    title: "Comprehensive Benefits",
    description: "Health, dental, vision insurance plus 401(k) with company match"
  },
  {
    icon: Zap,
    title: "Growth Opportunities",
    description: "Professional development budget and paid certifications"
  },
  {
    icon: Users,
    title: "Collaborative Culture",
    description: "Work with talented professionals on impactful projects"
  },
  {
    icon: GraduationCap,
    title: "Continuous Learning",
    description: "Access to training, conferences, and learning resources"
  },
  {
    icon: Globe,
    title: "Flexible Work",
    description: "Remote and hybrid options to support work-life balance"
  },
  {
    icon: Shield,
    title: "Meaningful Work",
    description: "Contribute to projects that protect and serve our nation"
  }
];

export default function CareersPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-50 via-white to-sky-50 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-sky-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />
        
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-sky-100 text-sky-700 hover:bg-sky-100">
              <Briefcase className="w-3 h-3 mr-1" />
              Join Our Team
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Build Your{" "}
              <span className="text-sky-500">Career</span> at XProtege
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Join a team of innovators transforming how organizations leverage 
              technology. We're looking for talented individuals passionate about 
              AI, cloud, cybersecurity, and digital transformation.
            </p>
            <Button size="lg" className="bg-sky-500 hover:bg-sky-600" asChild>
              <a href="#openings">
                View Open Positions
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Join XProtege?
            </h2>
            <p className="text-lg text-slate-600">
              We offer more than just a job – we offer a career where you can grow, 
              make an impact, and be part of something meaningful.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-4 p-6 rounded-lg border border-slate-200 hover:border-sky-300 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center shrink-0">
                  <benefit.icon className="h-6 w-6 text-sky-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">{benefit.title}</h3>
                  <p className="text-sm text-slate-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="openings" className="py-20 bg-slate-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Open Positions
            </h2>
            <p className="text-lg text-slate-600">
              Find your next opportunity. We're always looking for talented 
              individuals to join our growing team.
            </p>
          </div>
          
          <JobListings showViewAll={false} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Don't See the Right Fit?
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              We're always interested in hearing from talented professionals. 
              Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-sky-500 hover:bg-sky-600" asChild>
                <Link href="/contact">
                  Submit Your Resume
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <Link href="/about">
                  Learn About Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

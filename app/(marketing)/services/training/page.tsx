import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Users, 
  Monitor, 
  Award, 
  ArrowRight,
  CheckCircle,
  BookOpen,
  Laptop,
  Target,
  Calendar
} from "lucide-react";

export const metadata: Metadata = {
  title: "Training Services | XProtege",
  description: "Professional training programs in Project Management, Information Technology, and Business Development. Classroom, hands-on, and e-learning formats available.",
};

const trainingPrograms = [
  {
    icon: Target,
    title: "Project Management",
    description: "Comprehensive PM training covering methodologies, tools, and best practices for successful project delivery.",
    features: ["PMP preparation", "Agile/Scrum certification", "Risk management", "Stakeholder management"]
  },
  {
    icon: Laptop,
    title: "Information Technology",
    description: "Technical training programs covering cloud, security, development, and emerging technologies.",
    features: ["Cloud certifications", "Cybersecurity training", "DevOps practices", "AI/ML fundamentals"]
  },
  {
    icon: Users,
    title: "Business Development",
    description: "Strategic training for government contracting, proposal writing, and business growth.",
    features: ["GovCon fundamentals", "Proposal writing", "Capture management", "Contract management"]
  },
  {
    icon: BookOpen,
    title: "Custom Training",
    description: "Tailored training programs designed to meet your organization's specific needs and objectives.",
    features: ["Needs assessment", "Custom curriculum", "On-site delivery", "Progress tracking"]
  }
];

const benefits = [
  { metric: "500+", label: "Professionals trained" },
  { metric: "95%", label: "Satisfaction rate" },
  { metric: "40+", label: "Course offerings" },
  { metric: "3", label: "Delivery formats" },
];

const certifications = [
  "PMP Certification Prep",
  "CompTIA Security+",
  "AWS Certified",
  "Azure Certifications",
  "Scrum Master (CSM)",
  "ITIL Foundation",
  "Six Sigma",
  "CISSP Prep"
];

export default function TrainingPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-50 via-white to-teal-50 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl" />
        
        <div className="container relative">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-teal-100 text-teal-700 hover:bg-teal-100">
              <GraduationCap className="w-3 h-3 mr-1" />
              Professional Development
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Training{" "}
              <span className="text-teal-500">Services</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl">
              Comprehensive training programs in Project Management, Information Technology, 
              and Business Development. Available through classroom, hands-on, and 
              e-learning formats to fit your team's needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-teal-500 hover:bg-teal-600" asChild>
                <Link href="/contact">
                  Explore Training Programs
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">
                  Request Custom Training
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
                <div className="text-3xl md:text-4xl font-bold text-teal-400">{benefit.metric}</div>
                <div className="text-sm text-slate-300">{benefit.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Training Programs
            </h2>
            <p className="text-lg text-slate-600">
              From certification prep to custom corporate training, we offer programs 
              designed to elevate your team's skills and capabilities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {trainingPrograms.map((program, index) => (
              <Card key={index} className="border-slate-200 hover:border-teal-300 hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                    <program.icon className="h-6 w-6 text-teal-600" />
                  </div>
                  <CardTitle className="text-xl">{program.title}</CardTitle>
                  <CardDescription className="text-base">{program.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle className="h-4 w-4 text-teal-500" />
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
                Certification Preparation
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Prepare your team for industry-recognized certifications with our 
                expert-led training programs and comprehensive study materials.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-slate-200">
                    <Award className="h-5 w-5 text-teal-500" />
                    <span className="text-sm font-medium text-slate-700">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Flexible Delivery Options</h3>
              <p className="mb-6 opacity-90">
                Choose the training format that works best for your team - we offer 
                multiple delivery options to accommodate different learning styles and schedules.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <Monitor className="h-5 w-5" />
                  Live virtual instructor-led
                </li>
                <li className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  On-site classroom training
                </li>
                <li className="flex items-center gap-2">
                  <Laptop className="h-5 w-5" />
                  Self-paced e-learning
                </li>
              </ul>
              <Button variant="secondary" className="w-full" asChild>
                <Link href="/contact">Discuss Training Needs</Link>
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
              Invest in Your Team's Growth
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Contact us to discuss your training requirements and discover how 
              XProtege can help develop your team's capabilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-teal-500 hover:bg-teal-600" asChild>
                <Link href="/contact">
                  Request Training Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <Link href="/contact">
                  Download Course Catalog
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

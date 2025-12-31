import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Linkedin, Mail, Award, Users, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "Leadership Team | XProtege",
  description:
    "Meet the XProtege leadership team - experienced technology leaders driving digital transformation for federal and commercial organizations.",
};

const leadershipTeam = [
  {
    name: "Pushyami Duvvuri",
    title: "President & Founder",
    bio: "A dynamic and accomplished leader with a passion for both business innovation and community impact. With over 24 years of experience in IT consulting, Pushyami has demonstrated exceptional leadership in the tech industry, providing innovative product development solutions and helping clients achieve business success.",
    expertise: [
      "IT Leadership",
      "Federal Contracting",
      "Digital Transformation",
      "Cloud Solutions",
      "Strategic Planning",
    ],
    additionalRoles: "President – ITServ Alliance, Maryland Chapter | President and Founder – Janayitri Foundation",
  },
];

const companyValues = [
  {
    icon: Target,
    title: "Client-Centric Approach",
    description: "We put our clients' success at the center of everything we do, delivering tailored solutions that address unique challenges."
  },
  {
    icon: Award,
    title: "Excellence in Delivery",
    description: "Our commitment to quality ensures every project meets the highest standards of performance and reliability."
  },
  {
    icon: Users,
    title: "Collaborative Partnership",
    description: "We work alongside our clients as true partners, fostering long-term relationships built on trust and mutual success."
  }
];

const certifications = [
  "CompTIA Security+",
  "CompTIA Cloud+",
  "CompTIA Cybersecurity Analyst+",
  "PMP Certified",
  "Certified Scrum Master (CSM)",
  "ITIL v3",
  "CISA",
  "SSCP"
];

export default function LeadershipPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-50 via-white to-sky-50 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-sky-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />
        
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-sky-100 text-sky-700 hover:bg-sky-100">
              <Users className="w-3 h-3 mr-1" />
              Our Leadership
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Leadership{" "}
              <span className="text-sky-500">Team</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Experienced technology leaders driving digital transformation and 
              delivering excellence for federal and commercial organizations.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {leadershipTeam.map((member) => (
              <Card key={member.name} className="overflow-hidden border-slate-200 shadow-lg">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-3 gap-0">
                    <div className="bg-gradient-to-br from-sky-500 to-cyan-500 p-8 text-white flex flex-col justify-center items-center text-center">
                      <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center text-5xl font-bold mb-4">
                        {member.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                      </div>
                      <h3 className="text-2xl font-bold">{member.name}</h3>
                      <p className="text-sky-100 font-medium mt-1">{member.title}</p>
                    </div>
                    
                    <div className="md:col-span-2 p-8">
                      <p className="text-slate-600 mb-6">{member.bio}</p>
                      
                      <div className="mb-6">
                        <h4 className="font-semibold text-slate-800 mb-3">Areas of Expertise</h4>
                        <div className="flex flex-wrap gap-2">
                          {member.expertise.map((skill) => (
                            <Badge 
                              key={skill} 
                              variant="secondary" 
                              className="bg-sky-100 text-sky-700"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="text-sm text-slate-500">
                        <strong>Additional Roles:</strong> {member.additionalRoles}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-slate-600">
              The principles that guide our work and relationships with clients.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {companyValues.map((value, index) => (
              <Card key={index} className="border-slate-200 text-center">
                <CardContent className="pt-8">
                  <div className="w-14 h-14 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-7 w-7 text-sky-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{value.title}</h3>
                  <p className="text-slate-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Certifications */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Team Certifications
            </h2>
            <p className="text-lg text-slate-600">
              Our team holds industry-leading certifications across technology domains.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="px-4 py-2 text-sm border-sky-300 text-sky-700"
              >
                <Award className="w-4 h-4 mr-2" />
                {cert}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Work With Our Team?
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Schedule a free consultation to discuss how our experienced team can help 
              transform your IT operations and drive business success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-sky-500 hover:bg-sky-600" asChild>
                <Link href="/contact">
                  Schedule a Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <Link href="/calculator">
                  Try IT Calculator
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

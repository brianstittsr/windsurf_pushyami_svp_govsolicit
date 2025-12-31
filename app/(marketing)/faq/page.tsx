import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  HelpCircle,
  ArrowRight,
  MessageSquare,
  Phone
} from "lucide-react";

export const metadata: Metadata = {
  title: "FAQ | XProtege",
  description: "Frequently asked questions about XProtege's IT services, cloud solutions, cybersecurity, and federal contracting capabilities.",
};

const faqCategories = [
  {
    category: "General",
    questions: [
      {
        question: "What services does XProtege offer?",
        answer: "XProtege provides comprehensive IT solutions including Artificial Intelligence, Cloud Services, Cybersecurity, Data Analytics & Engineering, Digital Modernization, Enterprise IT, ERP Implementations, and Professional Training. We serve both federal agencies and commercial organizations."
      },
      {
        question: "Is XProtege a certified small business?",
        answer: "Yes, XProtege is a Woman-Owned and Minority-Owned Small Business. We are also a State of Maryland contractor and hold GovCloud IL6 certification for secure federal deployments."
      },
      {
        question: "What industries does XProtege serve?",
        answer: "We serve federal government agencies (DoD, civilian agencies), state and local governments, healthcare organizations, financial services, manufacturing, technology companies, and educational institutions."
      },
      {
        question: "Where is XProtege located?",
        answer: "XProtege is headquartered in Ellicott City, Maryland. We serve clients nationwide and have the capability to support remote and on-site engagements."
      }
    ]
  },
  {
    category: "Cloud & Security",
    questions: [
      {
        question: "What cloud platforms does XProtege support?",
        answer: "We support all major cloud platforms including AWS (including GovCloud), Microsoft Azure (including Azure Government), and Google Cloud Platform. Our team holds certifications across these platforms."
      },
      {
        question: "What is GovCloud IL6 certification?",
        answer: "Impact Level 6 (IL6) is the highest security classification for cloud environments handling classified information up to SECRET. XProtege is certified to deploy and manage workloads in IL6 environments, meeting DoD's strictest security requirements."
      },
      {
        question: "Can XProtege help with FedRAMP authorization?",
        answer: "Yes, we provide comprehensive FedRAMP support including gap assessments, documentation, continuous monitoring setup, and ATO acceleration services. Our methodology can reduce authorization timelines by up to 60%."
      },
      {
        question: "What cybersecurity frameworks do you support?",
        answer: "We support NIST Cybersecurity Framework, NIST 800-53, DISA STIGs, FedRAMP, FISMA, CMMC, Zero Trust Architecture, and ISO 27001. Our team can help you achieve and maintain compliance with any of these frameworks."
      }
    ]
  },
  {
    category: "AI & Data",
    questions: [
      {
        question: "What AI services does XProtege provide?",
        answer: "Our AI services include Generative AI (LLMs), Machine Learning Operations (MLOps), Natural Language Processing (NLP), Robotic Process Automation (RPA), and custom AI solution development. We help organizations implement AI responsibly and securely."
      },
      {
        question: "Can XProtege deploy AI in secure government environments?",
        answer: "Yes, we specialize in deploying AI solutions in secure federal environments including GovCloud. Our AI implementations meet FedRAMP, FISMA, and DoD security requirements."
      },
      {
        question: "What data analytics tools do you work with?",
        answer: "We work with Python, PySpark, R, PowerBI, Tableau, Azure Synapse, AWS Redshift, Snowflake, Databricks, and other leading analytics platforms. We help organizations build end-to-end data pipelines and visualization solutions."
      }
    ]
  },
  {
    category: "Engagement & Pricing",
    questions: [
      {
        question: "How do I get started with XProtege?",
        answer: "Contact us to schedule a free consultation. We'll discuss your requirements, assess your current state, and provide recommendations tailored to your needs. There's no obligation, and we'll help you understand the best path forward."
      },
      {
        question: "What contract vehicles does XProtege hold?",
        answer: "We hold various contract vehicles including GSA MAS and state-level contracts. Contact us to discuss the best procurement approach for your organization."
      },
      {
        question: "Does XProtege offer fixed-price or time-and-materials engagements?",
        answer: "We offer flexible engagement models including fixed-price, time-and-materials, and managed services arrangements. We'll work with you to determine the best model for your project scope and requirements."
      },
      {
        question: "What is the typical timeline for a project?",
        answer: "Project timelines vary based on scope and complexity. A cloud migration might take 3-6 months, while an AI pilot could be completed in 6-8 weeks. During our initial consultation, we'll provide a realistic timeline based on your specific requirements."
      }
    ]
  }
];

export default function FAQPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-50 via-white to-sky-50 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-sky-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />
        
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-sky-100 text-sky-700 hover:bg-sky-100">
              <HelpCircle className="w-3 h-3 mr-1" />
              Help Center
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Frequently Asked{" "}
              <span className="text-sky-500">Questions</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Find answers to common questions about XProtege's services, capabilities, 
              and how we can help your organization succeed.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">{category.category}</h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem 
                      key={faqIndex} 
                      value={`${categoryIndex}-${faqIndex}`}
                      className="border border-slate-200 rounded-lg px-6"
                    >
                      <AccordionTrigger className="text-left font-medium text-slate-800 hover:text-sky-600">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-600 pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Card className="border-slate-200 overflow-hidden">
              <div className="grid md:grid-cols-2">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    Still Have Questions?
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Can't find what you're looking for? Our team is here to help. 
                    Reach out and we'll get back to you within 24 hours.
                  </p>
                  <div className="space-y-4">
                    <Button className="w-full bg-sky-500 hover:bg-sky-600" asChild>
                      <Link href="/contact">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Contact Us
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="tel:+1-510-435-7930">
                        <Phone className="mr-2 h-4 w-4" />
                        Call +1-510-435-7930
                      </Link>
                    </Button>
                  </div>
                </CardContent>
                <div className="bg-gradient-to-br from-sky-500 to-cyan-500 p-8 text-white flex flex-col justify-center">
                  <h4 className="text-xl font-bold mb-4">Free Consultation</h4>
                  <p className="opacity-90 mb-6">
                    Schedule a 45-minute strategy session with our experts to discuss 
                    your specific needs and get personalized recommendations.
                  </p>
                  <Button variant="secondary" asChild>
                    <Link href="/contact">
                      Schedule Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Take the first step toward transforming your IT operations. 
              Try our free IT calculator or schedule a consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-sky-500 hover:bg-sky-600" asChild>
                <Link href="/calculator">
                  Try IT Calculator
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <Link href="/contact">
                  Schedule Consultation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

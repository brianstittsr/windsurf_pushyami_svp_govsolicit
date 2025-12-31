import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  Brain, 
  Cpu, 
  Sparkles, 
  Zap, 
  TrendingUp, 
  Shield, 
  ArrowRight,
  CheckCircle,
  MessageSquare,
  BarChart3,
  Cog
} from "lucide-react";

export const metadata: Metadata = {
  title: "Artificial Intelligence Services | XProtege",
  description: "Transform your business with XProtege's AI solutions including Generative AI, MLOps, NLP, and intelligent automation. GovCloud IL6 certified AI services.",
};

const aiCapabilities = [
  {
    icon: Sparkles,
    title: "Generative AI (LLMs)",
    description: "Leverage cutting-edge large language models for content generation, code assistance, and intelligent document processing.",
    features: ["Custom LLM fine-tuning", "RAG implementations", "AI-powered chatbots", "Document intelligence"]
  },
  {
    icon: Cog,
    title: "Machine Learning Operations (MLOps)",
    description: "Build scalable, production-ready ML pipelines with automated training, deployment, and monitoring.",
    features: ["Model lifecycle management", "Automated retraining", "A/B testing frameworks", "Performance monitoring"]
  },
  {
    icon: MessageSquare,
    title: "Natural Language Processing",
    description: "Extract insights from unstructured text data with advanced NLP capabilities.",
    features: ["Sentiment analysis", "Entity extraction", "Text classification", "Language translation"]
  },
  {
    icon: Bot,
    title: "Robotic Process Automation",
    description: "Automate repetitive tasks and workflows with intelligent bots that learn and adapt.",
    features: ["Workflow automation", "Data entry automation", "Process optimization", "Exception handling"]
  }
];

const benefits = [
  { metric: "40%", label: "Reduction in manual tasks" },
  { metric: "60%", label: "Faster decision making" },
  { metric: "3x", label: "Productivity improvement" },
  { metric: "24/7", label: "Automated operations" },
];

const useCases = [
  "Intelligent document processing for federal agencies",
  "Predictive analytics for resource optimization",
  "AI-powered customer service automation",
  "Fraud detection and anomaly identification",
  "Natural language search and knowledge management",
  "Automated compliance monitoring"
];

export default function ArtificialIntelligencePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-50 via-white to-sky-50 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-sky-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />
        
        <div className="container relative">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-sky-100 text-sky-700 hover:bg-sky-100">
              <Brain className="w-3 h-3 mr-1" />
              AI & Machine Learning
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Artificial Intelligence{" "}
              <span className="text-sky-500">Solutions</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl">
              Transform your operations with intelligent automation. XProtege delivers 
              enterprise-grade AI solutions that drive efficiency, reduce costs, and 
              unlock new possibilities for federal and commercial organizations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-sky-500 hover:bg-sky-600" asChild>
                <Link href="/calculator">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Calculate Your AI ROI
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">
                  Schedule AI Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
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
                <div className="text-3xl md:text-4xl font-bold text-sky-400">{benefit.metric}</div>
                <div className="text-sm text-slate-300">{benefit.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              AI Capabilities That Drive Results
            </h2>
            <p className="text-lg text-slate-600">
              From generative AI to intelligent automation, our comprehensive AI services 
              help organizations harness the power of machine intelligence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {aiCapabilities.map((capability, index) => (
              <Card key={index} className="border-slate-200 hover:border-sky-300 hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4">
                    <capability.icon className="h-6 w-6 text-sky-600" />
                  </div>
                  <CardTitle className="text-xl">{capability.title}</CardTitle>
                  <CardDescription className="text-base">{capability.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {capability.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle className="h-4 w-4 text-sky-500" />
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

      {/* Use Cases */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Real-World AI Applications
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Our AI solutions are deployed across federal agencies and commercial 
                enterprises, delivering measurable impact and transformative results.
              </p>
              <ul className="space-y-4">
                {useCases.map((useCase, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-slate-700">{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-sky-500 to-cyan-500 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">GovCloud IL6 Certified</h3>
              <p className="mb-6 opacity-90">
                Our AI solutions meet the highest security standards for federal 
                deployments, including FedRAMP High and DoD IL6 requirements.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  DISA STIG Compliant
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  FedRAMP Authorized
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Zero Trust Architecture
                </li>
              </ul>
              <Button variant="secondary" className="w-full" asChild>
                <Link href="/contact">Learn About Secure AI Deployment</Link>
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
              Ready to Unlock the Power of AI?
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Schedule a free consultation with our AI experts to discover how 
              intelligent automation can transform your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-sky-500 hover:bg-sky-600" asChild>
                <Link href="/contact">
                  Schedule Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <Link href="/calculator">
                  Try Our AI ROI Calculator
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

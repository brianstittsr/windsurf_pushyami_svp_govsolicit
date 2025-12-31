import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Database, 
  Layers, 
  Settings, 
  Users, 
  ArrowRight,
  CheckCircle,
  Building,
  Workflow,
  BarChart3,
  Cog
} from "lucide-react";

export const metadata: Metadata = {
  title: "ERP Implementations | XProtege",
  description: "Enterprise ERP implementation services including SAP and Microsoft Dynamics 365. Strategic consulting, system integration, and managed services.",
};

const erpServices = [
  {
    icon: Layers,
    title: "SAP Implementation",
    description: "End-to-end SAP implementation services from planning to go-live and beyond.",
    features: ["S/4HANA migrations", "Module implementation", "Custom development", "Integration services"]
  },
  {
    icon: Building,
    title: "Microsoft Dynamics 365",
    description: "Comprehensive Dynamics 365 solutions for finance, operations, and customer engagement.",
    features: ["D365 Finance & Operations", "Power Platform integration", "Custom apps", "Azure integration"]
  },
  {
    icon: Workflow,
    title: "Business Process Optimization",
    description: "Streamline operations with process analysis, redesign, and automation.",
    features: ["Process mapping", "Gap analysis", "Workflow automation", "Change management"]
  },
  {
    icon: Cog,
    title: "ERP Managed Services",
    description: "Ongoing support and optimization to maximize your ERP investment.",
    features: ["24/7 support", "Performance tuning", "Upgrade management", "User training"]
  }
];

const benefits = [
  { metric: "30%", label: "Operational efficiency" },
  { metric: "25%", label: "Cost reduction" },
  { metric: "50%", label: "Faster reporting" },
  { metric: "99%", label: "Data accuracy" },
];

const platforms = [
  "SAP S/4HANA",
  "SAP ECC",
  "Microsoft Dynamics 365",
  "Power Platform",
  "Azure Services",
  "SAP Business One",
  "SAP SuccessFactors",
  "D365 Business Central"
];

export default function ERPPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-50 via-white to-indigo-50 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl" />
        
        <div className="container relative">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-indigo-100 text-indigo-700 hover:bg-indigo-100">
              <Database className="w-3 h-3 mr-1" />
              Enterprise Solutions
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              ERP{" "}
              <span className="text-indigo-500">Implementations</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl">
              Robust ERP implementation services including SAP and Microsoft Dynamics 365 
              with strategic consulting, system integration, and managed services that 
              drive operational excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-indigo-500 hover:bg-indigo-600" asChild>
                <Link href="/contact">
                  Discuss ERP Requirements
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/calculator">
                  Calculate ERP ROI
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
                <div className="text-3xl md:text-4xl font-bold text-indigo-400">{benefit.metric}</div>
                <div className="text-sm text-slate-300">{benefit.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Complete ERP Solutions
            </h2>
            <p className="text-lg text-slate-600">
              From initial assessment to ongoing optimization, we deliver ERP solutions 
              that transform your business operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {erpServices.map((service, index) => (
              <Card key={index} className="border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle className="h-4 w-4 text-indigo-500" />
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

      {/* Platforms */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Platform Expertise
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Our certified consultants have deep expertise across leading ERP 
                platforms, ensuring successful implementations regardless of your choice.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {platforms.map((platform, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-slate-200">
                    <Database className="h-5 w-5 text-indigo-500" />
                    <span className="text-sm font-medium text-slate-700">{platform}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Power Platform Solutions</h3>
              <p className="mb-6 opacity-90">
                Extend your ERP capabilities with Microsoft Power Platform - build 
                custom apps, automate workflows, and create powerful analytics.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Power Apps development
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Power Automate workflows
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Power BI dashboards
                </li>
              </ul>
              <Button variant="secondary" className="w-full" asChild>
                <Link href="/contact">Explore Power Platform</Link>
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
              Ready to Transform Your Operations?
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Schedule a consultation to discuss your ERP needs and discover how 
              XProtege can help you achieve operational excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-indigo-500 hover:bg-indigo-600" asChild>
                <Link href="/contact">
                  Schedule ERP Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <Link href="/calculator">
                  Calculate Your ROI
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

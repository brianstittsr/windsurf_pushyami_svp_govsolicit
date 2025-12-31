import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Database, 
  TrendingUp, 
  PieChart, 
  ArrowRight,
  CheckCircle,
  LineChart,
  Layers,
  Gauge,
  FileSpreadsheet
} from "lucide-react";

export const metadata: Metadata = {
  title: "Data Analytics & Engineering | XProtege",
  description: "Transform data into actionable insights with XProtege's analytics services. Executive dashboards, KPIs, data engineering, and business intelligence solutions.",
};

const analyticsServices = [
  {
    icon: Gauge,
    title: "Executive Dashboards",
    description: "Real-time visibility into key metrics with interactive dashboards designed for decision-makers.",
    features: ["Custom KPI tracking", "Real-time updates", "Drill-down capabilities", "Mobile-friendly design"]
  },
  {
    icon: Database,
    title: "Data Engineering",
    description: "Build robust data pipelines and infrastructure to support your analytics initiatives.",
    features: ["ETL/ELT pipelines", "Data lake architecture", "Stream processing", "Data quality management"]
  },
  {
    icon: LineChart,
    title: "Business Intelligence",
    description: "Turn raw data into strategic insights with advanced BI tools and methodologies.",
    features: ["PowerBI implementation", "Tableau solutions", "Self-service analytics", "Report automation"]
  },
  {
    icon: Layers,
    title: "Advanced Analytics",
    description: "Leverage predictive and prescriptive analytics to anticipate trends and optimize outcomes.",
    features: ["Predictive modeling", "Statistical analysis", "What-if scenarios", "Optimization algorithms"]
  }
];

const benefits = [
  { metric: "60%", label: "Faster insights" },
  { metric: "85%", label: "Data accuracy" },
  { metric: "3x", label: "ROI on analytics" },
  { metric: "40%", label: "Cost reduction" },
];

const technologies = [
  "Python & PySpark",
  "R & Statistical Tools",
  "PowerBI & Tableau",
  "Azure Synapse",
  "AWS Redshift",
  "Snowflake",
  "Apache Kafka",
  "Databricks"
];

export default function DataAnalyticsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-50 via-white to-violet-50 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl" />
        
        <div className="container relative">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-violet-100 text-violet-700 hover:bg-violet-100">
              <BarChart3 className="w-3 h-3 mr-1" />
              Data & Analytics
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Data Analytics &{" "}
              <span className="text-violet-500">Engineering</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl">
              Transform your data into a strategic asset. XProtege delivers end-to-end 
              analytics solutions that turn complex data into actionable insights, 
              empowering better decisions across your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-violet-500 hover:bg-violet-600" asChild>
                <Link href="/contact">
                  Start Analytics Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/calculator">
                  Calculate Analytics ROI
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
                <div className="text-3xl md:text-4xl font-bold text-violet-400">{benefit.metric}</div>
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
              End-to-End Analytics Solutions
            </h2>
            <p className="text-lg text-slate-600">
              From data engineering to executive dashboards, we provide comprehensive 
              analytics services that drive measurable business outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {analyticsServices.map((service, index) => (
              <Card key={index} className="border-slate-200 hover:border-violet-300 hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-violet-600" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle className="h-4 w-4 text-violet-500" />
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

      {/* Technologies */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Modern Analytics Stack
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                We leverage the latest technologies and platforms to build scalable, 
                performant analytics solutions that grow with your organization.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {technologies.map((tech, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-slate-200">
                    <Database className="h-5 w-5 text-violet-500" />
                    <span className="text-sm font-medium text-slate-700">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Data-Driven Decision Making</h3>
              <p className="mb-6 opacity-90">
                Empower your leadership with real-time insights and predictive analytics 
                that drive strategic decisions and operational excellence.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Custom KPI frameworks
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Automated reporting
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Predictive insights
                </li>
              </ul>
              <Button variant="secondary" className="w-full" asChild>
                <Link href="/contact">Request Analytics Demo</Link>
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
              Ready to Unlock Your Data's Potential?
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Schedule a consultation to discover how XProtege can transform your 
              data into a competitive advantage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-violet-500 hover:bg-violet-600" asChild>
                <Link href="/contact">
                  Schedule Analytics Consultation
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

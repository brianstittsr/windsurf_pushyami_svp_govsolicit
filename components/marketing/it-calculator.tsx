"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Calculator, 
  Building2, 
  Users, 
  Cloud, 
  Shield, 
  Bot, 
  TrendingUp, 
  DollarSign,
  Clock,
  CheckCircle,
  ArrowRight,
  Download,
  Mail,
  Sparkles
} from "lucide-react";

interface CalculatorInputs {
  companySize: string;
  industry: string;
  employees: number;
  currentITSpend: number;
  cloudAdoption: number;
  securityMaturity: string;
  aiReadiness: string;
}

interface ReportData {
  potentialSavings: number;
  securityRiskReduction: number;
  efficiencyGain: number;
  roiTimeline: string;
  recommendations: {
    title: string;
    description: string;
    impact: string;
    priority: "high" | "medium" | "low";
  }[];
  metrics: {
    label: string;
    current: string;
    projected: string;
    improvement: string;
  }[];
}

const industries = [
  { value: "federal", label: "Federal Government" },
  { value: "state", label: "State & Local Government" },
  { value: "healthcare", label: "Healthcare" },
  { value: "finance", label: "Financial Services" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "technology", label: "Technology" },
  { value: "education", label: "Education" },
  { value: "other", label: "Other" },
];

const companySizes = [
  { value: "startup", label: "Startup (1-50)", multiplier: 0.8 },
  { value: "small", label: "Small Business (51-200)", multiplier: 1.0 },
  { value: "medium", label: "Mid-Market (201-1000)", multiplier: 1.2 },
  { value: "enterprise", label: "Enterprise (1000+)", multiplier: 1.5 },
];

const securityLevels = [
  { value: "basic", label: "Basic - Minimal security measures" },
  { value: "developing", label: "Developing - Some policies in place" },
  { value: "established", label: "Established - Formal security program" },
  { value: "advanced", label: "Advanced - Mature security operations" },
];

const aiReadinessLevels = [
  { value: "exploring", label: "Exploring - Just learning about AI" },
  { value: "piloting", label: "Piloting - Running small experiments" },
  { value: "implementing", label: "Implementing - Active AI projects" },
  { value: "scaling", label: "Scaling - AI integrated in operations" },
];

function generateReport(inputs: CalculatorInputs): ReportData {
  const sizeMultiplier = companySizes.find(s => s.value === inputs.companySize)?.multiplier || 1;
  const baseSpend = inputs.currentITSpend * 1000;
  
  // Calculate potential savings based on inputs
  const cloudSavings = (100 - inputs.cloudAdoption) * 0.003 * baseSpend;
  const securitySavings = inputs.securityMaturity === "basic" ? baseSpend * 0.15 : 
                          inputs.securityMaturity === "developing" ? baseSpend * 0.10 : 
                          inputs.securityMaturity === "established" ? baseSpend * 0.05 : baseSpend * 0.02;
  const aiSavings = inputs.aiReadiness === "exploring" ? baseSpend * 0.20 :
                    inputs.aiReadiness === "piloting" ? baseSpend * 0.15 :
                    inputs.aiReadiness === "implementing" ? baseSpend * 0.08 : baseSpend * 0.03;
  
  const totalSavings = (cloudSavings + securitySavings + aiSavings) * sizeMultiplier;
  
  // Security risk reduction
  const securityRisk = inputs.securityMaturity === "basic" ? 65 :
                       inputs.securityMaturity === "developing" ? 45 :
                       inputs.securityMaturity === "established" ? 25 : 10;
  
  // Efficiency gain
  const efficiencyGain = Math.min(45, (100 - inputs.cloudAdoption) * 0.3 + 
                         (inputs.aiReadiness === "exploring" ? 15 : inputs.aiReadiness === "piloting" ? 10 : 5));
  
  // ROI Timeline
  const roiTimeline = inputs.companySize === "enterprise" ? "6-9 months" :
                      inputs.companySize === "medium" ? "4-6 months" :
                      inputs.companySize === "small" ? "3-4 months" : "2-3 months";

  const recommendations = [];
  
  // Cloud recommendations
  if (inputs.cloudAdoption < 50) {
    recommendations.push({
      title: "Cloud Migration Strategy",
      description: "Accelerate your cloud journey with XProtege's GovCloud IL6 certified migration services. Move critical workloads to secure, scalable cloud infrastructure.",
      impact: `Potential ${Math.round((100 - inputs.cloudAdoption) * 0.4)}% reduction in infrastructure costs`,
      priority: "high" as const,
    });
  }
  
  // Security recommendations
  if (inputs.securityMaturity === "basic" || inputs.securityMaturity === "developing") {
    recommendations.push({
      title: "Cybersecurity Enhancement",
      description: "Implement DISA STIG compliant security controls with our certified cybersecurity team. Protect against evolving threats with 24/7 monitoring.",
      impact: `Reduce security incidents by up to ${securityRisk}%`,
      priority: "high" as const,
    });
  }
  
  // AI recommendations
  if (inputs.aiReadiness === "exploring" || inputs.aiReadiness === "piloting") {
    recommendations.push({
      title: "AI & Automation Integration",
      description: "Leverage Generative AI, MLOps, and intelligent automation to transform operations. Our AI experts will guide your journey from pilot to production.",
      impact: `Automate up to ${inputs.aiReadiness === "exploring" ? "40" : "25"}% of routine tasks`,
      priority: inputs.aiReadiness === "exploring" ? "high" as const : "medium" as const,
    });
  }
  
  // Data analytics
  recommendations.push({
    title: "Data Analytics & Insights",
    description: "Unlock actionable insights with executive dashboards, KPIs, and dynamic reporting using Python, PySpark, and PowerBI.",
    impact: "Improve decision-making speed by 60%",
    priority: "medium" as const,
  });
  
  // Digital modernization
  if (inputs.cloudAdoption < 70) {
    recommendations.push({
      title: "Digital Modernization",
      description: "Transform legacy systems into agile, future-ready solutions. Modernize within Azure and AWS GovCloud PaaS environments.",
      impact: "Reduce technical debt by 50%",
      priority: "medium" as const,
    });
  }

  const metrics = [
    {
      label: "Annual IT Spend",
      current: `$${(baseSpend / 1000).toFixed(0)}K`,
      projected: `$${((baseSpend - totalSavings) / 1000).toFixed(0)}K`,
      improvement: `-${Math.round((totalSavings / baseSpend) * 100)}%`,
    },
    {
      label: "Cloud Adoption",
      current: `${inputs.cloudAdoption}%`,
      projected: "85%+",
      improvement: `+${85 - inputs.cloudAdoption}%`,
    },
    {
      label: "Security Posture",
      current: inputs.securityMaturity.charAt(0).toUpperCase() + inputs.securityMaturity.slice(1),
      projected: "Advanced",
      improvement: `${securityRisk}% risk reduction`,
    },
    {
      label: "Operational Efficiency",
      current: "Baseline",
      projected: `+${Math.round(efficiencyGain)}%`,
      improvement: `${Math.round(efficiencyGain)}% gain`,
    },
  ];

  return {
    potentialSavings: Math.round(totalSavings),
    securityRiskReduction: securityRisk,
    efficiencyGain: Math.round(efficiencyGain),
    roiTimeline,
    recommendations,
    metrics,
  };
}

export function ITCalculator() {
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState<CalculatorInputs>({
    companySize: "",
    industry: "",
    employees: 100,
    currentITSpend: 500,
    cloudAdoption: 30,
    securityMaturity: "",
    aiReadiness: "",
  });
  const [report, setReport] = useState<ReportData | null>(null);
  const [email, setEmail] = useState("");
  const [showEmailCapture, setShowEmailCapture] = useState(false);

  const handleGenerateReport = () => {
    const generatedReport = generateReport(inputs);
    setReport(generatedReport);
    setStep(3);
  };

  const canProceedStep1 = inputs.companySize && inputs.industry;
  const canProceedStep2 = inputs.securityMaturity && inputs.aiReadiness;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  step >= s
                    ? "bg-sky-500 text-white"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                {step > s ? <CheckCircle className="h-5 w-5" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`w-16 h-1 mx-2 transition-all ${
                    step > s ? "bg-sky-500" : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Company Info */}
      {step === 1 && (
        <Card className="border-slate-200 shadow-lg">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mb-4">
              <Building2 className="h-8 w-8 text-sky-600" />
            </div>
            <CardTitle className="text-2xl">Tell Us About Your Organization</CardTitle>
            <CardDescription>
              Help us understand your business to provide accurate insights
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Company Size</Label>
                <Select
                  value={inputs.companySize}
                  onValueChange={(value) => setInputs({ ...inputs, companySize: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    {companySizes.map((size) => (
                      <SelectItem key={size.value} value={size.value}>
                        {size.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Industry</Label>
                <Select
                  value={inputs.industry}
                  onValueChange={(value) => setInputs({ ...inputs, industry: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry.value} value={industry.value}>
                        {industry.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Number of Employees: {inputs.employees}</Label>
              <Slider
                value={[inputs.employees]}
                onValueChange={(value) => setInputs({ ...inputs, employees: value[0] })}
                min={10}
                max={5000}
                step={10}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>10</span>
                <span>5,000+</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Annual IT Budget (in thousands): ${inputs.currentITSpend}K</Label>
              <Slider
                value={[inputs.currentITSpend]}
                onValueChange={(value) => setInputs({ ...inputs, currentITSpend: value[0] })}
                min={50}
                max={10000}
                step={50}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>$50K</span>
                <span>$10M+</span>
              </div>
            </div>

            <Button
              className="w-full bg-sky-500 hover:bg-sky-600"
              size="lg"
              disabled={!canProceedStep1}
              onClick={() => setStep(2)}
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Technology Assessment */}
      {step === 2 && (
        <Card className="border-slate-200 shadow-lg">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-cyan-600" />
            </div>
            <CardTitle className="text-2xl">Technology Assessment</CardTitle>
            <CardDescription>
              Evaluate your current technology landscape
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <div className="space-y-2">
              <Label>Current Cloud Adoption: {inputs.cloudAdoption}%</Label>
              <Slider
                value={[inputs.cloudAdoption]}
                onValueChange={(value) => setInputs({ ...inputs, cloudAdoption: value[0] })}
                min={0}
                max={100}
                step={5}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>0% (On-premise)</span>
                <span>100% (Cloud-native)</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Security Maturity Level</Label>
              <Select
                value={inputs.securityMaturity}
                onValueChange={(value) => setInputs({ ...inputs, securityMaturity: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select security maturity" />
                </SelectTrigger>
                <SelectContent>
                  {securityLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>AI & Automation Readiness</Label>
              <Select
                value={inputs.aiReadiness}
                onValueChange={(value) => setInputs({ ...inputs, aiReadiness: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select AI readiness" />
                </SelectTrigger>
                <SelectContent>
                  {aiReadinessLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button
                className="flex-1 bg-sky-500 hover:bg-sky-600"
                size="lg"
                disabled={!canProceedStep2}
                onClick={handleGenerateReport}
              >
                <Calculator className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Report */}
      {step === 3 && report && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="border-sky-200 bg-gradient-to-br from-sky-50 to-white">
              <CardContent className="pt-6 text-center">
                <DollarSign className="h-8 w-8 text-sky-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-sky-600">
                  ${(report.potentialSavings / 1000).toFixed(0)}K
                </div>
                <div className="text-sm text-slate-600">Potential Annual Savings</div>
              </CardContent>
            </Card>
            <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 to-white">
              <CardContent className="pt-6 text-center">
                <Shield className="h-8 w-8 text-cyan-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-cyan-600">
                  {report.securityRiskReduction}%
                </div>
                <div className="text-sm text-slate-600">Risk Reduction</div>
              </CardContent>
            </Card>
            <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-white">
              <CardContent className="pt-6 text-center">
                <TrendingUp className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-emerald-600">
                  +{report.efficiencyGain}%
                </div>
                <div className="text-sm text-slate-600">Efficiency Gain</div>
              </CardContent>
            </Card>
            <Card className="border-violet-200 bg-gradient-to-br from-violet-50 to-white">
              <CardContent className="pt-6 text-center">
                <Clock className="h-8 w-8 text-violet-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-violet-600">
                  {report.roiTimeline}
                </div>
                <div className="text-sm text-slate-600">ROI Timeline</div>
              </CardContent>
            </Card>
          </div>

          {/* Metrics Comparison */}
          <Card className="border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-sky-500" />
                Projected Improvements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {report.metrics.map((metric, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-slate-50 border border-slate-100"
                  >
                    <div className="text-sm font-medium text-slate-600 mb-2">
                      {metric.label}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-slate-500">Current</div>
                        <div className="font-semibold">{metric.current}</div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-sky-500" />
                      <div>
                        <div className="text-xs text-slate-500">Projected</div>
                        <div className="font-semibold text-sky-600">{metric.projected}</div>
                      </div>
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                        {metric.improvement}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-sky-500" />
                Personalized Recommendations
              </CardTitle>
              <CardDescription>
                Based on your assessment, here's how XProtege can help transform your IT operations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {report.recommendations.map((rec, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-slate-200 hover:border-sky-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-slate-800">{rec.title}</h4>
                    <Badge
                      variant={rec.priority === "high" ? "default" : "secondary"}
                      className={
                        rec.priority === "high"
                          ? "bg-sky-500"
                          : rec.priority === "medium"
                          ? "bg-slate-400"
                          : "bg-slate-300"
                      }
                    >
                      {rec.priority} priority
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{rec.description}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                    <span className="text-emerald-700 font-medium">{rec.impact}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* CTA Section */}
          <Card className="border-sky-300 bg-gradient-to-br from-sky-50 via-white to-cyan-50 shadow-lg">
            <CardContent className="pt-6">
              {!showEmailCapture ? (
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-bold text-slate-800">
                    Ready to Realize These Savings?
                  </h3>
                  <p className="text-slate-600 max-w-lg mx-auto">
                    Our experts at XProtege are ready to help you achieve these results. 
                    Schedule a free 45-minute strategy session to discuss your personalized roadmap.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Button
                      size="lg"
                      className="bg-sky-500 hover:bg-sky-600"
                      onClick={() => setShowEmailCapture(true)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Full Report
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-sky-300 text-sky-700 hover:bg-sky-50"
                      asChild
                    >
                      <a href="/contact">
                        Schedule Strategy Session
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="max-w-md mx-auto space-y-4">
                  <h3 className="text-xl font-bold text-slate-800 text-center">
                    Get Your Full Report
                  </h3>
                  <p className="text-sm text-slate-600 text-center">
                    Enter your email to receive a detailed PDF report with actionable insights
                  </p>
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1"
                    />
                    <Button className="bg-sky-500 hover:bg-sky-600">
                      <Mail className="mr-2 h-4 w-4" />
                      Send
                    </Button>
                  </div>
                  <p className="text-xs text-slate-500 text-center">
                    By submitting, you agree to receive communications from XProtege. 
                    We respect your privacy and won't share your information.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Start Over */}
          <div className="text-center">
            <Button
              variant="ghost"
              onClick={() => {
                setStep(1);
                setReport(null);
                setShowEmailCapture(false);
              }}
            >
              Start New Assessment
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

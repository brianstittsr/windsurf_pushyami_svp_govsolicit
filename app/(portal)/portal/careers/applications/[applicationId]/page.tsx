"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ArrowLeft,
  Mail,
  Phone,
  Linkedin,
  Globe,
  FileText,
  Download,
  Brain,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  User,
  Briefcase,
  Calendar,
  Loader2,
  Sparkles
} from "lucide-react";
import { JobApplication, APPLICATION_STATUSES } from "@/types/jobs";
import { getJobById } from "@/lib/jobs-data";

export default function ApplicationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const applicationId = params.applicationId as string;
  
  const [application, setApplication] = useState<JobApplication | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const storedApplications = localStorage.getItem("jobApplications");
    if (storedApplications) {
      const applications: JobApplication[] = JSON.parse(storedApplications);
      const found = applications.find(a => a.id === applicationId);
      if (found) {
        setApplication(found);
        setNotes(found.notes || "");
        setStatus(found.status);
      }
    }
  }, [applicationId]);

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    if (application) {
      const storedApplications = localStorage.getItem("jobApplications");
      if (storedApplications) {
        const applications: JobApplication[] = JSON.parse(storedApplications);
        const index = applications.findIndex(a => a.id === applicationId);
        if (index !== -1) {
          applications[index].status = newStatus as JobApplication["status"];
          applications[index].updatedAt = new Date().toISOString();
          localStorage.setItem("jobApplications", JSON.stringify(applications));
          setApplication(applications[index]);
        }
      }
    }
  };

  const handleSaveNotes = () => {
    if (application) {
      const storedApplications = localStorage.getItem("jobApplications");
      if (storedApplications) {
        const applications: JobApplication[] = JSON.parse(storedApplications);
        const index = applications.findIndex(a => a.id === applicationId);
        if (index !== -1) {
          applications[index].notes = notes;
          applications[index].updatedAt = new Date().toISOString();
          localStorage.setItem("jobApplications", JSON.stringify(applications));
          setApplication(applications[index]);
        }
      }
    }
  };

  const runAIAnalysis = async () => {
    if (!application) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const job = getJobById(application.jobId);
    
    // Generate mock AI analysis
    const aiAnalysis = {
      overallScore: Math.floor(Math.random() * 30) + 70,
      matchPercentage: Math.floor(Math.random() * 25) + 65,
      strengths: [
        "Strong technical background aligned with role requirements",
        "Relevant industry experience",
        "Good communication skills evident in cover letter"
      ],
      gaps: [
        "May need additional training on specific tools",
        "Security clearance status unclear"
      ],
      recommendation: "good_match" as const,
      skillsMatch: {
        matched: ["Cloud Architecture", "AWS", "Python", "Agile"],
        missing: ["Specific certification mentioned in requirements"],
        additional: ["Kubernetes", "Docker", "CI/CD"]
      },
      experienceMatch: {
        yearsRequired: job?.experience || "5+ years",
        yearsCandidate: 6,
        meetsRequirement: true
      },
      summary: "This candidate shows strong potential for the role with relevant experience and skills. Their background aligns well with the core requirements, though some specific certifications may need to be obtained. Recommend proceeding to interview stage."
    };

    // Update application with AI analysis
    const storedApplications = localStorage.getItem("jobApplications");
    if (storedApplications) {
      const applications: JobApplication[] = JSON.parse(storedApplications);
      const index = applications.findIndex(a => a.id === applicationId);
      if (index !== -1) {
        applications[index].aiScore = aiAnalysis.overallScore;
        applications[index].aiAnalysis = aiAnalysis;
        applications[index].updatedAt = new Date().toISOString();
        localStorage.setItem("jobApplications", JSON.stringify(applications));
        setApplication(applications[index]);
      }
    }
    
    setIsAnalyzing(false);
  };

  if (!application) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="max-w-md">
          <CardContent className="py-12 text-center">
            <AlertCircle className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-800 mb-2">Application Not Found</h2>
            <p className="text-slate-600 mb-6">This application may have been removed.</p>
            <Button asChild>
              <Link href="/portal/careers">Back to Careers</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = APPLICATION_STATUSES.find(s => s.value === status);
    return statusConfig ? (
      <Badge className={statusConfig.color}>{statusConfig.label}</Badge>
    ) : (
      <Badge variant="secondary">{status}</Badge>
    );
  };

  const getRecommendationBadge = (recommendation: string) => {
    switch (recommendation) {
      case "strong_match":
        return <Badge className="bg-emerald-100 text-emerald-700">Strong Match</Badge>;
      case "good_match":
        return <Badge className="bg-sky-100 text-sky-700">Good Match</Badge>;
      case "potential_match":
        return <Badge className="bg-yellow-100 text-yellow-700">Potential Match</Badge>;
      case "weak_match":
        return <Badge className="bg-red-100 text-red-700">Weak Match</Badge>;
      default:
        return <Badge variant="secondary">{recommendation}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/portal/careers">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            {application.firstName} {application.lastName}
          </h1>
          <p className="text-slate-600">Applied for {application.jobTitle}</p>
        </div>
        <div className="flex items-center gap-2">
          {getStatusBadge(application.status)}
          {application.aiScore && (
            <Badge className="bg-violet-100 text-violet-700">
              <Brain className="h-3 w-3 mr-1" />
              AI Score: {application.aiScore}%
            </Badge>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-500">Email</p>
                    <a href={`mailto:${application.email}`} className="text-sky-600 hover:underline">
                      {application.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-500">Phone</p>
                    <a href={`tel:${application.phone}`} className="text-sky-600 hover:underline">
                      {application.phone}
                    </a>
                  </div>
                </div>
                {application.linkedinUrl && (
                  <div className="flex items-center gap-3">
                    <Linkedin className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-500">LinkedIn</p>
                      <a href={application.linkedinUrl} target="_blank" className="text-sky-600 hover:underline">
                        View Profile
                      </a>
                    </div>
                  </div>
                )}
                {application.portfolioUrl && (
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-500">Portfolio</p>
                      <a href={application.portfolioUrl} target="_blank" className="text-sky-600 hover:underline">
                        View Website
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Resume */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Resume</CardTitle>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                <FileText className="h-8 w-8 text-slate-400" />
                <div>
                  <p className="font-medium">{application.resumeFileName || "resume.pdf"}</p>
                  <p className="text-sm text-slate-500">Uploaded on {new Date(application.appliedAt).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cover Letter */}
          {application.coverLetter && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cover Letter</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 whitespace-pre-wrap">{application.coverLetter}</p>
              </CardContent>
            </Card>
          )}

          {/* AI Analysis */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="h-5 w-5 text-violet-500" />
                  AI Analysis
                </CardTitle>
                <CardDescription>
                  AI-powered resume analysis and job match scoring
                </CardDescription>
              </div>
              {!application.aiAnalysis && (
                <Button onClick={runAIAnalysis} disabled={isAnalyzing}>
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Run Analysis
                    </>
                  )}
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {application.aiAnalysis ? (
                <div className="space-y-6">
                  {/* Score Overview */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-violet-50 rounded-lg text-center">
                      <p className="text-3xl font-bold text-violet-600">{application.aiAnalysis.overallScore}%</p>
                      <p className="text-sm text-violet-700">Overall Score</p>
                    </div>
                    <div className="p-4 bg-sky-50 rounded-lg text-center">
                      <p className="text-3xl font-bold text-sky-600">{application.aiAnalysis.matchPercentage}%</p>
                      <p className="text-sm text-sky-700">Job Match</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg text-center">
                      {getRecommendationBadge(application.aiAnalysis.recommendation)}
                      <p className="text-sm text-slate-600 mt-2">Recommendation</p>
                    </div>
                  </div>

                  {/* Summary */}
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">Summary</h4>
                    <p className="text-slate-600">{application.aiAnalysis.summary}</p>
                  </div>

                  {/* Skills Match */}
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-3">Skills Analysis</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-slate-500 mb-2">Matched Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {application.aiAnalysis.skillsMatch.matched.map((skill, i) => (
                            <Badge key={i} className="bg-emerald-100 text-emerald-700">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {application.aiAnalysis.skillsMatch.missing.length > 0 && (
                        <div>
                          <p className="text-sm text-slate-500 mb-2">Missing Skills</p>
                          <div className="flex flex-wrap gap-2">
                            {application.aiAnalysis.skillsMatch.missing.map((skill, i) => (
                              <Badge key={i} className="bg-red-100 text-red-700">
                                <XCircle className="h-3 w-3 mr-1" />
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      <div>
                        <p className="text-sm text-slate-500 mb-2">Additional Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {application.aiAnalysis.skillsMatch.additional.map((skill, i) => (
                            <Badge key={i} variant="outline">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Strengths & Gaps */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Strengths</h4>
                      <ul className="space-y-2">
                        {application.aiAnalysis.strengths.map((strength, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                            <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Areas of Concern</h4>
                      <ul className="space-y-2">
                        {application.aiAnalysis.gaps.map((gap, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                            <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5 shrink-0" />
                            {gap}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Brain className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600 mb-2">AI analysis not yet run</p>
                  <p className="text-sm text-slate-500">
                    Click "Run Analysis" to analyze this resume against the job requirements
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status & Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Status & Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Application Status</Label>
                <Select value={status} onValueChange={handleStatusChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {APPLICATION_STATUSES.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Internal Notes</Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes about this candidate..."
                  rows={4}
                />
                <Button onClick={handleSaveNotes} variant="outline" size="sm" className="w-full">
                  Save Notes
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Application Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Application Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Briefcase className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-500">Position</p>
                  <Link href={`/careers/${application.jobId}`} className="text-sky-600 hover:underline">
                    {application.jobTitle}
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-500">Applied On</p>
                  <p className="font-medium">{new Date(application.appliedAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-500">Last Updated</p>
                  <p className="font-medium">{new Date(application.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href={`mailto:${application.email}`}>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href={`tel:${application.phone}`}>
                  <Phone className="h-4 w-4 mr-2" />
                  Call Candidate
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

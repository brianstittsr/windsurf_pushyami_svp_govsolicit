"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  Upload,
  FileText,
  CheckCircle,
  Loader2,
  AlertCircle,
  Briefcase,
  MapPin
} from "lucide-react";
import { getJobById } from "@/lib/jobs-data";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  portfolioUrl: string;
  coverLetter: string;
  resume: File | null;
}

export default function ApplyPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.jobId as string;
  const job = getJobById(jobId);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    linkedinUrl: "",
    portfolioUrl: "",
    coverLetter: "",
    resume: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  if (!job) {
    return (
      <main className="min-h-screen bg-slate-50 py-20">
        <div className="container">
          <Card className="max-w-lg mx-auto">
            <CardContent className="py-12 text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-slate-800 mb-2">Job Not Found</h2>
              <p className="text-slate-600 mb-6">This position may no longer be available.</p>
              <Button asChild>
                <Link href="/careers">View All Jobs</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.resume) newErrors.resume = "Resume is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, resume: "File size must be less than 5MB" }));
        return;
      }
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, resume: "Please upload a PDF or Word document" }));
        return;
      }
      setFormData(prev => ({ ...prev, resume: file }));
      setErrors(prev => ({ ...prev, resume: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // In production, this would upload the resume and submit to an API
      // For now, we'll simulate the submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store application in localStorage for demo purposes
      const applications = JSON.parse(localStorage.getItem("jobApplications") || "[]");
      const newApplication = {
        id: `app-${Date.now()}`,
        jobId: job.id,
        jobTitle: job.title,
        ...formData,
        resumeFileName: formData.resume?.name,
        status: "new",
        appliedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      applications.push(newApplication);
      localStorage.setItem("jobApplications", JSON.stringify(applications));

      setSubmitStatus("success");
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <main className="min-h-screen bg-slate-50 py-20">
        <div className="container">
          <Card className="max-w-lg mx-auto">
            <CardContent className="py-12 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Application Submitted!</h2>
              <p className="text-slate-600 mb-6">
                Thank you for applying for the <strong>{job.title}</strong> position. 
                We'll review your application and get back to you soon.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="/careers">View More Jobs</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/">Return Home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-12">
        <div className="container">
          <Link 
            href={`/careers/${job.id}`}
            className="inline-flex items-center text-slate-300 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Job Details
          </Link>
          
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Apply for {job.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-slate-300 text-sm">
            <span className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" />
              {job.department}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {job.location}
            </span>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>Your Information</CardTitle>
                <CardDescription>
                  Please fill out the form below to apply for this position.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={errors.firstName ? "border-red-500" : ""}
                      />
                      {errors.firstName && (
                        <p className="text-sm text-red-500">{errors.firstName}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={errors.lastName ? "border-red-500" : ""}
                      />
                      {errors.lastName && (
                        <p className="text-sm text-red-500">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-500">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                      <Input
                        id="linkedinUrl"
                        name="linkedinUrl"
                        type="url"
                        placeholder="https://linkedin.com/in/..."
                        value={formData.linkedinUrl}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="portfolioUrl">Portfolio/Website</Label>
                      <Input
                        id="portfolioUrl"
                        name="portfolioUrl"
                        type="url"
                        placeholder="https://..."
                        value={formData.portfolioUrl}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  {/* Resume Upload */}
                  <div className="space-y-2">
                    <Label>Resume *</Label>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                        errors.resume 
                          ? "border-red-300 bg-red-50" 
                          : formData.resume 
                            ? "border-emerald-300 bg-emerald-50" 
                            : "border-slate-300 hover:border-sky-400 hover:bg-sky-50"
                      }`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      {formData.resume ? (
                        <div className="flex items-center justify-center gap-3">
                          <FileText className="h-8 w-8 text-emerald-600" />
                          <div className="text-left">
                            <p className="font-medium text-slate-800">{formData.resume.name}</p>
                            <p className="text-sm text-slate-500">
                              {(formData.resume.size / 1024).toFixed(1)} KB
                            </p>
                          </div>
                          <Badge className="bg-emerald-100 text-emerald-700">Uploaded</Badge>
                        </div>
                      ) : (
                        <>
                          <Upload className="h-10 w-10 text-slate-400 mx-auto mb-3" />
                          <p className="text-slate-600 font-medium">
                            Click to upload your resume
                          </p>
                          <p className="text-sm text-slate-500 mt-1">
                            PDF or Word document, max 5MB
                          </p>
                        </>
                      )}
                    </div>
                    {errors.resume && (
                      <p className="text-sm text-red-500">{errors.resume}</p>
                    )}
                  </div>

                  {/* Cover Letter */}
                  <div className="space-y-2">
                    <Label htmlFor="coverLetter">Cover Letter (Optional)</Label>
                    <Textarea
                      id="coverLetter"
                      name="coverLetter"
                      rows={6}
                      placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Submit */}
                  {submitStatus === "error" && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                      <p className="text-red-700">
                        There was an error submitting your application. Please try again.
                      </p>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-sky-500 hover:bg-sky-600"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting Application...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>

                  <p className="text-xs text-slate-500 text-center">
                    By submitting this application, you agree to our{" "}
                    <Link href="/privacy" className="text-sky-600 hover:underline">
                      Privacy Policy
                    </Link>{" "}
                    and consent to XProtege processing your personal data.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}

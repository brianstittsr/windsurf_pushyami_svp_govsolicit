import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft,
  MapPin, 
  Clock, 
  DollarSign, 
  Calendar,
  Building2,
  CheckCircle,
  Briefcase,
  ArrowRight
} from "lucide-react";
import { getJobById, getActiveJobs } from "@/lib/jobs-data";

interface JobDetailPageProps {
  params: Promise<{ jobId: string }>;
}

export async function generateMetadata({ params }: JobDetailPageProps): Promise<Metadata> {
  const { jobId } = await params;
  const job = getJobById(jobId);
  
  if (!job) {
    return { title: "Job Not Found | XProtege" };
  }

  return {
    title: `${job.title} | Careers | XProtege`,
    description: job.description,
  };
}

export async function generateStaticParams() {
  const jobs = getActiveJobs();
  return jobs.map((job) => ({ jobId: job.id }));
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { jobId } = await params;
  const job = getJobById(jobId);

  if (!job) {
    notFound();
  }

  const formatSalary = (salary?: { min: number; max: number; currency: string }) => {
    if (!salary) return "Competitive salary";
    return `$${salary.min.toLocaleString()} - $${salary.max.toLocaleString()} per year`;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "full-time": return "bg-emerald-100 text-emerald-700";
      case "part-time": return "bg-blue-100 text-blue-700";
      case "contract": return "bg-orange-100 text-orange-700";
      case "remote": return "bg-purple-100 text-purple-700";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="container">
          <Link 
            href="/careers" 
            className="inline-flex items-center text-slate-300 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Jobs
          </Link>
          
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge className={getTypeColor(job.type)}>
              {job.type.charAt(0).toUpperCase() + job.type.slice(1).replace("-", " ")}
            </Badge>
            <Badge variant="outline" className="border-slate-500 text-slate-300">
              {job.department}
            </Badge>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {job.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-slate-300">
            <span className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              {job.location}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              {job.experience}
            </span>
            <span className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              {formatSalary(job.salary)}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Posted {new Date(job.postedDate).toLocaleDateString()}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="border-slate-200">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-slate-800 mb-4">About This Role</h2>
                  <p className="text-slate-600 leading-relaxed">{job.description}</p>
                </CardContent>
              </Card>

              <Card className="border-slate-200">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-slate-800 mb-4">Responsibilities</h2>
                  <ul className="space-y-3">
                    {job.responsibilities.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-sky-500 mt-0.5 shrink-0" />
                        <span className="text-slate-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-slate-200">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-slate-800 mb-4">Requirements</h2>
                  <ul className="space-y-3">
                    {job.requirements.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-sky-500 mt-0.5 shrink-0" />
                        <span className="text-slate-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {job.preferredQualifications && job.preferredQualifications.length > 0 && (
                <Card className="border-slate-200">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">Preferred Qualifications</h2>
                    <ul className="space-y-3">
                      {job.preferredQualifications.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-cyan-500 mt-0.5 shrink-0" />
                          <span className="text-slate-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {job.benefits && job.benefits.length > 0 && (
                <Card className="border-slate-200">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">Benefits</h2>
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {job.benefits.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                          <span className="text-slate-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="border-sky-200 bg-gradient-to-br from-sky-50 to-white sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Apply for This Position</h3>
                  <p className="text-slate-600 text-sm mb-6">
                    Ready to join our team? Submit your application and we'll be in touch.
                  </p>
                  <Button className="w-full bg-sky-500 hover:bg-sky-600 mb-3" size="lg" asChild>
                    <Link href={`/careers/${job.id}/apply`}>
                      Apply Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/careers">
                      View All Jobs
                    </Link>
                  </Button>
                  
                  <Separator className="my-6" />
                  
                  <div className="space-y-4 text-sm">
                    <div className="flex items-center gap-3">
                      <Building2 className="h-5 w-5 text-slate-400" />
                      <div>
                        <div className="text-slate-500">Department</div>
                        <div className="font-medium text-slate-800">{job.department}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-slate-400" />
                      <div>
                        <div className="text-slate-500">Location</div>
                        <div className="font-medium text-slate-800">{job.location}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Briefcase className="h-5 w-5 text-slate-400" />
                      <div>
                        <div className="text-slate-500">Employment Type</div>
                        <div className="font-medium text-slate-800">
                          {job.type.charAt(0).toUpperCase() + job.type.slice(1).replace("-", " ")}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-slate-400" />
                      <div>
                        <div className="text-slate-500">Experience</div>
                        <div className="font-medium text-slate-800">{job.experience}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

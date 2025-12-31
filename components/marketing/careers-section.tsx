"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ArrowRight,
  Building2,
  Users,
  Sparkles
} from "lucide-react";
import { getActiveJobs } from "@/lib/jobs-data";

export function CareersSection() {
  const jobs = getActiveJobs().slice(0, 3);

  if (jobs.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-sky-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-sky-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl" />
      
      <div className="container relative">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge className="mb-4 bg-sky-100 text-sky-700 hover:bg-sky-100">
            <Briefcase className="w-3 h-3 mr-1" />
            We're Hiring
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Join Our Growing Team
          </h2>
          <p className="text-lg text-slate-600">
            Be part of a team that's transforming how organizations leverage technology. 
            We're looking for talented individuals passionate about innovation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {jobs.map((job) => (
            <Card 
              key={job.id} 
              className="border-slate-200 hover:border-sky-300 hover:shadow-lg transition-all group"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Badge 
                    className={
                      job.type === "remote" 
                        ? "bg-purple-100 text-purple-700" 
                        : "bg-emerald-100 text-emerald-700"
                    }
                  >
                    {job.type === "full-time" ? "Full-time" : job.type.charAt(0).toUpperCase() + job.type.slice(1)}
                  </Badge>
                  <Sparkles className="h-5 w-5 text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-sky-600 transition-colors">
                  {job.title}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Building2 className="h-4 w-4" />
                    {job.department}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Clock className="h-4 w-4" />
                    {job.experience}
                  </div>
                </div>

                <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                  {job.description}
                </p>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link href={`/careers/${job.id}`}>
                      View Details
                    </Link>
                  </Button>
                  <Button size="sm" className="flex-1 bg-sky-500 hover:bg-sky-600" asChild>
                    <Link href={`/careers/${job.id}/apply`}>
                      Apply
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" asChild>
            <Link href="/careers">
              View All Open Positions
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Search,
  ArrowRight,
  Building2,
  Filter
} from "lucide-react";
import { JobListing, JOB_DEPARTMENTS, JOB_LOCATIONS, JOB_TYPES } from "@/types/jobs";
import { getActiveJobs, filterJobs } from "@/lib/jobs-data";

interface JobListingsProps {
  limit?: number;
  showFilters?: boolean;
  showViewAll?: boolean;
}

export function JobListings({ limit, showFilters = true, showViewAll = true }: JobListingsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("");
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");

  const allJobs = getActiveJobs();
  const filteredJobs = filterJobs(allJobs, {
    department: departmentFilter || undefined,
    location: locationFilter || undefined,
    type: typeFilter || undefined,
    search: searchTerm || undefined,
  });

  const displayedJobs = limit ? filteredJobs.slice(0, limit) : filteredJobs;

  const formatSalary = (salary?: { min: number; max: number; currency: string }) => {
    if (!salary) return "Competitive";
    return `$${(salary.min / 1000).toFixed(0)}K - $${(salary.max / 1000).toFixed(0)}K`;
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
    <div className="space-y-6">
      {showFilters && (
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Departments</SelectItem>
              {JOB_DEPARTMENTS.map((dept) => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Locations</SelectItem>
              {JOB_LOCATIONS.map((loc) => (
                <SelectItem key={loc} value={loc}>{loc}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Types</SelectItem>
              {JOB_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {displayedJobs.length === 0 ? (
        <Card className="border-slate-200">
          <CardContent className="py-12 text-center">
            <Briefcase className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">No jobs found</h3>
            <p className="text-slate-500">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {displayedJobs.map((job) => (
            <Card key={job.id} className="border-slate-200 hover:border-sky-300 hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge className={getTypeColor(job.type)}>
                        {job.type.charAt(0).toUpperCase() + job.type.slice(1).replace("-", " ")}
                      </Badge>
                      <Badge variant="outline" className="border-slate-300">
                        {job.department}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">
                      <Link href={`/careers/${job.id}`} className="hover:text-sky-600 transition-colors">
                        {job.title}
                      </Link>
                    </h3>
                    <p className="text-slate-600 text-sm mb-3 line-clamp-2">
                      {job.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {job.experience}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {formatSalary(job.salary)}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                    <Button asChild className="bg-sky-500 hover:bg-sky-600">
                      <Link href={`/careers/${job.id}`}>
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href={`/careers/${job.id}/apply`}>
                        Apply Now
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {showViewAll && limit && filteredJobs.length > limit && (
        <div className="text-center pt-4">
          <Button variant="outline" size="lg" asChild>
            <Link href="/careers">
              View All {filteredJobs.length} Open Positions
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}

// Compact version for homepage
export function JobListingsCompact() {
  const jobs = getActiveJobs().slice(0, 3);

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <Link 
          key={job.id} 
          href={`/careers/${job.id}`}
          className="block p-4 rounded-lg border border-slate-200 hover:border-sky-300 hover:shadow-md transition-all bg-white"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="font-semibold text-slate-800 hover:text-sky-600 transition-colors">
                {job.title}
              </h4>
              <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <Building2 className="h-3 w-3" />
                  {job.department}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {job.location}
                </span>
              </div>
            </div>
            <Badge className={`${job.type === "remote" ? "bg-purple-100 text-purple-700" : "bg-emerald-100 text-emerald-700"} shrink-0`}>
              {job.type === "full-time" ? "Full-time" : job.type.charAt(0).toUpperCase() + job.type.slice(1)}
            </Badge>
          </div>
        </Link>
      ))}
    </div>
  );
}

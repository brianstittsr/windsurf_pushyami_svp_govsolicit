"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Briefcase, 
  Users, 
  Plus, 
  Search,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  FileText,
  Brain,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";
import { JobListing, JobApplication, APPLICATION_STATUSES } from "@/types/jobs";
import { sampleJobListings } from "@/lib/jobs-data";

export default function CareersAdminPage() {
  const [jobs, setJobs] = useState<JobListing[]>(sampleJobListings);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("jobs");

  useEffect(() => {
    // Load applications from localStorage
    const storedApplications = localStorage.getItem("jobApplications");
    if (storedApplications) {
      setApplications(JSON.parse(storedApplications));
    }
  }, []);

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredApplications = applications.filter(app =>
    app.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const statusConfig = APPLICATION_STATUSES.find(s => s.value === status);
    return statusConfig ? (
      <Badge className={statusConfig.color}>{statusConfig.label}</Badge>
    ) : (
      <Badge variant="secondary">{status}</Badge>
    );
  };

  const stats = {
    totalJobs: jobs.length,
    activeJobs: jobs.filter(j => j.status === "active").length,
    totalApplications: applications.length,
    newApplications: applications.filter(a => a.status === "new").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Careers Management</h1>
          <p className="text-slate-600">Manage job listings and review applications</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/portal/careers/jobs/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Job Listing
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-sky-100 rounded-lg">
                <Briefcase className="h-6 w-6 text-sky-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalJobs}</p>
                <p className="text-sm text-slate-500">Total Jobs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.activeJobs}</p>
                <p className="text-sm text-slate-500">Active Jobs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-violet-100 rounded-lg">
                <Users className="h-6 w-6 text-violet-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalApplications}</p>
                <p className="text-sm text-slate-500">Applications</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.newApplications}</p>
                <p className="text-sm text-slate-500">New Applications</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <TabsList>
            <TabsTrigger value="jobs" className="gap-2">
              <Briefcase className="h-4 w-4" />
              Job Listings
            </TabsTrigger>
            <TabsTrigger value="applications" className="gap-2">
              <Users className="h-4 w-4" />
              Applications
              {stats.newApplications > 0 && (
                <Badge className="ml-1 bg-orange-500">{stats.newApplications}</Badge>
              )}
            </TabsTrigger>
          </TabsList>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Jobs Tab */}
        <TabsContent value="jobs">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Posted</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>{job.department}</TableCell>
                      <TableCell>{job.location}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={job.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"}>
                          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(job.postedDate).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/careers/${job.id}`} target="_blank">
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/portal/careers/jobs/${job.id}/edit`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Applications Tab */}
        <TabsContent value="applications">
          <Card>
            <CardContent className="p-0">
              {applications.length === 0 ? (
                <div className="py-12 text-center">
                  <Users className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">No Applications Yet</h3>
                  <p className="text-slate-500">Applications will appear here when candidates apply.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Candidate</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Applied</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>AI Score</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApplications.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{app.firstName} {app.lastName}</p>
                            <p className="text-sm text-slate-500">{app.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>{app.jobTitle}</TableCell>
                        <TableCell>{new Date(app.appliedAt).toLocaleDateString()}</TableCell>
                        <TableCell>{getStatusBadge(app.status)}</TableCell>
                        <TableCell>
                          {app.aiScore ? (
                            <div className="flex items-center gap-2">
                              <Brain className="h-4 w-4 text-violet-500" />
                              <span className="font-medium">{app.aiScore}%</span>
                            </div>
                          ) : (
                            <Badge variant="outline">Pending</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/portal/careers/applications/${app.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/portal/careers/applications/${app.id}/analyze`}>
                                <Brain className="h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

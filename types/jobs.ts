export interface JobListing {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "remote";
  experience: string;
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  responsibilities: string[];
  requirements: string[];
  preferredQualifications?: string[];
  benefits?: string[];
  status: "active" | "paused" | "closed";
  postedDate: string;
  closingDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  coverLetter?: string;
  resumeUrl: string;
  resumeFileName: string;
  resumeParsedData?: ResumeParsedData;
  aiScore?: number;
  aiAnalysis?: AIAnalysis;
  status: "new" | "reviewing" | "shortlisted" | "interviewed" | "offered" | "hired" | "rejected";
  notes?: string;
  appliedAt: string;
  updatedAt: string;
}

export interface ResumeParsedData {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  summary?: string;
  skills: string[];
  experience: WorkExperience[];
  education: Education[];
  certifications?: string[];
  totalYearsExperience?: number;
}

export interface WorkExperience {
  company: string;
  title: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  description?: string;
  highlights?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field?: string;
  graduationDate?: string;
  gpa?: string;
}

export interface AIAnalysis {
  overallScore: number;
  matchPercentage: number;
  strengths: string[];
  gaps: string[];
  recommendation: "strong_match" | "good_match" | "potential_match" | "weak_match";
  skillsMatch: {
    matched: string[];
    missing: string[];
    additional: string[];
  };
  experienceMatch: {
    yearsRequired: string;
    yearsCandidate: number;
    meetsRequirement: boolean;
  };
  summary: string;
}

export interface JobFilters {
  department?: string;
  location?: string;
  type?: string;
  search?: string;
}

export const JOB_DEPARTMENTS = [
  "Engineering",
  "Cloud & Infrastructure",
  "Cybersecurity",
  "Data & Analytics",
  "AI & Machine Learning",
  "Project Management",
  "Business Development",
  "Operations",
  "Human Resources",
] as const;

export const JOB_LOCATIONS = [
  "Ellicott City, MD",
  "Washington, DC",
  "Remote",
  "Hybrid - MD/DC Area",
] as const;

export const JOB_TYPES = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "remote", label: "Remote" },
] as const;

export const APPLICATION_STATUSES = [
  { value: "new", label: "New", color: "bg-blue-100 text-blue-700" },
  { value: "reviewing", label: "Reviewing", color: "bg-yellow-100 text-yellow-700" },
  { value: "shortlisted", label: "Shortlisted", color: "bg-purple-100 text-purple-700" },
  { value: "interviewed", label: "Interviewed", color: "bg-cyan-100 text-cyan-700" },
  { value: "offered", label: "Offered", color: "bg-green-100 text-green-700" },
  { value: "hired", label: "Hired", color: "bg-emerald-100 text-emerald-700" },
  { value: "rejected", label: "Rejected", color: "bg-red-100 text-red-700" },
] as const;

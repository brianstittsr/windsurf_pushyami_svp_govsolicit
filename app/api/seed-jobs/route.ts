import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";

const jobListings = [
  {
    id: "job-001",
    title: "Senior Cloud Solutions Architect",
    department: "Cloud & Infrastructure",
    location: "Hybrid - MD/DC Area",
    type: "full-time",
    experience: "7+ years",
    salary: { min: 140000, max: 180000, currency: "USD" },
    description: "We are seeking an experienced Cloud Solutions Architect to design and implement secure, scalable cloud solutions for our federal and commercial clients. You will lead cloud migration initiatives and ensure compliance with GovCloud IL6 requirements.",
    responsibilities: [
      "Design and architect cloud solutions on AWS GovCloud and Azure Government",
      "Lead cloud migration projects from assessment through implementation",
      "Ensure compliance with FedRAMP, FISMA, and DISA STIG requirements",
      "Mentor junior team members and conduct architecture reviews",
      "Collaborate with security teams to implement Zero Trust architecture",
      "Create technical documentation and architecture diagrams"
    ],
    requirements: [
      "7+ years of experience in cloud architecture and engineering",
      "AWS Solutions Architect Professional or Azure Solutions Architect Expert certification",
      "Experience with GovCloud environments (IL4/IL5/IL6)",
      "Strong understanding of FedRAMP and federal security requirements",
      "Experience with Infrastructure as Code (Terraform, CloudFormation)",
      "Active Secret clearance or ability to obtain"
    ],
    preferredQualifications: [
      "Experience with Kubernetes and container orchestration",
      "CISSP or similar security certification",
      "Experience with DevSecOps practices"
    ],
    benefits: [
      "Competitive salary with annual bonuses",
      "Comprehensive health, dental, and vision insurance",
      "401(k) with company match",
      "Flexible work arrangements",
      "Professional development budget",
      "Paid certifications"
    ],
    status: "active",
    postedDate: new Date("2024-12-15"),
  },
  {
    id: "job-002",
    title: "AI/ML Engineer",
    department: "AI & Machine Learning",
    location: "Remote",
    type: "full-time",
    experience: "5+ years",
    salary: { min: 130000, max: 170000, currency: "USD" },
    description: "Join our AI team to develop and deploy cutting-edge machine learning solutions for federal agencies. You will work on NLP, computer vision, and generative AI projects that drive real-world impact.",
    responsibilities: [
      "Design and implement ML models for document processing and NLP applications",
      "Build and maintain MLOps pipelines for model training and deployment",
      "Develop generative AI solutions using LLMs and RAG architectures",
      "Collaborate with data engineers to ensure data quality and availability",
      "Optimize model performance and reduce inference latency",
      "Stay current with AI/ML research and evaluate new technologies"
    ],
    requirements: [
      "5+ years of experience in machine learning engineering",
      "Strong proficiency in Python, PyTorch, and TensorFlow",
      "Experience with NLP and transformer-based models",
      "Experience deploying ML models in production environments",
      "Familiarity with cloud ML services (AWS SageMaker, Azure ML)",
      "MS or PhD in Computer Science, ML, or related field preferred"
    ],
    preferredQualifications: [
      "Experience with LangChain, LlamaIndex, or similar frameworks",
      "Knowledge of responsible AI practices",
      "Experience with secure/air-gapped deployments"
    ],
    benefits: [
      "Competitive salary with annual bonuses",
      "Comprehensive health, dental, and vision insurance",
      "401(k) with company match",
      "Fully remote work option",
      "Conference attendance budget",
      "Latest hardware and tools"
    ],
    status: "active",
    postedDate: new Date("2024-12-20"),
  },
  {
    id: "job-003",
    title: "Cybersecurity Analyst",
    department: "Cybersecurity",
    location: "Washington, DC",
    type: "full-time",
    experience: "3+ years",
    salary: { min: 90000, max: 120000, currency: "USD" },
    description: "We are looking for a skilled Cybersecurity Analyst to join our security operations team. You will monitor, detect, and respond to security threats while ensuring compliance with federal security standards.",
    responsibilities: [
      "Monitor security systems and analyze alerts for potential threats",
      "Conduct vulnerability assessments and penetration testing",
      "Implement and maintain DISA STIG compliance",
      "Respond to security incidents and conduct forensic analysis",
      "Develop security documentation and procedures",
      "Support RMF authorization activities"
    ],
    requirements: [
      "3+ years of experience in cybersecurity operations",
      "CompTIA Security+ or equivalent certification",
      "Experience with SIEM tools (Splunk, QRadar, etc.)",
      "Knowledge of NIST 800-53 and RMF processes",
      "Understanding of network security and firewalls",
      "Active Secret clearance required"
    ],
    preferredQualifications: [
      "CISSP, CEH, or GIAC certifications",
      "Experience with cloud security (AWS/Azure)",
      "Scripting skills (Python, PowerShell)"
    ],
    benefits: [
      "Competitive salary with annual bonuses",
      "Comprehensive health, dental, and vision insurance",
      "401(k) with company match",
      "Metro-accessible office location",
      "Certification reimbursement",
      "Career growth opportunities"
    ],
    status: "active",
    postedDate: new Date("2024-12-22"),
  },
  {
    id: "job-004",
    title: "Data Engineer",
    department: "Data & Analytics",
    location: "Ellicott City, MD",
    type: "full-time",
    experience: "4+ years",
    salary: { min: 110000, max: 145000, currency: "USD" },
    description: "We are seeking a Data Engineer to build and maintain robust data pipelines and infrastructure. You will work with diverse datasets to enable analytics and AI initiatives for our clients.",
    responsibilities: [
      "Design and implement scalable ETL/ELT data pipelines",
      "Build and maintain data lake and data warehouse solutions",
      "Ensure data quality, integrity, and security",
      "Optimize query performance and data processing efficiency",
      "Collaborate with data scientists and analysts on data requirements",
      "Implement data governance and cataloging practices"
    ],
    requirements: [
      "4+ years of experience in data engineering",
      "Strong SQL skills and experience with Python/PySpark",
      "Experience with cloud data platforms (Snowflake, Databricks, Redshift)",
      "Knowledge of data modeling and warehouse design",
      "Experience with workflow orchestration (Airflow, Prefect)",
      "Familiarity with streaming data (Kafka, Kinesis)"
    ],
    preferredQualifications: [
      "Experience with dbt or similar transformation tools",
      "Knowledge of data governance frameworks",
      "Experience in federal/government environments"
    ],
    benefits: [
      "Competitive salary with annual bonuses",
      "Comprehensive health, dental, and vision insurance",
      "401(k) with company match",
      "Flexible hybrid schedule",
      "Learning and development budget",
      "Team building events"
    ],
    status: "active",
    postedDate: new Date("2024-12-28"),
  },
  {
    id: "job-005",
    title: "Project Manager - Federal Programs",
    department: "Project Management",
    location: "Hybrid - MD/DC Area",
    type: "full-time",
    experience: "5+ years",
    salary: { min: 100000, max: 135000, currency: "USD" },
    description: "We are looking for an experienced Project Manager to lead federal IT projects. You will manage cross-functional teams, ensure on-time delivery, and maintain strong client relationships.",
    responsibilities: [
      "Lead and manage federal IT projects from initiation to closure",
      "Develop project plans, schedules, and resource allocations",
      "Track project progress and report to stakeholders",
      "Manage project risks, issues, and change requests",
      "Ensure compliance with federal acquisition regulations",
      "Build and maintain strong client relationships"
    ],
    requirements: [
      "5+ years of project management experience",
      "PMP certification required",
      "Experience managing federal IT projects",
      "Strong understanding of Agile and Waterfall methodologies",
      "Excellent communication and stakeholder management skills",
      "Experience with project management tools (Jira, MS Project)"
    ],
    preferredQualifications: [
      "Scrum Master or SAFe certification",
      "Experience with government contracting",
      "Technical background in IT or software development"
    ],
    benefits: [
      "Competitive salary with annual bonuses",
      "Comprehensive health, dental, and vision insurance",
      "401(k) with company match",
      "Flexible work arrangements",
      "Professional development opportunities",
      "Leadership training programs"
    ],
    status: "active",
    postedDate: new Date("2024-12-30"),
  }
];

export async function GET() {
  if (!db) {
    return NextResponse.json(
      { error: "Firebase not configured" },
      { status: 500 }
    );
  }

  try {
    const results = [];
    
    for (const job of jobListings) {
      const jobData = {
        ...job,
        postedDate: Timestamp.fromDate(job.postedDate),
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };
      
      const docRef = doc(db, "jobListings", job.id);
      await setDoc(docRef, jobData);
      results.push({ id: job.id, title: job.title, status: "created" });
    }

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${results.length} job listings`,
      jobs: results,
    });
  } catch (error) {
    console.error("Error seeding jobs:", error);
    return NextResponse.json(
      { error: "Failed to seed jobs", details: String(error) },
      { status: 500 }
    );
  }
}

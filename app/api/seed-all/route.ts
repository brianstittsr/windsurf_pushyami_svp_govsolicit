import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { Timestamp } from "firebase-admin/firestore";

// ============================================================================
// TEAM MEMBERS
// ============================================================================
const teamMembers = [
  {
    id: "team-member-001",
    firstName: "Sarah",
    lastName: "Chen",
    emailPrimary: "schen@xprotege.com",
    role: "team",
    title: "Senior Cloud Architect",
    company: "XProtege",
    expertise: "AWS, Azure, GovCloud, Cloud Migration",
    status: "active",
    bio: "10+ years experience in cloud architecture for federal agencies.",
  },
  {
    id: "team-member-002",
    firstName: "Marcus",
    lastName: "Johnson",
    emailPrimary: "mjohnson@xprotege.com",
    role: "team",
    title: "Cybersecurity Lead",
    company: "XProtege",
    expertise: "NIST RMF, FedRAMP, Zero Trust, DISA STIGs",
    status: "active",
    bio: "Former DoD cybersecurity specialist with CISSP and CISM certifications.",
  },
  {
    id: "team-member-003",
    firstName: "Emily",
    lastName: "Rodriguez",
    emailPrimary: "erodriguez@xprotege.com",
    role: "team",
    title: "AI/ML Engineer",
    company: "XProtege",
    expertise: "Machine Learning, NLP, Computer Vision, MLOps",
    status: "active",
    bio: "PhD in Machine Learning with expertise in federal AI deployments.",
  },
  {
    id: "team-member-004",
    firstName: "David",
    lastName: "Kim",
    emailPrimary: "dkim@xprotege.com",
    role: "team",
    title: "Data Engineer",
    company: "XProtege",
    expertise: "Data Pipelines, Snowflake, Databricks, Python",
    status: "active",
    bio: "Specializes in building scalable data infrastructure for analytics.",
  },
  {
    id: "team-member-005",
    firstName: "Jennifer",
    lastName: "Williams",
    emailPrimary: "jwilliams@xprotege.com",
    role: "consultant",
    title: "Federal Program Manager",
    company: "XProtege",
    expertise: "PMP, Agile, Federal Acquisition, Stakeholder Management",
    status: "active",
    bio: "15+ years managing IT projects for civilian and defense agencies.",
  },
];

// ============================================================================
// STRATEGIC PARTNERS
// ============================================================================
const strategicPartners = [
  {
    id: "partner-001",
    firstName: "Michael",
    lastName: "Thompson",
    company: "CloudFirst Solutions",
    website: "https://cloudfirst.example.com",
    expertise: "AWS Premier Partner, Cloud Migration",
    email: "mthompson@cloudfirst.com",
    status: "active",
  },
  {
    id: "partner-002",
    firstName: "Lisa",
    lastName: "Anderson",
    company: "SecureNet Consulting",
    website: "https://securenet.example.com",
    expertise: "Cybersecurity, Penetration Testing, Compliance",
    email: "landerson@securenet.com",
    status: "active",
  },
  {
    id: "partner-003",
    firstName: "Robert",
    lastName: "Martinez",
    company: "DataDriven Analytics",
    website: "https://datadriven.example.com",
    expertise: "Business Intelligence, Data Warehousing",
    email: "rmartinez@datadriven.com",
    status: "active",
  },
];

// ============================================================================
// OPPORTUNITIES
// ============================================================================
const opportunities = [
  {
    id: "opp-001",
    name: "DoD Cloud Migration Initiative",
    organizationName: "Department of Defense",
    stage: "proposal",
    value: 2500000,
    probability: 65,
    expectedCloseDate: Timestamp.fromDate(new Date("2025-03-15")),
    description: "Large-scale cloud migration for DoD systems to AWS GovCloud.",
    serviceIds: ["cloud-services", "cybersecurity"],
    ownerId: "superadmin-brian-stitt",
    status: "active",
  },
  {
    id: "opp-002",
    name: "VA Healthcare AI Platform",
    organizationName: "Department of Veterans Affairs",
    stage: "discovery",
    value: 1800000,
    probability: 40,
    expectedCloseDate: Timestamp.fromDate(new Date("2025-06-30")),
    description: "AI-powered patient care optimization platform.",
    serviceIds: ["artificial-intelligence", "data-analytics"],
    ownerId: "admin-pushyami-duvvuri",
    status: "active",
  },
  {
    id: "opp-003",
    name: "Treasury Cybersecurity Assessment",
    organizationName: "Department of Treasury",
    stage: "negotiation",
    value: 750000,
    probability: 80,
    expectedCloseDate: Timestamp.fromDate(new Date("2025-02-01")),
    description: "Comprehensive security assessment and RMF support.",
    serviceIds: ["cybersecurity"],
    ownerId: "superadmin-brian-stitt",
    status: "active",
  },
  {
    id: "opp-004",
    name: "GSA Digital Modernization",
    organizationName: "General Services Administration",
    stage: "qualification",
    value: 3200000,
    probability: 55,
    expectedCloseDate: Timestamp.fromDate(new Date("2025-05-15")),
    description: "Legacy system modernization and cloud-native development.",
    serviceIds: ["digital-modernization", "cloud-services"],
    ownerId: "admin-pushyami-duvvuri",
    status: "active",
  },
];

// ============================================================================
// PROJECTS
// ============================================================================
const projects = [
  {
    id: "proj-001",
    name: "DHS Border Security Analytics",
    organizationName: "Department of Homeland Security",
    status: "active",
    startDate: Timestamp.fromDate(new Date("2024-09-01")),
    endDate: Timestamp.fromDate(new Date("2025-08-31")),
    budget: 1500000,
    description: "Data analytics platform for border security operations.",
    progress: 45,
    teamIds: ["team-member-003", "team-member-004"],
  },
  {
    id: "proj-002",
    name: "EPA Environmental Monitoring",
    organizationName: "Environmental Protection Agency",
    status: "active",
    startDate: Timestamp.fromDate(new Date("2024-06-15")),
    endDate: Timestamp.fromDate(new Date("2025-06-14")),
    budget: 800000,
    description: "IoT-based environmental monitoring and reporting system.",
    progress: 70,
    teamIds: ["team-member-001", "team-member-004"],
  },
  {
    id: "proj-003",
    name: "SSA Claims Processing Automation",
    organizationName: "Social Security Administration",
    status: "active",
    startDate: Timestamp.fromDate(new Date("2024-11-01")),
    endDate: Timestamp.fromDate(new Date("2025-10-31")),
    budget: 2200000,
    description: "AI-powered claims processing and fraud detection.",
    progress: 25,
    teamIds: ["team-member-003", "team-member-005"],
  },
];

// ============================================================================
// ORGANIZATIONS (Customers)
// ============================================================================
const organizations = [
  {
    id: "org-001",
    name: "Department of Defense",
    type: "federal",
    industry: "Defense",
    website: "https://www.defense.gov",
    status: "active",
    primaryContactName: "Col. James Mitchell",
    primaryContactEmail: "james.mitchell@dod.gov",
  },
  {
    id: "org-002",
    name: "Department of Veterans Affairs",
    type: "federal",
    industry: "Healthcare",
    website: "https://www.va.gov",
    status: "active",
    primaryContactName: "Dr. Patricia Lee",
    primaryContactEmail: "patricia.lee@va.gov",
  },
  {
    id: "org-003",
    name: "General Services Administration",
    type: "federal",
    industry: "Government Services",
    website: "https://www.gsa.gov",
    status: "active",
    primaryContactName: "Thomas Wright",
    primaryContactEmail: "thomas.wright@gsa.gov",
  },
  {
    id: "org-004",
    name: "Department of Homeland Security",
    type: "federal",
    industry: "Security",
    website: "https://www.dhs.gov",
    status: "active",
    primaryContactName: "Maria Santos",
    primaryContactEmail: "maria.santos@dhs.gov",
  },
];

// ============================================================================
// SERVICES
// ============================================================================
const services = [
  {
    id: "artificial-intelligence",
    name: "Artificial Intelligence",
    description: "AI/ML solutions including NLP, computer vision, and generative AI.",
    category: "Technology",
    isActive: true,
  },
  {
    id: "cloud-services",
    name: "Cloud Services",
    description: "Cloud migration, GovCloud deployments, and managed cloud services.",
    category: "Infrastructure",
    isActive: true,
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    description: "Security assessments, RMF support, and Zero Trust implementation.",
    category: "Security",
    isActive: true,
  },
  {
    id: "data-analytics",
    name: "Data Analytics",
    description: "Data engineering, BI dashboards, and advanced analytics.",
    category: "Data",
    isActive: true,
  },
  {
    id: "digital-modernization",
    name: "Digital Modernization",
    description: "Legacy system modernization and cloud-native development.",
    category: "Technology",
    isActive: true,
  },
  {
    id: "enterprise-it",
    name: "Enterprise IT",
    description: "IT service desk, infrastructure management, and operations.",
    category: "Operations",
    isActive: true,
  },
  {
    id: "erp-implementations",
    name: "ERP Implementations",
    description: "SAP and Microsoft Dynamics 365 implementation services.",
    category: "Enterprise",
    isActive: true,
  },
  {
    id: "training-services",
    name: "Training Services",
    description: "Professional training in PM, IT, and business development.",
    category: "Education",
    isActive: true,
  },
];

// ============================================================================
// PLATFORM SETTINGS
// ============================================================================
const platformSettings = {
  id: "default",
  socialLinks: {
    linkedin: { url: "https://www.linkedin.com/company/xprotege-institute-of-management-and-technology/", visible: true },
    twitter: { url: "", visible: false },
    youtube: { url: "", visible: false },
  },
  integrations: {
    mattermost: { status: "disconnected" },
    apollo: { status: "disconnected" },
    gohighlevel: { status: "disconnected" },
    zoom: { status: "disconnected" },
    docuseal: { status: "disconnected" },
  },
  notificationSettings: {
    syncWithMattermost: false,
    inAppEnabled: true,
    browserEnabled: true,
    soundEnabled: true,
  },
};

// ============================================================================
// CALENDAR EVENTS
// ============================================================================
const calendarEvents = [
  {
    id: "event-001",
    title: "Weekly Team Standup",
    description: "Weekly sync meeting for all team members.",
    startDate: Timestamp.fromDate(new Date("2025-01-06T09:00:00")),
    endDate: Timestamp.fromDate(new Date("2025-01-06T09:30:00")),
    type: "meeting",
    recurringFrequency: "weekly",
    attendees: ["superadmin-brian-stitt", "admin-pushyami-duvvuri"],
  },
  {
    id: "event-002",
    title: "DoD Project Review",
    description: "Monthly review of DHS Border Security Analytics project.",
    startDate: Timestamp.fromDate(new Date("2025-01-15T14:00:00")),
    endDate: Timestamp.fromDate(new Date("2025-01-15T15:00:00")),
    type: "meeting",
    attendees: ["team-member-003", "team-member-004"],
  },
  {
    id: "event-003",
    title: "Q1 Planning Session",
    description: "Quarterly planning and goal setting.",
    startDate: Timestamp.fromDate(new Date("2025-01-10T10:00:00")),
    endDate: Timestamp.fromDate(new Date("2025-01-10T12:00:00")),
    type: "meeting",
    attendees: ["superadmin-brian-stitt", "admin-pushyami-duvvuri"],
  },
];

// ============================================================================
// TRACTION ROCKS (Quarterly Goals)
// ============================================================================
const tractionRocks = [
  {
    id: "rock-001",
    title: "Launch AI Services Practice",
    description: "Establish and launch dedicated AI/ML services practice area.",
    ownerId: "admin-pushyami-duvvuri",
    ownerName: "Pushyami Duvvuri",
    dueDate: Timestamp.fromDate(new Date("2025-03-31")),
    status: "on-track",
    progress: 35,
    quarter: "Q1 2025",
  },
  {
    id: "rock-002",
    title: "Achieve FedRAMP Authorization",
    description: "Complete FedRAMP authorization for cloud platform.",
    ownerId: "superadmin-brian-stitt",
    ownerName: "Brian Stitt",
    dueDate: Timestamp.fromDate(new Date("2025-03-31")),
    status: "on-track",
    progress: 50,
    quarter: "Q1 2025",
  },
  {
    id: "rock-003",
    title: "Expand Federal Client Base",
    description: "Add 3 new federal agency clients.",
    ownerId: "admin-pushyami-duvvuri",
    ownerName: "Pushyami Duvvuri",
    dueDate: Timestamp.fromDate(new Date("2025-03-31")),
    status: "at-risk",
    progress: 20,
    quarter: "Q1 2025",
  },
];

// ============================================================================
// TRACTION SCORECARD METRICS
// ============================================================================
const scorecardMetrics = [
  {
    id: "metric-001",
    name: "Revenue",
    goal: 500000,
    actual: 425000,
    ownerId: "admin-pushyami-duvvuri",
    ownerName: "Pushyami Duvvuri",
    trend: "up",
    unit: "$",
  },
  {
    id: "metric-002",
    name: "New Opportunities",
    goal: 10,
    actual: 8,
    ownerId: "superadmin-brian-stitt",
    ownerName: "Brian Stitt",
    trend: "up",
    unit: "#",
  },
  {
    id: "metric-003",
    name: "Project Delivery On-Time",
    goal: 95,
    actual: 92,
    ownerId: "admin-pushyami-duvvuri",
    ownerName: "Pushyami Duvvuri",
    trend: "flat",
    unit: "%",
  },
  {
    id: "metric-004",
    name: "Client Satisfaction",
    goal: 90,
    actual: 94,
    ownerId: "admin-pushyami-duvvuri",
    ownerName: "Pushyami Duvvuri",
    trend: "up",
    unit: "%",
  },
];

// ============================================================================
// TRACTION ISSUES
// ============================================================================
const tractionIssues = [
  {
    id: "issue-001",
    title: "Hiring Pipeline Slow",
    description: "Difficulty finding qualified cloud architects with security clearances.",
    priority: "high",
    identifiedDate: Timestamp.fromDate(new Date("2024-12-15")),
    ownerId: "admin-pushyami-duvvuri",
    ownerName: "Pushyami Duvvuri",
    status: "open",
  },
  {
    id: "issue-002",
    title: "Tool Integration Delays",
    description: "GoHighLevel integration taking longer than expected.",
    priority: "medium",
    identifiedDate: Timestamp.fromDate(new Date("2024-12-20")),
    ownerId: "superadmin-brian-stitt",
    ownerName: "Brian Stitt",
    status: "in-progress",
  },
];

// ============================================================================
// TRACTION TODOS
// ============================================================================
const tractionTodos = [
  {
    id: "todo-001",
    title: "Review Q1 budget allocations",
    description: "Finalize budget for Q1 2025 initiatives.",
    ownerId: "admin-pushyami-duvvuri",
    ownerName: "Pushyami Duvvuri",
    dueDate: Timestamp.fromDate(new Date("2025-01-10")),
    status: "not-started",
  },
  {
    id: "todo-002",
    title: "Schedule partner meetings",
    description: "Set up Q1 meetings with strategic partners.",
    ownerId: "superadmin-brian-stitt",
    ownerName: "Brian Stitt",
    dueDate: Timestamp.fromDate(new Date("2025-01-15")),
    status: "in-progress",
  },
  {
    id: "todo-003",
    title: "Update security documentation",
    description: "Review and update all security policies for FedRAMP.",
    ownerId: "team-member-002",
    ownerName: "Marcus Johnson",
    dueDate: Timestamp.fromDate(new Date("2025-01-20")),
    status: "not-started",
  },
];

// ============================================================================
// GOVERNMENT SOLICITATIONS
// ============================================================================
const governmentSolicitations = [
  {
    id: "sol-001",
    title: "Cloud Infrastructure Modernization Services",
    solicitationNumber: "FA8771-25-R-0001",
    agency: "Department of the Air Force",
    setAside: "8(a)",
    naics: ["541512", "541519"],
    postedDate: Timestamp.fromDate(new Date("2024-12-15")),
    dueDate: Timestamp.fromDate(new Date("2025-02-15")),
    status: "open",
    url: "https://sam.gov/opp/example1",
    description: "Cloud migration and modernization services for Air Force systems.",
  },
  {
    id: "sol-002",
    title: "Cybersecurity Assessment and Authorization Support",
    solicitationNumber: "HHSN316201900001",
    agency: "Department of Health and Human Services",
    setAside: "Small Business",
    naics: ["541512"],
    postedDate: Timestamp.fromDate(new Date("2024-12-20")),
    dueDate: Timestamp.fromDate(new Date("2025-01-31")),
    status: "open",
    url: "https://sam.gov/opp/example2",
    description: "RMF and ATO support services for HHS systems.",
  },
  {
    id: "sol-003",
    title: "AI/ML Development Services",
    solicitationNumber: "W911NF-25-R-0010",
    agency: "Department of the Army",
    setAside: "WOSB",
    naics: ["541715", "541512"],
    postedDate: Timestamp.fromDate(new Date("2024-12-28")),
    dueDate: Timestamp.fromDate(new Date("2025-03-01")),
    status: "open",
    url: "https://sam.gov/opp/example3",
    description: "Machine learning and AI development for Army research programs.",
  },
];

// ============================================================================
// ACTIVITIES (Recent Activity Log)
// ============================================================================
const activities = [
  {
    id: "activity-001",
    type: "opportunity_created",
    entityType: "opportunity",
    entityId: "opp-001",
    entityName: "DoD Cloud Migration Initiative",
    userId: "superadmin-brian-stitt",
    description: "Created new opportunity",
    createdAt: Timestamp.fromDate(new Date("2024-12-20T10:30:00")),
  },
  {
    id: "activity-002",
    type: "project_updated",
    entityType: "project",
    entityId: "proj-001",
    entityName: "DHS Border Security Analytics",
    userId: "team-member-003",
    description: "Updated project progress to 45%",
    createdAt: Timestamp.fromDate(new Date("2024-12-28T14:15:00")),
  },
  {
    id: "activity-003",
    type: "team_member_added",
    entityType: "team-member",
    entityId: "team-member-005",
    entityName: "Jennifer Williams",
    userId: "admin-pushyami-duvvuri",
    description: "Added new team member",
    createdAt: Timestamp.fromDate(new Date("2024-12-30T09:00:00")),
  },
];

// ============================================================================
// MAIN SEED FUNCTION
// ============================================================================
export async function GET() {
  if (!adminDb) {
    return NextResponse.json(
      { error: "Firebase Admin not configured. Check FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY env vars." },
      { status: 500 }
    );
  }

  const results: Record<string, number> = {};

  try {
    // Seed Team Members
    for (const member of teamMembers) {
      await adminDb.collection("teamMembers").doc(member.id).set({
        ...member,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
    }
    results.teamMembers = teamMembers.length;

    // Seed Strategic Partners
    for (const partner of strategicPartners) {
      await adminDb.collection("strategicPartners").doc(partner.id).set({
        ...partner,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
    }
    results.strategicPartners = strategicPartners.length;

    // Seed Opportunities
    for (const opp of opportunities) {
      await adminDb.collection("opportunities").doc(opp.id).set({
        ...opp,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
    }
    results.opportunities = opportunities.length;

    // Seed Projects
    for (const proj of projects) {
      await adminDb.collection("projects").doc(proj.id).set({
        ...proj,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
    }
    results.projects = projects.length;

    // Seed Organizations
    for (const org of organizations) {
      await adminDb.collection("organizations").doc(org.id).set({
        ...org,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
    }
    results.organizations = organizations.length;

    // Seed Services
    for (const service of services) {
      await adminDb.collection("services").doc(service.id).set({
        ...service,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
    }
    results.services = services.length;

    // Seed Platform Settings
    await adminDb.collection("platformSettings").doc(platformSettings.id).set({
      ...platformSettings,
      updatedAt: Timestamp.now(),
    });
    results.platformSettings = 1;

    // Seed Calendar Events
    for (const event of calendarEvents) {
      await adminDb.collection("calendarEvents").doc(event.id).set({
        ...event,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
    }
    results.calendarEvents = calendarEvents.length;

    // Seed Traction Rocks
    for (const rock of tractionRocks) {
      await adminDb.collection("tractionRocks").doc(rock.id).set({
        ...rock,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
    }
    results.tractionRocks = tractionRocks.length;

    // Seed Scorecard Metrics
    for (const metric of scorecardMetrics) {
      await adminDb.collection("tractionScorecardMetrics").doc(metric.id).set({
        ...metric,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
    }
    results.tractionScorecardMetrics = scorecardMetrics.length;

    // Seed Traction Issues
    for (const issue of tractionIssues) {
      await adminDb.collection("tractionIssues").doc(issue.id).set({
        ...issue,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
    }
    results.tractionIssues = tractionIssues.length;

    // Seed Traction Todos
    for (const todo of tractionTodos) {
      await adminDb.collection("tractionTodos").doc(todo.id).set({
        ...todo,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
    }
    results.tractionTodos = tractionTodos.length;

    // Seed Government Solicitations
    for (const sol of governmentSolicitations) {
      await adminDb.collection("governmentSolicitations").doc(sol.id).set({
        ...sol,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
    }
    results.governmentSolicitations = governmentSolicitations.length;

    // Seed Activities
    for (const activity of activities) {
      await adminDb.collection("activities").doc(activity.id).set(activity);
    }
    results.activities = activities.length;

    const totalRecords = Object.values(results).reduce((a, b) => a + b, 0);

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${totalRecords} records across ${Object.keys(results).length} collections`,
      collections: results,
    });
  } catch (error) {
    console.error("Error seeding database:", error);
    return NextResponse.json(
      { error: "Failed to seed database", details: String(error) },
      { status: 500 }
    );
  }
}

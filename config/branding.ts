/**
 * ITMC Solutions Branding Configuration
 * 
 * This file contains all branding information for ITMC Solutions
 * Update this file to rebrand the entire platform
 */

export const BRANDING = {
  company: {
    name: "ITMC Solutions",
    legalName: "ITMC Solutions, LLC",
    tagline: "IT & Management Consulting for Federal CIO Organizations",
    description: "Trusted by Federal CIO organizations from HUD to DHS & beyond, we're your partners from strategy to execution",
    mission: "We empower federal, state, and local government agencies with strategic financial and IT solutions and services that drive mission success.",
    founded: "2010",
  },

  contact: {
    email: "contact@itmcsolutions.com",
    phone: "(757) 284-3986",
    address: {
      street: "100 7th St., Suite 104",
      city: "Portsmouth",
      state: "VA",
      zip: "23704",
      full: "100 7th St., Suite 104, Portsmouth, VA 23704"
    },
    website: "https://www.itmcsolutions.com",
    linkedin: "https://www.linkedin.com/company/itmc-solutions"
  },

  certifications: {
    sba8a: true,
    veteranOwned: true,
    womanOwned: true,
    minorityOwned: true,
    smallBusiness: true,
    swam: "69476",
    gsaMas: "47QTCA23D004X",
    naicsCodes: ["541611", "541511", "541512", "541519", "541618", "611420", "611430"]
  },

  leadership: {
    ceo: {
      name: "Sheyla Blackman",
      title: "Chief Executive Officer",
      bio: "For more than 35 years, Sheyla's provided principled partnership to hundreds of clients and partners at HUD, DHS, DOD, Lockheed Martin, Disney, and beyond. Trusted to manage budgets of more than $3B and years-long engagements of more than $100M, she's become a well-known expert in program and project management, a Certified Scrum Master, and a Certified Technology Business Management Executive since beginning her career in 1986.",
      education: "Bachelor's Degree in Computer Science from NC A&T State University",
      linkedin: "https://www.linkedin.com/in/sheylablackman/",
      experience: "35+ years"
    },
    coo: {
      name: "Tiffany Byers",
      title: "Chief Operating Officer",
      bio: "Tiffany leverages her diverse background in engineering and project management to deliver innovative solutions to leaders at federal CIO organizations like HUD, DHS, and beyond. Whether managing multi-billion dollar contracts or guiding federal IT initiatives, she excels at navigating difficult situations and driving operational excellence from strategy to execution.",
      education: "B.S. in Electrical Engineering Technology from Old Dominion University, M.S. in Systems Engineering from George Washington University, Six Sigma certification",
      linkedin: "https://www.linkedin.com/in/tiffany-byers-8688a842/",
      relationship: "Daughter of CEO"
    },
    hr: {
      name: "Stacye Williams",
      title: "HR Manager",
      bio: "A resilient problem-solver, Stacye Williams brings a wealth of organizational expertise to ITMC. With nearly 30 years of experience in administrative training, organization, and compliance, Stacye has assisted hundreds of clients across various professional fields.",
      linkedin: "https://www.linkedin.com/in/stacye-williams-0172542a4/",
      experience: "30+ years"
    }
  },

  services: {
    core: [
      {
        name: "Strategic Planning",
        description: "Our seasoned experts help Senior Executives identify improvement areas, manage risks, and optimize IT services to meet new legislative and organizational demands with confidence.",
        icon: "Target"
      },
      {
        name: "IT Portfolio Management, Technology Business Management & Cost Optimization",
        shortName: "CPIC/TBM/Cost Optimization",
        description: "Drawing on decades of experience, we help CIOs and CFOs minimize risks and successfully implement IT initiatives that drive your mission forward. We help you understand where your technology dollars are going and how to make every investment count.",
        icon: "DollarSign"
      },
      {
        name: "Data Analytics & Reporting",
        description: "Transform raw data into powerful insights with our veteran team. We turn complex information into clear, actionable recommendations that support your strategic goals and elevate your organizations performance.",
        icon: "BarChart"
      },
      {
        name: "Solution & Data Architecture",
        description: "Future-proof your technology infrastructure with our enterprise architecture expertise. We focus on delivering tangible business outcomes, reducing redundancy, and accelerating value.",
        icon: "Network"
      },
      {
        name: "Intelligent Automation & Low-Code Development",
        description: "Quality software is the backbone of efficient operations. Our comprehensive approach accelerates delivery and reduces operational burden through smart automation.",
        icon: "Zap"
      },
      {
        name: "Program / Project Management",
        description: "From $100M+ engagements to $3B+ budgets, we've mastered the art of complex project delivery. Our mother-daughter led team brings a personal touch to every project, ensuring your objectives are met with precision and care.",
        icon: "Briefcase"
      }
    ],
    specialties: [
      "CPIC/Portfolio Management",
      "Business and Solution Architecture",
      "Technology Business Management (TBM)",
      "Data Analytics",
      "Digital Transformation",
      "FinOps",
      "Low-Code Development",
      "AI-Ready Solutions",
      "Program/Project Management"
    ]
  },

  stats: {
    budgetsManaged: "$3B+",
    yearsOfService: "35+",
    largeEngagements: "$100M+",
    combinedExperience: "70+ years"
  },

  clients: {
    federal: [
      {
        name: "U.S. Department of Housing and Urban Development (HUD)",
        logo: "HUD"
      },
      {
        name: "U.S. Department of Homeland Security (DHS)",
        logo: "DHS"
      },
      {
        name: "Transportation Security Administration (TSA)",
        logo: "TSA"
      },
      {
        name: "U.S. Department of Defense (DOD)",
        logo: "DOD"
      }
    ],
    commercial: [
      "Lockheed Martin",
      "Disney",
      "Raytheon",
      "Newport News Shipbuilding",
      "LMI",
      "Singer Link"
    ]
  },

  values: {
    core: [
      "Ethical Leadership",
      "Service",
      "Stewardship",
      "Respect",
      "Honesty",
      "Integrity"
    ],
    motto: "Two are better than one, because they have a good return for their labor: If either of them falls down, one can help the other up",
    reference: "Ecclesiastes 4:9-12"
  },

  theme: {
    primaryColor: "#1e40af", // Professional blue
    secondaryColor: "#dc2626", // Accent red
    tagline: "Strategy | Partnership | Peace of Mind"
  }
} as const;

export type BrandingConfig = typeof BRANDING;

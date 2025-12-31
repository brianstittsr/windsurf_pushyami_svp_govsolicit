/**
 * XProtege (XITM) Branding Configuration
 * 
 * This file contains all branding information for XProtege Institute of Technology and Management
 * Update this file to rebrand the entire platform
 */

export const BRANDING = {
  company: {
    name: "XProtege",
    legalName: "XProtégé Institute of Technology and Management (XITM)",
    tagline: "Unfold the Power of Excellence",
    description: "Where innovation seamlessly integrates with execution. We transform your ideas into impactful, market-ready solutions.",
    mission: "At XProtege, our mission is to be a leader in the IT industry by delivering top-tier staffing solutions and expanding our footprint through bidding and securing contracts with the State of Maryland, federal agencies, and the commercial sector.",
    vision: "To become a premier technology partner, recognized for our excellence in IT staffing, innovative solutions, and successful project execution across public and private sectors.",
    founded: "2024",
  },

  contact: {
    email: "contact@xprotege.com",
    phone: "+1-510-435-7930",
    address: {
      street: "",
      city: "Ellicott City",
      state: "MD",
      zip: "21042",
      full: "Ellicott City, MD 21042 USA"
    },
    website: "https://xprotege.com",
    linkedin: "https://www.linkedin.com/company/xprotege"
  },

  certifications: {
    sba8a: false,
    veteranOwned: false,
    womanOwned: true,
    minorityOwned: true,
    smallBusiness: true,
    swam: "",
    gsaMas: "",
    naicsCodes: ["541611", "541511", "541512", "541519", "541618", "611420", "611430"],
    teamCertifications: [
      "CompTIA Security+",
      "CompTIA Cloud+",
      "CompTIA Cybersecurity Analyst+",
      "Certified Secure Software Lifecycle (CSSL)",
      "PMP",
      "Certified Scrum Master (CSM)",
      "ITIL v3",
      "Certified Information Systems Auditor (CISA)",
      "System Security Certified Practitioner (SSCP)"
    ]
  },

  leadership: {
    president: {
      name: "Pushyami Duvvuri",
      title: "President",
      additionalRoles: "President – ITServ Alliance, Maryland Chapter | President and Founder – Janayitri Foundation",
      bio: "Pushyami Duvvuri is a dynamic and accomplished leader with a passion for both business innovation and community impact. A resident of Ellicott City, MD, for over 24 years, Pushyami's career began as an IT consultant, where she quickly rose to leadership roles, including managing a major federal contract early in her career. As the founder and president of XProtege, she has demonstrated exceptional leadership in the tech industry, providing innovative product development solutions and helping clients achieve business success.",
      linkedin: "",
      experience: "24+ years"
    }
  },

  services: {
    core: [
      {
        name: "Artificial Intelligence",
        description: "XProtege leverages AI to drive smart automation, enhance decision-making, and optimize business processes with advanced machine learning solutions including Generative AI, MLOps, NLP, and RPA.",
        icon: "Bot"
      },
      {
        name: "Cloud Services",
        description: "Experience seamless transition to the cloud with XProtege's proficient cloud services including ATO support for GovCloud environments up to IL6, cloud migration, security, and governance.",
        icon: "Cloud"
      },
      {
        name: "Cybersecurity",
        description: "XProtege provides cutting-edge security solutions to protect businesses from cyber threats, ensuring data integrity and compliance with DISA STIG practices.",
        icon: "Shield"
      },
      {
        name: "Data Analytics & Engineering",
        description: "Unleash insights and drive efficiency with our data analytics capabilities including KPIs, executive dashboards, and dynamic reporting tools using Python, PySpark, R, and PowerBI.",
        icon: "BarChart"
      },
      {
        name: "Digital Modernization",
        description: "Transform legacy systems into agile, future-ready digital solutions. We specialize in modernization within Azure and AWS GovCloud in PaaS environments.",
        icon: "Zap"
      },
      {
        name: "Enterprise IT",
        description: "Comprehensive IT sustainment, cybersecurity, RMF support, accreditation assistance, and modernization services for federal agencies with proven track record.",
        icon: "Server"
      },
      {
        name: "ERP Implementations",
        description: "Robust ERP implementation services including SAP and Microsoft Dynamics 365 & Power Platform with strategic consulting, system integration, and managed services.",
        icon: "Database"
      },
      {
        name: "Training",
        description: "Comprehensive training programs in Project Management, Information Technology, and Business Development through classroom, hands-on, and e-learning formats.",
        icon: "GraduationCap"
      }
    ],
    specialties: [
      "Generative AI (LLMs)",
      "Machine Learning Operations (MLOps)",
      "Natural Language Processing",
      "Cloud Migration & Security",
      "GovCloud IL6 Support",
      "DISA STIG Compliance",
      "SAP Implementation",
      "Microsoft Dynamics 365",
      "Agile Development"
    ]
  },

  stats: {
    experience: "10+ years",
    cloudLevel: "IL6",
    methodology: "Agile",
    support: "24/7"
  },

  clients: {
    federal: [
      {
        name: "State of Maryland",
        logo: "MD"
      },
      {
        name: "U.S. Department of Defense (DoD)",
        logo: "DOD"
      },
      {
        name: "Federal Agencies",
        logo: "FED"
      }
    ],
    commercial: [
      "Commercial Sector Clients"
    ]
  },

  values: {
    core: [
      "Commitment to Excellence",
      "Integrity and Trust",
      "Customer Focus",
      "Teamwork and Accountability"
    ],
    motto: "Where Ideas Transform Into Market Leaders",
    reference: ""
  },

  capabilities: {
    agile: "Superior Agile Methodology delivering efficient and reliable capabilities with highest ROI",
    customerService: "Extraordinary Customer Service with transparent and measurable project progress",
    innovation: "Modern Innovative Solutions that meet mission requirements and eliminate bottlenecks",
    expertise: "Specialized Technical Expertise to customize solutions exceeding client expectations",
    costEffective: "Cost-effective Approach maintaining effective cost control for on-time, within-budget delivery"
  },

  theme: {
    primaryColor: "#0ea5e9", // Sky blue - AI/Cloud
    secondaryColor: "#06b6d4", // Cyan accent
    tagline: "Unfold the Power of Excellence"
  }
} as const;

export type BrandingConfig = typeof BRANDING;

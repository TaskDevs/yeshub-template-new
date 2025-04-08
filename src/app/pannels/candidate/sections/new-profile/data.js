// Dummy data
export const candidateData = {
  name: "John Doe",
  title: "Full Stack Developer",
  rating: 4.9,
  reviews: 125,
  about:
    "Experienced full-stack developer with 6+ years of expertise in building scalable web applications. Specialized in React, Node.js, and cloud technologies. Passionate about creating elegant solutions to complex problems.",
  location: "Adabraka, Accra",
  rate: "75/hour",
  memberSince: "January 2018",
  avatar: "https://i.pravatar.cc/150?img=4",
  languages: [
    { language: "English", proficiency: "Native" },
    { language: "French", proficiency: "Intermediate" },
    { language: "Spanish", proficiency: "Fluent" },
  ],
  skills: [
    "JavaScript",
    "React",
    "Node.js",
    "TypeScript",
    "AWS",
    "Python",
    "Docker",
    "GraphQL",
  ],
  workHistory: [
    {
      role: "Senior Developer at Tech Corp",
      period: "2020 - Present",
    },
    {
      role: "Lead Developer at StartupX",
      period: "2018 - 2020",
    },
    {
      role: "Full Stack Developer at DevCo",
      period: "2016 - 2018",
    },
  ],
  education: [
    {
      institutionName: "UENR",
      degree: "Bachelor",
      fieldOfStudy: "Computer Science",
      startDate: "2025",
      endDate: "2025",
      description: "A four year degree",
      current: false
    },
    {
      institutionName: "KNUST",
      degree: "Masters",
      fieldOfStudy: "Emotional Intelligence",
      startDate: "2025",
      endDate: "2025", 
      description: "A two year masters program",
      current: false
    }
  ],
  workHours: {
    availability: 'full-time',
    hoursPerWeek: 40,
    preferredWorkingHours: 'standard',
    customStartHour: '09:00',
    customEndHour: '17:00',
    workDays: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false
    },
    timeZone: 'UTC',
    notice: '2 weeks'
  },
  portfolio: [
    {
      projectTitle: "E-commerce Platform",
      role: "Lead Developer",
      skills: "React, Node.js, MongoDB, AWS",
      startDate: "2023-01",
      endDate: "2023-06",
      description: "Developed a full-stack e-commerce platform with advanced search features, payment integration, and inventory management system.",
      projectUrl: "https://44db8f1c.yeshubapp.pages.dev",
      current: false,
      images: ["/yes-logo-1.png", "/yes-logo-1.png"]
    },
    {
      projectTitle: "Healthcare Dashboard",
      role: "Frontend Specialist",
      skills: "React, TypeScript, D3.js, Material UI",
      startDate: "2023-07",
      endDate: "",
      description: "Building a real-time analytics dashboard for healthcare professionals to monitor patient data and treatment outcomes.",
      projectUrl: "https://44db8f1c.yeshubapp.pages.dev",
      current: true,
      images: ["/yes-logo-1.png"]
    }
  ],
  testimonials: [
    {
      clientName: "Sarah Johnson",
      clientCompany: "TechInnovate Inc.",
      clientPosition: "CTO",
      relationship: "Project Client",
      testimonialDate: "2023-11-15",
      testimonialText: "John delivered exceptional work on our platform migration. His technical expertise and communication skills made a complex project seamless. Would definitely hire again for future projects.",
      rating: "5"
    },
    {
      clientName: "Michael Chen",
      clientCompany: "GrowthStarters",
      clientPosition: "Product Manager",
      relationship: "Contract Developer",
      testimonialDate: "2023-08-22",
      testimonialText: "Working with John was a pleasure. He understood our requirements quickly and delivered high-quality code ahead of schedule. His problem-solving abilities saved us countless hours.",
      rating: "5"
    },
    {
      clientName: "Elena Rodriguez",
      clientCompany: "DataFlow Systems",
      clientPosition: "Engineering Director",
      relationship: "Consultant",
      testimonialDate: "2023-05-10",
      testimonialText: "John's expertise in both frontend and backend development was invaluable for our project. He's proactive, reliable, and produces clean, maintainable code.",
      rating: "4"
    }
  ],
  licenses: [
    {
      licenseName: "Professional Engineering License",
      issuingOrganization: "Engineering Council",
      licenseNumber: "PE-12345-GA",
      issueDate: "2023-05-12",
      expirationDate: "2027-05-12",
      description: "Licensed Professional Engineer authorized to practice in Georgia",
      neverExpires: false
    },
    {
      licenseName: "Real Estate Broker License",
      issuingOrganization: "State Real Estate Commission",
      licenseNumber: "REB-9876-AC",
      issueDate: "2022-03-18",
      expirationDate: "",
      description: "Authorized to conduct real estate transactions as a broker",
      neverExpires: true
    }
  ],
  certifications: [
    {
      certificationName: "AWS Certified Solutions Architect",
      issuingOrganization: "Amazon Web Services",
      credentialID: "AWS-CSA-123456",
      issueDate: "2023-08-15",
      expiryDate: "2026-08-15",
      description: "Professional level certification for designing distributed systems on AWS",
      hasExpiry: true,
      credentialUrl: "https://aws.amazon.com/verification"
    },
    {
      certificationName: "Google Professional Data Engineer",
      issuingOrganization: "Google Cloud",
      credentialID: "GCP-PDE-789012",
      issueDate: "2024-01-20",
      expiryDate: "2027-01-20",
      description: "Certification for designing and building data processing systems on Google Cloud",
      hasExpiry: true,
      credentialUrl: "https://google.com/certificates/verify"
    }
  ]
};

//  empty profile sections content
export const profileSections = [
  {
    title: "About Me",
    description: "Add about your yourself",
    onClick: () => {},
  },
  {
    title: "Skills",
    description: "Add your skills info",
    onClick: () => {},
  },
  {
    title: "Work History",
    description: "Add your work history ",
    onClick: () => {},
  },
  {
    title: "Education",
    description: "Add your educational background",
    onClick: () => {},
  },
  {
    title: "Portfolio",
    description: "Showcase your projects",
    onClick: () => {},
  },
  {
    title: "Certifications",
    description: "Add your professional certifications",
    onClick: () => {},
  },
  {
    title: "Work Hours",
    description: "Set your weekly availability",
    onClick: () => {},
  },
  {
    title: "Licenses",
    description: "Add your professional licenses",
    onClick: () => {},
  },
  {
    title: "Testimonials",
    description: "Add client testimonials",
    onClick: () => {},
  },
];

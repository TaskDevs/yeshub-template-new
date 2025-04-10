import businessPeImg from "./assets/happy-client.jpg";
import colleaguesImg from "./assets/colleagues-review.jpg";
import modernOfficeImg from "./assets/modern-office.jpg";
import officeEntranceImg from "./assets/office-entrance-sm.jpg";
import clientLogo from "./assets/client-logo.avif";

export const clientProfileData = {
  companyName: "Tech Solutions Ghana Ltd",
  headline: "Digital Transformation & IT Services",
  rating: 4.8,
  reviewsCount: 125,
  city: "Accra",
  region: "Greater Accra",
  country: "Ghana",
  timezone: "GMT+0",
  email: "john.doe@example.com",
  logo: clientLogo,
  coverImage: officeEntranceImg,
  about:
    "Leading IT solutions provider in Ghana with over 10 years of experience delivering digital transformation, software development, and IT consulting services to enterprise clients across West Africa.",

  experience: [
    {
      title: "Enterprise Solutions Division",
      organization: "Tech Solutions Ghana Ltd",
      startDate: "2020",
      endDate: "Present",
      employmentType: "Full-time",
      revenue: "$5M+ annually",
      description:
        "Specialized in delivering enterprise-scale digital transformation solutions, cloud migration, and custom software development for major corporations in Ghana and West Africa.",
    },
    {
      title: "SME Solutions Division",
      organization: "Tech Solutions Ghana Ltd",
      startDate: "2018",
      endDate: "2020",
      employmentType: "Full-time",
      revenue: "$2M+ annually",
      description:
        "Providing tailored IT solutions and digital transformation services for small and medium-sized businesses.",
    },
  ],

  contact: {
    phone: "+233 20 555 7890",
    email: "contact@techsolutionsghana.com",
    website: "www.techsolutionsghana.com",
    linkedin: "linkedin.com/company/techsolutionsghana",
  },

  stats: {
    foundedYear: "2013",
    employeesCount: "150+",
    clientsCount: "200+",
  },

  services: [
    "Digital Transformation",
    "Cloud Solutions",
    "IT Consulting",
    "Software Development",
    "Cybersecurity",
    "Data Analytics",
  ],

  certifications: [
    {
      title: "ISO 27001 Certified",
      organization: "Information Security Management",
      startDate: "2015",
      endDate: "2017",
      credentialUrl: "https://aws.amazon.com/verification",
    },
    {
      title: "Microsoft Gold Partner",
      organization: "Cloud Solutions Provider",
      startDate: "2010",
      endDate: "2014",
      credentialUrl: "https://aws.amazon.com/verification",
    },
  ],

  officeImages: [modernOfficeImg, colleaguesImg, businessPeImg],
};

export const profileSections = [
  {
    title: "About Me",
    description: "Add company description and general info",
    onClick: () => {},
  },
  {
    title: "Company Overview",
    description: "Add company division details and experience",
    onClick: () => {},
  },
  {
    title: "Core Services",
    description: "Add main services offered by the company",
    onClick: () => {},
  },
  {
    title: "Our Offices",
    description: "Showcase company office images",
    onClick: () => {},
  },
  {
    title: "Business Information",
    description: "Add contact, website and social links",
    onClick: () => {},
  },
  {
    title: "Company Details",
    description: "Add founding year, employee and client stats",
    onClick: () => {},
  },
  {
    title: "Certifications",
    description: "Add your professional certifications",
    onClick: () => {},
  },
];

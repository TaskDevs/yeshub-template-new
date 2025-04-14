import talentImg1 from "./assets/afric-man.jpg";
import talentImg2 from "./assets/man.avif";

// Sample data for the talent profiles
export const applicants = [
  {
    id: 1,
    name: "Sah Titus Samuel",
    role: "Senior Full Stack Developer",
    image: talentImg1,
    experience: "5 years experience",
    badge: "Top Rated",
    jobTitle: "React Frontend",
    rating: 5.0,
    reviews: 50,
    description:
      "Experienced full stack developer specializing in React, Node.js, and AWS. Built multiple enterprise-level applications.",
    skills: ["React", "Node.js", "AWS"],
    hourlyRate: 75,
    location: "Ghana",
  },
  {
    id: 2,
    name: "Dr. P.K Mensah",
    role: "UI/UX Designer",
    image: talentImg2,
    experience: "3 years experience",
    badge: "Rising Talent",
    jobTitle: "Graphic Design",
    rating: 4.8,
    reviews: 35,
    description:
      "Creative UI/UX designer with a focus on user-centered design. Portfolio includes mobile apps and web platforms.",
    skills: ["Figma", "Adobe XD", "UI Design"],
    hourlyRate: 45,
    location: "Ghana",
  },
];

export const skills = ["javascript", "python", "react"];

export const sortOptions = [
  "Most Relevant",
  "Highest Rated",
  "Lowest Rate",
  "Highest Rate",
];

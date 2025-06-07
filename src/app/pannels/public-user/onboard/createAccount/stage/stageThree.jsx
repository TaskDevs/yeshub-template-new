import React, { useState, useEffect } from "react";
import { START_USER_PROFILE_FIELD } from "../../../../../../globals/user-profile-data";
import InputField from "../../../../../common/input-field";
import SelectField from "../../../../../common/select-field";
import SkillSelector from "../../../../../common/skill-selector";
import ProfessionSelector from "./ProfessionSelector";
import { skillsList } from "../../../../../context/skills/skillsApi";
import { faker } from "@faker-js/faker"; // ✅ Faker for demo professions

const StageThree = ({ forms, handleInputChange }) => {
  const [selectedSkill, setSelectedSkill] = useState([]);
  const [skillList, setSkillList] = useState([]);
  const [professionList, setProfessionList] = useState([]);
  const [selectedProfession, setSelectedProfession] = useState(null);

  // Fetch skills from backend
  const fetchSkills = async () => {
    try {
      const res = await skillsList();
      if (res?.data) {
        const skills = res.data.map(skill => ({
          id: skill.id,
          skill: skill.skill,
        }));
        setSkillList(skills);
        console.log(skills);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Generate job titles using Faker
useEffect(() => {
  const jobs = new Set();

  // Add job titles from faker
  for (let i = 0; i < 100; i++) {
    jobs.add(faker.person.jobTitle());
  }

  // Add some manual popular job titles (expand as you like)
const commonJobs = [
  "Software Engineer",
  "Project Manager",
  "Data Scientist",
  "Product Owner",
  "UX Designer",
  "Marketing Specialist",
  "Sales Representative",
  "Customer Success Manager",
  "HR Coordinator",
  "Business Analyst",
  "Financial Analyst",
  "Graphic Designer",
  "DevOps Engineer",
  "QA Tester",
  "Content Writer",
  "Network Administrator",

  // Previous expanded list...
  "Accountant",
  "Administrative Assistant",
  "Art Director",
  "Brand Manager",
  "Business Development Manager",
  "Chief Technology Officer",
  "Chief Executive Officer",
  "Copywriter",
  "Data Analyst",
  "Database Administrator",
  "Electrical Engineer",
  "Event Planner",
  "Financial Advisor",
  "Front End Developer",
  "Human Resources Manager",
  "Information Security Analyst",
  "Logistics Coordinator",
  "Mechanical Engineer",
  "Mobile Developer",
  "Operations Manager",
  "Payroll Specialist",
  "Product Manager",
  "Project Coordinator",
  "Public Relations Specialist",
  "Recruiter",
  "Sales Manager",
  "Social Media Manager",
  "Software Developer",
  "Systems Analyst",
  "Technical Support Specialist",
  "UX Researcher",
  "Web Developer",

  // Even more job titles
  "Administrative Manager",
  "Aerospace Engineer",
  "Agricultural Scientist",
  "Air Traffic Controller",
  "Animator",
  "Anthropologist",
  "Application Developer",
  "Architect",
  "Audio Engineer",
  "Auditor",
  "Automotive Technician",
  "Baker",
  "Bank Teller",
  "Bartender",
  "Biochemist",
  "Biomedical Engineer",
  "Brand Strategist",
  "Business Consultant",
  "Cartographer",
  "Chemical Engineer",
  "Chemist",
  "Civil Engineer",
  "Clinical Psychologist",
  "Commercial Pilot",
  "Compliance Specialist",
  "Construction Manager",
  "Copy Editor",
  "Counselor",
  "Court Reporter",
  "Credit Analyst",
  "Customer Service Manager",
  "Database Developer",
  "Dental Hygienist",
  "Dietitian",
  "Editor",
  "Electrical Technician",
  "Emergency Management Specialist",
  "Environmental Consultant",
  "Event Coordinator",
  "Fashion Designer",
  "Film Director",
  "Financial Planner",
  "Firefighter",
  "Fitness Trainer",
  "Food Scientist",
  "Fundraiser",
  "Geneticist",
  "Geologist",
  "Graphic Illustrator",
  "Guidance Counselor",
  "Hair Stylist",
  "Health Educator",
  "Healthcare Consultant",
  "Historian",
  "Hotel Manager",
  "Industrial Designer",
  "Insurance Agent",
  "Interpreter",
  "Investment Analyst",
  "IT Support Specialist",
  "Journalist",
  "Judge",
  "Kindergarten Teacher",
  "Landscaper",
  "Lawyer",
  "Librarian",
  "Logistics Analyst",
  "Machine Operator",
  "Magazine Editor",
  "Maintenance Technician",
  "Market Analyst",
  "Massage Therapist",
  "Mathematician",
  "Mechanical Technician",
  "Medical Assistant",
  "Meteorologist",
  "Microbiologist",
  "Museum Curator",
  "Music Producer",
  "Network Administrator",
  "Nutritionist",
  "Occupational Health Specialist",
  "Oceanographer",
  "Office Manager",
  "Operations Research Analyst",
  "Optometrist",
  "Painter",
  "Paralegal",
  "Paramedic",
  "Park Ranger",
  "Patent Examiner",
  "Payroll Clerk",
  "Pediatrician",
  "Personal Trainer",
  "Philosopher",
  "Photographer",
  "Physical Therapist",
  "Physicist",
  "Pilot",
  "Plumber",
  "Policy Analyst",
  "Political Scientist",
  "Police Officer",
  "Postal Worker",
  "Professor",
  "Project Administrator",
  "Psychiatrist",
  "Public Health Specialist",
  "Public Relations Manager",
  "Quality Control Inspector",
  "Radiologist",
  "Real Estate Broker",
  "Receptionist",
  "Registered Nurse",
  "Reporter",
  "Research Assistant",
  "Restaurant Manager",
  "Retail Manager",
  "Risk Manager",
  "Robotics Engineer",
  "School Counselor",
  "Scientific Researcher",
  "Social Worker",
  "Sociologist",
  "Software Tester",
  "Speech-Language Pathologist",
  "Statistician",
  "Store Manager",
  "Structural Engineer",
  "Surgeon",
  "Surveyor",
  "Systems Administrator",
  "Teacher",
  "Technical Illustrator",
  "Technical Trainer",
  "Therapist",
  "Translator",
  "Transportation Planner",
  "Travel Agent",
  "Urban Planner",
  "Veterinary Technician",
  "Video Producer",
  "Warehouse Supervisor",
  "Wildlife Biologist",
  "Writer",
  "Zoologist"
];


  commonJobs.forEach(job => jobs.add(job));

  // Generate combinations: descriptor + area + jobTitle
  const descriptors = ["Senior", "Lead", "Junior", "Chief", "Principal"];
  const areas = ["Marketing", "Finance", "Operations", "Engineering", "Design"];
  const titles = ["Manager", "Consultant", "Specialist", "Coordinator", "Analyst"];

  for (let i = 0; i < 50; i++) {
    const desc = descriptors[Math.floor(Math.random() * descriptors.length)];
    const area = areas[Math.floor(Math.random() * areas.length)];
    const title = titles[Math.floor(Math.random() * titles.length)];
    jobs.add(`${desc} ${area} ${title}`);
  }

  setProfessionList([...jobs]);
}, []);


  useEffect(() => {
    fetchSkills();
  }, []);

  // Sync selected skills to form
  useEffect(() => {
    forms[1]({
      ...forms[0],
      skills_id: selectedSkill.join(", "),
    });
  }, [selectedSkill]);

  // Sync selected profession to form
  useEffect(() => {
    forms[1]({
      ...forms[0],
      profession: selectedProfession?.value || "",
    });
  }, [selectedProfession]);

  return (
    <div className="container">
      <div className="row">
        {/* LEFT COLUMN */}
        <div className="col-sm-12 col-md-6">
          <div className="container text-center mx-auto">
            <div>
              <h4 className="twm-title text-3xl text-gray">
                Profession Information
              </h4>
              <span>Professional information for better metrics</span>
            </div>

            <div className="container text-left mt-6">
                {/* Profession Selector (Autocomplete) */}
              <div className="row mt-3">
                <div className="col-sm-12 col-md-12">
                  <ProfessionSelector
                    selectedProfession={selectedProfession}
                    setSelectedProfession={setSelectedProfession}
                    professionList={professionList}
                  />
                </div>
              </div>
              {/* Input Field */}
              <div className="row">
                <div className="col-sm-12 col-md-12 mt-3">
                  <InputField
                    field={START_USER_PROFILE_FIELD.fieldDetailThree[0]}
                    label={START_USER_PROFILE_FIELD.fieldDetailThree[0].label}
                    value={forms[0]}
                    change={(data, field) => handleInputChange(field, data)}
                  />
                </div>
              </div>

              {/* Select Field */}
              <div className="row">
                <div className="col-sm-12 col-md-12">
                  <SelectField
                    noIcon="yes"
                    field={START_USER_PROFILE_FIELD.fieldDetailThree[1]}
                    label={START_USER_PROFILE_FIELD.fieldDetailThree[1].label}
                    options={START_USER_PROFILE_FIELD.fieldDetailThree[1].options}
                    value={forms[0]}
                    change={(data, field) => handleInputChange(field, data)}
                  />
                </div>
              </div>

            

              {/* Skill Selector */}
              <div className="row mt-1">
                <div className="col-sm-12 col-md-12">
                  <SkillSelector
                    skillAction={[selectedSkill, setSelectedSkill]}
                    selectedSkill={selectedSkill}
                    setSelectedSkills={setSelectedSkill}
                    skillList={skillList}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-sm-12 col-md-6">
          <div className="d-flex w-full items-center test-border">
            <img
              src="/assets/images/freelance-onboard/create-stage-three.png"
              className="img-fill-page"
              alt="Create profile visual"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StageThree;

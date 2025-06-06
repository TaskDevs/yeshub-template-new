import React from "react";

// Reusable Components
const Button = ({ children, variant = "default", size = "md", ...props }) => {
  const base =
    "font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors";

  const sizes = {
    sm: "text-sm px-3 py-1.5",
    md: "px-4 py-2",
  };

  const variants = {
    default: "bg-green-600 text-white hover:bg-green-700",
    outline: "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    ghost: "text-gray-600 hover:bg-gray-100",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]}`}
      {...props}
    >
      {children}
    </button>
  );
};

// const Input = ({ placeholder, ...props }) => {
//   return (
//     <input
//       placeholder={placeholder}
//       className="border border-gray-300 rounded-md px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//       {...props}
//     />
//   );
// };

const Avatar = ({ src, alt, fallback }) => {
  return (
    <div className="tw-css w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center text-sm font-semibold">
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        fallback
      )}
    </div>
  );
};

const ApplicantCard = ({ applicant }) => {
  const statusColors = {
    Interview: "text-green-600",
    Shortlist: "text-blue-600",
    Review: "text-yellow-600",
    Rejected: "text-red-600",
  };

  return (
    <div className="tw-css">
      <div className="flex justify-between p-4 border rounded-lg bg-white">
        <div className="flex gap-4">
          <Avatar fallback={applicant.name.charAt(0)} />
          <div className="text-sm">
            <div className="font-medium text-gray-900">{applicant.name}</div>
            <div className="text-gray-500">{applicant.role}</div>
            <div className="text-gray-400 text-xs">{applicant.location}</div>
            <div className="flex flex-wrap gap-1 mt-1">
              {applicant.skills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end text-sm gap-1">
          <span>
            Match Score: <strong>{applicant.match}%</strong>
          </span>
          <span>Experience: {applicant.experience} years</span>
          <span>Applied: {applicant.applied}</span>
          <span className={statusColors[applicant.status]}>
            Status: {applicant.status}
          </span>
          <div className="flex gap-2 mt-2">
            <Button size="sm" variant="outline">
              Message
            </Button>
            <Button size="sm">
              {applicant.status === "Rejected"
                ? "Reconsider"
                : applicant.status}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const JobDetailsPage = () => {
  const applicants = [
    {
      name: "Kwame Osei",
      role: "Senior Backend Developer",
      location: "Accra, Ghana",
      match: 95,
      skills: ["Node.js", "Express", "MongoDB", "AWS", "TypeScript"],
      experience: 7,
      applied: "May 11, 2025",
      status: "Interview",
    },
    {
      name: "Abena Mensah",
      role: "Backend Developer",
      location: "Kumasi, Ghana",
      match: 92,
      skills: ["Node.js", "MongoDB"],
      experience: 4,
      applied: "May 12, 2025",
      status: "Interview",
    },
    {
      name: "Emmanuel Ayeei",
      role: "Full Stack Developer",
      location: "Tamale, Ghana",
      match: 90,
      skills: ["Node.js", "Express", "MongoDB"],
      experience: 6,
      applied: "May 10, 2025",
      status: "Shortlist",
    },
    {
      name: "Kofi Boateng",
      role: "Backend Developer",
      location: "Tema, Ghana",
      match: 85,
      skills: ["Node.js", "Express", "MongoDB"],
      experience: 5,
      applied: "May 13, 2025",
      status: "Review",
    },
    {
      name: "Ama Darko",
      role: "Software Developer",
      location: "Cape Coast, Ghana",
      match: 78,
      skills: ["Node.js", "MongoDB", "TypeScript"],
      experience: 3,
      applied: "May 14, 2025",
      status: "Rejected",
    },
  ];

  return (
    <div className="tw-css p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">
            Senior Backend Developer (Node.js)
          </h1>
          <p className="text-sm text-gray-500">
            Remote (Africa Based) • Created on May 10, 2025 •{" "}
            {applicants.length} applicants
          </p>
          <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-600">
            {["Node.js", "Express", "MongoDB", "AWS", "TypeScript"].map(
              (skill) => (
                <span
                  key={skill}
                  className="bg-gray-200 px-2 py-1 rounded-full"
                >
                  {skill}
                </span>
              )
            )}
          </div>
          <div className="flex gap-2 mt-4">
            <Button variant="outline">Edit</Button>
            <Button variant="outline">Pause</Button>
            <Button variant="destructive">Close Job</Button>
          </div>
        </header>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            Applicants ({applicants.length})
          </h2>
          <div className="flex gap-2">
            <Button variant="outline">Export CSV</Button>
            <Button variant="outline">Filters</Button>
          </div>
        </div>

        <div className="space-y-4">
          {applicants.map((a, idx) => (
            <ApplicantCard key={idx} applicant={a} />
          ))}
        </div>

        <div className="flex justify-end gap-2 mt-6">
          {[1, 2, 3, 4].map((n) => (
            <Button key={n} size="sm" variant="outline">
              {n}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Clock,
  Users,
  Pencil,
  X,
  MoreVertical,
  Star,
} from "lucide-react";

const dummyApplicants = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  name: `Applicant ${i + 1}`,
  title: "Senior Backend Developer",
  location: "Accra, Ghana",
  match: 85 + (i % 10),
  experience: 5 + (i % 6),
  applied: `May ${10 + (i % 10)}, 2025`,
  status: ["New", "Reviewed", "Shortlisted", "Rejected"][i % 4],
  skills: ["Node.js", "Express", "MongoDB", "AWS", "TypeScript"].slice(
    0,
    (i % 5) + 1
  ),
  image: `https://randomuser.me/api/portraits/${
    i % 2 === 0 ? "men" : "women"
  }/${30 + i}.jpg`,
}));

const statuses = ["All", "New", "Reviewed", "Shortlisted", "Rejected"];

const sortOptions = ["Date Applied", "Match Score", "Experience"];
const JobListing = () => {
  const [activeTab, setActiveTab] = useState("details");
  const navigate = useNavigate();

  const [experienceFilter, setExperienceFilter] = useState(5);
  const [statusFilter, setStatusFilter] = useState("All");
  const [skillFilter, setSkillFilter] = useState([]);
  const [sortBy, setSortBy] = useState("Date Applied");
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [skillsOpen, setSkillsOpen] = useState(false);
  const handleExport = () => {
    // your export logic
    console.log("Exporting data...");
  };

  const toggleFilterVisibility = () => {
    setFiltersVisible((prev) => !prev);
  };

  const toggleSkill = (skill) => {
    setSkillFilter((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const filteredApplicants = dummyApplicants
    .filter((applicant) => {
      const meetsExperience = applicant.experience >= experienceFilter;
      const meetsStatus =
        statusFilter === "All" || applicant.status === statusFilter;
      const meetsSkills =
        skillFilter.length === 0 ||
        skillFilter.every((s) => applicant.skills.includes(s));
      return meetsExperience && meetsStatus && meetsSkills;
    })
    .sort((a, b) => {
      if (sortBy === "Match Score") return b.match - a.match;
      if (sortBy === "Experience") return b.experience - a.experience;
      if (sortBy === "Date Applied")
        return new Date(b.applied) - new Date(a.applied);
      return 0;
    });

  const allSkills = Array.from(
    new Set(dummyApplicants.flatMap((applicant) => applicant.skills))
  ).sort();

  return (
    <div className="tw-css p-6 max-w-6xl mx-auto bg-white rounded-lg shadow">
      <button
        onClick={() => navigate(-1)} // go back to previous page
        className="text-sm text-gray-500 mb-4 hover:underline"
      >
        &larr; Back to Jobs
      </button>
      <div className="border rounded-xl p-5 bg-white flex justify-between sm:flex-row sm:justify-between sm:items-center items-start mb-4 relative z-100">
        {/* Top Section: Title & Buttons */}
        <div className="flex justify-between items-start flex-wrap gap-4">
          {/* Title & Status */}
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-lg md:text-xl font-semibold text-gray-900">
              Senior Backend Developer (Node.js)
            </h1>
            <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
              Active
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {[
              "Node.js",
              "Express",
              "MongoDB",
              "AWS",
              "JavaScript",
              "TypeScript",
              "RESTful API",
            ].map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          {/* Info Row */}
          <div className="flex flex-wrap gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              Remote (Ghana Based)
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              Posted on May 10, 2025
            </div>
            <div className="flex items-center gap-1">
              <Users size={14} />
              27 applicants
            </div>
          </div>
          {/* Buttons */}
          <div className="flex gap-2">
            <button className="flex items-center gap-1 border border-gray-300 px-3 py-1.5 text-sm rounded-md text-gray-700 hover:bg-gray-50">
              <Pencil size={14} />
              Edit
            </button>

            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 bg-red-50 text-red-600 px-3 py-1.5 text-sm rounded-md border border-red-200 hover:bg-red-100"
            >
              <X size={14} />
              Close Job
            </button>
          </div>
        </div>
      </div>

      <div>
        {/* Tabs Navigation */}
        <div className="border-b border-gray-200 mb-4">
          <nav className="flex space-x-2 text-sm font-medium">
            <button
              onClick={() => setActiveTab("details")}
              className={`pb-2 ${
                activeTab === "details"
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              Job Details
            </button>
            <button
              onClick={() => setActiveTab("applicants")}
              className={`pb-2 ${
                activeTab === "applicants"
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              Applicants (27)
            </button>
            <button
              onClick={() => setActiveTab("activity")}
              className={`pb-2 ${
                activeTab === "activity"
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              Activity History
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="text-gray-800 text-sm border rounded-xl p-5 bg-white ">
          {activeTab === "details" && (
            <>
              <h2 className="text-lg font-semibold mb-2">Job Description</h2>
              <p className="mb-4">
                We are looking for an experienced Senior Backend Developer
                specializing in Node.js to join our growing technology team. As
                a Senior Backend Developer, you will be responsible for
                designing, developing, and maintaining our server-side
                applications, ensuring high performance and responsiveness to
                requests from the front-end.
              </p>

              <h3 className="font-semibold mb-2">Requirements</h3>
              <ul className="list-disc list-inside space-y-1 mb-4">
                <li>
                  5+ years of experience in backend development with Node.js
                </li>
                <li>Strong proficiency in JavaScript and TypeScript</li>
                <li>Experience with Express.js framework</li>
                <li>Expertise in designing and implementing RESTful APIs</li>
                <li>Proficient understanding of MongoDB and database design</li>
                <li>Experience with AWS services (EC2, S3, Lambda, etc.)</li>
                <li>
                  Knowledge of authentication and authorization mechanisms
                </li>
                <li>Understanding of CI/CD pipelines and DevOps practices</li>
                <li>Experience with microservices architecture</li>
                <li>
                  Excellent problem-solving skills and attention to detail
                </li>
                <li>
                  Strong communication skills and ability to work in a team
                </li>
                <li>
                  BSc/MSc in Computer Science, Engineering or relevant field (or
                  equivalent practical experience)
                </li>
              </ul>

              <h3 className="font-semibold mb-2">Responsibilities</h3>
              <ul className="list-disc list-inside space-y-1 mb-6">
                <li>
                  Design and implement robust, scalable backend services and
                  APIs
                </li>
                <li>Write clean, maintainable, and efficient code</li>
                <li>Optimize application performance and responsiveness</li>
              </ul>

              <h3 className="text-lg font-semibold mb-2">Benefits & Perks</h3>
              <ul className="list-disc list-inside space-y-1 mb-6">
                <li>Competitive salary based on experience</li>
                <li>Flexible working hours and remote work options</li>
                <li>Health insurance coverage</li>
                <li>Annual performance bonus</li>
                <li>
                  Professional development opportunities and conference
                  allowance
                </li>
                <li>Modern equipment and tools</li>
                <li>Casual work environment</li>
                <li>Team building activities and events</li>
              </ul>

              <h3 className="text-lg font-semibold mb-4">
                Additional Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4 gap-y-6 text-sm text-gray-700">
                <div>
                  <p className="text-gray-500 font-medium">Employment Type</p>
                  <p>Full-time</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Experience Level</p>
                  <p>Senior (5+ years)</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Salary Range</p>
                  <p>$80,000 - $120,000 per year</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Work Schedule</p>
                  <p>Monday to Friday, flexible hours</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Start Date</p>
                  <p>Immediate</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">
                    Application Deadline
                  </p>
                  <p>June 10, 2025</p>
                </div>
              </div>
            </>
          )}

          {activeTab === "applicants" && (
            <>
              <div className="p-6 bg-white rounded-xl">
                {/* Header Row */}
                <div className="p-6 bg-white space-y-6 text-sm">
                  {/* Row 1: Main Controls */}
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    {/* Application Status */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="statusFilter"
                        className="font-semibold text-gray-700 mb-1"
                      >
                        Application Status
                      </label>
                      <select
                        id="statusFilter"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border rounded-md px-3 py-2 w-48 text-sm focus:ring-blue-500"
                      >
                        <option value="">All Statuses</option>
                        {statuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Sort By */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="sortBy"
                        className="font-semibold text-gray-700 mb-1"
                      >
                        Sort By
                      </label>
                      <select
                        id="sortBy"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border rounded-md px-3 py-2 w-48 text-sm focus:ring-blue-500"
                      >
                        {sortOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
 {/* Skills Dropdown with Checkboxes */}
                      <div className="flex flex-col">
                        <label className="font-semibold text-gray-700 block">
                          Skills
                        </label>
                        <div className="relative">
                          <button
                            onClick={() => setSkillsOpen(!skillsOpen)}
                            className="border rounded-md px-3 py-2 w-48 text-sm focus:ring-blue-500"
                          >
                            {skillFilter.length > 0
                              ? `${skillFilter.length} selected`
                              : "Select skills"}
                          </button>
                          {skillsOpen && (
                            <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-md max-h-48 overflow-y-auto p-2">
                              {allSkills.map((skill) => (
                                <label
                                  key={skill}
                                  className="flex items-center gap-2 py-1 text-sm"
                                >
                                  <input
                                    type="checkbox"
                                    checked={skillFilter.includes(skill)}
                                    onChange={() => toggleSkill(skill)}
                                  />
                                  {skill}
                                </label>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    {/* Export Button */}
                    <div>
                      <button
                        onClick={handleExport}
                        className="mt-6 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Export CSV
                      </button>
                    </div>

                    {/* Filter Toggle */}
                    <div>
                      <button
                        onClick={toggleFilterVisibility}
                        className="mt-6 px-4 py-2 text-sm font-medium border rounded-md hover:bg-gray-100"
                      >
                        {filtersVisible ? "Hide Filters" : "Show Filters"}
                      </button>
                    </div>
                  </div>

                  {/* Row 2: Advanced Filters */}
                  {filtersVisible && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Experience Filter */}
                      <div className="space-y-2">
                        <label className="font-semibold text-gray-700 block">
                          Experience: {experienceFilter}+ years
                        </label>
                        <input
                          type="range"
                          min={0}
                          max={10}
                          step={1}
                          value={experienceFilter}
                          onChange={(e) =>
                            setExperienceFilter(parseInt(e.target.value))
                          }
                          className="w-full"
                        />
                      </div>

                     
                    </div>
                  )}
                </div>

                {/* Applicant Cards */}
                <div className="space-y-4">
                  {filteredApplicants.map((applicant) => (
                    <div
                      key={applicant.id}
                      className="border rounded-lg p-4 flex justify-between items-start"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={applicant.image}
                          alt={applicant.name}
                          className="w-14 h-14 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-800 text-base">
                            {applicant.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {applicant.title}
                          </p>
                          <p className="text-xs text-gray-500 mb-2">
                            {applicant.location}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {applicant.skills.map((skill) => (
                              <span
                                key={skill}
                                className="bg-gray-100 text-gray-700 px-2 py-0.5 text-xs rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="text-right space-y-1 text-sm">
                        <p className="flex items-center justify-end gap-1">
                          <Star size={14} className="text-yellow-500" />{" "}
                          {applicant.match}% Match
                        </p>
                        <p>
                          <span className="font-medium">Experience:</span>{" "}
                          {applicant.experience} yrs
                        </p>
                        <p>
                          <span className="font-medium">Applied:</span>{" "}
                          {applicant.applied}
                        </p>
                        <p>
                          <span className="font-medium">Status:</span>{" "}
                          {applicant.status}
                        </p>
                        <div className="flex gap-2 mt-2 justify-end">
                          <button className="bg-green-600 text-white text-xs px-3 py-1 rounded-md">
                            {applicant.status === "Shortlisted"
                              ? "Interview"
                              : "Shortlist"}
                          </button>
                          <button className="border px-3 py-1 text-xs rounded-md">
                            Message
                          </button>
                          <button className="border px-2 py-1 rounded-md">
                            <MoreVertical size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-6 flex justify-end gap-2 text-sm">
                  <button className="px-3 py-1 border rounded-md">
                    Previous
                  </button>
                  <button className="px-3 py-1 border rounded-md">1</button>
                  <button className="px-3 py-1 border rounded-md">2</button>
                  <button className="px-3 py-1 border rounded-md">Next</button>
                </div>
              </div>
            </>
          )}

          {activeTab === "activity" && (
            <p>Activity history will be displayed here.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobListing;

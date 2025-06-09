import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Users, Pencil, Pause, X } from "lucide-react";

const JobListing = () => {
      const [activeTab, setActiveTab] = useState("details");
        const navigate = useNavigate();
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
        {["Node.js", "Express", "MongoDB", "AWS", "JavaScript", "TypeScript", "RESTful API"].map((tag) => (
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
          <button className="flex items-center gap-1 border border-gray-300 px-3 py-1.5 text-sm rounded-md text-gray-700 hover:bg-gray-50">
            <Pause size={14} />
            Pause
          </button>
          <button className="flex items-center gap-1 bg-red-50 text-red-600 px-3 py-1.5 text-sm rounded-md border border-red-200 hover:bg-red-100">
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
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            Job Details
          </button>
          <button
            onClick={() => setActiveTab("applicants")}
            className={`pb-2 ${
              activeTab === "applicants"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            Applicants (27)
          </button>
          <button
            onClick={() => setActiveTab("activity")}
            className={`pb-2 ${
              activeTab === "activity"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            Activity History
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="text-gray-800 text-sm">
       {activeTab === "details" && (
  <>
    <h2 className="text-lg font-semibold mb-2">Job Description</h2>
    <p className="mb-4">
      We are looking for an experienced Senior Backend Developer specializing in Node.js to join our growing technology team. As a Senior Backend Developer, you will be responsible for designing, developing, and maintaining our server-side applications, ensuring high performance and responsiveness to requests from the front-end.
    </p>

    <h3 className="font-semibold mb-2">Requirements</h3>
    <ul className="list-disc list-inside space-y-1 mb-4">
      <li>5+ years of experience in backend development with Node.js</li>
      <li>Strong proficiency in JavaScript and TypeScript</li>
      <li>Experience with Express.js framework</li>
      <li>Expertise in designing and implementing RESTful APIs</li>
      <li>Proficient understanding of MongoDB and database design</li>
      <li>Experience with AWS services (EC2, S3, Lambda, etc.)</li>
      <li>Knowledge of authentication and authorization mechanisms</li>
      <li>Understanding of CI/CD pipelines and DevOps practices</li>
      <li>Experience with microservices architecture</li>
      <li>Excellent problem-solving skills and attention to detail</li>
      <li>Strong communication skills and ability to work in a team</li>
      <li>BSc/MSc in Computer Science, Engineering or relevant field (or equivalent practical experience)</li>
    </ul>

    <h3 className="font-semibold mb-2">Responsibilities</h3>
    <ul className="list-disc list-inside space-y-1 mb-6">
      <li>Design and implement robust, scalable backend services and APIs</li>
      <li>Write clean, maintainable, and efficient code</li>
      <li>Optimize application performance and responsiveness</li>
    </ul>

    <h3 className="text-lg font-semibold mb-2">Benefits & Perks</h3>
    <ul className="list-disc list-inside space-y-1 mb-6">
      <li>Competitive salary based on experience</li>
      <li>Flexible working hours and remote work options</li>
      <li>Health insurance coverage</li>
      <li>Annual performance bonus</li>
      <li>Professional development opportunities and conference allowance</li>
      <li>Modern equipment and tools</li>
      <li>Casual work environment</li>
      <li>Team building activities and events</li>
    </ul>

    <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
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
        <p className="text-gray-500 font-medium">Application Deadline</p>
        <p>June 10, 2025</p>
      </div>
    </div>
  </>
)}


        {activeTab === "applicants" && (
          <p>List of applicants will be shown here.</p>
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

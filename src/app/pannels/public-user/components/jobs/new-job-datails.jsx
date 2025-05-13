import { Star, Bookmark } from "lucide-react";

const JobDetailsPage = () => {
  return (
    <div className="tw-css flex flex-col lg:flex-row gap-6 p-6 bg-gray-50 min-h-screen">
      {/* Left Column */}
      <div className="flex-[2] space-y-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-semibold">
                Senior Frontend Developer
              </h2>
              <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                <span>Posted 2 hours ago</span>
                <span className="flex items-center gap-1">
                  <Star className="text-yellow-500 w-4 h-4 fill-yellow-400" />
                  <span>4.8 (2.3k reviews)</span>
                </span>
              </div>
            </div>
            <Bookmark className="w-5 h-5 text-gray-500 cursor-pointer" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-sm text-gray-700">
            <div>
              <p className="font-semibold">Budget</p>
              <p>$80 - $120/hour</p>
            </div>
            <div>
              <p className="font-semibold">Experience</p>
              <p>Expert Level</p>
            </div>
            <div>
              <p className="font-semibold">Project Length</p>
              <p>3+ months</p>
            </div>
            <div>
              <p className="font-semibold">Proposals</p>
              <p>24 received</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Project Description</h3>
            <p className="text-gray-700 text-sm">
              We are looking for an experienced frontend developer with strong
              React expertise to join our team. The ideal candidate will work on
              building and maintaining our web applications, collaborating with
              our design and backend teams.
            </p>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold text-sm mb-2">Required Skills:</h4>
            <div className="flex flex-wrap gap-2">
              {["React", "TypeScript", "Redux", "CSS3", "HTML5"].map(
                (skill) => (
                  <span
                    key={skill}
                    className="bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-700"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>

          <button className="mt-6 bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-md text-sm font-medium">
            Submit Proposal
          </button>
        </div>

        {/* About the Client */}
        <div className="bg-white p-6">
          <h3 className="text-base font-semibold text-gray-800 mb-6 border-b pb-2">
            About the Client
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-700">
            <div className="space-y-1">
              <p className="font-medium text-gray-500">📍 Location</p>
              <p className="text-gray-800">United States</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-gray-500">📅 Member Since</p>
              <p className="text-gray-800">Jan 2020</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-gray-500">💰 Avg Hourly Rate</p>
              <p className="text-gray-800">$85/hr</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="text-sm text-gray-600">
            <p className="font-semibold">Recent Reviews</p>
            <p className="mt-1 text-gray-800 font-medium">
              Michael Chen ⭐⭐⭐⭐⭐
            </p>
            <p className="text-gray-600 text-xs">
              &quot;new&quot;Great client to work with. Clear requirements and
              timely feedback. &quot;new&quot;
            </p>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="flex-[1] space-y-6">
        {/* Job Requirements */}
        <div className="bg-white p-6">
          <h3 className="text-base font-semibold text-gray-800 mb-6 border-b pb-2">
            Job Requirements
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-700">
            <div className="space-y-1">
              <p className="text-gray-500 font-medium">📈 Experience Level</p>
              <p className="text-gray-800">5+ years</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500 font-medium">📂 Project Type</p>
              <p className="text-gray-800">Long Term</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500 font-medium">⏰ Availability</p>
              <p className="text-gray-800">40 hrs/week</p>
            </div>
          </div>
        </div>

        {/* Similar Jobs */}
        <div className="bg-white p-6">
          <h3 className="text-base font-semibold text-gray-800 mb-6">
            Similar Jobs
          </h3>
          {[
            {
              title: "React Developer",
              rate: "$70-100/hour",
              desc: "Looking for a React developer to help build our e-commerce platform...",
            },
            {
              title: "Frontend Engineer",
              rate: "$60-90/hour",
              desc: "Need an experienced frontend engineer for our SaaS product...",
            },
            {
              title: "Full Stack Developer",
              rate: "$80-120/hour",
              desc: "Seeking a full stack developer with React and Node.js experience...",
            },
          ].map((job, idx) => (
            <div
              key={idx}
              className="mb-6 last:mb-0 border-b last:border-b-0 pb-4 last:pb-0"
            >
              <p className="text-sm font-medium text-gray-900">{job.title}</p>
              <p className="text-xs text-gray-500 mt-1">{job.rate}</p>
              <p className="text-xs text-gray-600 mt-1">{job.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;

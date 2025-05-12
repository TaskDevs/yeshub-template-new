import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Dummy job data for simulation
const mockJobs = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  title: `Frontend Developer #${i + 1}`,
  company: "Company Inc.",
  status: i % 2 === 0 ? "Interview" : i % 3 === 0 ? "Shortlisted" : "Pending",
  type: i % 3 === 0 ? "Contract" : i % 2 === 0 ? "Full-time" : "Part-time",
  salaryRange:
    i % 3 === 0 ? "$70k - $90k" : i % 2 === 0 ? "$90k - $120k" : "$50k - $70k",
  salaryValue: i % 3 === 0 ? 80 : i % 2 === 0 ? 105 : 60,
  daysLeft: `${10 - (i % 5)} days left`,
  description: "Looking for an experienced frontend developer...",
}));
const statusColors = {
  Pending: "text-yellow-600",
  Interview: "text-blue-600",
  Shortlisted: "text-green-600",
  Rejected: "text-red-600",
  default: "text-gray-600",
};

export default function Offers() {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [jobs] = useState(mockJobs);
  const [filters, setFilters] = useState({
    jobType: [],
    status: [],
    salaryValue: 200,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  const handleFilterChange = (group, value) => {
    setFilters((prev) => {
      const updated = new Set(prev[group]);
      updated.has(value) ? updated.delete(value) : updated.add(value);
      return { ...prev, [group]: Array.from(updated) };
    });
    setCurrentPage(1);
  };

  const salaryValueMatches = (value) => {
    return value <= filters.salaryValue;
  };

  const filteredJobs = jobs.filter(
    (job) =>
      (filters.jobType.length === 0 || filters.jobType.includes(job.type)) &&
      (filters.status.length === 0 || filters.status.includes(job.status)) &&
      salaryValueMatches(job.salaryValue)
  );

  const totalPages = Math.ceil(filteredJobs.length / pageSize);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="tw-css flex min-h-screen bg-gray-50 p-6 gap-6">
      {/* Sidebar Filters */}
      <aside className="w-72 bg-white p-4 rounded-2xl shadow-sm filter-sidebar">
        <h2 className="text-xl font-bold mb-6">Filter By</h2>

        {/* Proposal Status */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">
            Proposal Status
          </label>
          <select
            className="w-full border rounded px-3 py-2 text-sm"
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                status:
                  e.target.value === "All Proposals" ? [] : [e.target.value],
              }))
            }
          >
            <option>All Proposals</option>
            <option>Pending</option>
            <option>Interview</option>
            <option>Shortlisted</option>
          </select>
        </div>

        {/* Offer Type */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Offer Type</label>
          <div className="space-y-2 text-sm">
            {["Direct Offers", "Invited Jobs"].map((type) => (
              <label key={type} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="form-checkbox text-green-800 rounded"
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        {/* Job Type */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Job Type</label>
          <div className="space-y-2 text-sm">
            {["Full-time", "Contract", "Part-time"].map((type) => (
              <label key={type} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.jobType.includes(type)}
                  onChange={() => handleFilterChange("jobType", type)}
                  className="form-checkbox text-green-800 rounded"
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        {/* Salary Range */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">
            Salary Range
          </label>
          <input
            type="range"
            min="0"
            max="200"
            step="5"
            value={filters.salaryValue}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                salaryValue: Number(e.target.value),
              }))
            }
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>$0</span>
            <span>${filters.salaryValue}k</span>
          </div>
        </div>

        {/* Experience Level */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">
            Experience Level
          </label>
          <div className="space-y-2 text-sm">
            {["Entry Level", "Mid Level", "Senior Level"].map((level) => (
              <label key={level} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="form-checkbox text-green-800 rounded"
                />
                {level}
              </label>
            ))}
          </div>
        </div>
      </aside>
      {/* mobile filters */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40"
            onClick={() => setShowMobileFilters(false)}
          />

          {/* Drawer */}
          <div className="relative bg-white w-full max-w-sm h-full shadow-xl transform transition-transform duration-300 translate-x-0">
            <div className="p-4">
              <button
                onClick={() => setShowMobileFilters(false)}
                className="absolute top-3 right-4 text-gray-600 text-xl"
              >
                ✕
              </button>
              <h2 className="text-xl font-bold mb-4">Filter Jobs</h2>

              <div className="space-y-4">
                {/* Proposal Status */}
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Proposal Status
                  </label>
                  <select
                    className="w-full border rounded px-3 py-2 text-sm"
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        status:
                          e.target.value === "All Proposals"
                            ? []
                            : [e.target.value],
                      }))
                    }
                    value={filters.status[0] || "All Proposals"}
                  >
                    <option>All Proposals</option>
                    <option>Pending</option>
                    <option>Interview</option>
                    <option>Shortlisted</option>
                  </select>
                </div>

                {/* Add your other filters: Job Type, Salary, Experience, etc. */}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="bg-green-700 text-white px-4 py-2 rounded"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* mobile filters */}
      {/* Main Content */}
      <div className="job-layout">
      <main className="flex-1 job-main">
        <div className="flex justify-between items-center mb-4">
          {/* Mobile Filter Button - Visible only on mobile */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setShowMobileFilters(true)}
              className="bg-green-700 text-white px-4 py-2 rounded"
            >
              Filter
            </button>
          </div>

          <h1 className="text-xl font-semibold">Proposals & Offers</h1>
          <select className="border border-gray-300 rounded px-2 py-1 text-sm">
            <option>Sort by: Recent Activity</option>
          </select>
        </div>

        <div className="space-y-4">
          {paginatedJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-4 rounded-2xl shadow-sm flex justify-between items-start"
            >
              <div>
                <h2 className="font-semibold text-lg">
                  {job.title}{" "}
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      statusColors[job.status] || statusColors.default
                    }`}
                  >
                    {job.status}
                  </span>
                </h2>
                <div className="text-sm text-gray-600 mb-2">
                  {job.company} • ⭐ 4.8 • 289 reviews
                </div>
                <div className="flex gap-2 mb-2 text-xs">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {job.status}
                  </span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {job.type}
                  </span>
                  <span className="text-gray-500">
                    {job.salaryRange} • {job.daysLeft}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2">{job.description}</p>
                <button className="text-sm text-blue-600 hover:underline">
                  View More
                </button>
              </div>
              <button className="bg-green-700 text-white px-4 py-2 rounded">
                View Proposal
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            className="p-2 hover:bg-gray-200 rounded"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1 ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="p-2 hover:bg-gray-200 rounded"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="job-sidebar w-72 space-y-6">
        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold mb-3">Invited Jobs</h2>
          {[1, 2].map((id) => (
            <div key={id} className="bg-gray-50 p-3 mb-2 rounded shadow-sm">
              <div className="text-sm font-medium">UX/UI Designer</div>
              <div className="text-xs text-gray-500">
                $120k - $150k • 5d left
              </div>
              <div className="flex gap-2 mt-2">
                <button className="bg-green-700 text-white px-3 py-1 text-sm rounded">
                  Accept
                </button>
                <button className="border border-gray-300 px-3 py-1 text-sm rounded">
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold mb-3">Job Offers</h2>
          {[1, 2].map((id) => (
            <div key={id} className="bg-gray-50 p-3 mb-2 rounded shadow-sm">
              <div className="text-sm font-medium">UX/UI Designer</div>
              <div className="text-xs text-gray-500">
                $120k - $150k • 5d left
              </div>
              <div className="flex gap-2 mt-2">
                <button className="bg-green-700 text-white px-3 py-1 text-sm rounded">
                  Accept
                </button>
                <button className="border border-gray-300 px-3 py-1 text-sm rounded">
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
    </div>
  );
}

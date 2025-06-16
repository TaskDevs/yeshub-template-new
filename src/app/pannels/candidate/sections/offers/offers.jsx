import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, Eye } from "lucide-react";
import { RotatingLines } from "react-loader-spinner";
import { getUserProposals } from "../../../../context/proposal/proposalApi";
import ProposalModal from "./offerDetailModal";

// Dummy job data for simulation

const statusColors = {
  Pending: "text-yellow-600",
  Interview: "text-blue-600",
  Shortlisted: "text-green-600",
  Rejected: "text-red-600",
  default: "text-gray-600",
};

export default function Offers() {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [proposals, setProposals] = useState(null);
  const [expanded, setExpanded] = useState(false);
    const [showModal, setShowModal] = useState(false);
  const mappedJobs = proposals
    ? proposals.data.map((proposal) => {
        const userProposal = proposal.proposal || {}; // Avoid undefined errors

        return {
          id: proposal.id,
          title: proposal.job_title || "Untitled Job",
          company: proposal?.employer?.company_name || "Unknown Company",
          status: userProposal.stage || "Pending",
          skills: proposal.skills,
          type: proposal.job_type || "N/A",
          salaryRange: userProposal.fix_rate
            ? `₵${userProposal.fix_rate}`
            : "Negotiable",
          salaryValue: userProposal.fix_rate
            ? Number(userProposal.fix_rate) / 1000
            : 0,
          daysLeft: proposal.end_date
            ? `${Math.max(
                0,
                Math.ceil(
                  (new Date(proposal.end_date) - new Date()) /
                    (1000 * 60 * 60 * 24)
                )
              )} days left`
            : "N/A",
          description: proposal.description || "No description available",
        };
      })
    : [];

  console.log("mapped, data:", mappedJobs);

  const userId = sessionStorage.getItem("userId");
  const isMobile = window.innerWidth < 640; // Or use `react-responsive`
  const loadMoreRef = useRef(null);
  const [loading, setLoading] = useState(false); // Loading state
  const [filters, setFilters] = useState({
    jobType: [],
    status: [],
    salaryValue: 200,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  useEffect(() => {
    const getProposal = async () => {
      setLoading(true);
      try {
        const res = await getUserProposals(userId);
        if (res) {
          setProposals(res);
          console.log("proposals: ", res.data); // Adjust this if needed
        } else {
          console.error("API responded with error:", res.message);
        }
      } catch (error) {
        console.error("Failed to fetch proposals:", error);
      } finally {
        // Force a minimum 800ms delay for smoother UX
        setTimeout(() => {
          setLoading(false);
        }, 800);
      }
    };

    if (userId) {
      getProposal();
    }
  }, [userId]);

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

  const filteredJobs = mappedJobs.filter(
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

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);
  console.log("Filtered jobs:", filteredJobs);
  console.log("Current Page:", currentPage);
  console.log("Total Pages:", totalPages);

  // pagination

  useEffect(() => {
    // Simulate data fetch or load more content
    if (loading) {
      setTimeout(() => {
        setLoading(false); // Stop loading after data fetch
        setCurrentPage((prev) => prev + 1); // Increment page number
      }, 300); // Adjust time based on your data fetch duration
    }
  }, [loading]);

  const handleLoadMore = () => {
    if (currentPage < totalPages && !loading) {
      setLoading(true); // Start loading when button is clicked
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className="tw-css flex min-h-screen bg-gray-50 p-6 gap-6 page-container">
      {loading && isMobile && (
        <div className="mt-4 text-center">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="2"
            animationDuration="0.75"
            width="40"
            visible={true}
          />
        </div>
      )}
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
              <label key={type} className="flex items-center gap-1 text-left">
                <input
                  type="checkbox"
                  className="form-checkbox text-green-800 rounded "
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
              <label key={type} className="flex items-center gap-1">
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
              <label key={level} className="flex items-center gap-1">
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
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40 transition-opacity"
            onClick={() => setShowMobileFilters(false)}
          />

          {/* Drawer */}
          <div className="relative z-50 ml-auto bg-white w-full max-w-sm h-full shadow-2xl rounded-l-2xl overflow-y-auto animate-slide-in-right">
            <div className="relative p-6 space-y-6">
              {/* Close Button */}
              <button
                onClick={() => setShowMobileFilters(false)}
                className="absolute top-4 right-4 text-gray-600 text-2xl hover:text-black transition z-50"
                aria-label="Close"
              >
                &times;
              </button>

              {/* Header */}
              <h2 className="text-2xl font-bold">Filter Jobs</h2>

              {/* Filter: Proposal Status */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Proposal Status
                </label>
                <select
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
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

              {/* Offer Type */}
              <div className="mb-6 w-50">
                <label className="block text-sm font-semibold mb-2">
                  Offer Type
                </label>
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
              <div className="mb-6 w-50">
                <label className="block text-sm font-semibold mb-2">
                  Job Type
                </label>
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
              <div className="mb-6 w-50">
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
                  <span>₵0</span>
                  <span>₵{filters.salaryValue}k</span>
                </div>
              </div>

              {/* Experience Level */}
              <div className="mb-6 w-50">
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

              {/* Apply Button */}
              <div className="pt-4">
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="w-full bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-800 transition"
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
            {loading ? (
              <div className="text-left py-10 text-gray-500">
                <div className="mt-4 text-left">
                  <RotatingLines
                    strokeColor="grey"
                    strokeWidth="2"
                    animationDuration="0.75"
                    width="40"
                    visible={true}
                  />
                </div>{" "}
                Loading proposals...
              </div>
            ) : paginatedJobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                <svg
                  className="w-12 h-12 mb-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75h.008v.008H9.75V9.75zM14.25 9.75h.008v.008h-.008V9.75zM9 15c.5.667 1.5 1 3 1s2.5-.333 3-1m2.25-7.5A9 9 0 1 1 6.75 6.75 9 9 0 0 1 18.75 7.5z"
                  />
                </svg>
                <h3 className="text-lg font-semibold mb-2">
                  No Proposals Found
                </h3>
                <p className="text-sm text-gray-400 max-w-xs text-center">
                  We couldn’t find any proposals that match your current
                  filters. Try adjusting your search or filter settings.
                </p>
              </div>
            ) : (
              paginatedJobs.map((job) => (
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
                    <div className="flex gap-2 mb-2 text-xs ">
                      {(() => {
                        const skillsArray = job.skills
                          .split(",")
                          .map((skill) => skill.trim());
                        const firstTwoSkills = skillsArray.slice(0, 2);
                        const remainingCount = skillsArray.length - 2;

                        return (
                          <>
                            {firstTwoSkills.map((skill, index) => (
                              <span
                                key={index}
                                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                            {remainingCount > 0 && (
                              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                                +{remainingCount} more
                              </span>
                            )}
                          </>
                        );
                      })()}

                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {job.type}
                      </span>
                      <span className="text-gray-500">
                        {job.salaryRange} • {job.daysLeft}
                      </span>
                    </div>
                    <div>
                      <p
                        className={`text-sm text-gray-700 mb-2 max-w-md ${
                          expanded
                            ? ""
                            : "truncate overflow-hidden whitespace-nowrap"
                        }`}
                        dangerouslySetInnerHTML={{
                          __html: job.description,
                        }}
                      />
                      <button
                        onClick={() => setExpanded(!expanded)}
                        className="text-blue-500 text-sm focus:outline-none"
                      >
                        {expanded ? "View Less" : "View More"}
                      </button>
                    </div>
                  </div>
                  <button 
                  onClick={() => setShowModal(true)}
                  className="bg-green-700 text-white px-3 py-2 text-sm rounded flex items-center gap-1 hover:bg-dark-800 transition">
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                </div>
              ))
            )}
          </div>

          {isMobile && currentPage < totalPages && (
            <div
              ref={loadMoreRef}
              className="text-center py-4 text-gray-500 text-sm"
            >
              <button
                onClick={handleLoadMore}
                className="bg-green-600 text-white px-4 py-2 rounded mt-4"
              >
                Load More
              </button>
            </div>
          )}

          {/* Pagination */}
          {!isMobile && (
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
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </main>

        {/* Right Sidebar */}
        <aside className="w-72 space-y-6 job-sidebar">
          <div className="bg-white p-4 rounded-2xl shadow-sm">
            <h2 className="text-lg font-semibold mb-3">Invited Jobs</h2>
            {[1, 2].map((id) => (
              <div
                key={id}
                className="card bg-gray-50 p-3 mb-2 rounded shadow-sm"
              >
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
         <ProposalModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}

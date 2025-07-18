import React, { useState, useEffect, useContext } from "react";
import InviteToJobModal from "./invitation-modal";
import MessageModal from "./message-modal";
import { useNavigate } from "react-router-dom";
import { FreelanceApiData } from "../../../../context/freelance/freelanceContextApi";
import {
  employerJobById,
  JobInvitation,
} from "../../../../context/jobs/jobsApi";
import Swal from "sweetalert2";

const experienceLevels = ["Entry Level", "Intermediate", "Expert"];
const ratings = ["1 Up", "2 Up", "3 Up", "4 Up", "5 Up", "6 Up", "7 Up", "8 Up"];
const locations = [
  "Greater Accra",
  "Ashanti",
  "Western",
  "Eastern",
  "Central",
  "Volta",
  "Northern",
  "Upper East",
  "Upper West",
  "Bono",
  "Bono East",
  "Ahafo",
  "Western North",
  "Oti",
  "North East",
  "Savannah",
];

export default function FreelancerSearch() {
  const { processGetAllFreelance, freelanceList } =
    useContext(FreelanceApiData);
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const navigate = useNavigate();
  const employerId = sessionStorage.getItem("userId");
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);

  const [filters, setFilters] = useState({
    skills: [],
    experience: "",
    hourlyRate: { min: "", max: "" },
    region: "",
    availableNow: false,
    rating: "",
    language: "",
  });

  useEffect(() => {
    processGetAllFreelance();
  }, []);

  useEffect(() => {
    setLoading(true);
    setCurrentPage(1); // Reset to first page when filters/search change

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timeout);
  }, [filters, searchTerm]);



  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleRateChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      hourlyRate: {
        ...prev.hourlyRate,
        [type]: value,
      },
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      skills: [],
      experience: "",
      hourlyRate: { min: "", max: "" },
      location: "",
      availableNow: false,
      rating: "",
      language: "",
    });
  };

  const filteredFreelancers = freelanceList?.filter((freelancer) => {
    const {
      skills,
      experience,
      hourlyRate,
      region,
      availableNow,
      rating,
      language,
    } = filters;

    const matchSkills =
      Array.isArray(skills) && skills.length
        ? skills.every((skill) => freelancer?.skills?.includes(skill))
        : true;

    const matchExperience = experience
      ? freelancer.experience == experience
      : true;

    const matchMinRate = hourlyRate.min
      ? freelancer.hourlyRate >= parseFloat(hourlyRate.min)
      : true;

    const matchMaxRate = hourlyRate.max
      ? freelancer.hourlyRate <= parseFloat(hourlyRate.max)
      : true;

    const matchRegion = region
      ? freelancer.region.includes(region.split(" ")[0])
      : true;

    const matchAvailability = availableNow ? freelancer.availableNow : true;

    const matchRating = rating ? freelancer.rating >= parseFloat(rating) : true;

    const matchLanguage = language ? freelancer.language == language : true;

    const matchSearch = searchTerm
      ? freelancer?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
        freelancer?.title?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
         freelancer?.profession?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
          freelancer?.region?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
        freelancer?.skills?.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : true;

    return (
      matchSkills &&
      matchExperience &&
      matchMinRate &&
      matchMaxRate &&
      matchRegion &&
      matchAvailability &&
      matchRating &&
      matchLanguage &&
      matchSearch
    );
  });
  const currentFreelancers = filteredFreelancers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  //   send invitation

  const handleSend = async ({
    freelancer_id,
    job_id,
    company_id,
    response = "pend",
  }) => {
    const data = { freelancer_id, job_id, company_id, response };

    try {
      const result = await JobInvitation(data);
      console.log("Invitation sent:", result);

      Swal.fire({
        icon: "success",
        title: "Invitation Sent",
        text: "Your job invitation has been sent successfully!",
        position: "center",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Failed to send invitation:", error);

      Swal.fire({
        icon: "error",
        title: "Failed to Send",
        text: "An error occurred while sending the invitation.",
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  useEffect(() => {
    if (employerId) {
      fetchJobs();
    }
  }, [employerId]);

  const fetchJobs = async () => {
    try {
      const res = await employerJobById(employerId);
      console.log("Job response:", res);
      setJobs(res?.jobs || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };
  return (
    <div className="tw-css px-10 py-2">
      <div className="mb-6 p-4 m-4">
        <h1 className="text-xl font-semibold">Find Talented Freelancers</h1>
        <div className="flex items-center border rounded-full px-4 py-2 mt-4 shadow-sm">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by skill, expertise or keyword..."
            className="flex-grow outline-none px-2"
          />
          <button className="bg-green-600 text-white px-6 py-2 rounded-full ml-2 ">
            Search
          </button>
        </div>
        <div className="filter-bar flex flex-wrap items-center mt-4 gap-2">
          <span className="font-semibold text-gray-700 search-label">
            Quick filters:
          </span>
          <div>
            <select
              value={filters.experience}
              onChange={(e) => handleFilterChange("experience", e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Experience level</option>
              {experienceLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={filters.rating}
              onChange={(e) => handleFilterChange("rating", e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Rating</option>
              {ratings.map((rating) => (
                <option key={rating} value={rating}>
                  {rating} ★
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={clearAllFilters}
            className="ml-auto text-green-600 hover:underline text-sm"
          >
            Clear All Filters
          </button>
        </div>
      </div>

      <div className="containers">
        {/* Filters Sidebar */}
        <div className="sidebar">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-bold">Filters</h2>
              <button
                onClick={clearAllFilters}
                className="text-green-600 text-sm"
              >
                Reset
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Experience Level</h3>
            {experienceLevels.map((level) => (
              <div key={level} className="items-center mb-1">
                <input
                  type="radio"
                  name="experience"
                  checked={filters.experience == level}
                  onChange={() => handleFilterChange("experience", level)}
                />
                <label className="ml-2 text-sm">{level}</label>
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-semibold mb-2">Hourly Rate</h3>
            <div className="items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.hourlyRate.min}
                onChange={(e) => handleRateChange("min", e.target.value)}
                className="w-1/2 p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.hourlyRate.max}
                onChange={(e) => handleRateChange("max", e.target.value)}
                className="w-1/2 p-2 border rounded"
              />
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Location</h3>
            <select
              value={filters.region}
              onChange={(e) => handleFilterChange("region", e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">All</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <div className="items-center">
            <input
              type="checkbox"
              checked={filters.availableNow}
              onChange={(e) =>
                handleFilterChange("availableNow", e.target.checked)
              }
            />
            <label className="ml-2 text-sm">Available Now</label>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Rating</h3>
            {ratings.map((rating) => (
              <div key={rating} className="items-center mb-1">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === rating}
                  onChange={() => handleFilterChange("rating", rating)}
                />
                <label className="ml-2 text-sm">{rating}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Freelancer Cards Section */}
        <div className="max-w-7xl mx-auto px-4 py-6 cards">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-gray-700 text-sm p-3 border bg-white shadow w-full sm:w-auto rounded-md">
              <div>
                <div className="text-lg font-semibold text-gray-900">
                  ({filteredFreelancers.length} ) freelancers found
                </div>

                <div className="text-sm text-gray-500 mt-1">
                  Browse profiles, reviews, and proposals then interview top
                  candidates.
                </div>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:w-full">
            {loading
              ? Array.from({ length: 4 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="border rounded-xl p-6 bg-white shadow-sm animate-pulse flex flex-col items-center"
                  >
                    <div className="w-24 h-24 bg-gray-200 rounded-full mb-4" />
                    <div className="w-1/2 h-4 bg-gray-200 rounded mb-2" />
                    <div className="w-1/3 h-3 bg-gray-200 rounded mb-4" />
                    <div className="flex gap-2 mb-6">
                      {[1, 2, 3].map((_, i) => (
                        <div
                          key={i}
                          className="w-12 h-4 bg-gray-100 rounded-full"
                        />
                      ))}
                    </div>
                    <div className="w-24 h-6 bg-gray-200 rounded mb-2" />
                  </div>
                ))
              : currentFreelancers.map((freelancer) => (
                  <div
                    key={freelancer.id}
                    className="bg-white rounded-xl border border-gray-200 p-6 text-center shadow-sm hover:shadow-md transition duration-300 cursor-pointer"
                    
                  >
                    <img
                      src={freelancer.avatar || "https://placehold.co/400"}
                      alt={freelancer.name}
                      className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                    />

                    <h3 className="text-lg font-semibold text-gray-900">
                      {freelancer.name}
                    </h3>
                    <p className="text-sm text-gray-600">{freelancer.region}</p>
                    <p className="text-sm text-gray-600">
                      {freelancer.profession}
                    </p>

                    <div className="flex justify-center items-center gap-2 mt-2 text-sm">
                      {freelancer.topRatedPlus ? (
                        <span className="flex items-center gap-1 text-green-600 font-medium">
                          <span className="text-xl">★</span> Top Rated Plus
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-green-600 font-medium">
                          <span className="text-xl">★</span> Top Rated
                        </span>
                      )}
                      <span className="text-gray-700 font-medium">
                        ₵{freelancer.hourlyRate || 0}/hr
                      </span>
                    </div>

                    <div className="flex justify-center items-center text-yellow-500 text-sm mt-1 mb-4">
                      <span>★ {freelancer.rating}</span>
                       <span className="text-gray-500 ml-1">
                        [{freelancer.experience || "N/A"}]
                      </span>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                      <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {freelancer.skills?.slice(0, 3).map((skill, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}

                        {freelancer.skills?.length > 3 && (
                          <span className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">
                            +{freelancer.skills.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedFreelancer(freelancer);
                        setIsModalOpen(true);
                      }}
                      className="border border-green-800 bg-green-600 text-white m-2 hover:bg-green-50 font-semibold text-sm px-5 py-2 rounded-full"
                    >
                      Invite to Job
                    </button>

                    <button 
                    onClick={() => navigate(`/freelancers/${freelancer.id}`)}
                    className="border border-green-600 text-green-600 hover:bg-green-50 font-semibold text-sm px-5 py-2 rounded-full">
                      View profile
                    </button>
                  </div>
                ))}
          </div>

          <div className="mt-6 flex justify-center gap-1">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100"
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {Array.from(
              { length: Math.ceil(filteredFreelancers.length / itemsPerPage) },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === i + 1
                      ? "bg-green-600 text-white"
                      : "text-gray-700"
                  }`}
                >
                  {i + 1}
                </button>
              )
            )}

            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  prev < Math.ceil(filteredFreelancers.length / itemsPerPage)
                    ? prev + 1
                    : prev
                )
              }
              className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100"
              disabled={
                currentPage ===
                Math.ceil(filteredFreelancers.length / itemsPerPage)
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {/* message modal */}

      <MessageModal isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {/* invitation */}
      <InviteToJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jobOptions={jobs}
        onSend={handleSend}
        freelancerName={selectedFreelancer?.name}
        freelancerId={selectedFreelancer?.id}
      />
    </div>
  );
}

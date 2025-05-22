import React, { useState, useEffect, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import { MdFavoriteBorder } from "react-icons/md";
import InviteToJobModal from "./invitation-modal";
import MessageModal from "./message-modal";
import { useNavigate } from "react-router-dom";
import { truncateText } from "../../../../../utils/truncateText";
import { FreelanceApiData } from "../../../../context/freelance/freelanceContextApi";

const skillsList = [
  "Web Development",
  "Mobile Development",
  "UI/UX Design",
  "Data Science",
  "Digital Marketing",
];
const experienceLevels = ["Entry Level", "Intermediate", "Expert"];
const ratings = ["8 Up", "7 Up", "6 Up"];
const languages = ["English", "French", "Spanish", "German"];
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

// const freelancersData = [
//   {
//     id: 1,
//     name: "Emm Rodriguez",
//     title: "Full Stack Developer",
//     skills: ["Web Development", "Data Science"],
//     experience: "Expert",
//     hourlyRate: 65,
//     location: "Volta",
//     availableNow: true,
//     rating: 8.9,
//     language: "English",
//   },
//   {
//     id: 2,
//     name: "David Chen",
//     title: "UI/UX Designer",
//     skills: ["UI/UX Design"],
//     experience: "Intermediate",
//     hourlyRate: 75,
//     location: "Central",
//     availableNow: false,
//     rating: 9.2,
//     language: "English",
//   },
//   {
//     id: 3,
//     name: "Sophia Williams",
//     title: "Data Scientist",
//     skills: ["Data Science"],
//     experience: "Expert",
//     hourlyRate: 90,
//     location: "Ashanti",
//     availableNow: true,
//     rating: 8.5,
//     language: "French",
//   },
//   {
//     id: 4,
//     name: "Michael Johnson",
//     title: "Marketing Specialist",
//     skills: ["Digital Marketing"],
//     experience: "Intermediate",
//     hourlyRate: 55,
//     location: "Sydney, Australia",
//     availableNow: true,
//     rating: 7.5,
//     language: "English",
//   },
//   {
//     id: 5,
//     name: "Olivia Martinez",
//     title: "SEO Specialist",
//     skills: ["Digital Marketing"],
//     experience: "Entry Level",
//     hourlyRate: 45,
//     location: "Barcelona, Spain",
//     availableNow: false,
//     rating: 6.8,
//     language: "Spanish",
//   },
//   {
//     id: 6,
//     name: "James Wilson",
//     title: "Mobile App Developer",
//     skills: ["Mobile Development"],
//     experience: "Expert",
//     hourlyRate: 70,
//     location: "Berlin, Germany",
//     availableNow: true,
//     rating: 8.6,
//     language: "German",
//   },
// ];

export default function FreelancerSearch() {
  const { processGetAllFreelance, freelanceList } =
    useContext(FreelanceApiData);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const [filters, setFilters] = useState({
    skills: [],
    experience: "",
    hourlyRate: { min: "", max: "" },
    location: "",
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

  const toggleSkill = (skill) => {
    setFilters((prev) => {
      const skills = prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill];
      return { ...prev, skills };
    });
  };

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
      location,
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

    const matchLocation = location
      ? freelancer.location.includes(location.split(" ")[0])
      : true;

    const matchAvailability = availableNow ? freelancer.availableNow : true;

    const matchRating = rating ? freelancer.rating >= parseFloat(rating) : true;

    const matchLanguage = language ? freelancer.language == language : true;

    const matchSearch = searchTerm
      ? freelancer?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
        freelancer?.title?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
        freelancer?.skills?.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : true;

    return (
      matchSkills &&
      matchExperience &&
      matchMinRate &&
      matchMaxRate &&
      matchLocation &&
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
  const handleSend = ({ freelancerName, selectedJob, message }) => {
    console.log("Invitation sent:", { freelancerName, selectedJob, message });
    // You can add API call here
  };

  return (
    <div className="tw-css px-10 py-6 my-5">
      <div className="mb-6 p-4 m-4 my-5">
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
          <div>
            <select
              value={filters.language}
              onChange={(e) => handleFilterChange("language", e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Language</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={filters.skills}
              onChange={(e) => handleFilterChange("skills", e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Skills</option>
              {skillsList.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
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
            <div>
              <h3 className="font-semibold mb-2">Skills</h3>
              {skillsList.map((skill) => (
                <div key={skill} className="items-center mb-1">
                  <input
                    type="checkbox"
                    checked={filters?.skills?.includes(skill)}
                    onChange={() => toggleSkill(skill)}
                  />
                  <label className="ml-2 text-sm">{skill}</label>
                </div>
              ))}
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
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
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

          <div>
            <h3 className="font-semibold mb-2">Languages</h3>
            {languages.map((lang) => (
              <div key={lang} className="items-center mb-1">
                <input
                  type="radio"
                  name="language"
                  checked={filters.language == lang}
                  onChange={() => handleFilterChange("language", lang)}
                />
                <label className="ml-2 text-sm">{lang}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Freelancer Cards Section */}
        <div className="max-w-7xl mx-auto px-4 py-6">
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

          <div className="grid md:grid-cols-2 gap-4">
            {loading
              ? Array.from({ length: 4 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="border rounded-xl p-4 bg-white shadow animate-pulse"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                      <div className="flex-1 space-y-2">
                        <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
                        <div className="w-1/3 h-3 bg-gray-200 rounded"></div>
                        <div className="w-1/4 h-2 bg-gray-100 rounded"></div>
                      </div>
                    </div>

                    <div className="w-full h-4 bg-gray-100 rounded mb-3"></div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {[1, 2, 3].map((_, i) => (
                        <span
                          key={i}
                          className="w-12 h-4 bg-gray-100 rounded-full"
                        ></span>
                      ))}
                    </div>
                    <div className="w-1/4 h-3 bg-gray-100 rounded mb-4"></div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-24 h-6 bg-gray-200 rounded-md"></div>
                      <div className="w-20 h-6 bg-gray-200 rounded-md"></div>
                      <div className="w-8 h-6 bg-gray-200 rounded-md"></div>
                    </div>
                  </div>
                ))
              : currentFreelancers.map((freelancer) => (
                  <div
                    key={freelancer.id}
                    className="border rounded-xl p-4 bg-white shadow hover:shadow-md transition hover:cursor"
                    onClick={() => navigate("/freelancers/1")}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-gray-300 rounded-full">
                        <Avatar
                          alt=""
                          src={
                            freelancer.avatar
                              ? freelancer.avatar
                              : "https://placehold.co/400"
                          }
                          className="w-12 h-12"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-base">
                          {freelancer.name}{" "}
                          <span className="text-sm text-gray-600">
                            ${freelancer.hourlyRate}/hr
                          </span>
                        </h4>
                        <p className="text-sm text-gray-500">
                          {freelancer.title}
                        </p>
                        <p className="text-xs text-gray-400">
                          {freelancer.earnings}
                        </p>
                        <div className="flex items-center text-yellow-500 mt-1 text-sm">
                          <span>★ {freelancer.rating}</span>
                          <span className="text-gray-500 ml-1">
                            ({freelancer.reviews} reviews)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600 mb-3">
                      {truncateText(freelancer.bio)}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {freelancer.skills?.map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="text-sm text-gray-500 mb-4">
                      {freelancer.location}
                    </div>

                    <div className="flex items-center justify-between gap-2 px-3 mt-4">
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-green-600 text-white px-4 py-1 rounded-md text-sm hover:bg-green-700"
                      >
                        Invite to Job
                      </button>
                      <button
                        onClick={() => setIsOpen(true)}
                        className="bg-white border text-gray-600 px-4 py-1 rounded-md text-sm hover:bg-green-700"
                      >
                        Contact
                      </button>
                      <button className="bg-white border text-gray-600 px-4 py-1 rounded-md text-sm hover:bg-green-700 flex items-center justify-center">
                        <MdFavoriteBorder className="w-4 h-4" />
                      </button>
                    </div>
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
        jobOptions={[
          "Senior Frontend Developer (React)",
          "Backend Engineer (Node.js)",
          "UX/UI Designer",
        ]}
        onSend={handleSend}
      />
    </div>
  );
}

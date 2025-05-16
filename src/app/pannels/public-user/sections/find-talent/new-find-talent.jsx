import React, { useState } from 'react';

const skillsList = ["Web Development", "Mobile Development", "UI/UX Design", "Data Science", "Digital Marketing"];
const experienceLevels = ["Entry Level", "Intermediate", "Expert"];
const ratings = ["8 Up", "7 Up", "6 Up"];
const languages = ["English", "French", "Spanish", "German"];
const locations = ["U.S. Only", "U.K. Only"];

const freelancersData = [
  {
    id: 1,
    name: "Emm Rodriguez",
    title: "Full Stack Developer",
    skills: ["Web Development", "Data Science"],
    experience: "Expert",
    hourlyRate: 65,
    location: "Toronto, Canada",
    availableNow: true,
    rating: 8.9,
    language: "English"
  },
  {
    id: 2,
    name: "David Chen",
    title: "UI/UX Designer",
    skills: ["UI/UX Design"],
    experience: "Intermediate",
    hourlyRate: 75,
    location: "San Francisco, USA",
    availableNow: false,
    rating: 9.2,
    language: "English"
  },
  {
    id: 3,
    name: "Sophia Williams",
    title: "Data Scientist",
    skills: ["Data Science"],
    experience: "Expert",
    hourlyRate: 90,
    location: "London, UK",
    availableNow: true,
    rating: 8.5,
    language: "French"
  },
  {
    id: 4,
    name: "Michael Johnson",
    title: "Marketing Specialist",
    skills: ["Digital Marketing"],
    experience: "Intermediate",
    hourlyRate: 55,
    location: "Sydney, Australia",
    availableNow: true,
    rating: 7.5,
    language: "English"
  },
  {
    id: 5,
    name: "Olivia Martinez",
    title: "SEO Specialist",
    skills: ["Digital Marketing"],
    experience: "Entry Level",
    hourlyRate: 45,
    location: "Barcelona, Spain",
    availableNow: false,
    rating: 6.8,
    language: "Spanish"
  },
  {
    id: 6,
    name: "James Wilson",
    title: "Mobile App Developer",
    skills: ["Mobile Development"],
    experience: "Expert",
    hourlyRate: 70,
    location: "Berlin, Germany",
    availableNow: true,
    rating: 8.6,
    language: "German"
  }
];

export default function FreelancerSearch() {
  const [filters, setFilters] = useState({
    skills: [],
    experience: '',
    hourlyRate: { min: '', max: '' },
    location: '',
    availableNow: false,
    rating: '',
    language: ''
  });

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
        [type]: value
      }
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      skills: [],
      experience: '',
      hourlyRate: { min: '', max: '' },
      location: '',
      availableNow: false,
      rating: '',
      language: ''
    });
  };

  const filteredFreelancers = freelancersData.filter((freelancer) => {
    const { skills, experience, hourlyRate, location, availableNow, rating, language } = filters;

    const matchSkills = skills.length ? skills.every(skill => freelancer.skills.includes(skill)) : true;
    const matchExperience = experience ? freelancer.experience === experience : true;
    const matchMinRate = hourlyRate.min ? freelancer.hourlyRate >= parseFloat(hourlyRate.min) : true;
    const matchMaxRate = hourlyRate.max ? freelancer.hourlyRate <= parseFloat(hourlyRate.max) : true;
    const matchLocation = location ? freelancer.location.includes(location.split(" ")[0]) : true;
    const matchAvailability = availableNow ? freelancer.availableNow === true : true;
    const matchRating = rating ? freelancer.rating >= parseFloat(rating) : true;
    const matchLanguage = language ? freelancer.language === language : true;

    return matchSkills && matchExperience && matchMinRate && matchMaxRate && matchLocation && matchAvailability && matchRating && matchLanguage;
  });

  return (
    <div className="tw-css px-10 py-6 m-5 p-5">
      <div className="mb-6">
        <h1 className="text-xl font-semibold">Find Talented Freelancers</h1>
        <div className="flex items-center border rounded-full px-4 py-2 mt-4 shadow-sm">
          <input
            type="text"
            placeholder="Search by skill, expertise or keyword..."
            className="flex-grow outline-none px-2"
          />
          <button className="bg-green-600 text-white px-6 py-2 rounded-full ml-2 hover:bg-green-700">Search</button>
        </div>
        <div className="flex flex-wrap items-center mt-4 gap-2">
          <span className="font-semibold text-gray-700">Quick filters:</span>
          {["Experience Level", "Hourly Rate", "Location", "Skills", "Languages"].map((filter) => (
            <button
              key={filter}
              className="border px-4 py-1 rounded-full text-sm hover:bg-gray-100"
            >
              {filter} <span className="ml-1">▼</span>
            </button>
          ))}
          <button onClick={clearAllFilters} className="ml-auto text-green-600 hover:underline text-sm">Clear All Filters</button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Filters Sidebar */}
        <div className="space-y-6 col-span-1">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-bold">Filters</h2>
              <button onClick={clearAllFilters} className="text-green-600 text-sm">Reset</button>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Skills</h3>
              {skillsList.map(skill => (
                <div key={skill} className="flex items-center mb-1">
                  <input type="checkbox" checked={filters.skills.includes(skill)} onChange={() => toggleSkill(skill)} />
                  <label className="ml-2 text-sm">{skill}</label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Experience Level</h3>
            {experienceLevels.map(level => (
              <div key={level} className="flex items-center mb-1">
                <input
                  type="radio"
                  name="experience"
                  checked={filters.experience === level}
                  onChange={() => handleFilterChange('experience', level)}
                />
                <label className="ml-2 text-sm">{level}</label>
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-semibold mb-2">Hourly Rate</h3>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.hourlyRate.min}
                onChange={(e) => handleRateChange('min', e.target.value)}
                className="w-1/2 p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.hourlyRate.max}
                onChange={(e) => handleRateChange('max', e.target.value)}
                className="w-1/2 p-2 border rounded"
              />
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Location</h3>
            <select
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">All</option>
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={filters.availableNow}
              onChange={(e) => handleFilterChange('availableNow', e.target.checked)}
            />
            <label className="ml-2 text-sm">Available Now</label>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Rating</h3>
            {ratings.map(rating => (
              <div key={rating} className="flex items-center mb-1">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === rating}
                  onChange={() => handleFilterChange('rating', rating)}
                />
                <label className="ml-2 text-sm">{rating}</label>
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-semibold mb-2">Languages</h3>
            {languages.map(lang => (
              <div key={lang} className="flex items-center mb-1">
                <input
                  type="radio"
                  name="language"
                  checked={filters.language === lang}
                  onChange={() => handleFilterChange('language', lang)}
                />
                <label className="ml-2 text-sm">{lang}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Freelancer Cards Section */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="mb-4 text-gray-600 text-sm">{filteredFreelancers.length} freelancers found</div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFreelancers.map(freelancer => (
              <div key={freelancer.id} className="border rounded-lg p-4 shadow-sm bg-white">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div>
                    <h4 className="font-semibold">{freelancer.name}</h4>
                    <p className="text-sm text-gray-500">{freelancer.title}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  Hourly Rate: ${freelancer.hourlyRate}/hr
                </div>
                <div className="text-sm text-gray-500 mb-2">{freelancer.location}</div>
                <div className="flex items-center justify-between">
                  <button className="bg-green-600 text-white px-4 py-1 rounded-full text-sm">Invite to Job</button>
                  <button className="text-gray-600 text-sm">Contact</button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {["Previous", 1, 2, 3, "Next"].map((item, idx) => (
              <button key={idx} className={`px-3 py-1 border rounded ${item === 2 ? 'bg-green-600 text-white' : 'text-gray-700'}`}>
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
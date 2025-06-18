import React, { useState, useEffect, useContext } from "react";
import {
  CheckCircle,
  MapPin,
  //Star,
  Clock,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { FreelanceApiData } from "../../../../context/freelance/freelanceContextApi";
//import HireTalentModal from "./hire-talent-modal";

export default function FreelancerDetailTwo() {
  const {
    processFreelanceProfile,
    viewFreelanceProfile,
    freelanceSkillInfo,
    employmentHistoryInfo,
    languagesData,
  } = useContext(FreelanceApiData);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  //const [freelanceProfileData, setFreelanceProfileData] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarCells, setCalendarCells] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);

  const { id, proposal_id } = useParams();

  const month = currentDate.getMonth(); // 0-11
  const year = currentDate.getFullYear();

  const navigate = useNavigate();

  useEffect(() => {
    console.log(id);
    processFreelanceProfile(id);
    // let data = freelanceList.filter((item) => item.id == id)?.[0];
    // console.log(data);
    // setFreelanceProfileData(data);
    generateCalendar(year, month);
    fetchAvailableDates(year, month);
  }, [year, month]);

  const generateCalendar = (year, month) => {
    const start = new Date(year, month, 1);
    const totalDays = new Date(year, month + 1, 0).getDate();
    const startDay = start.getDay();

    const days = [];

    for (let i = 0; i < startDay; i++) days.push(null); // blank before first
    for (let i = 1; i <= totalDays; i++) {
      days.push(new Date(year, month, i));
    }

    setCalendarCells(days);
  };

  const fetchAvailableDates = (year, month) => {
    // Simulated API call
    const mockAvailability = {
      "2025-4": [14, 15, 16, 17, 21, 22, 23, 24, 28, 29, 30, 31],
      "2025-5": [1, 2, 3, 5, 6, 10, 15, 20],
    };

    const key = `${year}-${month}`;
    setAvailableDates(mockAvailability[key] || []);
  };

  const goToPreviousMonth = () => {
    const newDate = new Date(year, month - 1, 1);
    setCurrentDate(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(year, month + 1, 1);
    setCurrentDate(newDate);
  };

  const handleViewProposal = () => {
    navigate(`/dashboard-client/view-candidate-proposal/${proposal_id}`);
  };

  return (
    <div className="tw-css max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 p-6 ">
      {/* Left Column */}
      <div className="freelancer-layout">
        <div className="max-w-7xl mx-auto px-4 py-6 ">
          {/* Profile Header */}
          <div className="bg-white p-6 rounded-xl shadow mb-4">
            <div className="flex gap-6">
              <img
                src={viewFreelanceProfile?.freelance_info?.[0]?.profile_image}
                alt="David Chen"
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="flex-1 space-y-3">
                <div className="flex justify-between">
                  <div>
                    <h1 className="text-xl font-semibold">
                      {viewFreelanceProfile?.freelance_info?.[0]?.firstname +
                        " " +
                        viewFreelanceProfile?.freelance_info?.[0]?.lastname}
                    </h1>
                    <p className="text-gray-600 text-sm">
                      {viewFreelanceProfile?.freelance_info?.[0]?.profession}
                    </p>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {viewFreelanceProfile?.freelance_info?.[0]?.city +
                        " " +
                        viewFreelanceProfile?.freelance_info?.[0]?.region +
                        " " +
                        viewFreelanceProfile?.freelance_info?.[0]?.address}
                    </div>
                    {/* <div className="flex items-center gap-1 text-yellow-500 text-sm mt-1">
                      <Star className="w-4 h-4" />
                      5.0 (84 reviews)
                    </div> */}
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">
                      {" "}
                      ₵{viewFreelanceProfile?.freelance_info?.[0]?.hourly_rate}
                      /hr
                    </p>
                    {/* <p className="text-sm text-gray-500"> ₵95k+ earned</p> */}
                    <p className="text-green-600 text-sm flex items-center justify-end mt-1">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Available now
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">
                  {viewFreelanceProfile?.freelance_info?.[0]?.bio}
                </p>
                <div className="flex flex-wrap gap-2 ">
                  {viewFreelanceProfile?.freelance_info?.[0]?.skills_id
                    ?.split(",")
                    .map((skill) => (
                      <span
                        key={skill}
                        className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 bg-white p-6 rounded-xl shadow-sm mb-4 sticky top-0 z-10">
            <nav className="flex space-x-4 text-sm font-medium text-gray-600">
              {[
                { label: "Overview", id: "overview" },
                { label: "Portfolio", id: "portfolio" },
                { label: "Work History", id: "work-history" },
                { label: "Skills", id: "skills" },
                { label: "Reviews", id: "reviews" },
              ].map((tab) => (
                <a
                  key={tab.id}
                  href={`#${tab.id}`}
                  className="pb-2 hover:border-b-2 hover:border-green-500 transition"
                >
                  {tab.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Overview Section */}
          {/* Overview Section */}
          <div
            id="overview"
            className="space-y-4 bg-white p-6 rounded-xl shadow mb-3"
          >
            <div className="items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                About{" "}
                {viewFreelanceProfile?.freelance_info?.[0]?.firstname +
                  " " +
                  viewFreelanceProfile?.freelance_info?.[0]?.lastname}
              </h2>
            </div>

            <p className="text-gray-700 text-sm leading-relaxed">
              {viewFreelanceProfile?.freelance_info?.[0]?.bio}
            </p>
          </div>

          {/* Portfolio Section */}
          <div
            id="portfolio"
            className="space-y-4 bg-white p-6 rounded-xl shadow mb-3"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Portfolio</h2>
              <a href="#" className="text-green-600 text-sm">
                View All
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {viewFreelanceProfile?.portfolio_info?.length > 0 ? (
                viewFreelanceProfile?.portfolio_info.map((item) => (
                  <div key={item.id}>
                    <h4 className="text-md mb-4">
                      Project Title: {item.project_title}
                    </h4>
                    <hr />
                    <span className="text-md mb-4">Role: {item.role}</span>
                    <hr />
                    <span className="text-md mb-4">
                      Description: {item.description}
                    </span>
                    <hr />
                    <div className="flex justify-between mb-4">
                      <span>Project Start: {item.project_start_date}</span>
                      <span>
                        Project End:{" "}
                        {item.project_end_date
                          ? item.project_end_date
                          : "Not Available"}
                      </span>
                    </div>
                    {item.media.map((i) => (
                      <div
                        key={i}
                        className="rounded-lg overflow-hidden shadow-sm"
                      >
                        <img
                          src={`${i.url}`}
                          alt={`Work ${i}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                <div>
                  <h2 className="text-xl text-gray-500">
                    No Portfolio available
                  </h2>
                </div>
              )}
            </div>
          </div>
          {/* Skills Section */}
          <div
            id="skills"
            className="space-y-6 bg-white p-6 rounded-xl shadow mb-3"
          >
            <h2 className="text-lg font-semibold">Skills & Expertise</h2>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 gap-6">
              {freelanceSkillInfo?.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1 text-sm">
                    <span className="font-medium text-gray-700">
                      {skill.name}
                    </span>
                    <span className="text-gray-500">{skill.level}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${skill.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications & Achievements */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Education
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                {viewFreelanceProfile?.education_info?.map((item) => (
                  <li key={item.id}>
                    {item.school +
                      " || " +
                      item.qualification +
                      " || " +
                      item.area_of_study}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Certification
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                {viewFreelanceProfile?.certificate_info?.map((item) => (
                  <>
                    <li key={item.id}>
                      {"Certificate Description" +
                        item.desription +
                        " || Organization: " +
                        item.organization +
                        " || Issue Date: " +
                        item.issued_at}
                    </li>
                    <p className="text-md">
                      Credential Url: {item.credential_url}
                    </p>
                  </>
                ))}
              </ul>
            </div>

            {/* Languages */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Languages
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                {languagesData?.map((item, index) => (
                  <li key={index}>
                    <span className="font-medium text-gray-700">
                      {item.language}:
                    </span>{" "}
                    {item.proficiency}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Work History Section */}
          {/* Work History Section */}
          <div
            id="work-history"
            className="space-y-6 bg-white p-6 rounded-xl shadow mb-3"
          >
            <h2 className="text-lg font-semibold">Work History</h2>

            {employmentHistoryInfo?.map((item, i) => (
              <div
                key={i}
                className="space-y-2 border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {item.date} • {item.price}
                    </p>
                  </div>
                  <div className="text-yellow-500 font-semibold text-sm">
                    ⭐ {item.rating?.toFixed(1)}
                  </div>
                </div>
                <p className="text-gray-700 text-sm">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            <a href="#" className="text-green-600 text-sm font-medium">
              View More Projects
            </a>
          </div>

          {/* Reviews Section */}
          {/* Reviews Section */}
          <div
            id="reviews"
            className="space-y-6 bg-white p-6 rounded-xl shadow mb-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Client Reviews</h2>
              <div className="text-sm text-gray-600 flex items-center gap-1">
                <span className="text-yellow-500">⭐</span>
                <span className="font-semibold">0</span>
                <span>(0 reviews)</span>
              </div>
            </div>

            {/* <div className="space-y-6">
              {/* Review 1 
              <div className="border-b pb-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4">
                    <img
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="Jennifer Lawson"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">Jennifer Lawson</h3>
                      <p className="text-sm text-gray-500">
                        CEO, StyleTrend E-commerce
                      </p>
                    </div>
                  </div>
                  <div className="text-yellow-500 text-sm">★★★★★ 5.0</div>
                </div>
                <p className="mt-3 text-gray-700">
                  David completely transformed our e-commerce platform. His
                  understanding of user behavior and attention to detail
                  resulted in a beautiful, intuitive interface that our
                  customers love. The redesign led to a significant increase in
                  sales and customer satisfaction. I highly recommend David for
                  any UI/UX project.
                </p>
                <p className="text-sm text-gray-400 mt-2">Apr 2023</p>
              </div>

              {/* Review 2 
              <div className="border-b pb-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4">
                    <img
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="Michael Rodriguez"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">Michael Rodriguez</h3>
                      <p className="text-sm text-gray-500">Founder, FinTrack</p>
                    </div>
                  </div>
                  <div className="text-yellow-500 text-sm">★★★★★ 5.0</div>
                </div>
                <p className="mt-3 text-gray-700">
                  Working with David on our fintech app was an incredible
                  experience. He took the time to understand our users needs and
                  created a design that perfectly balances functionality with
                  visual appeal. His research-driven approach and attention to
                  detail made all the difference. The app has received
                  overwhelmingly positive feedback from our users and investors.
                </p>
                <p className="text-sm text-gray-400 mt-2">Mar 2023</p>
              </div>

              {/* Review 3 *
              <div>
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4">
                    <img
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="Sarah Thompson"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">Sarah Thompson</h3>
                      <p className="text-sm text-gray-500">
                        Product Manager, AnalyticsPro
                      </p>
                    </div>
                  </div>
                  <div className="text-yellow-500 text-sm">★★★★★ 5.0</div>
                </div>
                <p className="mt-3 text-gray-700">
                  David redesigned our SaaS dashboard, transforming a complex
                  and cluttered interface into a clean, intuitive experience.
                  His design system has made our development process much more
                  efficient, and our users are thrilled with how easy it is to
                  navigate and extract insights. David is not just a designer
                  but a strategic partner who understands business goals.
                </p>
                <p className="text-sm text-gray-400 mt-2">Oct 2022</p>
              </div>
            </div> */}

            <div className="text-green-600 text-sm font-medium hover:underline cursor-pointer">
              View All 0 Reviews
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6 sidebar-right pt-4 my-4">
          {/* Action Buttons */}
          <div className="bg-white p-4 rounded-xl shadow space-y-3">
            <button
              className="w-full bg-green-600 text-white py-2 rounded-md font-semibold"
              onClick={() => handleViewProposal()}
            >
              View Proposal
            </button>
            {/* <button className="w-full border py-2 rounded-md font-medium">
              Contact
            </button> */}
          </div>

          {/* Availability */}
          <div className="bg-white p-4 rounded-xl shadow w-full sm:w-[320px]">
            <h3 className="text-sm font-semibold mb-2">Availability</h3>

            {/* Month Navigation */}
            <div className="flex justify-between items-center mb-2">
              <button
                onClick={goToPreviousMonth}
                className="text-gray-500 text-sm hover:text-black"
              >
                ←
              </button>
              <p className="text-sm text-gray-600 font-medium">
                {currentDate.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <button
                onClick={goToNextMonth}
                className="text-gray-500 text-sm hover:text-black"
              >
                →
              </button>
            </div>

            {/* Weekdays */}
            <div className="grid grid-cols-7 text-xs font-semibold text-gray-500 mb-1 text-center">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>

            {/* Calendar */}
            <div className="grid grid-cols-7 gap-1 text-sm">
              {calendarCells.map((day, i) =>
                day ? (
                  <div
                    key={i}
                    className={`text-center p-1 rounded-full ${
                      availableDates.includes(day.getDate())
                        ? "bg-green-100 text-green-700 font-medium"
                        : "text-gray-600"
                    }`}
                  >
                    {day.getDate()}
                  </div>
                ) : (
                  <div key={i} className="p-1" />
                )
              )}
            </div>

            {/* Notes */}
            <p className="text-sm text-gray-600 mt-2">Available for work</p>
            <p className="text-xs text-gray-500">
              Mon–Fri, 9:00 AM–6:00 PM (GMT-7)
            </p>
            <p className="text-xs text-gray-500 flex items-center mt-1">
              <Clock className="w-3 h-3 text-green-500" /> Usually responds
              within 2 hours
            </p>
          </div>
          {/* Pricing */}
          {/* <div className="bg-white p-4 rounded-xl shadow w-full sm:w-[320px]"> */}
          {/* Pricing & Services Header *
            <h3 className="text-sm font-semibold mb-2">Pricing & Services</h3>

            {/* Hourly Rate */}
          {/* <div className="mb-4">
              <p className="text-gray-700 text-sm">Hourly Rate</p>
              <p className="font-semibold text-lg">GH75/hr</p>
              <p className="text-xs text-gray-500 mt-1">
                Ideal for ongoing projects and revisions
              </p>
            </div>

            <hr className="my-4" /> */}

          {/* UI Design Package */}
          {/* <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <h4 className="font-semibold text-sm mb-1">UI Design Package</h4>
              <p className="text-lg font-bold mb-2">$2,500</p>
              <p className="text-sm text-gray-700 mb-4">
                Complete UI design for up to 10 screens, including style guide
                and design system components.
              </p> */}

          {/* Package features */}
          {/* <ul className="space-y-1 mb-4 text-sm text-gray-700">
                {[
                  "High-fidelity mockups",
                  "Design system",
                  "Source files included",
                  "2 rounds of revisions",
                ].map((item) => (
                  <li key={item} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    {item}
                  </li>
                ))}
              </ul> */}

          {/* <button className="w-full bg-green-100 text-green-700 font-semibold py-2 rounded-md hover:bg-green-200 transition">
                Select Package
              </button>
            </div> */}
          {/* </div> */}
        </div>
      </div>

      {/* <HireTalentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jobOptions={[
          "Senior Frontend Developer (React)",
          "Backend Engineer (Node.js)",
          "UX/UI Designer",
          "Others",
        ]}
        onSend={handleHire}
      /> */}
    </div>
  );
}

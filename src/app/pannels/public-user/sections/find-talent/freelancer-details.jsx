import React, { useState, useEffect, useContext } from "react";
import {
  CheckCircle,
  MapPin,
  //Star,
  Clock,
  // FileText,
  // Pencil,
  // Calendar,
  // FileBarChart,
} from "lucide-react";
import { FreelanceApiData } from "../../../../context/freelance/freelanceContextApi";
//import ScheduleMeetingModal from "./ScheduleMeetingModal";
import { useParams, useNavigate } from "react-router-dom";

export default function FreelancerDetail() {
  const {
    processFreelanceProfile,
    viewFreelanceProfile,
    freelanceSkillInfo,
    employmentHistoryInfo,
    languagesData,
  } = useContext(FreelanceApiData);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarCells, setCalendarCells] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  //const [showModal, setShowModal] = useState(false);
  const month = currentDate.getMonth(); // 0-11
  const year = currentDate.getFullYear();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    processFreelanceProfile(id);
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

  return (
 <div className="tw-css max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 p-6 ">
  <div className="freelancer-layout max-w-7xl py-6 pt-6 mt-6">
    
    {/* Main Profile Content */}
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex flex-col sm:flex-row gap-6">
          <img
            src={viewFreelanceProfile?.freelance_info?.[0]?.profile_image}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mx-auto sm:mx-0"
          />
          <div className="flex-1 space-y-3">
            <div className="flex flex-col sm:flex-row justify-between gap-2">
              <div>
                <h1 className="text-xl font-semibold">
                  {viewFreelanceProfile?.freelance_info?.[0]?.firstname}{" "}
                  {viewFreelanceProfile?.freelance_info?.[0]?.lastname}
                </h1>
                <p className="text-sm text-gray-600">
                  {viewFreelanceProfile?.freelance_info?.[0]?.profession}
                </p>
                <p className="text-sm text-gray-500 flex items-center mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  {viewFreelanceProfile?.freelance_info?.[0]?.city},{" "}
                  {viewFreelanceProfile?.freelance_info?.[0]?.region},{" "}
                  {viewFreelanceProfile?.freelance_info?.[0]?.address}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-green-700">
                  ₵{viewFreelanceProfile?.freelance_info?.[0]?.hourly_rate}/hr
                </p>
                <p className="text-sm text-green-600 flex items-center justify-end mt-1">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Available now
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-700">
              {viewFreelanceProfile?.freelance_info?.[0]?.bio}
            </p>
            <div className="flex flex-wrap gap-2">
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

      {/* Overview */}
      <Section title="About">
        <p className="text-sm text-gray-700 leading-relaxed">
          {viewFreelanceProfile?.freelance_info?.[0]?.bio}
        </p>
      </Section>

      {/* Portfolio */}
      <Section title="Portfolio" linkText="View All">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {viewFreelanceProfile?.portfolio_info?.length > 0 ? (
            viewFreelanceProfile?.portfolio_info.map((item) => (
              <div
                key={item.id}
                className="p-4 border rounded-lg shadow-sm bg-gray-50"
              >
                <h4 className="font-semibold mb-2">{item.project_title}</h4>
                <p className="text-sm">Role: {item.role}</p>
                <p className="text-sm">Description: {item.description}</p>
                <p className="text-xs text-gray-600 mt-1">
                  {item.project_start_date} -{" "}
                  {item.project_end_date || "Ongoing"}
                </p>
                {item.media.map((i) => (
                  <img
                    key={i}
                    src={i.url}
                    className="mt-2 rounded-lg object-cover h-40 w-full"
                    alt="Portfolio media"
                  />
                ))}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No portfolio available</p>
          )}
        </div>
      </Section>

      {/* Skills & Education */}
      <Section title="Skills & Expertise">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {freelanceSkillInfo?.map((skill) => (
            <div key={skill.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">{skill.name}</span>
                <span className="text-gray-500">{skill.level}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-green-600 rounded-full"
                  style={{ width: `${skill.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="font-medium text-sm mt-6 mb-2">Education</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
            {viewFreelanceProfile?.education_info?.map((item) => (
              <li key={item.id}>
                {item.school} || {item.qualification} || {item.area_of_study}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-sm mt-4 mb-2">Certifications</h3>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            {viewFreelanceProfile?.certificate_info?.map((item) => (
              <li key={item.id}>
                {item.desription} - {item.organization} (
                {item.issued_at})
                <p className="text-xs text-blue-600 break-all">
                  {item.credential_url}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-sm mt-4 mb-2">Languages</h3>
          <ul className="space-y-1 text-sm text-gray-600">
            {languagesData?.map((item, idx) => (
              <li key={idx}>
                <span className="font-medium">{item.language}:</span>{" "}
                {item.proficiency}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Work History */}
      <Section title="Work History">
        {employmentHistoryInfo?.map((item, i) => (
          <div
            key={i}
            className="border-b pb-4 last:border-0 last:pb-0 space-y-1"
          >
            <div className="flex justify-between">
              <div>
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="text-xs text-gray-500">
                  {item.date} • {item.price}
                </p>
              </div>
              <span className="text-yellow-500 text-sm">⭐ {item.rating}</span>
            </div>
            <p className="text-sm text-gray-700">{item.description}</p>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
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
      </Section>

      {/* Reviews */}
      <Section title="Client Reviews">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span className="flex items-center">
            <span className="text-yellow-500 mr-1">⭐</span>0 (0 reviews)
          </span>
        </div>
        <div className="text-green-600 text-sm mt-1 cursor-pointer hover:underline">
          View All Reviews
        </div>
      </Section>
    </div>

    {/* Right Sidebar */}
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl shadow">
        <button
          onClick={() => navigate("/login")}
          className="w-full bg-green-600 text-white py-2 rounded-md font-semibold"
        >
          Invite
        </button>
      </div>

      {/* Availability Calendar */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-sm font-semibold mb-2">Availability</h3>
        <div className="flex justify-between items-center mb-2 text-sm">
          <button onClick={goToPreviousMonth}>←</button>
          <p>
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </p>
          <button onClick={goToNextMonth}>→</button>
        </div>
        <div className="grid grid-cols-7 text-xs text-center text-gray-500 font-semibold mb-1">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 text-sm text-center">
          {calendarCells.map((day, i) =>
            day ? (
              <div
                key={i}
                className={`p-1 rounded-full ${
                  availableDates.includes(day.getDate())
                    ? "bg-green-100 text-green-700 font-semibold"
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
        <p className="text-xs text-gray-500 mt-2">
          Mon–Fri, 9:00 AM–6:00 PM (GMT)
        </p>
        <p className="text-xs text-gray-500 flex items-center mt-1">
          <Clock className="w-3 h-3 text-green-500 mr-1" /> Responds in ~2 hours
        </p>
      </div>
    </div>
  </div>
</div>

  );
}


const Section = ({ title, children, linkText }) => (
  <div className="bg-white p-6 rounded-xl shadow space-y-4">
    <div className="flex justify-between items-center">
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      {linkText && (
        <a href="#" className="text-green-600 text-sm font-medium">
          {linkText}
        </a>
      )}
    </div>
    {children}
  </div>
);

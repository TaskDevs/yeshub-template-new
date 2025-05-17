import React from "react";
import { startOfMonth, endOfMonth, getDay, eachDayOfInterval } from "date-fns";
import { CheckCircle, MapPin, Star, Clock } from "lucide-react";

export default function FreelancerDetail() {
    const year = 2025;
  const month = 4; // May (0-indexed)
  const availableDates = [14, 15, 16, 17, 21, 22, 23, 24, 28, 29, 30, 31];

  const start = startOfMonth(new Date(year, month));
  const end = endOfMonth(new Date(year, month));
  const daysInMonth = eachDayOfInterval({ start, end });
  const firstDayOfWeek = getDay(start); // 0 (Sun) - 6 (Sat)

  const calendarCells = [
    ...Array(firstDayOfWeek).fill(null), // empty cells before the 1st
    ...daysInMonth,
  ];
  return (
    <div className="tw-css max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 p-6 ">
      {/* Left Column */}
      <div className="freelancer-layout">
        <div className="max-w-7xl mx-auto px-4 py-6 ">
          {/* Profile Header */}
          <div className="bg-white p-6 rounded-xl shadow mb-4">
            <div className="flex gap-6">
              <img
                src="https://placehold.co/100x100"
                alt="David Chen"
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="flex-1 space-y-3">
                <div className="flex justify-between">
                  <div>
                    <h1 className="text-xl font-semibold">David Chen</h1>
                    <p className="text-gray-600 text-sm">
                      UI/UX Designer | Product Design
                    </p>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      San Francisco, USA (GMT-7)
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500 text-sm mt-1">
                      <Star className="w-4 h-4" />
                      5.0 (84 reviews)
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">$75/hr</p>
                    <p className="text-sm text-gray-500">$95k+ earned</p>
                    <p className="text-green-600 text-sm flex items-center justify-end mt-1">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Available now
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">
                  Award-winning UI/UX designer with 8+ years of experience
                  creating intuitive user experiences for SaaS products, mobile
                  applications, and e-commerce platforms.
                </p>
                <div className="flex flex-wrap gap-2 ">
                  {[
                    "Figma",
                    "UI Design",
                    "UX Research",
                    "Sketch",
                    "Adobe XD",
                    "Prototyping",
                  ].map((skill) => (
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
          <div className="border-b border-gray-200 bg-white p-6 rounded-xl shadow-sm mb-4">
            <nav className="flex space-x-4 text-sm font-medium text-gray-600 ">
              {[
                "Overview",
                "Portfolio",
                "Work History",
                "Skills",
                "Reviews",
              ].map((tab) => (
                <a
                  key={tab}
                  href="#"
                  className="pb-2 hover:border-b-2 hover:border-green-500 transition"
                >
                  {tab}
                </a>
              ))}
            </nav>
          </div>

          {/* Portfolio */}
          <div className="space-y-4 bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Portfolio</h2>
              <a href="#" className="text-green-600 text-sm">
                View All
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="rounded-lg overflow-hidden shadow-sm">
                  <img
                    src={`https://placehold.co/200x150?text=Work+${i}`}
                    alt={`Work ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6 sidebar-right">
          {/* Action Buttons */}
          <div className="bg-white p-4 rounded-xl shadow space-y-3">
            <button className="w-full bg-green-600 text-white py-2 rounded-md font-semibold">
              Hire David
            </button>
            <button className="w-full border py-2 rounded-md font-medium">
              Contact
            </button>
            <div className="flex justify-between text-sm text-gray-600">
              <button className="w-50 border py-2 rounded-md font-medium">Save</button>
              <button className="w-50 border py-2 rounded-md font-medium">Share</button>
            </div>
          </div>

          {/* Availability */}
          <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="text-sm font-semibold mb-2">Availability</h3>
      <p className="text-sm text-gray-600 mb-2">May 2025</p>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 text-xs font-semibold text-gray-500 mb-1 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 text-sm">
        {calendarCells.map((day, i) =>
          day ? (
            <div
              key={i}
              className={`text-center p-1 rounded ${
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
        <Clock className="w-3 h-3 mr-1" /> Usually responds within 2 hours
      </p>
    </div>

          {/* Pricing */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-sm font-semibold mb-2">Pricing & Services</h3>
            <p className="text-gray-700 text-sm">Hourly Rate</p>
            <p className="font-semibold text-lg">$75/hr</p>
          </div>
        </div>
      </div>
    </div>
  );
}

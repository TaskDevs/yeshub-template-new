import React from "react";
import { CheckCircle, MapPin, Star, Clock } from "lucide-react";

export default function FreelancerDetail() {
  return (
    <div className="tw-css flex flex-col lg:flex-row p-6 gap-8 max-w-7xl mx-auto">
      {/* Left Column */}
      <div className="flex-1">
        {/* Profile Header */}
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex items-start gap-4">
            <img
              src="https://placehold.co/100x100"
              alt="David Chen"
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-semibold">David Chen</h1>
                  <p className="text-gray-600">UI/UX Designer | Product Design</p>
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <MapPin className="w-4 h-4 mr-1" /> San Francisco, USA (GMT-7)
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500 mt-1">
                    <Star className="w-4 h-4" />
                    <span className="text-sm font-medium">5.0 (84 reviews)</span>
                  </div>
                  <p className="text-sm text-gray-700 mt-2">
                    Award-winning UI/UX designer with 8+ years of experience creating intuitive
                    user experiences for SaaS products, mobile applications, and e-commerce
                    platforms.
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-semibold">$75/hr</p>
                  <p className="text-sm text-gray-500">$95k+ earned</p>
                  <p className="text-green-600 text-sm mt-1 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" /> Available now
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {['Figma', 'UI Design', 'UX Research', 'Sketch', 'Adobe XD', 'Prototyping'].map(tag => (
                  <span key={tag} className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 border-b border-gray-200">
          <nav className="flex space-x-6">
            {['Overview', 'Portfolio', 'Work History', 'Skills', 'Reviews'].map(tab => (
              <a key={tab} href="#" className="pb-2 border-b-2 border-transparent hover:border-gray-300 text-gray-600 text-sm font-medium">
                {tab}
              </a>
            ))}
          </nav>
        </div>

        {/* Portfolio Section */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Portfolio</h2>
            <a href="#" className="text-green-600 text-sm font-medium">View All</a>
          </div>
          <div className="flex flex-wrap gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-48 h-32 bg-gray-100 rounded-lg shadow-sm overflow-hidden">
                <img src={`https://placehold.co/200x150?text=Work+${i}`} alt="Portfolio item" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-full lg:w-80 space-y-6">
        {/* Hire & Contact Buttons */}
        <div className="bg-white p-4 rounded-xl shadow space-y-3">
          <button className="w-full bg-green-600 text-white py-2 rounded-md font-semibold">Hire David</button>
          <button className="w-full border py-2 rounded-md font-medium">Contact</button>
          <div className="flex justify-between text-sm text-gray-600">
            <button>Save</button>
            <button>Share</button>
          </div>
        </div>

        {/* Availability Calendar */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-sm font-semibold mb-2">Availability</h3>
          <div className="text-sm text-gray-600 mb-2">May 2025</div>
          <div className="grid grid-cols-7 gap-1 text-sm">
            {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
              <div
                key={day}
                className={`text-center p-1 rounded ${[14,15,16,17,21,22,23,24,28,29,30,31].includes(day) ? 'bg-green-100 text-green-700 font-medium' : 'text-gray-500'}`}
              >
                {day}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-2">Available for work</p>
          <p className="text-xs text-gray-500">Mon–Fri, 9:00 AM–6:00 PM (GMT-7)</p>
          <p className="text-xs text-gray-500 flex items-center mt-1">
            <Clock className="w-3 h-3 mr-1" /> Usually responds within 2 hours
          </p>
        </div>

        {/* Pricing & Services */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-sm font-semibold mb-2">Pricing & Services</h3>
          <p className="text-gray-700 text-sm">Hourly Rate</p>
          <p className="font-semibold text-lg">$75/hr</p>
        </div>
      </div>
    </div>
  );
}
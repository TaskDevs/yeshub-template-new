import React, { useState, useEffect } from "react";
import { CheckCircle, MapPin, Star, Clock ,  FileText,
  Pencil,
  Calendar,
  FileBarChart,} from "lucide-react";
import ScheduleMeetingModal from "./ScheduleMeetingModal";
export default function ClientfreelancerDetail() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarCells, setCalendarCells] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const month = currentDate.getMonth(); // 0-11
  const year = currentDate.getFullYear();

  useEffect(() => {
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

  const quickActions = [
  {
    label: 'View Contract',
    icon: FileText,
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    label: 'Edit Project',
    icon: Pencil,
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  {
    label: 'Schedule Meeting',
    icon: Calendar,
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
     onClick: () => setShowModal(true),
  },
  {
    label: 'Generate Report',
    icon: FileBarChart,
    bgColor: 'bg-orange-100',
    iconColor: 'text-orange-600',
  },
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
                src="https://randomuser.me/api/portraits/men/32.jpg"
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
                    <p className="text-lg font-semibold"> ₵75/hr</p>
                    <p className="text-sm text-gray-500"> ₵95k+ earned</p>
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
                About David Chen
              </h2>
            </div>

            <p className="text-gray-700 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
              amet dicta, iure quia quidem nemo, tempore fuga id labore
              molestiae pariatur aperiam deserunt incidunt, eius illum rerum
              error quasi magnam? Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Quas officiis vero mollitia, maiores rem
              nesciunt possimus, libero blanditiis distinctio ut adipisci!
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
          {/* Skills Section */}
          <div
            id="skills"
            className="space-y-6 bg-white p-6 rounded-xl shadow mb-3"
          >
            <h2 className="text-lg font-semibold">Skills & Expertise</h2>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { name: "UI Design", level: "Expert (8+ years)", percent: 95 },
                { name: "Figma", level: "Expert (6+ years)", percent: 90 },
                { name: "Adobe XD", level: "Advanced (5+ years)", percent: 80 },
                {
                  name: "User Testing",
                  level: "Advanced (6+ years)",
                  percent: 85,
                },
                {
                  name: "UX Research",
                  level: "Expert (7+ years)",
                  percent: 90,
                },
                { name: "Sketch", level: "Expert (8+ years)", percent: 95 },
                {
                  name: "Prototyping",
                  level: "Expert (7+ years)",
                  percent: 90,
                },
                {
                  name: "Design Systems",
                  level: "Expert (5+ years)",
                  percent: 85,
                },
              ].map((skill) => (
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
                Certifications & Achievements
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Google UX Design Professional Certificate</li>
                <li>Nielsen Norman Group UX Certification</li>
                <li>Webby Award for Best User Interface (2023)</li>
                <li>A Design Award for Mobile App Design (2022)</li>
              </ul>
            </div>

            {/* Languages */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Languages
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>
                  <span className="font-medium text-gray-700">English:</span>{" "}
                  Native or Bilingual
                </li>
                <li>
                  <span className="font-medium text-gray-700">
                    Mandarin Chinese:
                  </span>{" "}
                  Native or Bilingual
                </li>
                <li>
                  <span className="font-medium text-gray-700">Spanish:</span>{" "}
                  Professional Working
                </li>
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

            {[
              {
                title: "E-commerce Platform Redesign",
                date: "Apr 2023 - Jul 2023",
                price: "$12,500",
                rating: 5.0,
                tags: [
                  "E-commerce",
                  "UI Design",
                  "Figma",
                  "Conversion Optimization",
                ],
                description:
                  "Completely redesigned the user interface and experience for a high-end fashion e-commerce platform. Created a custom checkout flow that increased conversion rates by 28% and reduced cart abandonment by 35%. Implemented a new product browsing experience that increased average session duration by 45%.",
              },
              {
                title: "FinTech Mobile App UI/UX Design",
                date: "Nov 2022 - Mar 2023",
                price: "$18,000",
                rating: 5.0,
                tags: ["FinTech", "Mobile App", "UX Research", "Prototyping"],
                description:
                  "Designed a comprehensive mobile banking application for a fintech startup. Conducted user research, created wireframes, and developed high-fidelity prototypes. The app was featured in TechCrunch and received over 100,000 downloads in the first month after launch.",
              },
              {
                title: "SaaS Dashboard Redesign",
                date: "Jun 2022 - Oct 2022",
                price: "$15,000",
                rating: 5.0,
                tags: [
                  "SaaS",
                  "Dashboard",
                  "Data Visualization",
                  "Design System",
                ],
                description:
                  "Redesigned the analytics dashboard for a B2B SaaS platform, focusing on data visualization and user efficiency. Created a comprehensive design system that improved development speed by 40%. The new design reduced the time required for key user tasks by 60% and increased user satisfaction scores by 45%.",
              },
            ].map((item, i) => (
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
                    ⭐ {item.rating.toFixed(1)}
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
                <span className="font-semibold">5.0</span>
                <span>(84 reviews)</span>
              </div>
            </div>

            <div className="space-y-6">
              {/* Review 1 */}
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

              {/* Review 2 */}
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

              {/* Review 3 */}
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
            </div>

            <div className="text-green-600 text-sm font-medium hover:underline cursor-pointer">
              View All 84 Reviews
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6 sidebar-right pt-4 my-4">
          {/* Action Buttons */}
          <div className="bg-white p-4 rounded-xl shadow space-y-3">
            <button className="w-full bg-green-600 text-white py-2 rounded-md font-semibold">
              Hire David
            </button>
            <button className="w-full border py-2 rounded-md font-medium">
              Contact
            </button>
            <div className="flex justify-between text-sm text-gray-600">
              <button className="w-50 border py-2 rounded-md font-medium">
                Save
              </button>
              <button className="w-50 border py-2 rounded-md font-medium">
                Share
              </button>
            </div>
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
          <div className="bg-white p-4 rounded-xl shadow w-full sm:w-[320px]">
            {/* Pricing & Services Header */}
            <h3 className="text-sm font-semibold mb-2">Pricing & Services</h3>

            {/* Hourly Rate */}
            <div className="mb-4">
              <p className="text-gray-700 text-sm">Hourly Rate</p>
              <p className="font-semibold text-lg">$75/hr</p>
              <p className="text-xs text-gray-500 mt-1">
                Ideal for ongoing projects and revisions
              </p>
            </div>

            <hr className="my-4" />

            {/* UI Design Package */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <h4 className="font-semibold text-sm mb-1">UI Design Package</h4>
              <p className="text-lg font-bold mb-2">$2,500</p>
              <p className="text-sm text-gray-700 mb-4">
                Complete UI design for up to 10 screens, including style guide
                and design system components.
              </p>

              {/* Package features */}
              <ul className="space-y-1 mb-4 text-sm text-gray-700">
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
              </ul>

              <button className="w-full bg-green-100 text-green-700 font-semibold py-2 rounded-md hover:bg-green-200 transition">
                Select Package
              </button>
            </div>
          </div>

           <div className="max-w-md mx-auto p-4 bg-white rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4">
        {quickActions.map(({ label, icon: Icon, bgColor, iconColor, onClick }) => (
          <div
            key={label}
            onClick={onClick}
            className="flex flex-col items-center justify-center p-4 rounded-lg border hover:shadow cursor-pointer"
          >
            <div className={`${bgColor} ${iconColor} p-2 rounded-full mb-2`}>
              <Icon className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium text-center">{label}</span>
          </div>
        ))}
      </div>
            </div>
      <div className="space-y-6">
              <ScheduleMeetingModal isOpen={showModal} onClose={() => setShowModal(false)} />

      </div>
        </div>
      </div>
       
    </div>
  );
}

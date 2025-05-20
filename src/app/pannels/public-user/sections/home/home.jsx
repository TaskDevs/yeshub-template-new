import React from "react";

const categories = [
  {
    name: "Development & IT",
    skills: 1853,
    icon: "<svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6 text-green-700' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 18l6-6-6-6M8 6l-6 6 6 6' /></svg>",
  },
  {
    name: "Design & Creative",
    skills: 968,
    icon: "<svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6 text-green-700' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 20h9' /></svg>",
  },
  {
    name: "Sales & Marketing",
    skills: 756,
    icon: "<svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6 text-green-700' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 3v18h18' /></svg>",
  },
  {
    name: "Writing & Translation",
    skills: 624,
    icon: "<svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6 text-green-700' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 16h8M8 12h6M8 8h4' /></svg>",
  },
];

export default function YesHubLandingPage() {
  return (
    <div className="tw-css min-h-screen bg-white text-gray-900 py-4 my-5 mt-16 sm:mt-5">
      {/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-4  px-6 lg:px-20 py-10 items-center">
        <div>
          <p className="text-sm text-gray-600 mb-2">
            An Initiative By H.E. President John Dramani Mahama
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            <span className="text-gray-900">YesHub,</span>
            <br />
            <span className="text-green-700">Transforming Dreams</span>
            <br />
            <span className="text-gray-900">into careers</span>
          </h1>
          <div className="mt-6 w-full max-w-lg">
            <div className="flex shadow-md rounded-full overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-green-500 transition">
              <input
                type="text"
                placeholder="Try 'web development' or 'logo design'"
                className="flex-grow px-5 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none bg-white"
              />
              <button className="bg-green-700 hover:bg-green-800 transition text-white font-medium px-6 py-3 text-sm">
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="w-full h-full">
          <img
            src="https://i.postimg.cc/Z5C3FhDy/happy-african-american-businesswoman-working-touchpad-office.jpg"
            alt="Professional at work"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      </div>

      {/* Browse Categories Section */}
      <div className="bg-gray-50 py-10 px-6 lg:px-20">
        <h2 className="text-2xl font-bold mb-6">Browse talent by category</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {categories.concat(categories).map((cat, idx) => (
            <div
              key={idx}
              className="p-6 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition"
              dangerouslySetInnerHTML={{
                __html: `
                  <div class='text-3xl mb-3'>${cat.icon}</div>
                  <h3 class='text-lg font-semibold mb-1'>${cat.name}</h3>
                  <p class='text-sm text-gray-500'>${cat.skills.toLocaleString()} skills</p>
                `,
              }}
            />
          ))}
        </div>
      </div>

      {/* Why Businesses Section */}
      <div className="bg-gray-900 text-white py-12 px-6 grid md:grid-cols-2 gap-4 items-center">
        <div className="mb-8 lg:mb-0">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
            This is how good companies find good talent
          </h2>
          <p className="text-gray-300 mb-6">
            Enterprise Suite is a complete workforce management solution. This
            is how innovation works now.
          </p>
          <button className="bg-white text-gray-900 font-medium px-5 py-2 rounded hover:bg-gray-100 transition">
            Learn more
          </button>
        </div>
        <div className="w-full h-full">
          <img
            src="https://i.postimg.cc/zDRL3Bh6/people-office-work-day.jpg"
            alt="Team working"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      </div>

      {/* Business Benefits */}
      <div className="bg-white py-14 px-6 lg:px-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Why businesses turn to YesHub
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {/* Card 1 */}
          <div className="bg-gray-50 p-6 rounded-lg shadow border">
            <div className="text-green-700 text-3xl mb-4">🛡️</div>
            <h3 className="text-lg font-semibold mb-2">Proof of quality</h3>
            <p className="text-sm text-gray-600">
              Check any pro’s work samples, client reviews, and identity
              verification.
            </p>
          </div>
          {/* Card 2 */}
          <div className="bg-gray-50 p-6 rounded-lg shadow border">
            <div className="text-green-700 text-3xl mb-4">$</div>
            <h3 className="text-lg font-semibold mb-2">
              No cost until you hire
            </h3>
            <p className="text-sm text-gray-600">
              Interview potential fits for your job, negotiate rates, and only
              pay for work you approve.
            </p>
          </div>
          {/* Card 3 */}
          <div className="bg-gray-50 p-6 rounded-lg shadow border">
            <div className="text-green-700 text-3xl mb-4">🔒</div>
            <h3 className="text-lg font-semibold mb-2">Safe and secure</h3>
            <p className="text-sm text-gray-600">
              Focus on your work knowing we help protect your data and privacy.
            </p>
          </div>
        </div>
      </div>

      {/* new sect */}
        <div className="bg-[#2F5418] rounded-xl py-10 px-6 lg:px-20 grid md:grid-cols-2 gap-4 items-center justify-between  mt-10">
      <div className="text-white max-w-md mb-6 md:mb-0">
        <h2 className="text-2xl font-bold mb-3 text-white">Find great work</h2>
        <p className="mb-4 text-sm">
          Meet clients you&apos;re excited to work with and take your career or business to new heights.
        </p>
        <button className="bg-white text-green-600 text-sm font-medium px-4 py-2 rounded hover:bg-gray-100 transition">
          Find Opportunities
        </button>
      </div>

      <div className="w-full md:w-[50%] rounded-lg overflow-hidden">
        <img
          src="https://i.postimg.cc/XJxp6GBD/smiling-elegant-businessman.jpg"
          alt="Professional working at desk"
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>
    </div>
    </div>
  );
}

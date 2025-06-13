import React from "react";
import {
  Code2,
  Paintbrush,
  Megaphone,
  FileText,
  Video,
  Image,
  Music,
  Briefcase,
  LockKeyhole,
  ShieldCheck,
  DollarSign,
} from "lucide-react"; // Icons from lucide-react


const categories = [
  { icon: <Code2 size={24} />, label: "Programming & Tech" },
  { icon: <Paintbrush size={24} />, label: "Graphics & Design" },
  { icon: <Megaphone size={24} />, label: "Digital Marketing" },
  { icon: <FileText size={24} />, label: "Writing & Translation" },
  { icon: <Video size={24} />, label: "Video & Animation" },
  { icon: <Image size={24} />, label: "AI Services" },
  { icon: <Music size={24} />, label: "Music & Audio" },
  { icon: <Briefcase size={24} />, label: "Business" },
  // { icon: <Users size={24} />, label: 'Consulting' }
];

export default function YesHubLandingPage() {
  return (
    <div className="tw-css min-h-screen bg-white text-gray-900 py-4 my-5 mt-16 sm:mt-5">
      {/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-4 px-6 lg:px-20 py-10 items-center mx-5">
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

      <section>
        {/* Browse Categories Section */}

        <div className="bg-white px-2 py-10 lg:px-20">
          <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-4">
            {categories.map((cat, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center w-32 h-28 p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <div className="mb-2 text-gray-700">{cat.icon}</div>
                <span className="text-sm text-center text-gray-700">
                  {cat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* Why Businesses Section */}
        <div className="bg-white py-14 px-6 lg:px-20">
          <div className="max-w-6xl mx-auto justify-center bg-gray-900 rounded-xl text-white py-14 px-6 lg:px-20 grid md:grid-cols-2 gap-4 items-center">
            <div className="mb-8 lg:mb-0">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                This is how good companies find good talent
              </h2>
              <p className="text-gray-300 mb-6">
                Enterprise Suite is a complete workforce management solution.
                This is how innovation works now.
              </p>
              <button className="bg-white text-gray-900 font-medium px-5 py-2 rounded hover:bg-gray-100 transition">
                Learn more
              </button>
            </div>
            <div className="w-full h-full rouned-lg">
              <img
                src="https://i.postimg.cc/zDRL3Bh6/people-office-work-day.jpg"
                alt="Team working"
                className="w-full h-full shadow-md rouned-lg"
              />
            </div>
          </div>
        </div>

        {/* Business Benefits */}
        <div className="bg-white py-14 px-1 lg:px-20 max-w-6xl mx-auto justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Why businesses turn to YesHub
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-lg shadow border">
              <div className="text-green-700 text-3xl mb-4">
                {" "}
                <ShieldCheck />
              </div>
              <h3 className="text-lg font-semibold mb-2">Proof of quality</h3>
              <p className="text-sm text-gray-600">
                Check any pro’s work samples, client reviews, and identity
                verification.
              </p>
            </div>
            {/* Card 2 */}
            <div className="bg-white p-6 rounded-lg shadow border">
              <div className="text-green-700 text-3xl mb-4 font-bold">
                {" "}
                <DollarSign />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                No cost until you hire
              </h3>
              <p className="text-sm text-gray-600">
                Interview potential fits for your job, negotiate rates, and only
                pay for work you approve.
              </p>
            </div>
            {/* Card 3 */}
            <div className="bg-white p-6 rounded-lg shadow border">
              <div className="text-green-700 text-3xl mb-4">
                <LockKeyhole />{" "}
              </div>
              <h3 className="text-lg font-semibold mb-2">Safe and secure</h3>
              <p className="text-sm text-gray-600">
                Focus on your work knowing we help protect your data and
                privacy.
              </p>
            </div>
          </div>
        </div>

        {/* new sect */}
        {/* New Section */}
        <div className="bg-white py-14 px-1 lg:px-20 max-w-6xl mx-auto justify-center">
          <div className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-xl min-h-[480px]">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src="https://i.postimg.cc/zB7XH8y6/yesb300.jpg"
                alt="Client working"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 p-8 md:p-12 text-white">
              {/* Left Content */}
              <div className="max-w-lg text-white">
                <p className="text-sm font-semibold">For clients</p>
                <h2 className="text-3xl md:text-5xl font-bold mt-2 leading-tight">
                  Find talent <br /> your way
                </h2>
                <p className="mt-4 text-base md:text-lg text-white/90">
                  Work with the largest network of independent professionals and
                  get things done—from quick turnarounds to big transformations.
                </p>
              </div>

              {/* CTA Cards */}
              <div className="grid md:grid-cols-3 gap-4 mt-6 md:mt-0">
                {[
                  {
                    title: "Post a job and hire a pro",
                    subtitle: "Talent Marketplace™",
                  },
                  {
                    title: "Browse and buy projects",
                    subtitle: "Project Catalog™",
                  },
                  {
                    title: "Get advice from an industry expert",
                    subtitle: "Consultations",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-green-600 hover:bg-green-700 transition text-white p-4 rounded-lg w-64 shadow-lg cursor-pointer"
                  >
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm mt-1 text-white/80">
                      {item.subtitle} →
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* freelance section */}
        <div className="bg-green-50 text-gray-800 max-w-6xl mx-auto justify-center">
          <div className="py-14 px-6 lg:px-20 mx-auto lg:flex lg:items-center lg:justify-between space-y-10 lg:space-y-0">
            {/* Left Side */}
            <div className="lg:w-1/2 space-y-6 ">
              <h2 className="text-4xl font-semibold leading-snug">
                The <span className="text-green-600 font-bold">premium</span>{" "}
                freelance <br />
                solution for businesses
              </h2>

              <ul className="space-y-4 grid md:grid-cols-2 gap-4">
                {[
                  {
                    title: "Dedicated hiring experts",
                    desc: "Count on an account manager to find you the right talent and see to your project’s every need.",
                  },
                  {
                    title: "Satisfaction guarantee",
                    desc: "Order confidently, with guaranteed refunds for less-than-satisfactory deliveries.",
                  },
                  {
                    title: "Advanced management tools",
                    desc: "Seamlessly integrate freelancers into your team and projects.",
                  },
                  {
                    title: "Flexible payment models",
                    desc: "Pay per project or opt for hourly rates to facilitate longer-term collaboration.",
                  },
                ].map((item, index) => (
                  <li className="flex items-start" key={index}>
                    <span className="text-green-600 mr-2">✔️</span>
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800">
                Try Now
              </button>
            </div>

            {/* Right Side */}
            <div className="lg:w-1/2 flex justify-center items-center relative">
              <div className="relative w-full max-w-md">
                <img
                  src="https://i.postimg.cc/4y5VJWbD/y40.png" // replace with your image path
                  alt="Team working"
                  className="rounded-xl w-full"
                />

                {/* Project Status Badge */}
                <div className="absolute top-1 right-4 bg-blue-200 shadow-md rounded-full px-4 py-2 flex items-center space-x-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                  <span>
                    Project Status:{" "}
                    <span className="font-semibold text-green-600">92%</span>
                  </span>
                </div>

                {/* Chart Overlay */}
                <div className="absolute -bottom-6 left-4 bg-blue-200 shadow-md px-4 py-2 rounded-lg text-sm">
                  <p className="font-medium"> ₵8,900</p>
                  <div className="text-green-600">Jan — May</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
   
    </div>
  );
}

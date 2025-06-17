import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How does YesHub's matching algorithm work?",
    answer:
      "Our AI-powered matching system analyzes job requirements against talent profiles, considering skills, experience, and preferences to recommend the most suitable professionals.",
  },
  {
    question: "What fees does YesHub charge?",
    answer:
      "YesHub charges a transparent platform fee based on your subscription plan. Basic plans have a 5% fee, Professional plans have a 3% fee, and Enterprise plans have custom fee structures. There are no hidden costs or upfront payments required. You only pay when you hire a professional and approve their work. All payment processing fees are included in our platform fee.",
  },
  {
    question: "How does YesHub ensure quality talent?",
    answer:
      "We maintain high talent quality through a multi-step verification process. All professionals undergo rigorous screening including background checks, skill assessments, and interviews.",
  },
  {
    question: "What happens if I'm not satisfied with the work?",
    answer:
      "Your satisfaction is our priority. If you're not happy with the delivered work, you can request revisions or escalate the issue. Our team is here to ensure a fair resolution.",
  },
  {
    question: "Can I hire talent for long-term positions?",
    answer:
      "Absolutely! YesHub supports both short-term projects and long-term engagements. Many clients start with a short-term contract and extend based on performance.",
  },
  {
    question: "How secure is the YesHub platform?",
    answer:
      "Security is a top priority at YesHub. We implement bank-level encryption for all data and financial transactions to ensure your information is safe and secure.",
  },
];

const steps = [
  {
    step: 1,
    title: "Post Your Job",
    description:
      "Create a detailed job posting that outlines your project requirements, timeline, and budget. Be specific about the skills and experience you’re looking for.",
    bullets: [
      "Custom job descriptions",
      "Budget flexibility",
      "AI-powered skill matching",
      "Global talent access",
    ],
  },
  {
    step: 2,
    title: "Review Candidates",
    description:
      "Browse through matched profiles, review portfolios, and check ratings and reviews from previous clients. Our AI-powered matching system helps you find the perfect fit.",
    bullets: [
      "Verified work history",
      "Portfolio samples",
      "Skill assessment scores",
      "Client testimonials",
    ],
  },
  {
    step: 3,
    title: "Interview & Select",
    description:
      "Conduct interviews with your shortlisted candidates through our integrated video conferencing tool. Discuss project details, expectations, and timelines before making your final decision.",
    bullets: [
      "Built-in video calls",
      "File sharing",
      "Secure messaging",
      "Interview scheduling",
    ],
  },
  {
    step: 4,
    title: "Hire & Onboard",
    description:
      "Finalize contract terms, set up payment milestones, and begin working together. Our platform provides all the tools you need to manage projects, track progress, and ensure successful outcomes.",
    bullets: [
      "Secure contracts",
      "Project management tools",
      "Milestone payments",
      "Ongoing support",
    ],
  },
];

const features = [
  {
    title: "AI-Powered Matching",
    description:
      "Our advanced algorithms analyze skills, experience, and work history to connect you with the most qualified candidates.",
    points: [
      "Skill-based matching",
      "Experience weighting",
      "Cultural fit assessment",
    ],
    iconColor: "bg-blue-100",
  },
  {
    title: "Global Talent Pool",
    description:
      "Access skilled professionals from around the world, expanding your hiring options beyond borders.",
    points: [
      "Professionals in 180+ countries",
      "Multilingual support",
      "Time zone management tools",
    ],
    iconColor: "bg-green-100",
  },
  {
    title: "Secure Payment System",
    description:
      "Our escrow-based payment system protects both parties, releasing funds only after milestones are met.",
    points: [
      "Milestone-based payments",
      "Multiple currency support",
      "Transparent fee structure",
    ],
    iconColor: "bg-purple-100",
  },
  {
    title: "Real-time Collaboration",
    description:
      "Integrated tools for communication, file sharing, and project management to keep everyone aligned.",
    points: [
      "Video conferencing",
      "Document collaboration",
      "Task tracking system",
    ],
    iconColor: "bg-yellow-100",
  },
];

const testimonials = [
  {
    company: "TechNova Solutions",
    industry: "Software Development",
    quote:
      "We needed to scale our development team quickly to meet project deadlines. YesHub connected us with skilled developers who integrated seamlessly with our team. The quality of talent exceeded our expectations.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Emily Chen",
    title: "CTO, TechNova Solutions",
    iconBg: "bg-blue-100",
    icon: "💻",
  },
  {
    company: "GrowthMarket",
    industry: "E-commerce",
    quote:
      "As a growing e-commerce business, we needed specialized marketing talent. YesHub's platform helped us find the perfect professionals who understood our niche and delivered outstanding results.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Marcus Johnson",
    title: "Founder, GrowthMarket",
    iconBg: "bg-green-100",
    icon: "🛒",
  },
  {
    company: "VisualCraft Studios",
    industry: "Media Production",
    quote:
      "Finding specialized creative talent used to be a challenge until we discovered YesHub. The platform's matching algorithm connected us with exceptional designers and video editors who elevated our productions.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Sofia Rodriguez",
    title: "Creative Director, VisualCraft",
    iconBg: "bg-purple-100",
    icon: "🎬",
  },
];
export default function WhyChooseUs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="tw-css font-sans text-gray-800">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center py-20 text-white"
        style={{
          backgroundImage: `url('https://i.postimg.cc/tT2Hw6mk/why-yeshub.jpg')`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center py-16">
          <div className="md:w-3/4 lg:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold">How YesHub Works</h1>
            <p className="mt-4 text-lg text-gray-200">
              Discover our streamlined process for connecting top companies with
              exceptional talent worldwide.
            </p>
            <div className="mt-6 grid md:grid-cols-2 gap-4 justify-center md:justify-start">
              <button className="bg-green-600 px-5 py-3 rounded hover:bg-green-700 transition text-white">
                See How it Works
              </button>
              <button className="bg-white px-5 py-3 rounded hover:bg-gray-100 transition text-gray-700">
                Support
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-4">
            Our Talent Acquisition Process
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Follow these simple steps to find, hire, and work with the best
            talent for your business needs.
          </p>

          <div className="space-y-12">
            {steps.map(({ step, title, description, bullets }) => (
              <div key={step} className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                    {step}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="text-gray-600 mb-2">{description}</p>
                  <ul className="grid grid-cols-2 gap-x-6 text-sm text-gray-700">
                    {bullets.map((item, idx) => (
                      <li key={idx}>✔ {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">
            Powerful Features for Seamless Hiring
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Our platform is designed to make the hiring process efficient,
            secure, and successful for both employers and talent.
          </p>

          <div className="grid md:grid-cols-4 gap-4  text-left">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white border p-6 rounded-sm hover:shadow-md transition"
              >
                <div
                  className={`w-10 h-10 rounded-full mb-4 flex items-center justify-center ${feature.iconColor}`}
                >
                  <span className="text-xl font-bold text-gray-700">
                    {feature.title.charAt(0)}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 mb-3">
                  {feature.description}
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  {feature.points.map((point, i) => (
                    <li key={i}>✔ {point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 bg-white px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-2">
            Proven Results for Businesses
          </h2>
          <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
            Companies using YesHub report significant improvements in hiring
            efficiency and talent quality.
          </p>

          <div className="grid md:grid-cols-3 justify-center  gap-10 mb-12">
            {[
              {
                value: "85%",
                label:
                  "Faster time-to-hire compared to traditional recruiting methods",
              },
              {
                value: "92%",
                label:
                  "Client satisfaction rate with talent quality and performance",
              },
              {
                value: "40%",
                label:
                  "Average cost savings on recruitment compared to agencies",
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-gray-100 p-4 rounded-md border hover:shadow-md transition"
              >
                <h3 className="text-green-600 text-4xl font-bold mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm text-gray-700">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="w-full max-w-6xl mx-auto">
            <img
              src="https://i.postimg.cc/mrHvVCBK/Screenshot-2025-06-16-143023.png"
              alt="Results Graph"
              className="w-full rounded shadow"
            />
          </div>
        </div>
      </section>
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3">Success Stories</h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            See how companies like yours have found exceptional talent through
            YesHub.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-sm border p-6 text-left hover:shadow-md transition"
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full ${item.iconBg} mr-3 text-lg`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold">{item.company}</h4>
                    <p className="text-sm text-gray-500">{item.industry}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-4">{item.quote}</p>
                <div className="flex items-center mt-4">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                  <div>
                    <p className="font-semibold text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <a
              href="#"
              className="text-green-600 font-medium hover:underline inline-flex items-center"
            >
              View more success stories <span className="ml-1">→</span>
            </a>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Find answers to common questions about using YesHub for your hiring
          needs.
        </p>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-50 border rounded-lg">
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center p-4 font-medium text-left"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4 text-gray-700">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-green-600 text-white py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Ready to Find Your Perfect Talent Match?
          </h2>
          <p className="text-gray-100 mb-8">
            Join thousands of businesses that have transformed their hiring
            process with YesHub.
          </p>
          <div className="grid md:grid-cols-2 justify-center gap-4 mb-4">
            <button className="bg-white text-green-600 font-medium px-6 py-3 rounded hover:bg-gray-100 transition">
              Get Started for Free
            </button>
            <button className="border border-white text-white font-medium px-6 py-3 rounded hover:bg-white hover:text-green-600 transition">
              Schedule a Demo
            </button>
          </div>
          <p className="text-sm text-white opacity-80">
            No credit card required.Enjoy the system free.
          </p>
        </div>
      </section>
    </div>
  );
}

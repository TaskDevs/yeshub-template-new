import React from "react";

const HowYesHubWorks = () => {
  const steps = [
    {
      step: "1",
      title: "Post Your Job",
      description:
        "Create a detailed job posting that outlines your project requirements, timeline, and budget. Be specific about the skills and experience you’re looking for.",
      items: [
        "Custom job descriptions",
        "Budget flexibility",
        "AI-powered skill matching",
        "Global talent access",
      ],
    },
    {
      step: "2",
      title: "Review Candidates",
      description:
        "Browse through matched profiles, review portfolios, and check ratings and reviews from previous clients. Our AI-powered matching system helps you find the perfect fit.",
      items: [
        "Verified work history",
        "Portfolio samples",
        "Skill assessment scores",
        "Client testimonials",
      ],
    },
    {
      step: "3",
      title: "Interview & Select",
      description:
        "Conduct interviews with your shortlisted candidates through our integrated video conferencing tool. Discuss project details, expectations, and timelines before making your final decision.",
      items: [
        "Built-in video calls",
        "File sharing",
        "Secure messaging",
        "Interview scheduling",
      ],
    },
    {
      step: "4",
      title: "Hire & Onboard",
      description:
        "Finalize contract terms, set up payment milestones, and begin working together. Our platform provides all the tools you need to manage projects, track progress, and ensure successful outcomes.",
      items: [
        "Secure contracts",
        "Project management tools",
        "Milestone payments",
        "Ongoing support",
      ],
    },
  ];

  return (
    <div className="w-full">
      <div className="bg-white text-gray-800">
        <div
          className="relative bg-cover bg-center h-[500px]"
          style={{ backgroundImage: "url(/path-to-your-header-image.jpg)" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-start px-10">
            <h1 className="text-white text-4xl font-bold mb-4">
              How YesHub Works
            </h1>
            <p className="text-white text-lg max-w-xl mb-6">
              Discover our streamlined process for connecting top companies with
              exceptional talent worldwide.
            </p>
            <div className="flex gap-4">
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md font-medium">
                See How It Works
              </button>
              <button className="bg-white text-gray-800 border border-gray-300 px-6 py-2 rounded-md font-medium">
                View Pricing
              </button>
            </div>
          </div>
        </div>

        <div className=" mx-auto px-6 py-16">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Our Talent Acquisition Process
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Follow these simple steps to find, hire, and work with the best
            talent for your business needs.
          </p>

          {steps.map(({ step, title, description, items }) => (
            <div key={step} className="flex gap-4 mb-12">
              <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-lg">
                {step}
              </div>
              <div className="bg-gray-50 rounded-lg shadow px-6 py-4 flex-1">
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-700 mb-4">{description}</p>
                <ul className="list-disc list-inside space-y-1">
                  {items.map((item, index) => (
                    <li key={index} className="text-green-600">
                      ✓ <span className="text-gray-800">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowYesHubWorks;

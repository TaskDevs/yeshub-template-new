import React, { useContext, useEffect } from "react";
import { EmployerApiData } from "../../../../context/employers/employerContextApi";
import { useParams } from "react-router-dom";

const ViewProposal = () => {
  const { processGetProposalInfo, proposalInfo } = useContext(EmployerApiData);
  const { id } = useParams();

  useEffect(() => {
    processGetProposalInfo(id);
  }, [id]);

  if (!proposalInfo || Object.keys(proposalInfo).length === 0) {
    return <div className="p-6 text-gray-600">Loading proposal...</div>;
  }

  return (
    <div className="w-full bg-gray-50 min-h-screen py-10 px-4 md:px-16">
      <div className="bg-white shadow-lg rounded-xl p-8 space-y-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800">Proposal Overview</h1>

        {/* Job Info */}
        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-green-600 border-b pb-1">
            Job Information
          </h2>
          <p>
            <strong>Title:</strong> {proposalInfo.title}
          </p>
          <p>
            <strong>Category:</strong> {proposalInfo.category}
          </p>
          <p>
            <strong>Job Type:</strong> {proposalInfo.job_type}
          </p>
          <p>
            <strong>Experience:</strong> {proposalInfo.experience}
          </p>
          <p>
            <strong>Description:</strong>{" "}
            <span className="text-gray-700">{proposalInfo.description}</span>
          </p>
          <div>
            <strong>Skills:</strong>{" "}
            <div className="flex flex-wrap mt-1">
              {proposalInfo.skills?.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-2 mb-2"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Cover Letter & Understanding */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-green-600 border-b pb-1">
              Cover Letter
            </h2>
            <p className="bg-gray-100 text-gray-800 p-4 rounded">
              {proposalInfo.cover_letter}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-green-600 border-b pb-1">
              Project Understanding
            </h2>
            <p className="bg-gray-100 text-gray-800 p-4 rounded">
              {proposalInfo.project_understanding}
            </p>
          </div>

          {proposalInfo.attachment && (
            <div>
              <h2 className="text-xl font-semibold text-green-600 border-b pb-1">
                Attachment
              </h2>
              <a
                href={proposalInfo.attachment}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline hover:text-blue-700"
              >
                View Attachment
              </a>
            </div>
          )}
        </section>

        {/* Pricing */}
        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-green-600 border-b pb-1">
            Pricing
          </h2>
          <p>
            <strong>Hourly Rate:</strong> ${proposalInfo.hourly_rate}
          </p>
          <p>
            <strong>Fixed Price:</strong> ${proposalInfo.fix_rate}
          </p>
        </section>

        {/* Timeline & Availability */}
        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-green-600 border-b pb-1">
            Timeline & Availability
          </h2>
          <p>
            <strong>Start Date:</strong> {proposalInfo.start_date}
          </p>
          <p>
            <strong>Estimated Completion:</strong> {proposalInfo.completion_day}{" "}
            {proposalInfo.completion}
          </p>
          <p>
            <strong>Weekly Availability:</strong> {proposalInfo.week_available}{" "}
            hours/week
          </p>
        </section>

        {/* Experience Level */}
        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-green-600 border-b pb-1">
            Experience Level
          </h2>
          <p className="text-gray-800">{proposalInfo.experience_level}</p>
        </section>
      </div>
    </div>
  );
};

export default ViewProposal;

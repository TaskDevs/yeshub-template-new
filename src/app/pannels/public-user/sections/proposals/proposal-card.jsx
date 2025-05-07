import React, { useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { FaEye, FaEyeSlash, FaFileAlt } from "react-icons/fa";
import { RatingStars } from "../../../../common/RatingStars";
import ProposalTypeBadge from "./proposal-type-badge";

export const ProposalCard = ({ applicant, actions, viewAction }) => {
  const [showMore, setShowMore] = useState(false);

  let handleViewCv = (data) => {
    data !== null ? window.open(data, "_blank") : alert("Cv not available");
  };

  return (
    <div className="border rounded p-4 flex flex-col justify-start w-full shadow-sm bg-white">
      {/* Top Section: Image + Rate + Location */}
      <div className="flex justify-between mb-3 w-full">
        <div className="flex items-center">
          <img
            src={applicant.user_info.profile_image}
            alt={applicant.user_info.profile_image}
            className="w-16 h-16 rounded-full mr-4 object-cover"
          />
          <div>
            <h3 className="text-base font-bold">
              {applicant.user_info.firstname +
                " " +
                applicant.user_info.lastname}
            </h3>
            <h4 className="text-sm text-gray-600">
              {applicant.user_info.profession}
            </h4>
            <p className="text-xs text-gray-500">
              {applicant.user_info.experience} | {/*applicant?.badge*/}
            </p>
            <div className="mt-1">
              <RatingStars rating={"4"} />
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold text-green-600">Applied Job</p>
          <p className="text-sm text-gray-600">{applicant.job_details.title}</p>
          <div className="flex justify-end w-full mt-1">
            <FaFileAlt
              className="text-xl text-green-600 cursor-pointer"
              title="View CV"
              onClick={() => handleViewCv(applicant.user_cv)}
            />
          </div>
        </div>
      </div>

      {/* Ratings */}

      {/* Description */}
      <div className=" mb-2 w-full">
        <h3 className="font-bold text-black">Bio</h3>
        <hr className="my-2" />
        <p className="text-sm text-gray-700 mb-2">{applicant.user_info.bio}</p>
      </div>

      {/* Skills */}
      {!showMore && (
        <>
          <div className=" mb-2 w-full">
            <h3 className="font-bold text-black">Skills</h3>
            <hr className="my-2" />
            {applicant.user_info.skills_id?.split(",").map((skill, index) => (
              <span
                key={index}
                className="bg-gray-100 px-3 py-1 rounded text-sm mr-2"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className=" mb-2 w-full">
            <ProposalTypeBadge
              applicant={{
                type: applicant.milestones.length > 0 ? "Milestone" : "Fix",
                description: "click to view milestone",
                request:
                  applicant.requirement.length > 0
                    ? "request_made"
                    : "no_request",
              }}
              milestones={applicant.milestones}
              requirement={applicant.requirement}
              viewAction={viewAction}
            />
          </div>
        </>
      )}

      {/* Bottom: Status + Action Buttons */}
      <div className="flex items-center justify-between w-full mt-auto pt-3 border-t">
        {/* Status Info */}
        <div className="text-sm">
          <span className="font-semibold">Status:</span>{" "}
          <span
            className={`inline-block px-2 py-1 rounded text-white text-xs ${
              applicant.job_status === "Pending"
                ? "bg-yellow-500"
                : applicant.job_status === "Interview"
                ? "bg-blue-500"
                : applicant.job_status === "Probation"
                ? "bg-purple-500"
                : applicant.job_status === "Hired"
                ? "bg-green-500"
                : applicant.job_status === "Failed"
                ? "bg-red-500"
                : "bg-gray-500"
            }
            `}
          >
            {applicant.job_status}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => actions(applicant.application_id, applicant.status)}
            className="text-blue-600 hover:text-blue-800"
            title="Change Status"
          >
            <BiSolidEdit size={18} />
          </button>
          <button
            onClick={() => setShowMore((prev) => !prev)}
            className="text-gray-700 hover:text-black"
            title="View More"
          >
            {showMore ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
          </button>
        </div>
      </div>

      {/* Expand The View More Button */}
      {showMore && (
        <>
          <div className="flex flex-col w-full mt-auto pt-3 border-t">
            <div className="mb-6 w-full">
              <h3 className="font-bold text-black">Education</h3>
              <hr className="my-2" />

              {/* Education Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-md">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                        School
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                        Area of Study
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                        Qualification
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                        Date Attended
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                        Date Completed
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {applicant.education?.map((edu, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-sm text-gray-800">
                          {edu.school}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800">
                          {edu.area_of_study}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800 capitalize">
                          {edu.qualification}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800">
                          {edu.date_attended}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800">
                          {edu.date_completed}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full mt-auto pt-3 border-t">
            <div className="mb-6 w-full">
              <h3 className="font-bold text-black">Certificate</h3>
              <hr className="my-2" />

              {/* Education Table */}
              {/* Certificate Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-md">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                        Certificate Name
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                        Issued At
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                        Expires At
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {applicant.certificates?.map((cert, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-sm text-gray-800">
                          {cert.name}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800">
                          {cert.issued_at?.slice(0, 10)}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800">
                          {cert.expires_at?.slice(0, 10)}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800">
                          {cert.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full mt-auto pt-3 border-t">
            <div className="mb-6 w-full">
              <h3 className="font-bold text-black">Portfolio</h3>
              <hr className="my-2" />

              {/* Education Table */}
              {/* Certificate Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-md">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                        Project Title
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                        Role
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                        Skills
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                        Start Date
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                        End Date
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {applicant.portfolio?.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-sm text-gray-800">
                          {item.project_title}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800">
                          {item.role}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800">
                          {item.skills}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800">
                          {item.project_start_date}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800">
                          {item.project_end_date}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800">
                          {item.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

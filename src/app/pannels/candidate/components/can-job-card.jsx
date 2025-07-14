import React, { useContext } from "react";
import { CiBookmark } from "react-icons/ci";

import { IoIosPeople } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import { SavedJobsApiData } from "../../../context/saved-jobs/savedJobsContextApi";
import { userId } from "../../../../globals/constants";
import { useNavigate } from "react-router-dom";

const CanJobCard = ({
  role,
  id,
  companyName,
  skills,
  salaryRange,
  image,
  newTag,
  isFindWork = true,
  status,
  dateSaved,
  jobType,
  isMobile = false,
  jobLocation,
  proposal,
  loading = false,
  days_left,
}) => {
  const { savedjobsData, handleDeleteSavedJobs, toggleSavedJob } =
    useContext(SavedJobsApiData);
  const navigate = useNavigate();
  const isSaved = savedjobsData?.some((item) => parseInt(item.job_id) === id);
  // Skeleton for desktop
  if (loading && !isMobile) {
    return (
      <div className="tw-css border rounded-lg p-4 bg-white animate-pulse space-y-4 ">
        <div className="h-6 bg-gray-300 rounded w-2/3"></div>
        <div className="flex gap-2">
          <div className="h-4 bg-gray-300 rounded w-24"></div>
          <div className="h-4 bg-gray-300 rounded w-16"></div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {[1, 2, 3].map((_, idx) => (
            <div key={idx} className="bg-gray-300 h-6 w-16 rounded-sm"></div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="h-8 w-20 bg-gray-300 rounded"></div>
          <div className="h-6 w-20 bg-gray-300 rounded"></div>
          <div className="h-10 w-20 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  if (loading && isMobile) {
    return (
      <div className="tw-css border rounded-lg shadow-md p-2 bg-white animate-pulse">
        Loading...
      </div>
    );
  }

  return (
    <>
      {!isMobile && (
        <div className="tw-css border rounded-lg p-4 flex flex-col bg-white">
          {isFindWork ? (
            <>
              <div className="tw-css flex justify-between w-full h-full">
                <div className="size-24">
                  <img
                    src={image || "https://placehold.co/600x400"}
                    alt="company_logo"
                    className="size-24 object-contain rounded-md border h-full w-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/600x400";
                    }}
                  />
                </div>
                <div className="job-card-wrapper">
                  <h3 className="text-md font-medium mb-0 flex items-center gap-2 flex-wrap">
                    {role}
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        days_left === 0
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-gray-700"
                      }`}
                    >
                      {days_left === 0 ? "Expired" : `${days_left} days left`}
                    </span>
                  </h3>

                  <div className="flex">
                    <p className="text-gray-700 mb-0">{companyName.trim()}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {skills?.slice(0, 2).map((skill, i) => (
                      <div
                        key={i}
                        className="bg-[#F3F4F6] text-sm text-[#1F2937] capitalize rounded-full p-2"
                      >
                        {skill}
                      </div>
                    ))}

                    {skills?.length > 2 && (
                      <div className="bg-[#F3F4F6] text-sm text-[#1F2937] capitalize rounded-sm p-2">
                        +{skills.length - 2} more
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-start h-full">
                  {newTag && (
                    <button className="bg-green-500 text-[#166534] py-1 px-2 rounded">
                      {newTag}
                    </button>
                  )}
                  <p className="inline-flex items-center bg-green-200 text-gray-700 text-xs md:text-sm font-medium px-3 py-1 rounded-full">
                    <span className="mr-1">{proposal}</span> proposals
                  </p>
                </div>
              </div>

              <div className="flex justify-between w-full mt-2">
                <button
                  onClick={() => toggleSavedJob(id, userId)}
                  className="border rounded py-2 px-2 flex gap-1 items-center text-[#374151] capitalize text-md"
                >
                  {!isSaved ? (
                    <CiBookmark className="size-4" />
                  ) : (
                    <FaBookmark className="size-4" color="#166534" />
                  )}
                  <span>{isSaved ? "Saved" : "Save"}</span>
                </button>

                <p className="text-gray-700 font-medium">
                  GHS {Number(salaryRange || 0).toLocaleString()}
                </p>

                <button
                  className="bg-green-800 text-white px-4 py-2 rounded capitalize text-center h-10"
                  onClick={() =>
                    navigate(`/dashboard-candidate/job-details/${id}`)
                  }
                >
                  View
                </button>
              </div>
            </>
          ) : (
            <div className="flex space-x-2 items-start w-full">
              <div className="size-24">
                <img
                  src={image || "https://placehold.co/600x400"}
                  alt="company_logo"
                  className="size-24 object-cover rounded-md border"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/600x400";
                  }}
                />
              </div>

              <div className="job-profile-saved w-full">
                <div className="flex justify-between items-center w-full">
                  <h3 className="text-xl font-bold">{role}</h3>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <IoIosPeople className="size-4" />
                      <span>{proposal} proposals</span>
                    </div>
                    <button onClick={() => handleDeleteSavedJobs(id, userId)}>
                      <FaRegTrashAlt />
                    </button>
                    <button
                      className="bg-green-800 text-white px-4 py-2 rounded capitalize text-center h-10"
                      onClick={() =>
                        navigate(`/dashboard-candidate/job-details/${id}`)
                      }
                    >
                      view
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-gray-700">{companyName}</p>

                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      days_left === 0
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-gray-700"
                    }`}
                  >
                    {days_left === 0 ? "Expired" : `${days_left} days left`}
                  </span>
                </div>

                <div className="flex items-center flex-wrap gap-2 mt-1 text-sm">
                  {status === "Closed" ? (
                    <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium">
                      Closed
                    </span>
                  ) : (
                    <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                      Active
                    </span>
                  )}

                  <span className="bg-red-100 text-red-700 text-[10px] font-medium px-2 py-[2px] rounded-full">
                    {jobType}
                  </span>

                  <span className="text-gray-700 font-medium">
                    GHS {Number(salaryRange || 0).toLocaleString()}
                  </span>

                  <span className="text-gray-500 text-sm flex">
                    {dateSaved}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {isMobile && (
        <div className="border max-w-md w-full mx-auto p-4 bg-white rounded-xl shadow-sm space-y-3">
          {/* Top Section */}
          <div className="flex items-start gap-3">
            {/* Logo */}
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white shrink-0">
              <img
                src={image}
                alt={companyName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info & Tags */}
            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-900 leading-tight">
                {role}
              </h3>
              <p className="text-sm text-gray-500 mb-1">{companyName}</p>

              <div className="flex flex-wrap items-center gap-1">
                <span className="bg-gray-100 text-gray-700 text-[10px] font-medium px-2 py-[2px] rounded-full">
                  {isFindWork ? jobLocation : status}
                </span>
                <span className="bg-green-100 text-red-700 text-[10px] font-medium px-2 py-[2px] rounded-full">
                  {jobType}
                </span>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1 mt-2">
                {skills?.slice(0, 3).map((skill, i) => (
                  <div
                    key={i}
                    className="bg-gray-100 text-[10px] text-gray-800 capitalize rounded px-2 py-[2px]"
                  >
                    {skill}
                  </div>
                ))}
                {skills?.length > 3 && (
                  <div className="text-[10px] text-gray-500 mt-[2px]">
                    +{skills.length - 3} more
                  </div>
                )}
              </div>
            </div>

            {/* Bookmark + Date */}
            <div className="flex flex-col items-end gap-1">
              {isFindWork && (
                <button
                  onClick={() => toggleSavedJob(id, userId)}
                  className="p-1"
                >
                  {!isSaved ? (
                    <CiBookmark className="text-gray-500 size-4" />
                  ) : (
                    <FaBookmark className="text-green-700 size-4" />
                  )}
                </button>
              )}
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  days_left === 0
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-gray-700"
                }`}
              >
                {days_left === 0 ? "Expired" : `${days_left} days left`}
              </span>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="flex justify-between items-center">
            <p className="text-gray-700 font-medium">
              GHS {Number(salaryRange || 0).toLocaleString()}
            </p>

            <button
              className="bg-green-700 hover:bg-green-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg"
              onClick={() => navigate(`/dashboard-candidate/job-details/${id}`)}
            >
              View
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CanJobCard;

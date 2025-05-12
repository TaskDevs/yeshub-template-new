import React, { useContext } from "react";
import { CiBookmark } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { calculateDaysSincePosted } from "../../../../utils/readableDate";
import { FaBookmark } from "react-icons/fa6";
import { SavedJobsApiData } from "../../../context/saved-jobs/savedJobsContextApi";

import { userId } from "../../../../globals/constants";
import { useNavigate } from "react-router-dom";

// const getCleanTruncatedDescription = (description) => {
//   if (!description) return "No description provided."; // handle null/undefined

//   // remove all HTML tags
//   const cleanText = description.replace(/<[^>]*>/g, "").trim();

//   // fallback if empty after cleaning
//   if (!cleanText) return "No description provided.";

//   // truncate to 100 chars max (you can adjust this)
//   return cleanText.length > 100 ? cleanText.slice(0, 97) + "..." : cleanText;
// };

const CanJobCard = ({
  role,
  id,
  companyName,
  reviews,
  ratings,
  // description,
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
  datePosted,
  proposal,
}) => {
  const { savedjobsData, handleDeleteSavedJobs, toggleSavedJob } =
    useContext(SavedJobsApiData);
  const navigate = useNavigate();
  const isSaved = savedjobsData?.some((item) => parseInt(item.job_id) === id);

  return (
    <>
      {!isMobile && (
        <div className="tw-css border rounded-lg  p-4 flex flex-col bg-white">
          {isFindWork ? (
            <>
              <div className="tw-css flex justify-between w-full h-full">
                <div className="job-card-wrapper">
                  <h3 className="text-xl font-medium mb-0">{role}</h3>
                  <div className="flex">
                    <p className="text-gray-700 mb-0">{companyName.trim()}</p>
                    <FaStar className="h-5 w-5 text-[#FACC15]" />
                    <span>{ratings}</span>
                    <span className="text-gray-500">({reviews} reviews)</span>
                  </div>

                  {/* <div
                    className="w-[70%] text-sm text-gray-700 line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html: getCleanTruncatedDescription(description),
                    }}
                  /> */}

                  <div className="flex flex-wrap gap-2 mt-2">
                    {skills?.map((skill, i) => (
                      <div
                        key={i}
                        className="bg-[#F3F4F6] text-sm text-[#1F2937] capitalize rounded-sm p-2"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-start h-full">
                  {newTag && (
                    <button className="bg-green-500 text-[#166534] py-1 px-2 rounded">
                      {newTag}
                    </button>
                  )}
                  <p className="rounded-xl bg-[#F3F4F6] text-sm md:text-[0.5rem] text-[#1F2937] w-fit p-1 md:p-0">
                    {proposal} proposals
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

                <p className="text-[#374151]">{`GHS ${salaryRange}`}</p>

                <button
                  className="bg-green-800 text-white px-4 py-2 rounded capitalize text-center h-10"
                  onClick={() =>
                    navigate(`/dashboard-candidate/find-work-details/${id}`)
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
                        navigate(`/dashboard-candidate/find-work-details/${id}`)
                      }
                    >
                      view
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-gray-700">{companyName}</p>
                  <FaStar className="h-5 w-5 text-[#FACC15]" />
                  <span>{ratings}</span>
                  <span className="text-gray-500">({reviews} reviews)</span>
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

                  {jobType === "Full Time" ? (
                    <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                      Full Time
                    </span>
                  ) : (
                    <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                      Contract
                    </span>
                  )}

                  <span className="text-gray-800 font-semibold ">
                    GHS {salaryRange}
                  </span>
                  <span className="text-gray-500 text-sm flex">
                    {dateSaved}
                  </span>
                </div>

                {/* <div
                  className="w-[20%] text-sm text-gray-700 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: description }}
                /> */}
              </div>
            </div>
          )}
        </div>
      )}

      {isMobile && (
        <div className="tw-css border rounded-lg shadow-md p-2 flex flex-col size-full bg-white">
          <div className="tw-css flex justify-between w-full h-full">
            <div className="job-card-wrapper">
              <h3 className="text-xl font-medium mb-0">{role}</h3>
              <p className="text-gray-700 mb-0">{companyName}</p>

              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="inline-block bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                  {isFindWork ? jobLocation : status}
                </span>
                <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset">
                  {jobType}
                </span>
              </div>
            </div>

            {isFindWork ? (
              <div className="flex flex-col items-start h-full">
                <button
                  onClick={() => toggleSavedJob(id, userId)}
                  className="border-0"
                >
                  {!isSaved ? (
                    <CiBookmark className="size-4" />
                  ) : (
                    <FaBookmark className="size-4" color="#166534" />
                  )}
                </button>
                <p className="text-sm">
                  {calculateDaysSincePosted(datePosted)}
                </p>
              </div>
            ) : (
              <p className="text-sm">{calculateDaysSincePosted(datePosted)}</p>
            )}
          </div>

          <div className="flex justify-between w-full mt-2">
            <p className="text-[#374151]">{salaryRange}</p>
            <button
              className="bg-green-800 w-fit text-white px-4 py-2 rounded capitalize text-center h-10"
              onClick={() =>
                navigate(`/dashboard-candidate/find-work-details/${id}`)
              }
            >
              view
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CanJobCard;

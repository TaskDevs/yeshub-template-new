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

const Tags = ({ bg, color, text }) => {
  return (
    <div
      className={`w-fit p-1 rounded-2xl text-sm capitalize bg-[${bg}] text-[${color}] font-medium`}
    >
      {text}
    </div>
  );
};

const getCleanTruncatedDescription = (description) => {
  if (!description) return "No description provided."; // handle null/undefined

  // remove all HTML tags
  const cleanText = description.replace(/<[^>]*>/g, "").trim();

  // fallback if empty after cleaning
  if (!cleanText) return "No description provided.";

  // truncate to 100 chars max (you can adjust this)
  return cleanText.length > 100 ? cleanText.slice(0, 97) + "..." : cleanText;
};

const CanJobCard = ({
  role,
  id,
  companyName,
  reviews,
  ratings,
  description,
  skills,
  numberOfProposals,
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
}) => {

  const { savedjobsData, handleDeleteSavedJobs, toggleSavedJob } = useContext(SavedJobsApiData);
  const navigate = useNavigate();
  const isSaved = savedjobsData?.some((item) => parseInt(item.job_id) === id);



  return (
    <>
      {!isMobile && (
        <div className="tw-css border rounded-lg shadow-md p-4 flex flex-col bg-[white]">
          {isFindWork ? (
            <>
              <div className="tw-css flex justify-between w-full h-full">
                <div className=" job-card-wrapper">
                  <h3 className="text-xl font- mb-0 ">{role}</h3>
                  <div className="flex items-center">
                    <p className="text-gray-700 mb-0">{companyName}</p>
                    <FaStar className="h-5 w-5 text-[#FACC15]" />
                    <span className="">{ratings}</span>
                    <span className="text-gray-500">({reviews} reviews)</span>
                  </div>

                  <p className="truncate w-[70%] text-sm text-gray-700">
                    {getCleanTruncatedDescription(description)}
                  </p>

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

                {isFindWork && (
                  <div className="flex flex-col  items-start h-full ">
                    {newTag && (
                      <button className="bg-green-500 text-[#166534] py-1 px-2 rounded ">
                        {newTag}
                      </button>
                    )}

                    <p className="rounded-xl bg-[#F3F4F6] text-sm md:text-[0.5rem] text-[#1F2937] w-fit p-1 md:p-0">
                      {" "}
                      {numberOfProposals} proposals
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-between w-full ">
                <button
                  
                  onClick={() => toggleSavedJob(id, userId)}
                  className="border rounded py-2 px-2 flex text-[#374151] capitalize text-md"
                >
                  {!isSaved && <CiBookmark className="size-4" />}
                  {isSaved && <FaBookmark className="size-4" color="#166534" />}
                  <span>{isSaved? "Saved": "Save"}</span>
                </button>

                <p className="text-[#374151]">{`GHS ${salaryRange}`}</p>

                <button
                  className="bg-green-800 text-white px-4 py-2 
                rounded capitalize text-center h-10"
                  onClick={() => navigate(`/dashboard-candidate/find-work-details/${id}`)}
                >
                  apply
                </button>
              </div>
            </>
          ) : (
            <div className="flex space-x-2 items-start  w-full ">
              <div className="size-24">
                <img
                  src={image}
                  alt="company_logo"
                  className="size-24 object-cover rounded-md border"
                />
              </div>

              <div className="job-profile-saved ">
                <div className="flex justify-between items-center w-full">
                  <h3 className="text-xl font-bold ">{role}</h3>

                  <div className="flex items-center">
                    <div className="flex items-center">
                      <IoIosPeople className="size-4" />
                      <span>{numberOfProposals} proposals</span>
                    </div>
                    <button onClick={() => handleDeleteSavedJobs(id, userId)}>
                      <FaRegTrashAlt />
                    </button>
                    <button
                      className="bg-green-800 text-white px-4 py-2 
                    rounded capitalize text-center h-10"
                    onClick={() => navigate(`/dashboard-candidate/find-work-details/${id}`)}
                    >
                      apply
                    </button>
                  </div>
                </div>

                <div className="flex items-center">
                  <p className="text-gray-700">{companyName}</p>
                  <FaStar className="h-5 w-5 text-[#FACC15]" />
                  <span className="">{ratings}</span>
                  <span className="text-gray-500">({reviews} reviews)</span>
                </div>
                <div className="flex items-center justify-start">
                  {status === "Closed" ? (
                    <div
                      className={`w-fit p-1 rounded-2xl text-sm capitalize bg-[#FEE2E2] text-[#991B1B] font-medium`}
                    >
                      Closed
                    </div>
                  ) : (
                    <Tags bg="#DCFCE7" color="#166534" text="Active" />
                  )}
                  {jobType === "Full Time" ? (
                    <Tags bg="#DCFCE7" color="#166534" text="Full Time" />
                  ) : (
                    <Tags bg="#DBEAFE" color=" #1E40AF" text="Contract" />
                  )}
                  <p>GHS{salaryRange}</p>
                  <p>{dateSaved}</p>
                </div>

                <div className="truncate w-[70%] text-sm text-gray-700">
                  <p className="">{description}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {isMobile && (
        <div className="tw-css border rounded-lg shadow-md p-2 flex flex-col size-full bg-[white]">
          <>
            <div className="tw-css flex justify-between w-full h-full">
              <div className=" job-card-wrapper">
                <h3 className="text-xl font- mb-0 ">{role}</h3>
                <p className="text-gray-700 mb-0">{companyName}</p>

                <div className=" job-card-skills mt-2">
                  <div className="bg-[#F3F4F6] text-sm text-[#1F2937] capitalize rounded-full p-2">
                    {isFindWork && jobLocation}
                    {!isFindWork && status}
                  </div>
                  <div className="bg-[#F3F4F6] text-sm text-[#1F2937] capitalize rounded-full p-2">
                    {jobType}
                  </div>
         
                </div>
              </div>

              {isFindWork ? (
                <div className="flex flex-col  items-start h-full ">
                  <button
                    onClick={() => toggleSavedJob(id, userId)}
                    className="border-0"
                  >
                    {!isSaved && <CiBookmark className="size-4" />}
                    {isSaved && (
                      <FaBookmark className="size-4" color="#166534" />
                    )}
                  </button>
                  <p className="text-sm">
                    {calculateDaysSincePosted(datePosted)}
                  </p>
                </div>
              ) : (
                <p className="text-sm">
                  {calculateDaysSincePosted(datePosted)}
                </p>
              )}
            </div>

            <div className="flex justify-between w-full ">
              <p className="text-[#374151] ">{salaryRange}</p>
              <button
                className="bg-green-800 w-fit text-white 
                px-4 py-2 rounded capitalize text-center h-10"
                onClick={() => navigate(`/dashboard-candidate/find-work-details/${id}`)}
              >
                apply
              </button>
            </div>
          </>
        </div>
      )}
    </>
  );
};

export default CanJobCard;

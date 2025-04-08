import React from "react";
import { CiBookmark } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { calculateDaysSincePosted } from "../../../../utils/readableDate";

const Tags = ({ bg, color, text }) => {
  return (
    <div
      className={`w-fit p-1 rounded-2xl text-sm capitalize bg-[${bg}] text-[${color}] font-medium`}
    >
      {text}
    </div>
  );
};

const CanJobCard = ({
  role,
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
  return (
    <>
      {!isMobile && (
        <div className="tw-css border rounded-lg shadow-md p-4 flex flex-col size-full bg-[white]">
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
                  <div className="mt-2 job-card-desc">
                    <p className="">{description}</p>
                  </div>

                  <div className=" job-card-skills mt-2">
                    {skills &&
                      skills.map((skill, i) => (
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
                <button className="border rounded py-2 px-2 flex text-[#374151] capitalize text-md">
                  <CiBookmark className="size-4" />
                  <span>save</span>
                </button>

                <p className="text-[#374151]">{salaryRange}</p>

                <button className="bg-green-800 text-white px-4 py-2 rounded capitalize text-center h-10">
                  submit proposal
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
                    <button>
                      <FaRegTrashAlt />
                    </button>
                    <button className="bg-green-800 text-white px-4 py-2 rounded capitalize text-center h-10">
                      submit proposal
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
                  <p>{salaryRange}</p>
                  <p>{dateSaved}</p>
                </div>
                <div className="w-[60%] truncate py-2">
                  <p className="">{description}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {isMobile && (
        <div className="tw-css border rounded-lg shadow-md p-2 flex flex-col size-full bg-[white]">
          {isFindWork ? (
            <>
              <div className="tw-css flex justify-between w-full h-full">
                <div className=" job-card-wrapper">
                  <h3 className="text-xl font- mb-0 ">{role}</h3>
                  <p className="text-gray-700 mb-0">{companyName}</p>

                  <div className=" job-card-skills mt-2">
                    <div className="bg-[#F3F4F6] text-sm text-[#1F2937] capitalize rounded-full p-2">
                      {jobLocation}
                    </div>
                    <div className="bg-[#F3F4F6] text-sm text-[#1F2937] capitalize rounded-full p-2">
                      {jobType}
                    </div>
                  </div>
                </div>

                {isFindWork && (
                  <div className="flex flex-col  items-start h-full ">     
                    <button className=" border-0 ">
                      <CiBookmark className="size-4" />
                    </button>
                    <p className="text-sm">{calculateDaysSincePosted(datePosted)} days ago</p>
                  </div>
                )}
              </div>

              <div className="flex justify-between w-full ">
              <p className="text-[#374151] ">{salaryRange}</p>
                <button className="bg-green-800 w-fit text-white px-4 py-2 rounded capitalize text-center h-10">
                  submit
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
                    <button>
                      <FaRegTrashAlt />
                    </button>
                    <button className="bg-green-800 text-white px-4 py-2 rounded capitalize text-center h-10">
                      submit proposal
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
                  <p>{salaryRange}</p>
                  <p>{dateSaved}</p>
                </div>
                <div className="w-[60%] truncate py-2">
                  <p className="">{description}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CanJobCard;

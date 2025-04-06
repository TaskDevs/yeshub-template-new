import React from "react";
import { CiBookmark } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

const CanJobCard = ({
  role,
  companyName,
  reviews,
  ratings,
  description,
  skills,
  numberOfProposals,
  salaryrange,
  image,
  newTag,
  isFindWork = true,
}) => {
  return (
    <div className="tw-css border rounded-lg shadow-md p-4 flex flex-col bg-white h-full">
      <div className="tw-css flex justify-between w-full h-full">
        {isFindWork ?
         (
          <div className=" job-card-wrapper">
            <h3 className="text-xl font- mb-0 ">{role}</h3>
            <div className="flex items-center">
              <p className="text-gray-700 mb-0">{companyName}</p>
              <FaStar className="h-5 w-5 text-[#FACC15]" />
              <span className="">{ratings}</span>
              <span className="text-gray-500">({reviews} reviews)</span>
            </div>
            <div className="">
            <p className="truncate">{description}</p>
            </div>
            
            <div className="flex flex-wrap mt-2">
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
         ) 
         : 
         (
          <div className="flex space-x-2 items-center">
          {image && (
            <img
              src={image}
              alt="company_logo"
              className="w-12 h-12 object-cover rounded-full"
            />
          )}
          <div className="flex flex-col space-y-2 items-start">
            <h3 className="text-xl font-bold ">{role}</h3>
            <div className="flex items-center">
              <p className="text-gray-700">{companyName}</p>
              <FaStar className="h-5 w-5 text-[#FACC15]" />
              <span className="">{ratings}</span>
              <span className="text-gray-500">({reviews} reviews)</span>
            </div>
            <p className="text-truncate">{description}</p>
            {skills &&
              skills.map((skill, i) => (
                <div
                  key={i}
                  className="bg-[#F3F4F6] text-sm text-[#1F2937] capitalize rounded-md py-1 px-2"
                >
                  {skill}
                </div>
              ))}
          </div>
        </div>
         )
        }
       

        <div className="flex flex-col  items-start h-full ">
          {newTag && (
             <button className="bg-green-500 text-[#166534] py-1 px-2 rounded ">
             {newTag}
           </button>
          )}
         
          <p className="rounded-xl bg-[#F3F4F6] text-sm text-[#1F2937] px-3 py-1">
            {" "}
            {numberOfProposals} proposals
          </p>
        </div>
      </div>

      {isFindWork && (
        <div className="flex justify-between w-full ">
          <button className="border rounded py-2 px-2 flex text-[#374151] capitalize text-md">
            <CiBookmark className="size-4" />
            <span>save</span>
          </button>

          <p className="text-[#374151]">{salaryrange}</p>

          <button className="bg-green-800 text-white px-4 py-2 rounded capitalize text-center h-10">
            submit proposal
          </button>
        </div>
      )}
    </div>
  );
};

export default CanJobCard;


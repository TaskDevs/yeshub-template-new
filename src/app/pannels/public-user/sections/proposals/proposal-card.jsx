import { BiSolidEdit } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { RatingStars } from "../../../../common/RatingStars";

export const ProposalCard = ({ applicant, onStatusChange, onViewMore }) => {
  return (
    <div className="border rounded p-4 flex flex-col justify-start w-full shadow-sm bg-white">
      {/* Top Section: Image + Rate + Location */}
      <div className="flex justify-between mb-3 w-full">
        <div className="flex items-center">
          <img
            src={applicant?.image}
            alt={applicant?.name}
            className="w-16 h-16 rounded-full mr-4 object-cover"
          />
          <div>
            <h3 className="text-base font-bold">{applicant?.name}</h3>
            <h4 className="text-sm text-gray-600">{applicant?.role}</h4>
            <p className="text-xs text-gray-500">
              {applicant?.experience} | {applicant?.badge}
            </p>
            <div className="mt-1">
              <RatingStars rating={applicant?.rating} />
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold text-green-600">Applied Job</p>
          <p className="text-sm text-gray-600">{applicant?.jobTitle}</p>
        </div>
      </div>

      {/* Ratings */}

      {/* Description */}
      <div className=" mb-3 w-full">
        <h3 className="font-bold text-black">Bio</h3>
        <hr className="my-2" />
        <p className="text-sm text-gray-700 mb-2">{applicant?.description}</p>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-3">
        {applicant?.skills?.map((skill, index) => (
          <span key={index} className="bg-gray-100 px-3 py-1 rounded text-sm">
            {skill}
          </span>
        ))}
      </div>

      {/* Bottom: Status + Action Buttons */}
      <div className="flex items-center justify-between w-full mt-auto pt-3 border-t">
        {/* Status Info */}
        <div className="text-sm">
          <span className="font-semibold">Status:</span>{" "}
          <span
            className={`inline-block px-2 py-1 rounded text-white text-xs ${
              applicant?.status === "Pending"
                ? "bg-yellow-500"
                : applicant?.status === "Accepted"
                ? "bg-green-600"
                : "bg-red-500"
            }`}
          >
            {applicant?.status}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onStatusChange(applicant)}
            className="text-blue-600 hover:text-blue-800"
            title="Change Status"
          >
            <BiSolidEdit size={18} />
          </button>
          <button
            onClick={() => onViewMore(applicant)}
            className="text-gray-700 hover:text-black"
            title="View More"
          >
            <FaEye size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

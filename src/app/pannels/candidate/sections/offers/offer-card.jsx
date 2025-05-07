// import { baseURL } from "../../../../../globals/constants";
import { FiTrash2 } from "react-icons/fi";

export const OfferCard = ({ info }) => {
  return (
    <div className="border rounded p-4 flex flex-col justify-start w-full shadow-sm bg-white">
      <div className="flex justify-between mb-3 w-full">
        <div className="flex items-center">
          <img
            src={info?.company?.logo}
            alt={"Profile Image"}
            className="w-16 h-16 rounded-full mr-4 object-cover"
          />
          <div>
            <h3 className="text-xl text-gray-800 font-semibold">{`${info.job.title} (${info.application.status})`}</h3>
            <div className="flex flex-row">
              <span className="text-sm text-gray-600">
                {info.company.company_name}
              </span>
              <span className="text-sm text-gray-600">4.8</span>
              <span className="text-sm text-gray-600">{`${info.company_reviews} reviews`}</span>
            </div>
            <div className="flex flex-row">
              <span className="p-1 rounded bg-blue-200 text-blue-800 text-xs">
                {info.application.status}
              </span>
              <span className="p-1 rounded bg-blue-200 text-blue-800 text-xs">
                {info.job.category}
              </span>
              <span className="text-gray-600">{info.job.fixed_rate}</span>
              <span className="text-gray-600">{"2 days ago"}</span>
            </div>
            <div className="mt-2">
              <p className="text-gray-600">{info.job.description}</p>
            </div>
            <div className="mt-2">
              <span className="text-green-600 cursor-pointer">View More</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="flex">
            <FiTrash2
              className="text-xl text-green-600 cursor-pointer"
              title="Remove"
            />
            <button className="bg-green-800 p-2 rounded-md cursor-pointer text-white">
              View Proposal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

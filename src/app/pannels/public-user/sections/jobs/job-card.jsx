import { NavLink } from "react-router-dom";
import { baseURL } from "../../../../../globals/constants";
import TimeAgo from "../../../../../utils/formateDate";
import { Badge } from "primereact/badge";

export const JobsCard = ({
  img,
  duration,
  location,
  link,
  title,
  days_left,
  amount,
  job_type,
  skills,
  start_rate,
  end_rate
}) => {
  let skillsArray = [];

  try {
    skillsArray = JSON.parse(skills);
    if (!Array.isArray(skillsArray)) {
      skillsArray = [];
    }
  } catch (error) {
    console.error("Error parsing skills:", error);
    skillsArray = [];
  }

  return (
    <NavLink
      to={link}
      className="twm-jobs-list-style1 mb-5 no-underline text-gray-800 hover:text-blue-600 transition-all duration-300"
      style={{ textDecoration: "none" }}
    >
      <div className="twm-media">
        <img
          src={img ? `${img}` : `${baseURL}/assets/images/no-logo.png`}
          alt="Job"
          className="w-16 h-16 object-contain rounded"
        />
      </div>

      <div className="twm-mid-content">
        <h4 className="twm-job-title text-lg font-semibold text-gray-800 mb-1">
          {title}
          <span className="twm-job-post-duration text-sm text-gray-500 font-normal ml-1">
            / <TimeAgo date={duration} />
          </span>
        </h4>

        <p className="twm-job-address text-sm text-gray-600 capitalize mb-2">
          {location}
        </p>

        <div className="flex flex-wrap gap-2 mb-2">
         
          {skills &&
            skills.map((skill, index) => (
              <Badge key={index} value={skill} severity="secondary" />
            ))}
    
        </div>

       
      </div>

      <div className="twm-right-content text-right">
        <div className="twm-jobs-category mb-1">
          <span className="px-2 py-1 text-sm rounded bg-green-100 text-green-800 font-medium text-capitalize">
            {job_type}
          </span>
        </div>

        <div className="twm-jobs-amount text-lg font-bold text-gray-900 mb-1">
          {amount ? (
            <p>{amount}</p>
          ):(
            <p>{start_rate} - {end_rate}</p>
          )}
        </div>

        <p
          className={`text-sm ${
            days_left === 0 ? "text-red-600 font-semibold" : "text-gray-600"
          }`}
        >
          {days_left === 0 ? "Expired" : `${days_left} days left`}
        </p>
      </div>
    </NavLink>
  );
};

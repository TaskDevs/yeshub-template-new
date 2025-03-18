import { NavLink } from "react-router-dom";
import { baseURL } from "../../../../../globals/constants";
import TimeAgo from "../../../../../utils/formateDate";

import { Chip } from 'primereact/chip';
        
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
}) => {
  let skillsArray = [];

  try {
    skillsArray = JSON.parse(skills);
    if (!Array.isArray(skillsArray)) {
      skillsArray = []; // Ensure it's an array
    }
  } catch (error) {
    console.error("Error parsing skills:", error);
    skillsArray = []; // Fallback to empty array
  }

  return (
    <NavLink to={link} className="twm-jobs-list-style1 mb-5">
      <div className="twm-media">
        <img
          src={img ? `${img}` : `${baseURL}/assets/images/no-logo.png`}
          alt="#"
        />
        {/* <JobZImage src={`${baseURL}/assets/images/no-logo.png`} alt="#" /> */}
      </div>
      <div className="twm-mid-content">
        <h4 className="twm-job-title">
          {title}
          <span className="twm-job-post-duration">
            / <TimeAgo date={duration} />
          </span>
        </h4>
        <p className="twm-job-address twm-exp-profile text-capitalize">
          {location}
        </p>

        <div className="flex flex-wrap gap-2">
          {skillsArray.map((skill, index) => (
              <div className=" flex flex-wrap gap-2" key={index}>
                 <Chip label={skill} /> 
           
            </div>
          ))}
        </div>
      </div>
      <div className="twm-right-content">
        <div className="twm-jobs-category green">
          <span className="twm-bg-green">{job_type}</span>
        </div>
        <div className="twm-jobs-amount">
          {amount}
          {/* <span>/ daily</span> */}
        </div>
        <p
          className="twm-jobs-browse bids"
          style={{ color: days_left === 0 ? "red" : "inherit" }}
        >
          {days_left === 0 ? "Expired" : `${days_left} days left`}
        </p>
      </div>
    </NavLink>
  );
};

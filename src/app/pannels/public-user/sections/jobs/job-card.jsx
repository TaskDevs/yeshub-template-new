import { NavLink } from "react-router-dom";
import {  baseURL } from "../../../../../globals/constants";
import TimeAgo from "../../../../../utils/formateDate";
import { useContext } from "react";
import { GlobalApiData } from "../../../../context/global/globalContextApi";

export const JobsCard = ({
  img,
  duration,
  location,
  link,
  title,
  days_left,
  amount,
  employerId
}) => {
  const { setSelectedId } = useContext(GlobalApiData);

  console.log("emp-id-card", employerId)

  return (
    <NavLink to={link} className="twm-jobs-list-style1 mb-5" onClick={() => setSelectedId(employerId)}>
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
        <p className="twm-job-address twm-exp-profile">{location}</p>
        <ul className="ul-skills">
          <li>ux writing</li>
          <li>wire framing</li>
          <li>prototyping</li>
          <li>information architecture</li>
        </ul>
      </div>
      <div className="twm-right-content">
        <div className="twm-jobs-category green">
          <span className="twm-bg-green">Bid Now</span>
        </div>
        <div className="twm-jobs-amount">
          {amount}
          {/* <span>/ daily</span> */}
        </div>
        <p className="twm-jobs-browse bids"> {days_left} days left</p>
      </div>
    </NavLink>
  );
};

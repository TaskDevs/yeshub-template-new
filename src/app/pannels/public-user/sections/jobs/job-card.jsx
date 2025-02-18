import JobZImage from "../../../../common/jobz-img";
import { NavLink } from "react-router-dom";

export const JobsCard = ({
  img,
  duration,
  location,
  link,
  title,
  noOfBid,
  amount,
}) => {
  return (
    <NavLink to={link} className="twm-jobs-list-style1 mb-5">
      <div className="twm-media">
        <JobZImage src={img} alt="#" />
      </div>
      <div className="twm-mid-content">
        <h4 className="twm-job-title">
          {title}
          <span className="twm-job-post-duration">/ {duration}</span>
        </h4>
        <p className="twm-job-address">{location}</p>
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
        <p className="twm-jobs-browse bids"> {noOfBid} bids</p>
      </div>
    </NavLink>
  );
};

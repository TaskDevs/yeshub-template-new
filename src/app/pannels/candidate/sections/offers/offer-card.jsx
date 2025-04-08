// import { baseURL } from "../../../../../globals/constants";
// import { FiTrash2 } from "react-icons/fi";

import TimeAgo from "../../../../../utils/formateDate";

export const OfferCard = ({ info }) => {
  console.log(info.employer.logo);
  return (
    <div className="twm-jobs-list-style1 mb-5">
      <div className="twm-media">
        <img src={info.employer.logo} alt="#" />
        {/* <JobZImage src={`${baseURL}/assets/images/no-logo.png`} alt="#" /> */}
      </div>
      <div className="twm-mid-content">
        <h4 className="twm-job-title">{info.job_title}</h4>
        <div className="d-flex flex-row">
          <span className="twm-job-address twm-exp-profile text-capitalize">
            {info.employer.company_name}
          </span>
          <span className="twm-job-address twm-exp-profile text-capitalize me-2">
            .🌟{info.employer.company_ratings}.
          </span>
          <span className="twm-job-address twm-exp-profile text-capitalize me-2">
            {info.employer.review_count} reviews
          </span>
        </div>
        <div className="d-flex flex-row mt-2 gap-2">
          <span className="badge bg-success rounded-pill text-capitalize py-2">
            {info.proposal.stage}
          </span>
          <span className="badge bg-warning text-dark rounded-pill text-capitalize py-2">
            {info.job_type}
          </span>
          <span className="text-capitalize">GH {info.budget}</span>
        </div>

        <div className="mt-3">
          <span className="text-capitalize">{info.description}</span>
        </div>
        <div className="mt-4">
          <span className="text-success" style={{ cursor: "pointer" }}>
            View More
          </span>
        </div>
      </div>
      <div className="twm-right-content">
        <div className="d-flex flex-row mt-2 gap-2">
          <div className="twm-jobs-category green">
            <span
              className="twm-bg-green px-2 py-3"
              style={{ cursor: "pointer" }}
            >
              View Proposals Details
            </span>
          </div>
        </div>

        <div className="twm-jobs-amount">
          <TimeAgo date={info.end_date} />
        </div>
      </div>
    </div>
  );
};

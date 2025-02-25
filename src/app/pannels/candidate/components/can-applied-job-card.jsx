import React from "react";
import readableDate from "../../../../utils/readableDate";
import { NavLink } from "react-router-dom";


// {
// 	imageURL ||
// 	`https://yeshub-api-v2-fd6c52bb29a5.herokuapp.com/${profileData?.profile_image}`
//   }

function CanAppliedJobCard({ data }) {
  console.log("data-app-job", data);
  console.log(
    "${data?.jobDetails?.employer?.logo}",
    ` ${data?.jobDetails?.employer?.logo}`
  );
  return (
    <li>
      <div className="twm-jobs-list-style1 mb-5">
        <div className="twm-media">
          <img
            src={data?.jobDetails?.employer?.logo}
            alt="company logo"
          />
        </div>
        <div className="twm-mid-content">
          <NavLink
            to={`/job-detail/${data?.jobDetails?.id}`}
            className="twm-job-title"
          >
            <h4>
              {data?.jobDetails?.job_title}
              <span className="twm-job-post-duration">
                /{readableDate(data?.created_at)}
              </span>
            </h4>
          </NavLink>
          {/* <p className="twm-job-address">
						1363-1385 Sunset Blvd Los Angeles, CA 90026, USA
					</p>
					<a
						href="https://themeforest.net/user/thewebmax/portfolio"
						className="twm-job-websites site-text-primary"
					>
						https://thewebmax.com
					</a> */}
        </div>
        <div className="twm-right-content">
          <div className="twm-jobs-category green">
            <span className="twm-bg-green">New</span>
          </div>
          <div className="twm-jobs-amount">
            ₵{data?.jobDetails?.salary} <span>/ Month</span>
          </div>
          {/* <NavLink
						to={publicUser.jobs.DETAIL1}
						className="twm-jobs-browse site-text-primary"
					>
						Apply Job
					</NavLink> */}
        </div>
      </div>
    </li>
  );
}

export default CanAppliedJobCard;

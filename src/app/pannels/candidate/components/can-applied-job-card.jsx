import React, { useContext } from "react";
import readableDate from "../../../../utils/readableDate";
import { NavLink } from "react-router-dom";
import { GlobalApiData } from "../../../context/global/globalContextApi";

// {
// 	imageURL ||
// 	`https://yeshub-api-v2-fd6c52bb29a5.herokuapp.com/${profileData?.profile_image}`
//   }

function CanAppliedJobCard({ data }) {

  const { setSelectedId } = useContext(GlobalApiData);

  // console.log("data-app-job", data);
  



  return (
    <li>
      <div
        className="twm-jobs-list-style1 mb-5"
        onClick={() => {
          console.log("clicked-id", data.id);
          setSelectedId(data.id);
        }}
      >
        <div className="twm-media">
          <img src={data?.jobDetails?.employer?.logo} alt="company logo" />
        </div>
        <div className="twm-mid-content">
          <NavLink
            to={`/job-detail/${data?.jobDetails?.id}`}
            className="twm-job-title"
          >
            <h4>{data?.jobDetails?.job_title}</h4>
          </NavLink>
          <span className="twm-job-post-duration">
            {readableDate(data?.created_at)}
          </span>
          <p className="font-weight-bold">
            Status:{" "}
            <span className="site-text-primary text-capitalize">
              {data?.status}
            </span>{" "}
          </p>
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

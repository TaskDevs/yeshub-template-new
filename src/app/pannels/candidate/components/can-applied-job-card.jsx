import React, { useContext } from "react";
import readableDate, { calculateDaysLeft } from "../../../../utils/readableDate";
import { NavLink } from "react-router-dom";
import { GlobalApiData } from "../../../context/global/globalContextApi";
import { freelancerId } from "../../../../globals/constants";

// {
// 	imageURL ||
// 	`https://yeshub-api-v2-fd6c52bb29a5.herokuapp.com/${profileData?.profile_image}`
//   }

function CanAppliedJobCard({ data }) {

  const { setSelectedId } = useContext(GlobalApiData);
  



  return (
      
      <div
        className="twm-jobs-list-style1 mb-5"
        onClick={() => {
          // console.log("clicked-id", data.id);
          setSelectedId(data.id);
        }}
      >
        <div className="twm-media">
          <img src={data?.jobDetails?.employer?.logo} alt="company logo" />
        </div>
        <div className="twm-mid-content">
          <NavLink
            // to={`/job-detail/${data?.jobDetails?.id}`}
            to={ `/dashboard-candidate/applied-job-details/${data?.job_id}`}
            className="twm-job-title apply-title"
          >
            <h4>{freelancerId ? data?.title : data?.jobDetails?.job_title}</h4>
          </NavLink>
          <span className="twm-job-post-duration">
            Date Applied: {readableDate(data?.created_at)}
            {/* {calculateDaysLeft( data?.jobDetails?.start_date, data?.jobDetails?.end_date)} */}
          </span>
          <p className="font-weight-bold">
            Status:{" "}
            <span className="site-text-primary text-capitalize apply-status">
              {freelancerId ? data?.freelancer_status : data?.status}
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
          {
              calculateDaysLeft(data?.jobDetails?.start_date, data?.jobDetails?.end_date) > 0 ? 
              (
                <span className="twm-bg-green">
            {"Active"}
              
            </span>
              ) : (
                <span className="twm-bg-brown">
                 { "Expired"}
              
            </span>
              )
            }
            
            
          </div>
          <div className="twm-jobs-amount">
            {freelancerId ? "" : 
             (
              <>
                ₵ {data?.jobDetails?.salary} <span>/ Month</span>
              </>
            )
            }
           
          </div>
          
          <a href={`/dashboard-candidate/applied-job-details/${data?.job_id}`}
          >
            <button className="site-button">View Job</button>
          </a>
        </div>
      </div>
    
   
  );
}

export default CanAppliedJobCard;

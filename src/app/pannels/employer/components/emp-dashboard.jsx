import JobZImage from "../../../common/jobz-img";
import CountUp from "react-countup";
import SectionCandidateProfileViews from "../../candidate/sections/dashboard/section-can-profile-views";
import { useEffect, useContext, useState } from "react";
import { JobApiData } from "../../../context/jobs/jobsContextApi";
import { AuthApiData } from "../../../context/auth/authContextApi";
import { ApplicationApiData } from "../../../context/application/applicationContextApi";
import { useNavigate } from "react-router-dom";

function EmpDashboardPage() {
  const navgate = useNavigate()
  const { userProfile } = useContext(AuthApiData);
  const username = userProfile?.username;
  const employerId = sessionStorage.getItem("user_id");
  const [recentapplied, setRecentApplied] = useState("");
  const {
    processCountJobsPostedByEmp,
    totalPost,
    totalAppliedJob,
    processCountApplications,
  } = useContext(JobApiData);
  const { processGetAppliedJobsByUserId } = useContext(ApplicationApiData);

  useEffect(() => {
    processCountJobsPostedByEmp(employerId);
    processCountApplications(employerId);
  }, [employerId]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("loading data");
      try {
        const res = await processGetAppliedJobsByUserId(employerId);
        const data = res.data;
        setRecentApplied(data);
        console.log("data-log", res.data);
      } catch (err) {
        console.error("Errors:", err);
      }
    };

    fetchData();
  }, [employerId]);


  const navigateEmp =(id) =>{
    navgate(`/can-detail/${id}`)
  }

  return (
    <>
      <div className="">
        <div className="wt-admin-right-page-header clearfix">
          <h2>
            Hello, <span className="text-capitalize">{username}</span>
          </h2>
          <div className="breadcrumbs">
            <a href="#">Home</a>
            <span>Dasboard</span>
          </div>
        </div>
        <div className="twm-dash-b-blocks mb-5">
          <div className="row">
            <div className="col-xl-3 col-lg-6 col-md-12 mb-3">
              <div className="panel panel-default">
                <div className="panel-body wt-panel-body gradi-1 dashboard-card ">
                  <div className="wt-card-wrap">
                    <div className="wt-card-icon">
                      <i className="far fa-address-book" />
                    </div>
                    <div className="wt-card-right wt-total-active-listing counter ">
                      <CountUp end={totalPost} duration={10} />
                    </div>
                    <div className="wt-card-bottom ">
                      <h4 className="m-b0">Posted Jobs</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-12 mb-3">
              <div className="panel panel-default">
                <div className="panel-body wt-panel-body gradi-2 dashboard-card ">
                  <div className="wt-card-wrap">
                    <div className="wt-card-icon">
                      <i className="far fa-file-alt" />
                    </div>
                    <div className="wt-card-right  wt-total-listing-view counter ">
                      <CountUp end={totalAppliedJob} duration={10} />
                    </div>
                    <div className="wt-card-bottom">
                      <h4 className="m-b0">Total Applications</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-12 mb-3">
              <div className="panel panel-default">
                <div className="panel-body wt-panel-body gradi-3 dashboard-card ">
                  <div className="wt-card-wrap">
                    <div className="wt-card-icon">
                      <i className="far fa-envelope" />
                    </div>
                    <div className="wt-card-right wt-total-listing-review counter ">
                      <CountUp end={28} duration={10} />
                    </div>
                    <div className="wt-card-bottom">
                      <h4 className="m-b0">Messages</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-12 mb-3">
              <div className="panel panel-default">
                <div className="panel-body wt-panel-body gradi-4 dashboard-card ">
                  <div className="wt-card-wrap">
                    <div className="wt-card-icon">
                      <i className="far fa-bell" />
                    </div>
                    <div className="wt-card-right wt-total-listing-bookmarked counter ">
                      <CountUp end={18} duration={10} />
                    </div>
                    <div className="wt-card-bottom">
                      <h4 className="m-b0">Notifications</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="twm-pro-view-chart-wrap">
          <div className="row">
            <div className="col-xl-6 col-lg-12 col-md-12 mb-4">
              <SectionCandidateProfileViews />
            </div>
            <div className="col-xl-6 col-lg-12 col-md-12 mb-4">
              <div className="panel panel-default">
                <div className="panel-heading wt-panel-heading p-a20">
                  <h4 className="panel-tittle m-a0">Inbox</h4>
                </div>
                <div className="panel-body wt-panel-body bg-white">
                  <div className="dashboard-messages-box-scroll scrollbar-macosx">
                    <div className="dashboard-messages-box">
                      <div className="dashboard-message-avtar">
                        <JobZImage src="images/user-avtar/pic1.jpg" alt="" />
                      </div>
                      <div className="dashboard-message-area">
                        <h5>
                          Lucy Smith<span>18 June 2023</span>
                        </h5>
                        <p>
                          Bring to the table win-win survival strategies to
                          ensure proactive domination. at the end of the day,
                          going forward, a new normal that has evolved from
                          generation.
                        </p>
                      </div>
                    </div>
                    <div className="dashboard-messages-box">
                      <div className="dashboard-message-avtar">
                        <JobZImage src="images/user-avtar/pic3.jpg" alt="" />
                      </div>
                      <div className="dashboard-message-area">
                        <h5>
                          Richred paul<span>19 June 2023</span>
                        </h5>
                        <p>
                          Bring to the table win-win survival strategies to
                          ensure proactive domination. at the end of the day,
                          going forward, a new normal that has evolved from
                          generation.
                        </p>
                      </div>
                    </div>
                    <div className="dashboard-messages-box">
                      <div className="dashboard-message-avtar">
                        <JobZImage src="images/user-avtar/pic4.jpg" alt="" />
                      </div>
                      <div className="dashboard-message-area">
                        <h5>
                          Jon Doe<span>20 June 2023</span>
                        </h5>
                        <p>
                          Bring to the table win-win survival strategies to
                          ensure proactive domination. at the end of the day,
                          going forward, a new normal that has evolved from
                          generation.
                        </p>
                      </div>
                    </div>
                    <div className="dashboard-messages-box">
                      <div className="dashboard-message-avtar">
                        <JobZImage src="images/user-avtar/pic1.jpg" alt="" />
                      </div>
                      <div className="dashboard-message-area">
                        <h5>
                          Thomas Smith<span>22 June 2023</span>
                        </h5>
                        <p>
                          Bring to the table win-win survival strategies to
                          ensure proactive domination. at the end of the day,
                          going forward, a new normal that has evolved from
                          generation.{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 mb-4">
              <div className="panel panel-default site-bg-white m-t30">
                <div className="panel-heading wt-panel-heading p-a20">
                  <h4 className="panel-tittle m-a0">
                    <i className="far fa-list-alt" />
                    Recent Activities
                  </h4>
                </div>
                <div className="panel-body wt-panel-body">
                  <div className="dashboard-list-box list-box-with-icon">
                    <ul>
                      <li>
                        <i className="fa fa-envelope text-success list-box-icon" />
                        Nikol Tesla has sent you{" "}
                        <a href="#" className="text-success">
                          private message!
                        </a>
                        <a
                          href="#"
                          className="close-list-item color-lebel clr-red"
                        >
                          <i className="far fa-trash-alt" />
                        </a>
                      </li>
                      <li>
                        <i className="fa fa-suitcase text-primary list-box-icon" />
                        Your job for
                        <a href="#" className="text-primary">
                          Web Designer
                        </a>
                        has been approved!
                        <a
                          href="#"
                          className="close-list-item color-lebel clr-red"
                        >
                          <i className="far fa-trash-alt" />
                        </a>
                      </li>
                      <li>
                        <i className="fa fa-bookmark text-warning list-box-icon" />
                        Someone bookmarked your
                        <a href="#" className="text-warning">
                          SEO Expert
                        </a>
                        Job listing!
                        <a
                          href="#"
                          className="close-list-item color-lebel clr-red"
                        >
                          <i className="far fa-trash-alt" />
                        </a>
                      </li>
                      <li>
                        <i className="fa fa-tasks text-info list-box-icon" />
                        Your job listing Core
                        <a href="#" className="text-info">
                          PHP Developer
                        </a>{" "}
                        for Site Maintenance is expiring!
                        <a
                          href="#"
                          className="close-list-item color-lebel clr-red"
                        >
                          <i className="far fa-trash-alt" />
                        </a>
                      </li>
                      <li>
                        <i className="fa fa-paperclip text-success list-box-icon" />
                        You have new application for
                        <a href="#" className="text-success">
                          {" "}
                          UI/UX Developer &amp; Designer!{" "}
                        </a>
                        <a
                          href="#"
                          className="close-list-item color-lebel clr-red"
                        >
                          <i className="far fa-trash-alt" />
                        </a>
                      </li>
                      <li>
                        <i className="fa fa-suitcase text-danger list-box-icon" />
                        Your Magento Developer job expire
                        <a href="#" className="text-danger">
                          Renew
                        </a>{" "}
                        now it.
                        <a
                          href="#"
                          className="close-list-item color-lebel clr-red"
                        >
                          <i className="far fa-trash-alt" />
                        </a>
                      </li>
                      <li>
                        <i className="fa fa-star site-text-orange list-box-icon" />
                        David cope left a
                        <a href="#" className="site-text-orange">
                          {" "}
                          review 4.5
                        </a>{" "}
                        for Real Estate Logo
                        <a
                          href="#"
                          className="close-list-item color-lebel clr-red"
                        >
                          <i className="far fa-trash-alt" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 mb-4">
              <div className="panel panel-default">
                <div className="panel-heading wt-panel-heading p-a20">
                  <h4 className="panel-tittle m-a0">Recent Applicants</h4>
                </div>
                <div className="panel-body wt-panel-body bg-white">
                  <div className="twm-dashboard-candidates-wrap">
                    <div className="row">
                      {recentapplied && recentapplied.length > 0 ? (
                        recentapplied.map((item, index) => (
                          <div
                            key={index}
                            className="col-xl-6 col-lg-12 col-md-12"
                          >
                            <div className="twm-dash-candidates-list">
                              <div className="twm-media">
                                <div className="twm-media-pic">
                                  <JobZImage
                                    src={
                                      item.user?.user_info?.profileImage ||
                                      "images/candidates/pic6.jpg"
                                    }
                                    alt={item.user?.user_info?.firstname || "Candidate"}
                                  />
                                </div>
                              </div>
                              <div className="twm-mid-content">
                                <a href="#" className="twm-job-title">
                                  <h4 className="text-capitalize">
                                  {`${item.user?.user_info?.firstname || "Candidate"} ${item.user?.user_info?.lastname || ""}`.trim()}

                                  </h4>
                                </a>
                                <p>
                                  {item.posted_job?.job_title || "No Job Title"}
                                </p>
                                <div className="twm-fot-content">
                                  <div className="twm-left-info">
                                    <p className="twm-candidate-address">
                                      <i className="feather-map-pin" />
                                      {item.user?.user_info?.address ||
                                        "Unknown Location"}
                                    </p>
                                    <div className="twm-jobs-vacancies">
                                    GH₵{item.posted_job?.salary || "N/A"}
                                     
                                    </div>
                                  </div>
                                  <div className="twm-right-btn">
                                    <ul className="twm-controls-icon list-unstyled">
                                      <li>
                                       
                                        <button
                                          title="View profile"
                                          data-bs-toggle="tooltip"
                                          data-bs-placement="top"
                                          onClick={()=>navigateEmp(item.user?.id)}
                                        >
                                          <span className="fa fa-eye" />
                                        </button>
                                       
                                      </li>
                                      <li>
                                        <button
                                          title="Send message"
                                          data-bs-toggle="tooltip"
                                          data-bs-placement="top"
                                        >
                                          <span className="far fa-envelope-open" />
                                        </button>
                                      </li>
                                      <li>
                                        <button
                                          title="Delete"
                                          data-bs-toggle="tooltip"
                                          data-bs-placement="top"
                                        >
                                          <span className="far fa-trash-alt" />
                                        </button>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No data found</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmpDashboardPage;

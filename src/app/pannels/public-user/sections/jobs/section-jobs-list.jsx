import React, { useEffect, useContext } from "react";
import SectionPagination from "../common/section-pagination";
import { JobApiData } from "../../../../context/jobs/jobsContextApi";
import { JobsCard } from "./job-card";

function SectionJobsList() {
  const { jobListData, processGetAllJob } = useContext(JobApiData);
 console.log(jobListData)

  useEffect(() => {
    processGetAllJob();
  }, []);

  // Function to calculate the number of days left
  const calculateDaysLeft = (start_date, end_date) => {
   new Date(start_date);
    const endDate = new Date(end_date);
    const today = new Date();

    // If the job period is already over
    if (today > endDate) {
      return 0; // No days left
    }

    const timeDiff = endDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert to days
  };

  
  return (
    <>
      <div>
        <div className="twm-jobs-list-wrap">
          {jobListData.map((item, index) => (
            <JobsCard
              key={index}
              img={item.logo}
              title={item.job_title}
              duration={item.created_at}
              location={item.address}
              amount={`GH₵${item.salary}`}
              job_type={item.job_type}
              days_left={calculateDaysLeft(item.start_date, item.end_date)}
              link={`/job-detail/${item.id}`}
              employerId = {item.employer_id}
            />
          ))}
        </div>
        <SectionPagination />
      </div>
    </>
  );
}

export default SectionJobsList;

// <ul>
// 	<li>
// 		<div className="twm-jobs-list-style1 mb-5">
// 			<div className="twm-media">
// 				<JobZImage src="images/jobs-company/pic1.jpg" alt="#" />
// 			</div>
// 			<div className="twm-mid-content">
// 				<NavLink to={publicUser.jobs.DETAIL1} className="twm-job-title">
// 					<h4>
// 						Senior Web Designer
// 						<span className="twm-job-post-duration">/ 1 days ago</span>
// 					</h4>
// 				</NavLink>
// 				<p className="twm-job-address">
// 					1363-1385 Sunset Blvd Los Angeles, CA 90026, USA
// 				</p>
// 				<ul>
// 					<li>ux writing</li>
// 					<li>wire framing</li>
// 					<li>prototyping</li>
// 					<li>information architecture</li>
// 				</ul>
// 				{/* <a href="https://themeforest.net/user/thewebmax/portfolio" className="twm-job-websites site-text-primary">https://thewebmax.com</a> */}
// 			</div>
// 			<div className="twm-right-content">
// 				<div className="twm-jobs-category green">
// 					<span className="twm-bg-green">New</span>
// 				</div>
// 				<div className="twm-jobs-amount">
// 					$2500 <span>/ Month</span>
// 				</div>
// 				<NavLink
// 					to={publicUser.jobs.DETAIL1}
// 					className="twm-jobs-browse site-text-primary"
// 				>
// 					Browse Job
// 				</NavLink>
// 			</div>
// 		</div>
// 	</li>

// 	<li>
// 		<div className="twm-jobs-list-style1 mb-5">
// 			<div className="twm-media">
// 				<JobZImage src="images/jobs-company/pic2.jpg" alt="#" />
// 			</div>
// 			<div className="twm-mid-content">
// 				<NavLink to={publicUser.jobs.DETAIL1} className="twm-job-title">
// 					<h4>
// 						Sr. Rolling Stock Technician
// 						<span className="twm-job-post-duration">/ 15 days ago</span>
// 					</h4>
// 				</NavLink>
// 				<p className="twm-job-address">
// 					1363-1385 Sunset Blvd Los Angeles, CA 90026, USA
// 				</p>
// 				{/* <a href="https://themeforest.net/user/thewebmax/portfolio" className="twm-job-websites site-text-primary">https://thewebmax.com</a> */}
// 				<ul>
// 					<li>ux writing</li>
// 					<li>wire framing</li>
// 					<li>prototyping</li>
// 					<li>information architecture</li>
// 				</ul>
// 			</div>
// 			<div className="twm-right-content">
// 				<div className="twm-jobs-category green">
// 					<span className="twm-bg-brown">Intership</span>
// 				</div>
// 				<div className="twm-jobs-amount">
// 					$2500 <span>/ Month</span>
// 				</div>
// 				<NavLink
// 					to={publicUser.jobs.DETAIL1}
// 					className="twm-jobs-browse site-text-primary"
// 				>
// 					Browse Job
// 				</NavLink>
// 			</div>
// 		</div>
// 	</li>
// 	<li>
// 		<div className="twm-jobs-list-style1 mb-5">
// 			<div className="twm-media">
// 				<JobZImage src="images/jobs-company/pic3.jpg" alt="#" />
// 			</div>
// 			<div className="twm-mid-content">
// 				<NavLink to={publicUser.jobs.DETAIL1} className="twm-job-title">
// 					<h4 className="twm-job-title">
// 						IT Department Manager
// 						<span className="twm-job-post-duration"> / 6 Month ago</span>
// 					</h4>
// 				</NavLink>
// 				<p className="twm-job-address">
// 					1363-1385 Sunset Blvd Los Angeles, CA 90026, USA
// 				</p>
// 				{/* <a href="https://themeforest.net/user/thewebmax/portfolio" className="twm-job-websites site-text-primary">https://thewebmax.com</a> */}
// 			</div>
// 			<div className="twm-right-content">
// 				<div className="twm-jobs-category green">
// 					<span className="twm-bg-purple">Fulltime</span>
// 				</div>
// 				<div className="twm-jobs-amount">
// 					$2500 <span>/ Month</span>
// 				</div>
// 				<NavLink
// 					to={publicUser.jobs.DETAIL1}
// 					className="twm-jobs-browse site-text-primary"
// 				>
// 					Browse Job
// 				</NavLink>
// 			</div>
// 		</div>
// 	</li>
// 	<li>
// 		<div className="twm-jobs-list-style1 mb-5">
// 			<div className="twm-media">
// 				<JobZImage src="images/jobs-company/pic4.jpg" alt="#" />
// 			</div>
// 			<div className="twm-mid-content">
// 				<NavLink to={publicUser.jobs.DETAIL1} className="twm-job-title">
// 					<h4 className="twm-job-title">
// 						Art Production Specialist{" "}
// 						<span className="twm-job-post-duration">/ 2 days ago</span>
// 					</h4>
// 				</NavLink>
// 				<p className="twm-job-address">
// 					1363-1385 Sunset Blvd Los Angeles, CA 90026, USA
// 				</p>
// 				{/* <a href="https://themeforest.net/user/thewebmax/portfolio" className="twm-job-websites site-text-primary">https://thewebmax.com</a> */}
// 			</div>
// 			<div className="twm-right-content">
// 				<div className="twm-jobs-category green">
// 					<span className="twm-bg-sky">Freelancer</span>
// 				</div>
// 				<div className="twm-jobs-amount">
// 					$1500 <span>/ Month</span>
// 				</div>
// 				<NavLink
// 					to={publicUser.jobs.DETAIL1}
// 					className="twm-jobs-browse site-text-primary"
// 				>
// 					Browse Job
// 				</NavLink>
// 			</div>
// 		</div>
// 	</li>
// 	<li>
// 		<div className="twm-jobs-list-style1 mb-5">
// 			<div className="twm-media">
// 				<JobZImage src="images/jobs-company/pic5.jpg" alt="#" />
// 			</div>
// 			<div className="twm-mid-content">
// 				<NavLink to={publicUser.jobs.DETAIL1} className="twm-job-title">
// 					<h4 className="twm-job-title">
// 						Recreation &amp; Fitness Worker{" "}
// 						<span className="twm-job-post-duration">/ 1 days ago</span>
// 					</h4>
// 				</NavLink>
// 				<p className="twm-job-address">
// 					1363-1385 Sunset Blvd Los Angeles, CA 90026, USA
// 				</p>
// 				{/* <a href="https://themeforest.net/user/thewebmax/portfolio" className="twm-job-websites site-text-primary">https://thewebmax.com</a> */}
// 			</div>
// 			<div className="twm-right-content">
// 				<div className="twm-jobs-category green">
// 					<span className="twm-bg-golden">Temporary</span>
// 				</div>
// 				<div className="twm-jobs-amount">
// 					$800 <span>/ Month</span>
// 				</div>
// 				<NavLink
// 					to={publicUser.jobs.DETAIL1}
// 					className="twm-jobs-browse site-text-primary"
// 				>
// 					Browse Job
// 				</NavLink>
// 			</div>
// 		</div>
// 	</li>
// 	<li>
// 		<div className="twm-jobs-list-style1 mb-5">
// 			<div className="twm-media">
// 				<JobZImage src="images/jobs-company/pic1.jpg" alt="#" />
// 			</div>
// 			<div className="twm-mid-content">
// 				<NavLink to={publicUser.jobs.DETAIL1} className="twm-job-title">
// 					<h4>
// 						Senior Web Designer
// 						<span className="twm-job-post-duration">/ 1 days ago</span>
// 					</h4>
// 				</NavLink>
// 				<p className="twm-job-address">
// 					1363-1385 Sunset Blvd Los Angeles, CA 90026, USA
// 				</p>
// 				{/* <a href="https://themeforest.net/user/thewebmax/portfolio" className="twm-job-websites site-text-primary">https://thewebmax.com</a> */}
// 			</div>
// 			<div className="twm-right-content">
// 				<div className="twm-jobs-category green">
// 					<span className="twm-bg-green">New</span>
// 				</div>
// 				<div className="twm-jobs-amount">
// 					$1000 <span>/ Month</span>
// 				</div>
// 				<NavLink
// 					to={publicUser.jobs.DETAIL1}
// 					className="twm-jobs-browse site-text-primary"
// 				>
// 					Browse Job
// 				</NavLink>
// 			</div>
// 		</div>
// 	</li>
// 	<li>
// 		<div className="twm-jobs-list-style1 mb-5">
// 			<div className="twm-media">
// 				<JobZImage src="images/jobs-company/pic2.jpg" alt="#" />
// 			</div>
// 			<div className="twm-mid-content">
// 				<NavLink to={publicUser.jobs.DETAIL1} className="twm-job-title">
// 					<h4>
// 						Sr. Rolling Stock Technician
// 						<span className="twm-job-post-duration">/ 15 days ago</span>
// 					</h4>
// 				</NavLink>
// 				<p className="twm-job-address">
// 					1363-1385 Sunset Blvd Los Angeles, CA 90026, USA
// 				</p>
// 				{/* <a href="https://themeforest.net/user/thewebmax/portfolio" className="twm-job-websites site-text-primary">https://thewebmax.com</a> */}
// 			</div>
// 			<div className="twm-right-content">
// 				<div className="twm-jobs-category green">
// 					<span className="twm-bg-brown">Intership</span>
// 				</div>
// 				<div className="twm-jobs-amount">
// 					$1500 <span>/ Month</span>
// 				</div>
// 				<NavLink
// 					to={publicUser.jobs.DETAIL1}
// 					className="twm-jobs-browse site-text-primary"
// 				>
// 					Browse Job
// 				</NavLink>
// 			</div>
// 		</div>
// 	</li>
// 	<li>
// 		<div className="twm-jobs-list-style1 mb-5">
// 			<div className="twm-media">
// 				<JobZImage src="images/jobs-company/pic3.jpg" alt="#" />
// 			</div>
// 			<div className="twm-mid-content">
// 				<NavLink to={publicUser.jobs.DETAIL1} className="twm-job-title">
// 					<h4 className="twm-job-title">
// 						IT Department Manager
// 						<span className="twm-job-post-duration"> / 6 Month ago</span>
// 					</h4>
// 				</NavLink>
// 				<p className="twm-job-address">
// 					1363-1385 Sunset Blvd Los Angeles, CA 90026, USA
// 				</p>
// 				{/* <a href="https://themeforest.net/user/thewebmax/portfolio" className="twm-job-websites site-text-primary">https://thewebmax.com</a> */}
// 			</div>
// 			<div className="twm-right-content">
// 				<div className="twm-jobs-category green">
// 					<span className="twm-bg-purple">Fulltime</span>
// 				</div>
// 				<div className="twm-jobs-amount">
// 					$2500 <span>/ Month</span>
// 				</div>
// 				<NavLink
// 					to={publicUser.jobs.DETAIL1}
// 					className="twm-jobs-browse site-text-primary"
// 				>
// 					Browse Job
// 				</NavLink>
// 			</div>
// 		</div>
// 	</li>
// 	<li>
// 		<div className="twm-jobs-list-style1 mb-5">
// 			<div className="twm-media">
// 				<JobZImage src="images/jobs-company/pic4.jpg" alt="#" />
// 			</div>
// 			<div className="twm-mid-content">
// 				<NavLink to={publicUser.jobs.DETAIL1} className="twm-job-title">
// 					<h4 className="twm-job-title">
// 						Art Production Specialist{" "}
// 						<span className="twm-job-post-duration">/ 2 days ago</span>
// 					</h4>
// 				</NavLink>
// 				<p className="twm-job-address">
// 					1363-1385 Sunset Blvd Los Angeles, CA 90026, USA
// 				</p>
// 				{/* <a href="https://themeforest.net/user/thewebmax/portfolio" className="twm-job-websites site-text-primary">https://thewebmax.com</a> */}
// 			</div>
// 			<div className="twm-right-content">
// 				<div className="twm-jobs-category green">
// 					<span className="twm-bg-sky">Freelancer</span>
// 				</div>
// 				<div className="twm-jobs-amount">
// 					$3000 <span>/ Month</span>
// 				</div>
// 				<NavLink
// 					to={publicUser.jobs.DETAIL1}
// 					className="twm-jobs-browse site-text-primary"
// 				>
// 					Browse Job
// 				</NavLink>
// 			</div>
// 		</div>
// 	</li>
// 	<li>
// 		<div className="twm-jobs-list-style1 mb-5">
// 			<div className="twm-media">
// 				<JobZImage src="images/jobs-company/pic1.jpg" alt="#" />
// 			</div>
// 			<div className="twm-mid-content">
// 				<NavLink to={publicUser.jobs.DETAIL1} className="twm-job-title">
// 					<h4>
// 						Senior Web Designer
// 						<span className="twm-job-post-duration">/ 1 days ago</span>
// 					</h4>
// 				</NavLink>
// 				<p className="twm-job-address">
// 					1363-1385 Sunset Blvd Los Angeles, CA 90026, USA
// 				</p>
// 				{/* <a href="https://themeforest.net/user/thewebmax/portfolio" className="twm-job-websites site-text-primary">https://thewebmax.com</a> */}
// 			</div>
// 			<div className="twm-right-content">
// 				<div className="twm-jobs-category green">
// 					<span className="twm-bg-green">New</span>
// 				</div>
// 				<div className="twm-jobs-amount">
// 					$2000 <span>/ Month</span>
// 				</div>
// 				<NavLink
// 					to={publicUser.jobs.DETAIL1}
// 					className="twm-jobs-browse site-text-primary"
// 				>
// 					Browse Job
// 				</NavLink>
// 			</div>
// 		</div>
// 	</li>
// 	<li>
// 		<div className="twm-jobs-list-style1 mb-5">
// 			<div className="twm-media">
// 				<JobZImage src="images/jobs-company/pic2.jpg" alt="#" />
// 			</div>
// 			<div className="twm-mid-content">
// 				<NavLink to={publicUser.jobs.DETAIL1} className="twm-job-title">
// 					<h4>
// 						Sr. Rolling Stock Technician
// 						<span className="twm-job-post-duration">/ 15 days ago</span>
// 					</h4>
// 				</NavLink>
// 				<p className="twm-job-address">
// 					1363-1385 Sunset Blvd Los Angeles, CA 90026, USA
// 				</p>
// 				{/* <a href="https://themeforest.net/user/thewebmax/portfolio" className="twm-job-websites site-text-primary">https://thewebmax.com</a> */}
// 			</div>
// 			<div className="twm-right-content">
// 				<div className="twm-jobs-category green">
// 					<span className="twm-bg-brown">Intership</span>
// 				</div>
// 				<div className="twm-jobs-amount">
// 					$2000 <span>/ Month</span>
// 				</div>
// 				<NavLink
// 					to={publicUser.jobs.DETAIL1}
// 					className="twm-jobs-browse site-text-primary"
// 				>
// 					Browse Job
// 				</NavLink>
// 			</div>
// 		</div>
// 	</li>
// 	<li>
// 		<div className="twm-jobs-list-style1 mb-5">
// 			<div className="twm-media">
// 				<JobZImage src="images/jobs-company/pic3.jpg" alt="#" />
// 			</div>
// 			<div className="twm-mid-content">
// 				<NavLink to={publicUser.jobs.DETAIL1} className="twm-job-title">
// 					<h4 className="twm-job-title">
// 						IT Department Manager
// 						<span className="twm-job-post-duration"> / 6 Month ago</span>
// 					</h4>
// 				</NavLink>
// 				<p className="twm-job-address">
// 					1363-1385 Sunset Blvd Los Angeles, CA 90026, USA
// 				</p>
// 				{/* <a href="https://themeforest.net/user/thewebmax/portfolio" className="twm-job-websites site-text-primary">https://thewebmax.com</a> */}
// 			</div>
// 			<div className="twm-right-content">
// 				<div className="twm-jobs-category green">
// 					<span className="twm-bg-purple">Fulltime</span>
// 				</div>
// 				<div className="twm-jobs-amount">
// 					$1800 <span>/ Month</span>
// 				</div>
// 				<NavLink
// 					to={publicUser.jobs.DETAIL1}
// 					className="twm-jobs-browse site-text-primary"
// 				>
// 					Browse Job
// 				</NavLink>
// 			</div>
// 		</div>
// 	</li>
// 	<li>
// 		<div className="twm-jobs-list-style1 mb-5">
// 			<div className="twm-media">
// 				<JobZImage src="images/jobs-company/pic4.jpg" alt="#" />
// 			</div>
// 			<div className="twm-mid-content">
// 				<NavLink to={publicUser.jobs.DETAIL1} className="twm-job-title">
// 					<h4 className="twm-job-title">
// 						Art Production Specialist{" "}
// 						<span className="twm-job-post-duration">/ 2 days ago</span>
// 					</h4>
// 				</NavLink>
// 				<p className="twm-job-address">
// 					1363-1385 Sunset Blvd Los Angeles, CA 90026, USA
// 				</p>
// 				{/* <a href="https://themeforest.net/user/thewebmax/portfolio" className="twm-job-websites site-text-primary">https://thewebmax.com</a> */}
// 			</div>
// 			<div className="twm-right-content">
// 				<div className="twm-jobs-category green">
// 					<span className="twm-bg-sky">Freelancer</span>
// 				</div>
// 				<div className="twm-jobs-amount">
// 					$1000 <span>/ Month</span>
// 				</div>
// 				<NavLink
// 					to={publicUser.jobs.DETAIL1}
// 					className="twm-jobs-browse site-text-primary"
// 				>
// 					Browse Job
// 				</NavLink>
// 			</div>
// 		</div>
// 	</li>
// 	<li>
// 		<div className="twm-jobs-list-style1 mb-5">
// 			<div className="twm-media">
// 				<JobZImage src="images/jobs-company/pic5.jpg" alt="#" />
// 			</div>
// 			<div className="twm-mid-content">
// 				<NavLink to={publicUser.jobs.DETAIL1} className="twm-job-title">
// 					<h4 className="twm-job-title">
// 						Recreation &amp; Fitness Worker{" "}
// 						<span className="twm-job-post-duration">/ 1 days ago</span>
// 					</h4>
// 				</NavLink>
// 				<p className="twm-job-address">
// 					1363-1385 Sunset Blvd Los Angeles, CA 90026, USA
// 				</p>
// 				{/* <a href="https://themeforest.net/user/thewebmax/portfolio" className="twm-job-websites site-text-primary">https://thewebmax.com</a> */}
// 			</div>
// 			<div className="twm-right-content">
// 				<div className="twm-jobs-category green">
// 					<span className="twm-bg-golden">Temporary</span>
// 				</div>
// 				<div className="twm-jobs-amount">
// 					$1000 <span>/ Month</span>
// 				</div>
// 				<NavLink
// 					to={publicUser.jobs.DETAIL1}
// 					className="twm-jobs-browse site-text-primary"
// 				>
// 					Browse Job
// 				</NavLink>
// 			</div>
// 		</div>
// 	</li>
// 	<li>
// 		<div className="twm-jobs-list-style1 mb-5">
// 			<div className="twm-media">
// 				<JobZImage src="images/jobs-company/pic1.jpg" alt="#" />
// 			</div>
// 			<div className="twm-mid-content">
// 				<NavLink to={publicUser.jobs.DETAIL1} className="twm-job-title">
// 					<h4>
// 						Senior Web Designer
// 						<span className="twm-job-post-duration">/ 1 days ago</span>
// 					</h4>
// 				</NavLink>
// 				<p className="twm-job-address">
// 					1363-1385 Sunset Blvd Los Angeles, CA 90026, USA
// 				</p>
// 				{/* <a href="https://themeforest.net/user/thewebmax/portfolio" className="twm-job-websites site-text-primary">https://thewebmax.com</a> */}
// 			</div>
// 			<div className="twm-right-content">
// 				<div className="twm-jobs-category green">
// 					<span className="twm-bg-green">New</span>
// 				</div>
// 				<div className="twm-jobs-amount">
// 					$1000 <span>/ Month</span>
// 				</div>
// 				<NavLink
// 					to={publicUser.jobs.DETAIL1}
// 					className="twm-jobs-browse site-text-primary"
// 				>
// 					Browse Job
// 				</NavLink>
// 			</div>
// 		</div>
// 	</li>
// 	<li>
// 		<div className="twm-jobs-list-style1 mb-5">
// 			<div className="twm-media">
// 				<JobZImage src="images/jobs-company/pic2.jpg" alt="#" />
// 			</div>
// 			<div className="twm-mid-content">
// 				<NavLink to={publicUser.jobs.DETAIL1} className="twm-job-title">
// 					<h4>
// 						Sr. Rolling Stock Technician
// 						<span className="twm-job-post-duration">/ 15 days ago</span>
// 					</h4>
// 				</NavLink>
// 				<p className="twm-job-address">
// 					1363-1385 Sunset Blvd Los Angeles, CA 90026, USA
// 				</p>
// 				{/* <a href="https://themeforest.net/user/thewebmax/portfolio" className="twm-job-websites site-text-primary">https://thewebmax.com</a> */}
// 			</div>
// 			<div className="twm-right-content">
// 				<div className="twm-jobs-category green">
// 					<span className="twm-bg-brown">Intership</span>
// 				</div>
// 				<div className="twm-jobs-amount">
// 					$1000 <span>/ Month</span>
// 				</div>
// 				<NavLink
// 					to={publicUser.jobs.DETAIL1}
// 					className="twm-jobs-browse site-text-primary"
// 				>
// 					Browse Job
// 				</NavLink>
// 			</div>
// 		</div>
// 	</li>
// 	<li>
// 		<div className="twm-jobs-list-style1 mb-5">
// 			<div className="twm-media">
// 				<JobZImage src="images/jobs-company/pic3.jpg" alt="#" />
// 			</div>
// 			<div className="twm-mid-content">
// 				<NavLink to={publicUser.jobs.DETAIL1} className="twm-job-title">
// 					<h4 className="twm-job-title">
// 						IT Department Manager
// 						<span className="twm-job-post-duration"> / 6 Month ago</span>
// 					</h4>
// 				</NavLink>
// 				<p className="twm-job-address">
// 					1363-1385 Sunset Blvd Los Angeles, CA 90026, USA
// 				</p>
// 				{/* <a href="https://themeforest.net/user/thewebmax/portfolio" className="twm-job-websites site-text-primary">https://thewebmax.com</a> */}
// 			</div>
// 			<div className="twm-right-content">
// 				<div className="twm-jobs-category green">
// 					<span className="twm-bg-purple">Fulltime</span>
// 				</div>
// 				<div className="twm-jobs-amount">
// 					$1000 <span>/ Month</span>
// 				</div>
// 				<NavLink
// 					to={publicUser.jobs.DETAIL1}
// 					className="twm-jobs-browse site-text-primary"
// 				>
// 					Browse Job
// 				</NavLink>
// 			</div>
// 		</div>
// 	</li>
// 	<li>
// 		<div className="twm-jobs-list-style1 mb-5">
// 			<div className="twm-media">
// 				<JobZImage src="images/jobs-company/pic4.jpg" alt="#" />
// 			</div>
// 			<div className="twm-mid-content">
// 				<NavLink to={publicUser.jobs.DETAIL1} className="twm-job-title">
// 					<h4 className="twm-job-title">
// 						Art Production Specialist{" "}
// 						<span className="twm-job-post-duration">/ 2 days ago</span>
// 					</h4>
// 				</NavLink>
// 				<p className="twm-job-address">
// 					1363-1385 Sunset Blvd Los Angeles, CA 90026, USA
// 				</p>
// 				{/* <a href="https://themeforest.net/user/thewebmax/portfolio" className="twm-job-websites site-text-primary">https://thewebmax.com</a> */}
// 			</div>
// 			<div className="twm-right-content">
// 				<div className="twm-jobs-category green">
// 					<span className="twm-bg-sky">Freelancer</span>
// 				</div>
// 				<div className="twm-jobs-amount">
// 					$1000 <span>/ Month</span>
// 				</div>
// 				<NavLink
// 					to={publicUser.jobs.DETAIL1}
// 					className="twm-jobs-browse site-text-primary"
// 				>
// 					Browse Job
// 				</NavLink>
// 			</div>
// 		</div>
// 	</li>
// </ul>;

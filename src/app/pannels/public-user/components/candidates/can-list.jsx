// import { NavLink } from "react-router-dom";
// import { publicUser } from "../../../../../globals/route-names";
// import JobZImage from "../../../../common/jobz-img";

import SectionPagination from "../../sections/common/section-pagination";
import SectionRecordsFilter from "../../sections/common/section-records-filter";
import SectionJobsSidebar1 from "../../sections/jobs/sidebar/section-jobs-sidebar1";
import { useContext, useEffect, useState } from "react";
import { loadScript } from "../../../../../globals/constants";
import { ProfileApiData } from "../../../../context/user-profile/profileContextApi";
import CandidateCard from "./candidate-card";
// import { SkillsApiData } from "../../../../context/skills/skillsContextApi";

function CandidateListPage() {
  const { allUsersProfile } = useContext(ProfileApiData);
 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 
  const totalItems = allUsersProfile.length;

  const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
  };

  const getPaginatedItems = () => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      return allUsersProfile.slice(startIndex, endIndex);

  };

  const paginatedItems = getPaginatedItems();

  const _filterConfig = {
    prefix: "Showing",
    type: "Candidates",
    total: allUsersProfile.length,
    showRange: false,
    showingUpto: "",
  };

  useEffect(() => {
    loadScript("js/custom.js");
  });

  if (totalItems=== 0) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="section-full p-t120  p-b90 site-bg-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-12 rightSidebar">
              <SectionJobsSidebar1 />
            </div>
            <div className="col-lg-8 col-md-12">
              {/*Filter Short By*/}
              <SectionRecordsFilter _config={_filterConfig} />

              <div className="twm-candidates-list-wrap">
                <>
                  <ul>
                    {allUsersProfile.length === 0 ? (
                      <p>No User Found.</p>
                    ) : (
                      paginatedItems.map((user) => {
                        return <CandidateCard key={user._id} data={user} />;
                      })
                    )}

                  </ul>
                </>
              </div>

              {/* <SectionPagination /> */}
              {totalItems > itemsPerPage && (
                <div>
                    <SectionPagination
                        currentPage={currentPage}
                        totalItems={totalItems}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                    />
                    
                </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CandidateListPage;

// <ul>
// 	<li>
// 		<NavLink
// 			to={publicUser.candidate.DETAIL1}
// 			className="twm-candidates-list-style1 mb-5"
// 		>
// 			<div className="twm-media">
// 				<div className="twm-media-pic">
// 					<JobZImage
// 						src="images/candidates/pic1.jpg"
// 						alt="#"
// 					/>
// 				</div>
// 			</div>

// 			<div className="twm-mid-content">
// 				<h4 className="twm-job-title">Wanda Montgomery </h4>

// 				<div className="twm-can-sec-one">
// 					<p>Charted Accountant</p>
// 					<p className="twm-candidate-address">
// 						<i className="feather-map-pin" /> Ghana
// 					</p>
// 				</div>
// 				<ul className="twm-can-pro-info">
// 					<li className="pro-info-lists">
// 						<div className="">
// 							<MdOutlineStarRate size={20} color="red" />
// 							<MdOutlineStarRate size={20} color="red" />
// 							<MdOutlineStarRate size={20} color="red" />
// 							<MdOutlineStarRate size={20} color="red" />
// 						</div>

// 						<span>5.0</span>
// 					</li>
// 					<li className="pro-info-lists">
// 						<LuMessageSquare size={20} color="brown" />
// 						<span>300</span>
// 					</li>
// 					<li className="pro-info-lists">
// 						<FaCediSign size={20} color="green" />
// 						<span>10.0</span>
// 					</li>
// 					<li className="pro-info-lists">
// 						<MdDonutLarge size={20} color="blue" />
// 						<span>100%</span>
// 					</li>
// 					<li className="pro-info-lists">
// 						<span className="twm-candidates-tag-rate">
// 							₵20
// 						</span>
// 						/ per hour
// 					</li>
// 				</ul>

// 				<div className="twm-fot-content">
// 					<div className="twm-left-info sec-pro-desc">
// 						<p className="twm-exp-profile fs-6">
// 							I am a Chartered Accountant specializing in
// 							financial reporting, tax planning, auditing, and
// 							budgeting. With expertise in IFRS and GAAP, I
// 							provide accurate and reliable services to
// 							businesses across various industries, ensuring
// 							their financial success.
// 						</p>

// 						<ul className="twm-can-pro-info">
// 							<li>Graphic design</li>
// 							<li>Internet marketing</li>
// 							<li>SEO</li>
// 							<li>Java</li>
// 						</ul>
// 						{/* <div className="twm-jobs-vacancies">
// 							₵20<span>/ Day</span>
// 						</div> */}
// 						<div className="twm-right-btn view-btn">
// 							<p className="twm-view-prifile site-text-primary">
// 								View Profile
// 							</p>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</NavLink>
// 	</li>

// 	<li>
// 		<div className="twm-candidates-list-style1 mb-5">
// 			<div className="twm-media">
// 				<div className="twm-media-pic">
// 					<JobZImage
// 						src="images/candidates/pic2.jpg"
// 						alt="#"
// 					/>
// 				</div>
// 				<div className="twm-candidates-tag">
// 					<span>Featured</span>
// 				</div>
// 			</div>
// 			<div className="twm-mid-content">
// 				<NavLink
// 					to={publicUser.candidate.DETAIL1}
// 					className="twm-job-title"
// 				>
// 					<h4>Peter Hawkins</h4>
// 				</NavLink>
// 				<p>Medical Professed</p>
// 				<div className="twm-fot-content">
// 					<div className="twm-left-info">
// 						<p className="twm-candidate-address">
// 							<i className="feather-map-pin" />
// 							New York
// 						</p>
// 						<div className="twm-jobs-vacancies">
// 							$7<span>/ Hour</span>
// 						</div>
// 					</div>
// 					<div className="twm-right-btn">
// 						<NavLink
// 							to={publicUser.candidate.DETAIL1}
// 							className="twm-view-prifile site-text-primary"
// 						>
// 							View Profile
// 						</NavLink>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	</li>
// 	<li>
// 		<div className="twm-candidates-list-style1 mb-5">
// 			<div className="twm-media">
// 				<div className="twm-media-pic">
// 					<JobZImage
// 						src="images/candidates/pic3.jpg"
// 						alt="#"
// 					/>
// 				</div>
// 				<div className="twm-candidates-tag">
// 					<span>Featured</span>
// 				</div>
// 			</div>
// 			<div className="twm-mid-content">
// 				<NavLink
// 					to={publicUser.candidate.DETAIL1}
// 					className="twm-job-title"
// 				>
// 					<h4>Ralph Johnson</h4>
// 				</NavLink>
// 				<p>Bank Manger</p>
// 				<div className="twm-fot-content">
// 					<div className="twm-left-info">
// 						<p className="twm-candidate-address">
// 							<i className="feather-map-pin" />
// 							New York
// 						</p>
// 						<div className="twm-jobs-vacancies">
// 							$180<span>/ Day</span>
// 						</div>
// 					</div>
// 					<div className="twm-right-btn">
// 						<NavLink
// 							to={publicUser.candidate.DETAIL1}
// 							className="twm-view-prifile site-text-primary"
// 						>
// 							View Profile
// 						</NavLink>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	</li>
// 	<li>
// 		<div className="twm-candidates-list-style1 mb-5">
// 			<div className="twm-media">
// 				<div className="twm-media-pic">
// 					<JobZImage
// 						src="images/candidates/pic4.jpg"
// 						alt="#"
// 					/>
// 				</div>
// 				<div className="twm-candidates-tag">
// 					<span>Featured</span>
// 				</div>
// 			</div>
// 			<div className="twm-mid-content">
// 				<NavLink
// 					to={publicUser.candidate.DETAIL1}
// 					className="twm-job-title"
// 				>
// 					<h4>Randall Henderson </h4>
// 				</NavLink>
// 				<p>IT Contractor</p>
// 				<div className="twm-fot-content">
// 					<div className="twm-left-info">
// 						<p className="twm-candidate-address">
// 							<i className="feather-map-pin" />
// 							New York
// 						</p>
// 						<div className="twm-jobs-vacancies">
// 							$90<span>/ Week</span>
// 						</div>
// 					</div>
// 					<div className="twm-right-btn">
// 						<NavLink
// 							to={publicUser.candidate.DETAIL1}
// 							className="twm-view-prifile site-text-primary"
// 						>
// 							View Profile
// 						</NavLink>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	</li>
// 	<li>
// 		<div className="twm-candidates-list-style1 mb-5">
// 			<div className="twm-media">
// 				<div className="twm-media-pic">
// 					<JobZImage
// 						src="images/candidates/pic5.jpg"
// 						alt="#"
// 					/>
// 				</div>
// 				<div className="twm-candidates-tag">
// 					<span>Featured</span>
// 				</div>
// 			</div>
// 			<div className="twm-mid-content">
// 				<NavLink
// 					to={publicUser.candidate.DETAIL1}
// 					className="twm-job-title"
// 				>
// 					<h4>Randall Warren</h4>
// 				</NavLink>
// 				<p>Digital &amp; Creative</p>
// 				<div className="twm-fot-content">
// 					<div className="twm-left-info">
// 						<p className="twm-candidate-address">
// 							<i className="feather-map-pin" />
// 							New York
// 						</p>
// 						<div className="twm-jobs-vacancies">
// 							$95<span>/ Day</span>
// 						</div>
// 					</div>
// 					<div className="twm-right-btn">
// 						<NavLink
// 							to={publicUser.candidate.DETAIL1}
// 							className="twm-view-prifile site-text-primary"
// 						>
// 							View Profile
// 						</NavLink>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	</li>
// 	<li>
// 		<div className="twm-candidates-list-style1 mb-5">
// 			<div className="twm-media">
// 				<div className="twm-media-pic">
// 					<JobZImage
// 						src="images/candidates/pic6.jpg"
// 						alt="#"
// 					/>
// 				</div>
// 				<div className="twm-candidates-tag">
// 					<span>Featured</span>
// 				</div>
// 			</div>
// 			<div className="twm-mid-content">
// 				<NavLink
// 					to={publicUser.candidate.DETAIL1}
// 					className="twm-job-title"
// 				>
// 					<h4>Christina Fischer </h4>
// 				</NavLink>
// 				<p>Charity &amp; Voluntary</p>
// 				<div className="twm-fot-content">
// 					<div className="twm-left-info">
// 						<p className="twm-candidate-address">
// 							<i className="feather-map-pin" />
// 							New York
// 						</p>
// 						<div className="twm-jobs-vacancies">
// 							$19<span>/ Hour</span>
// 						</div>
// 					</div>
// 					<div className="twm-right-btn">
// 						<NavLink
// 							to={publicUser.candidate.DETAIL1}
// 							className="twm-view-prifile site-text-primary"
// 						>
// 							View Profile
// 						</NavLink>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	</li>
// 	<li>
// 		<div className="twm-candidates-list-style1 mb-5">
// 			<div className="twm-media">
// 				<div className="twm-media-pic">
// 					<JobZImage
// 						src="images/candidates/pic7.jpg"
// 						alt="#"
// 					/>
// 				</div>
// 				<div className="twm-candidates-tag">
// 					<span>Featured</span>
// 				</div>
// 			</div>
// 			<div className="twm-mid-content">
// 				<NavLink
// 					to={publicUser.candidate.DETAIL1}
// 					className="twm-job-title"
// 				>
// 					<h4>Wanda Willis </h4>
// 				</NavLink>
// 				<p>Marketing &amp; PR</p>
// 				<div className="twm-fot-content">
// 					<div className="twm-left-info">
// 						<p className="twm-candidate-address">
// 							<i className="feather-map-pin" />
// 							New York
// 						</p>
// 						<div className="twm-jobs-vacancies">
// 							$12<span>/ Day</span>
// 						</div>
// 					</div>
// 					<div className="twm-right-btn">
// 						<NavLink
// 							to={publicUser.candidate.DETAIL1}
// 							className="twm-view-prifile site-text-primary"
// 						>
// 							View Profile
// 						</NavLink>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	</li>
// 	<li>
// 		<div className="twm-candidates-list-style1 mb-5">
// 			<div className="twm-media">
// 				<div className="twm-media-pic">
// 					<JobZImage
// 						src="images/candidates/pic8.jpg"
// 						alt="#"
// 					/>
// 				</div>
// 				<div className="twm-candidates-tag">
// 					<span>Featured</span>
// 				</div>
// 			</div>
// 			<div className="twm-mid-content">
// 				<NavLink
// 					to={publicUser.candidate.DETAIL1}
// 					className="twm-job-title"
// 				>
// 					<h4>Peter Hawkins</h4>
// 				</NavLink>
// 				<p>Public Sector</p>
// 				<div className="twm-fot-content">
// 					<div className="twm-left-info">
// 						<p className="twm-candidate-address">
// 							<i className="feather-map-pin" />
// 							New York
// 						</p>
// 						<div className="twm-jobs-vacancies">
// 							$7<span>/ Hour</span>
// 						</div>
// 					</div>
// 					<div className="twm-right-btn">
// 						<NavLink
// 							to={publicUser.candidate.DETAIL1}
// 							className="twm-view-prifile site-text-primary"
// 						>
// 							View Profile
// 						</NavLink>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	</li>
// 	<li>
// 		<div className="twm-candidates-list-style1 mb-5">
// 			<div className="twm-media">
// 				<div className="twm-media-pic">
// 					<JobZImage
// 						src="images/candidates/pic9.jpg"
// 						alt="#"
// 					/>
// 				</div>
// 				<div className="twm-candidates-tag">
// 					<span>Featured</span>
// 				</div>
// 			</div>
// 			<div className="twm-mid-content">
// 				<NavLink
// 					to={publicUser.candidate.DETAIL1}
// 					className="twm-job-title"
// 				>
// 					<h4>Kathleen Moreno </h4>
// 				</NavLink>
// 				<p>Sales &amp; Marketing</p>
// 				<div className="twm-fot-content">
// 					<div className="twm-left-info">
// 						<p className="twm-candidate-address">
// 							<i className="feather-map-pin" />
// 							New York
// 						</p>
// 						<div className="twm-jobs-vacancies">
// 							$125<span>/ Week</span>
// 						</div>
// 					</div>
// 					<div className="twm-right-btn">
// 						<NavLink
// 							to={publicUser.candidate.DETAIL1}
// 							className="twm-view-prifile site-text-primary"
// 						>
// 							View Profile
// 						</NavLink>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	</li>
// </ul>;

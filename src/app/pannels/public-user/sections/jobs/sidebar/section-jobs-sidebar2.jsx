import { NavLink } from "react-router-dom";
import { publicUser } from "../../../../../../globals/route-names";
import SectionSideAdvert from "./section-side-advert";
import JobZImage from "../../../../../common/jobz-img";

function SectionJobsSidebar2({ _config = {}, showAdvert = true }) {
  // Prevent accessing undefined properties
  if (!_config) {
    return <p>Loading job details...</p>;
  }

  // Format date safely
  const formattedDate = _config?.start_date
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }).format(new Date(_config.start_date))
    : "N/A";

  // Parse skills_id safely
  let skillsArray = [];
  try {
    skillsArray = JSON.parse(_config?.skills_id || "[]"); // Default to empty array if parsing fails
    if (!Array.isArray(skillsArray)) {
      skillsArray = [];
    }
  } catch (error) {
    console.error("Error parsing skills:", error);
    skillsArray = [];
  }

  return (
    <>
      <div className="side-bar mb-4">
        <div className="twm-s-info2-wrap mb-5">
          <div className="twm-s-info2">
            <h4 className="section-head-small mb-4">Job Information</h4>
            <ul className="twm-job-hilites">
              <li>
                <i className="fas fa-calendar-alt" />
                <span className="twm-title">Date Posted</span>
                <p>{formattedDate}</p>
              </li>
              <li>
                <i className="fas fa-eye" />
                <span className="twm-title">8160 Views</span>
              </li>
              <li>
                <i className="fas fa-file-signature" />
                <span className="twm-title">6 Applicants</span>
              </li>
            </ul>
            <ul className="twm-job-hilites2">
              <li>
                <div className="twm-s-info-inner">
                  <i className="fas fa-calendar-alt" />
                  <span className="twm-title">Date Posted</span>
                  <div className="twm-s-info-discription">{formattedDate}</div>
                </div>
              </li>
              <li>
                <div className="twm-s-info-inner">
                  <i className="fas fa-map-marker-alt" />
                  <span className="twm-title">Location</span>
                  <div className="twm-s-info-discription">
                    {_config?.employer?.address || "N/A"}
                  </div>
                </div>
              </li>
              <li>
                <div className="twm-s-info-inner">
                  <i className="fas fa-user-tie" />
                  <span className="twm-title">Job Title</span>
                  <div className="twm-s-info-discription">
                    {_config?.job_title || "N/A"}
                  </div>
                </div>
              </li>
              <li>
                <div className="twm-s-info-inner">
                  <i className="fas fa-clock" />
                  <span className="twm-title">Experience</span>
                  <div className="twm-s-info-discription">
                    {_config?.experience || "N/A"}
                  </div>
                </div>
              </li>
              <li>
                <div className="twm-s-info-inner">
                  <i className="fas fa-suitcase" />
                  <span className="twm-title">Qualification</span>
                  <div className="twm-s-info-discription">
                    {_config?.qualification || "N/A"}
                  </div>
                </div>
              </li>
              <li>
                <div className="twm-s-info-inner">
                  <i className="fas fa-money-bill-wave" />
                  {_config?.salary ? (
                    <>
                      <span className="twm-title">Salary</span>
                      <div className="twm-s-info-discription">
                        ₵{_config.salary}
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="twm-title">Budget</span>
                      <div className="twm-s-info-discription">
                        ₵{_config?.budget || "N/A"}
                      </div>
                    </>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
        {/* Job Skills Section */}
        <div className="widget tw-sidebar-tags-wrap">
          <h4 className="section-head-small mb-4">Job Skills</h4>
          <div className="tagcloud">
            {skillsArray.length > 0 ? (
              skillsArray.map((skill, index) => (
                <a href="#" key={index}>
                  {skill}
                </a>
              ))
            ) : (
              <p>No skills listed</p>
            )}
          </div>
        </div>
      </div>

      {_config?.showJobInfo && (
        <div className="twm-s-info3-wrap mb-5">
          <div className="twm-s-info3">
            <div className="twm-s-info-logo-section">
              <div className="twm-media">
                <JobZImage
                  src="images/jobs-company/pic1.jpg"
                  alt="Company Logo"
                />
              </div>
              <h4 className="twm-title">Senior Web Designer , Developer</h4>
            </div>
            <ul>
              <li>
                <div className="twm-s-info-inner">
                  <i className="fas fa-building" />
                  <span className="twm-title">Company</span>
                  <div className="twm-s-info-discription">
                    Software Development
                  </div>
                </div>
              </li>
              <li>
                <div className="twm-s-info-inner">
                  <i className="fas fa-mobile-alt" />
                  <span className="twm-title">Phone</span>
                  <div className="twm-s-info-discription">+233 560 564561</div>
                </div>
              </li>
              <li>
                <div className="twm-s-info-inner">
                  <i className="fas fa-at" />
                  <span className="twm-title">Email</span>
                  <div className="twm-s-info-discription">
                    thewebmaxdemo@gmail.com
                  </div>
                </div>
              </li>
              <li>
                <div className="twm-s-info-inner">
                  <i className="fas fa-desktop" />
                  <span className="twm-title">Website</span>
                  <div className="twm-s-info-discription">
                    https://themeforest.net
                  </div>
                </div>
              </li>
              <li>
                <div className="twm-s-info-inner">
                  <i className="fas fa-map-marker-alt" />
                  <span className="twm-title">Address</span>
                  <div className="twm-s-info-discription">
                    Independence Avenue No. 10, Accra, Greater Accra Region,
                    Ghana
                  </div>
                </div>
              </li>
            </ul>
            <NavLink to={publicUser.pages.ABOUT} className="site-button">
              View Profile
            </NavLink>
          </div>
        </div>
      )}

      {/* Advert Section */}
      {showAdvert ? (
        <SectionSideAdvert
          title="Claim Your Dream Job"
          description="Stand out from the crowd—apply now and showcase your skills"
          link={`${publicUser.jobs.APPLY}`}
          action="Bid Now"
        />
      ) : null}
    </>
  );
}

export default SectionJobsSidebar2;

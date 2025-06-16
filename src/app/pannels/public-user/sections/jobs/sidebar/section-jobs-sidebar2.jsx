import { useEffect } from "react";
import { publicUser } from "../../../../../../globals/route-names";
import SectionSideAdvert from "./section-side-advert";

function SectionJobsSidebar2({ _config, showAdvert = true }) {
  // Debug mount/unmount
  useEffect(() => {
    console.log("Sidebar mounted");
    return () => {
      console.log("Sidebar unmounted");
    };
  }, []);

  // Prevent rendering if config is not ready
  if (!_config || Object.keys(_config).length === 0) {
    return <p>Loading job details...</p>;
  }

  // Format date safely
  const formattedDate = _config?.created_at
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }).format(new Date(_config.created_at))
    : "N/A";

  // Convert skills string to array
  let skillsArray = [];
  try {
    if (typeof _config.skills === "string") {
      skillsArray = _config.skills.split(",").map((s) => s.trim());
    } else if (Array.isArray(_config.skills)) {
      skillsArray = _config.skills;
    }
  } catch (error) {
    console.error("Error parsing skills:", error);
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
                <i className="fas fa-book" />
                <span className="twm-title">Job Type</span>
                <p>{_config.job_type}</p>
              </li>
            </ul>

            <ul className="twm-job-hilites2">
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
                    {_config?.title || "N/A"}
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
                  {_config?.fixed_rate ? (
                    <>
                      <span className="twm-title">Salary</span>
                      <div className="twm-s-info-discription">
                        ₵{_config.fixed_rate}
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="twm-title">Hourly Rate</span>
                      <div className="twm-s-info-discription">
                        ₵{_config?.hourly_rate_start || 0} - ₵{_config?.hourly_rate_end || 0}
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
              skillsArray.map((skill) => (
                <a href="#" key={skill}>
                  {skill}
                </a>
              ))
            ) : (
              <p>No skills listed</p>
            )}
          </div>
        </div>
      </div>

      {/* Advert Section */}
      {showAdvert && (
        <SectionSideAdvert
          title="Claim Your Dream Job"
          description="Stand out from the crowd—apply now and showcase your skills"
          link={publicUser.jobs.APPLY}
          action="Bid Now"
        />
      )}
    </>
  );
}

export default SectionJobsSidebar2;

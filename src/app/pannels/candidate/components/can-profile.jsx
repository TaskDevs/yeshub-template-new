import { MdOutlineEdit } from "react-icons/md";
import SectionCandicateBasicInfo from "../sections/profile/section-can-basic-info";
import { FaRegTrashCan } from "react-icons/fa6";
import { useContext, useEffect, useState } from "react";
import { ProfileApiData } from "../../../context/user-profile/profileContextApi";
import SectionProfileData from "../common/section-profile-data";
import YesNoPopup from "../../../common/popups/popup-yes-no";
import { popupType, userId } from "../../../../globals/constants";
import { SkillsApiData } from "../../../context/skills/skillsContextApi";
import FreelancePopup from "../../../common/popups/popup-freelance";
import SectionFreelancerInfo from "../common/section-freelacer-info";
import { FreelanceApiData } from "../../../context/freelance/freelanceContextApi";
import { EducationApiData } from "../../../context/education/educationContextApi";
import { PortfolioApiData } from "../../../context/portfolio/portfolioContextApi";
import { GlobalApiData } from "../../../context/global/globalContextApi";


const sections = [
  "Education", "Portfolio", "Portfolio Media"
]


function CanProfilePage() {
  const {
    imageURL,
    handleSubmitProfile,
    handleUpdateProfile,
    handleImageChange,
    profileData,
    setFormData,
    setSelectedItems,
  } = useContext(ProfileApiData);

  const { skillOptions } = useContext(SkillsApiData);
  const {
    handleSubmit,
    freelanceProfileData,
    handleUpdateFreelanceProfile,
    handleEditFreelance,
    handleAddClick
  } = useContext(FreelanceApiData);

  const [imgSrc, setImgSrc] = useState(
    `https://yeshub-api-v2-fd6c52bb29a5.herokuapp.com/${profileData?.profile_image}`
  );
  const { processEducationEducation } = useContext(EducationApiData);
  const { processGetAllPortfolio } = useContext(PortfolioApiData);
  const { setIsLoading, isLoading } = useContext(GlobalApiData)
  const [progress, setProgress] = useState(0);

  // console.log("profileData-profile", profileData);

  const handleEditClick = () => {
    if (!skillOptions || skillOptions.length === 0) {
      console.error("Skill options not loaded yet.");
      return;
    }

    const skillsArray = Array.isArray(profileData.skills_id)
      ? profileData.skills_id.map(String)
      : typeof profileData.skills_id === "string"
      ? profileData.skills_id.startsWith("[") &&
        profileData.skills_id.endsWith("]")
        ? JSON.parse(profileData.skills_id).map(String)
        : profileData.skills_id.split(",").map((id) => id.trim())
      : [];

    const selectedSkillObjects = skillsArray.map((id) => {
      const skill = skillOptions.find(
        (skill) => String(skill.id) === String(id)
      );
      if (skill) {
        return { value: skill.id, label: skill.name };
      } else {
        console.log("skill id: " + id + " not found in skill options.");
        return null;
      }
    });

    console.log("Raw selectedSkillObjects:", selectedSkillObjects);
    console.log(
      "Filtered selectedSkillObjects:",
      selectedSkillObjects.filter(
        (skill) => skill && skill.value !== undefined && skill.value !== null
      )
    );

    setFormData({
      firstname: profileData.firstname,
      lastname: profileData.lastname,
      telephone: profileData.telephone,
      country: profileData.country,
      gps_address: profileData.gps_address,
      postal_code: profileData.postal_code,
      address: profileData.address,
      region: profileData.region,
      experience: profileData.experience,
      profession: profileData.profession,
      bio: profileData.bio,
      skills_id: selectedSkillObjects
        .filter(
          (skill) => skill && skill.value !== undefined && skill.value !== null
        )
        .map((skill) => skill.value),
    });

    setSelectedItems(selectedSkillObjects);
  };

  const updateProgress = async () => {
    let filledSections = 0;
    setIsLoading(true); // Start loading
  
    try {
      // Check if profile data is already available
      if (profileData.id) filledSections++;
    // console.log("profileData-can-profile", profileData);

      // Check if education data is retrieved
      const educationData = await processEducationEducation(userId);
      if (educationData) filledSections++;

      const portfolioData = await processGetAllPortfolio(userId);
      
      if (portfolioData) filledSections++;
  
      // Check if portfolio data is retrieved
     
      if (portfolioData?.data?.data?.some((p) => p.media?.length > 0)) filledSections++;
      console.log("portfolioData-profile", portfolioData?.data.data)

      setProgress((filledSections / 4) * 100); // Assuming 4 sections to check
  
    } catch (error) {
      console.error("Error fetching data:", error);
      // Optionally handle the error (e.g., show a toast)
    } finally {
      setTimeout(() => {
        setIsLoading(false); 
      }, 2000)
      
    }
  };
   
  useEffect(() => {
    updateProgress();
  }, []);

  

  return (
    <>
    
      <div className="twm-right-section-panel site-bg-gray">
        <div className="">
          <div className="progress-bar-wrapper">
          <div
            style={{
              width: "100%",
              backgroundColor: "#e0e0e0",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                backgroundColor: "#287131",
                height: "20px",
                borderRadius:
                  progress === 100
                    ? "10px"
                    : progress > 0
                    ? "10px 0 0 10px"
                    : "10px 0 0 10px",
              }}
            />
          </div>
          </div>
         {isLoading ? "Loading..." : (
          <p>{progress}% completed</p>
         )} 

        {progress < 100 ? (
           <div >
           <div>Kindly complete the current section and click on these sections to complete them</div>
           <ul className="portfolio-lists">
           {sections.map((s, i) => (
             <li className="progress-bar-list" key={i}>
               <a href={`/dashboard-candidate/my-resume`} className="progress-bar-list">
           {s}
         </a>
             </li>
           ))}
             
           </ul>
           </div>
        ) : (null)}
       
        </div>

        <div className="wt-admin-right-page-header clearfix">
          <h2>User Profile!</h2>
          <div className="breadcrumbs">
            <a href="/">Home</a>

            <span>Profile</span>
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading wt-panel-heading p-a20">
            <h4 className="panel-tittle m-a0">Profile Picture</h4>
          </div>
          <div className="panel-body wt-panel-body p-a20 p-b0 m-b30 ">
            <div className="row">
              <div className="panel panel-default">
                <div className="panel-body wt-panel-body p-a20 p-b0 m-b30 ">
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <div className="form-group">
                        <div className="dashboard-profile-pic">
                          <div className="dashboard-profile-photo">
                            <img
                              src={imageURL || imgSrc}
                              alt="user picture"
                              onError={() =>
                                setImgSrc(
                                  "/assets/images/candidates/user-avatar-fallback.jpg"
                                )
                              }
                            />
                            <div className="upload-btn-wrapper">
                              <div id="upload-image-grid" />
                              <button className="site-button button-sm">
                                Upload Photo
                              </button>
                              <input
                                type="file"
                                name="profile_image"
                                id="file-uploader"
                                accept="/*"
                                onChange={handleImageChange}
                              />
                            </div>
                          </div>
                          <p>
                            <b>Profile picture :- </b> Max file size is 1MB,
                            Minimum dimension: 136 x 136 And Suitable files are
                            .jpg &amp; .png
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" panel panel-default m-b30 ">
          <div className=" p-a20 ">
            <div className="panel-heading wt-panel-heading p-a20 panel-heading-with-btn ">
              <h4 className="panel-tittle m-a0"> Profile</h4>

              <a
                data-bs-toggle="modal"
                href="#AddProfile"
                role="button"
                title="Add"
                className="site-text-primary"
              >
                <span className="fa fa-plus" /> <span>Add</span>
              </a>
            </div>

            <div className="panel-body wt-panel-body  ">
              <div className="twm-panel-inner">
                <SectionProfileData />
              </div>

              <div className="">
                {profileData.id && (
                  <div className="sec-actions-btn">
                    <button
                      className="site-button  actions-btn"
                      data-bs-target="#delete-profile"
                      data-bs-toggle="modal"
                      data-bs-dismiss="modal"
                    >
                      <FaRegTrashCan color="white" />
                      <span className="admin-nav-text">Delete</span>
                    </button>

                    <button
                      className="site-button  actions-btn "
                      data-bs-target="#EditProfile"
                      data-bs-toggle="modal"
                      data-bs-dismiss="modal"
                      onClick={() => {
                        handleEditClick();
                      }}
                    >
                      <MdOutlineEdit color="white" />
                      <span>Edit</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className=" panel panel-default m-b30 ">
          <div className=" p-a20 ">
            <div className="panel-heading wt-panel-heading p-a20 panel-heading-with-btn ">
              <h4 className="panel-tittle m-a0"> Become A Freelancer</h4>

              <a
                data-bs-toggle="modal"
                href="#AddFreelancerProfile"
                role="button"
                title="Add"
                className="site-text-primary"
                onClick={handleAddClick}
              >
                <span className="fa fa-plus" /> <span>Add</span>
              </a>
            </div>

            <div className="panel-body wt-panel-body  ">
              <div className="twm-panel-inner">
                {/* <FreelancePopup submit={} id="AddFreelancerProfile" /> */}
                <SectionFreelancerInfo />
              </div>

              <div className="">
                {/* freelanceProfileData?.id && ( */}
                {freelanceProfileData.length > 0 && (
                  <div className="sec-actions-btn">
                    <button
                      className="site-button  actions-btn"
                      data-bs-target="#delete-freelance"
                      data-bs-toggle="modal"
                      data-bs-dismiss="modal"
                    >
                      <FaRegTrashCan color="white" />
                      <span className="admin-nav-text">Delete</span>
                    </button>

                    <button
                      className="site-button  actions-btn "
                      data-bs-target="#EditFreelanceProfile"
                      data-bs-toggle="modal"
                      data-bs-dismiss="modal"
                      onClick={() => {
                        handleEditFreelance();
                      }}
                    >
                      <MdOutlineEdit color="white" />
                      <span>Edit</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <SectionCandicateBasicInfo
          submit={handleSubmitProfile}
          id="AddProfile"
        />

        <SectionCandicateBasicInfo
          submit={handleUpdateProfile}
          id="EditProfile"
        />
        <YesNoPopup
          id="delete-profile"
          type={popupType.DELETE_PROFILE}
          msg={"Are you sure you want to delete your profile?"}
        />

        <FreelancePopup submit={handleSubmit} id="AddFreelancerProfile" />
        <FreelancePopup
          submit={handleUpdateFreelanceProfile}
          id="EditFreelanceProfile"
        />
      </div>
      
    </>
  );
}

export default CanProfilePage;

/* <div className="twm-right-section-panel site-bg-gray">
					{/*Basic Information
					<SectionCandicateBasicInfo
						submit={handleSubmitProfile}
						id="AddProfile"
					/>
					<SectionCandicateBasicInfo
						submit={handleUpdateProfile}
						id="EditProfile"
					/>

					<div className="">
						<div className="actions">
							<button
								className="site-button  actions"
								data-bs-target="#delete-education"
								data-bs-toggle="modal"
								data-bs-dismiss="modal"
							>
								<FaRegTrashCan color="white" />
								<span className="admin-nav-text">Delete</span>
							</button>

							<button
								className="site-button  actions "
								data-bs-target="#EditProfile"
								data-bs-toggle="modal"
								data-bs-dismiss="modal"
								onClick={() => {
									handleUpdateProfile();
								}}
							>
								<MdOutlineEdit color="white" />
								<span>Edit</span>
							</button>
						</div>
					</div>

					{/*Social Network*/
/* <SectionCandidateSocialInfo /> *
				</div> */

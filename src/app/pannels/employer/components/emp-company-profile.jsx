import { useContext, useEffect, useState } from "react";
import JobZImage from "../../../common/jobz-img";
import { loadScript } from "../../../../globals/constants";
import { EmployerApiData } from "../../../context/employers/employerContextApi";
import SectionEditCompanyInfo from "../../candidate/sections/profile/section-edit-company-info";
import SectionCompanyBasicInfo from "../../candidate/sections/profile/section-company-basic-info";
import CompanyProfileData from "../../candidate/common/company-profile-data";
import formatImgUrl from "../../../../utils/formatImgUrl";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import { ProfileApiData } from "../../../context/user-profile/profileContextApi";
import { GlobalApiData } from "../../../context/global/globalContextApi";
import { baseURL } from "../../../../globals/constants";
import FormatUrl from "../../../../utils/formatUrl";
import { Avatar } from "primereact/avatar";

function EmpCompanyProfilePage() {
  const {
    processEmployerProfile,
    employerProfiles,
    processUpdateEmployerLogo,
    processUpdateEmployerBanner,
  } = useContext(EmployerApiData);
  const { isSubmitting } = useContext(GlobalApiData);
  const { handleSubmitProfile, handleEditClick } = useContext(ProfileApiData);
  const [imageURL, setImageURL] = useState(null);
  const [bannerURL, setBannerURL] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    loadScript("js/custom.js");
    processEmployerProfile();
  }, []);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        let logoFile = reader.result;
        setFormData({ id: employerProfiles?.id, logo: logoFile });
        setImageURL(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleBannerChange = (e) => {
    const selectedBanner = e.target.files[0];
    if (selectedBanner) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const bannerFile = event.target.result; // Correct way to get Base64
        setBannerURL(bannerFile); // Set preview URL correctly
        setFormData((prevData) => ({
          ...prevData,
          id: employerProfiles?.id,
          banner: bannerFile, // Store Base64 data in form state
        }));
      };
      reader.readAsDataURL(selectedBanner);
    }
  };

  const handleSubmitCompanyLogo = () => {
    console.log(formData);

    if (formData.logo) {
      processUpdateEmployerLogo(employerProfiles?.id, { logo: formData.logo });
    }

    if (formData.banner) {
      processUpdateEmployerBanner(employerProfiles?.id, {
        banner: formData.banner,
      });
    }
  };

  return (
    <>
      <div className="">
        <div className="wt-admin-right-page-header clearfix">
          <h2>Company Profile!</h2>
          <div className="breadcrumbs mb-3">
            <a href="/dashboard-employer">Home</a>
            {/* <a href="#">Dasboard</a> */}
            <span>Company Profile</span>
          </div>
          <div className="cabdidate-de-info">
            <div className="twm-job-self-wrap">
              <div className="twm-job-self-info">
                <div className="twm-job-self-top">
                  {/* Banner Section */}
                  <div
                    className="twm-media-bg pt-3"
                    style={{
                      background:
                        employerProfiles.banner || bannerURL
                          ? `url(${
                              bannerURL || employerProfiles.banner
                            }) center/cover no-repeat`
                          : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      height: "250px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {bannerURL || employerProfiles.banner ? (
                      <img
                        src={bannerURL || employerProfiles.banner}
                        alt="Company Banner"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <h2 style={{ color: "#fff", fontWeight: "bold" }}>
                        Welcome to Your Company&rsquo;s Profile
                      </h2>
                    )}
                  </div>

                  {/* Logo Section */}
                  <div
                    className="twm-mid-content"
                    style={{ textAlign: "center", marginTop: "-40px" }}
                  >
                    <div
                      className="twm-media"
                     
                    >
                       {!employerProfiles.logo ? (
                        imageURL ? (
                          <JobZImage
                            src={FormatUrl(baseURL) + formatImgUrl(imageURL)}
                            alt="Company Image"
                            style={{
                              width: "110px", 
                              height: "110px", 
                              fontSize: "80px", 

                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          />
                        ) : (
                          <Avatar
                            icon="pi pi-user"
                            size="xlarge"
                            shape="circle"
                            style={{
                              width: "110px", 
                              height: "110px", 
                              fontSize: "80px", 

                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          />
                        )
                      ) : (
                        <img src={employerProfiles.logo} alt="Company Logo" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" panel panel-default m-b30 ">
          {/* panel-heading wt-panel-heading p-a20 panel-heading-with-btn */}
          <div className=" p-a20 ">
            {/* <div className="panel-heading-with-btn"> */}
            <div className="panel-heading wt-panel-heading panel-heading-with-btn ">
              <h4 className="panel-tittle m-a0">Company Profile Details</h4>
              {!isSubmitting && (
                <a
                  data-bs-toggle="modal"
                  href="#AddProfile"
                  role="button"
                  title="Edit"
                  className="site-text-primary"
                >
                  <span className="fa fa-edit" />
                </a>
              )}
            </div>

            <div className="panel-body wt-panel-body  ">
              <div className="twm-panel-inner">
                <CompanyProfileData data={employerProfiles} />
              </div>

              {/* actions */}
              <div className="">
                <div className="actions">
                  <button
                    className="site-button actions"
                    data-bs-target="#delete-profile"
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
                      handleEditClick();
                    }}
                  >
                    <MdOutlineEdit color="white" />
                    <span>Edit</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*Logo and Cover image*/}
        <div className="panel panel-default">
          <div className="panel-heading wt-panel-heading p-a20">
            <h4 className="panel-tittle m-a0">Logo and Cover image</h4>
          </div>
          <div className="panel-body wt-panel-body p-a20 p-b0 m-b30 ">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="form-group">
                  <div className="dashboard-profile-pic">
                    <div className="dashboard-profile-photo">
                      {!employerProfiles.logo ? (
                        imageURL ? (
                          <JobZImage
                            src={FormatUrl(baseURL) + formatImgUrl(imageURL)}
                            alt="Company Image"
                          />
                        ) : (
                          <Avatar
                            icon="pi pi-user"
                            size="xlarge"
                            shape="circle"
                            style={{
                              width: "110px", // Adjust for larger avatar
                              height: "110px", // Adjust for larger avatar
                              fontSize: "80px", // Adjust icon size

                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          />
                        )
                      ) : (
                        <img src={employerProfiles.logo} alt="Company Logo" />
                      )}

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
                      <b>Company Logo :- </b> Max file size is 1MB, Minimum
                      dimension: 136 x 136 And Suitable files are .jpg &amp;
                      .png
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*BannerCover image*/}
        <div className="panel panel-default">
          <div className="panel-heading wt-panel-heading p-a20">
            <h4 className="panel-tittle m-a0">Banner Cover image</h4>
          </div>
          <div className="panel-body wt-panel-body p-a20 p-b0 m-b30 ">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="form-group">
                  <div className="dashboard-profile-pic">
                    <div className="dashboard-profile-photo">
                      {bannerURL ? ( // Use `bannerURL` directly
                        <img src={bannerURL} alt="Company Banner" />
                      ) : employerProfiles.banner ? (
                        <img
                        src={bannerURL || employerProfiles.banner}
                        alt="Company Banner"
                        
                      />
                      ) : (
                        <img
                        src={bannerURL || employerProfiles.banner}
                        alt="Company Banner"
                        
                      />
                      )}

                      <div className="upload-btn-wrapper">
                        <div id="upload-image-grid" />
                        <button className="site-button button-sm">
                          Upload Banner
                        </button>
                        <input
                          type="file"
                          name="profile_banner"
                          id="banner-uploader"
                          accept="/*"
                          onChange={handleBannerChange}
                        />
                      </div>
                    </div>
                    <p>
                      <b>Company Banner :- </b> Max file size is 1MB, Minimum
                      dimension: 869 x 350 And Suitable files are .jpg &amp;
                      .png
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <SectionCompanyBasicInfo
          data={employerProfiles}
          submit={handleSubmitProfile}
          id="AddProfile"
        />

        {employerProfiles && (
          <SectionEditCompanyInfo
            data={employerProfiles}
            submit={handleSubmitProfile}
            id="EditProfile"
          />
        )}

        {/*Photo gallery*/}
        <div className="panel panel-default">
          <div className="panel-heading wt-panel-heading p-a20">
            <h4 className="panel-tittle m-a0">Photo Gallery</h4>
          </div>
          <div className="panel-body wt-panel-body p-a20 m-b30 ">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="form-group">
                  {/* <DropzoneComponent config={componentConfig} /> */}
                </div>
              </div>
              <div className="col-lg-12 col-md-12">
                <div className="text-left">
                  <button
                    type="submit"
                    className="site-button"
                    onClick={handleSubmitCompanyLogo}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmpCompanyProfilePage;

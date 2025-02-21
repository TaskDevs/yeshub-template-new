import { useContext, useEffect, useState } from "react";
import JobZImage from "../../../common/jobz-img";
import { loadScript, popupType } from "../../../../globals/constants";
import { EmployerApiData } from "../../../context/employers/employerContextApi";
import { DropzoneComponent } from "react-dropzone-component";
import axios from "axios";
import { toast } from "react-toastify";
import SectionCandicateBasicInfo from "../../candidate/sections/profile/section-can-basic-info";
import SectionEditCompanyInfo from "../../candidate/sections/profile/section-edit-company-info";
import SectionCompanyBasicInfo from "../../candidate/sections/profile/section-company-basic-info";
import CompanyProfileData from "../../candidate/common/company-profile-data";
import formatImgUrl from "../../../../utils/formatImgUrl";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import { ProfileApiData } from "../../../context/user-profile/profileContextApi";
import SectionProfileData from "../../candidate/common/section-profile-data";
import YesNoPopup from "../../../common/popups/popup-yes-no";
import { GlobalApiData } from "../../../context/global/globalContextApi";
import { BACKEND_HOST, baseURL } from "../../../../globals/constants";
import FormatUrl from "../../../../utils/formatUrl";

function EmpCompanyProfilePage() {
  const {
    processEmployerProfile,
    employerProfiles,
    processUpdateEmployerLogo,
  } = useContext(EmployerApiData);
  const { isSubmitting } = useContext(GlobalApiData);
  const {
    handleSubmitProfile,
    handleUpdateProfile,
    handleEditClick,
    // handleImageChange,
  } = useContext(ProfileApiData);
  const [imageURL, setImageURL] = useState(null);
  const [formData, setFormData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileUpdated, setProfileUpdated] = useState(false);

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

  const handleSubmitCompanyLogo = () => {
    console.log(formData);
    processUpdateEmployerLogo(employerProfiles?.id, formData);
  };

  //   useEffect(() => {

  //   }, []);

  // if (!imageURL) {
  // 	return false;
  // }
  return (
    <>
      <div className="">
        <div className="wt-admin-right-page-header clearfix">
          <h2>Company Profile!</h2>
          <div className="breadcrumbs">
            <a href="/">Home</a>
            {/* <a href="#">Dasboard</a> */}
            <span>Company Profile</span>
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
                        <JobZImage
                          src={
                            FormatUrl(baseURL) + formatImgUrl(imageURL) || ""
                          }
                          alt=""
                        />
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

        <div className=" panel panel-default m-b30 ">
          {/* panel-heading wt-panel-heading p-a20 panel-heading-with-btn */}
          <div className=" p-a20 ">
            {/* <div className="panel-heading-with-btn"> */}
            <div className="panel-heading wt-panel-heading p-a20 panel-heading-with-btn ">
              <h4 className="panel-tittle m-a0"> Profile</h4>
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
                    className="site-button  actions"
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

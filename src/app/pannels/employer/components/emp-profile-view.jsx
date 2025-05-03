import { useContext, useEffect } from "react";
import { loadScript } from "../../../../globals/constants";
import { EmployerApiData } from "../../../context/employers/employerContextApi";
import SectionEditCompanyInfo from "../../candidate/sections/profile/section-edit-company-info";
import SectionCompanyBasicInfo from "../../candidate/sections/profile/section-company-basic-info";
import CompanyProfileData from "../../candidate/common/company-profile-data";
import { ProfileApiData } from "../../../context/user-profile/profileContextApi";

function EmpCompanyProfileView() {
  const { processGetCompanyInfo, employerProfiles, companyInfoData } =
    useContext(EmployerApiData);
  const { handleSubmitProfile } = useContext(ProfileApiData);

  useEffect(() => {
    loadScript("js/custom.js");
    processGetCompanyInfo(1);
  }, []);

  return (
    <>
      <div className="">
        <div className="wt-admin-right-page-header clearfix">
          <div className="cabdidate-de-info">
            <div className="twm-job-self-wrap">
              <div className="twm-job-self-info">
                <div className="twm-job-self-top">
                  {/* Banner Section */}
                  <div
                    className="twm-media-bg pt-3"
                    style={{
                      background: companyInfoData.banner
                        ? `url(${companyInfoData.banner}) center/cover no-repeat`
                        : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      height: "250px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "20px",
                    }}
                  ></div>

                  {/* Logo Section */}
                  <div
                    className="twm-mid-content"
                    style={{ textAlign: "center", marginTop: "-40px" }}
                  >
                    <div className="twm-media">
                      {companyInfoData.logo && (
                        <img src={companyInfoData.logo} alt="Company Logo" />
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
            </div>

            <div className="panel-body wt-panel-body">
              <div className="twm-panel-inner">
                <CompanyProfileData data={companyInfoData} />
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
                      {employerProfiles.logo && (
                        <img src={employerProfiles.logo} alt="Company Logo" />
                      )}
                    </div>
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
                      {employerProfiles.banner && (
                        <img
                          src={employerProfiles.banner}
                          alt="Company Banner"
                        />
                      )}
                    </div>
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
                <div className="form-group"></div>
              </div>
              <div className="col-lg-12 col-md-12"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmpCompanyProfileView;

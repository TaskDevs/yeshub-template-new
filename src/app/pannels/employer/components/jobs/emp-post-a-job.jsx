import { useEffect, useContext, useState } from "react";
import { POSTJOBFIELD } from "../../../../../globals/post-job-data";
import JobInputField from "../../../../common/job-input-field";
import JobSelectField from "../../../../common/job-select-field";
import JobMultiSelectField from "../../../../common/job-multi-select-field";
import { JobApiData } from "../../../../context/jobs/jobsContextApi";
// import { ProfileApiData } from "../../../../context/user-profile/profileContextApi";
import { SkillsApiData } from "../../../../context/skills/skillsContextApi";
import { ToastContainer } from "react-toastify";
import ReactQuill from "react-quill";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";

function EmpPostAJobPage() {
  const { processAddJob } = useContext(JobApiData);
  const userId= sessionStorage.getItem("user_id");
  // const { profileData } = useContext(ProfileApiData);
  const { skillOptions } = useContext(SkillsApiData);
  const [formData, setFormData] = useState({
    jobRoles: [],
  });

  useEffect(() => {
    console.log(skillOptions);
  }, [skillOptions]);

  const jobOptions = [
    { id: 1, name: "Developer" },
    { id: 2, name: "Designer" },
    { id: 3, name: "Manager" },
    { id: 4, name: "Tester" },
  ];

  const handleInputChange = (field, data) => {
    setFormData({
      ...formData,
      [field]: data,
    });
  };

  //   const handleChange = () => {
  //     console.log("Will be removed soon");
  //   };

  const handlePublishJob = () => {
    //console.log(formData);
    formData.user_id = userId;
    formData.employer_id =userId; //dummy employer_id
    formData.status = 1; //dummy status
    formData.skills_id = 6;

    processAddJob(formData);
  };

  const handleSaveDraft = () => {
    //console.log(formData);
    formData.user_id = 3; //dummy user_id
    formData.employer_id = 5; //dummy employer_id
    formData.status = 1; //dummy status
    formData.skills_id = 6;

    processAddJob(formData);
  };

  // const handleClose = () => {
  //   console.log("We move");
  // };

  // const handlePostAJob = async (e) => {
  //   e.preventDefault();
  // };

  return (
    <>
      {/* {statusAlert.status && (
        <topMessage
          status={statusAlert.status}
          msg={statusAlert.msg}
          changeState={setAlertStatus}
        />
      )} */}


      <div className="wt-admin-right-page-header clearfix">
        <h2>Post a Job</h2>
        <div className="breadcrumbs">
          <a href="#">Home</a>
          <a href="#">Dasboard</a>
          <span>Job Submission Form</span>
        </div>
      </div>

      {/*Basic Information*/}
      <div className="panel panel-default">
        <div className="panel-heading wt-panel-heading p-a20">
          <h4 className="panel-tittle m-a0">
            <i className="fa fa-suitcase" />
            Job Details
          </h4>
        </div>
        <div className="panel-body wt-panel-body p-a20 m-b30 ">
          <div>
            <div className="row">
              {/*Job title*/}
              <div className="col-xl-4 col-lg-6 col-md-12">
                <JobInputField
                  field={POSTJOBFIELD.fieldDetail[0]}
                  value={formData}
                  change={(data, field) => {
                    handleInputChange(field, data);
                  }}
                />
              </div>
              {/*Job Category*/}
              <div className="col-xl-4 col-lg-6 col-md-12">
                <JobSelectField
                  field={POSTJOBFIELD.fieldDetail[1]}
                  value={formData}
                  options={POSTJOBFIELD.fieldDetail[1].options}
                  change={(data, field) => {
                    handleInputChange(field, data);
                  }}
                />
              </div>
              {/*Job Type*/}
              <div className="col-xl-4 col-lg-6 col-md-12">
                <JobSelectField
                  field={POSTJOBFIELD.fieldDetail[2]}
                  value={formData}
                  options={POSTJOBFIELD.fieldDetail[2].options}
                  change={(data, field) => {
                    handleInputChange(field, data);
                  }}
                />
              </div>
              {/*Offered Salary*/}
              <div className="col-xl-4 col-lg-6 col-md-12">
                <JobInputField
                  field={POSTJOBFIELD.fieldDetail[3]}
                  value={formData}
                  change={(data, field) => {
                    handleInputChange(field, data);
                  }}
                />
              </div>
              {/*Experience*/}
              <div className="col-xl-4 col-lg-6 col-md-12">
                <JobInputField
                  field={POSTJOBFIELD.fieldDetail[4]}
                  value={formData}
                  change={(data, field) => {
                    handleInputChange(field, data);
                  }}
                />
              </div>
              {/*Qualification*/}
              <div className="col-xl-4 col-lg-6 col-md-12">
                <JobInputField
                  field={POSTJOBFIELD.fieldDetail[5]}
                  value={formData}
                  change={(data, field) => {
                    handleInputChange(field, data);
                  }}
                />
              </div>

              {/* budget */}
              <div className="col-xl-4 col-lg-6 col-md-12">
                <JobInputField
                  field={POSTJOBFIELD.fieldDetail[6]}
                  value={formData}
                  change={(data, field) => {
                    handleInputChange(field, data);
                  }}
                />
              </div>

              {/* skills */}
              <div className="col-xl-4 col-lg-6 col-md-12">
                <JobMultiSelectField
                  field={POSTJOBFIELD.fieldDetail[7]}
                  value={formData}
                  options={skillOptions || jobOptions}
                  change={(data, field) => {
                    handleInputChange(field, data);
                  }}
                />
              </div>

              {/* duty */}
              <div className="col-md-12">
                <h4>Key Responsibilities</h4>
                  <ReactQuill
                  
                    theme="snow"
                    value={formData[POSTJOBFIELD.fieldDetail[8].name] || ""}
                    onChange={(content) => handleInputChange(POSTJOBFIELD.fieldDetail[8].name, content)}
                   style={{height:'200px'}}
                   className="mb-5 pb-5"
                  />
                </div>

              {/*Description*/}
              <div className="col-md-12">
  <h4>Skills Required</h4>
  <ReactQuill
    theme="snow"
    value={formData[POSTJOBFIELD.fieldDetail[9].name] || ""}
    onChange={(content) => handleInputChange(POSTJOBFIELD.fieldDetail[9].name, content)}
    style={{ height: "200px" }}
    className="mb-5 pb-4"
  />
</div>


              {/*Start Date*/}
              <div className="col-md-6">
                <JobInputField
                  field={POSTJOBFIELD.fieldDetail[10]}
                  value={formData}
                  change={(data, field) => {
                    handleInputChange(field, data);
                  }}
                />
              </div>
              {/*End Date*/}
              <div className="col-md-6">
                <JobInputField
                  field={POSTJOBFIELD.fieldDetail[11]}
                  value={formData}
                  change={(data, field) => {
                    handleInputChange(field, data);
                  }}
                />
              </div>
              <div className="col-lg-12 col-md-12">
                <div className="text-left">
                  <button
                    type="submit"
                    className="site-button m-r5"
                    onClick={handlePublishJob}
                  >
                    Publish Job
                  </button>
                  <button
                    type="submit"
                    className="site-button outline-primary"
                    onClick={handleSaveDraft}
                  >
                    Save Draft
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}
export default EmpPostAJobPage;

import { useEffect, useContext, useState } from "react";
import { POSTJOBFIELD } from "../../../../../globals/post-job-data";
import JobInputField from "../../../../common/job-input-field";
import JobSelectField from "../../../../common/job-select-field";
import SelectField from "../../../../common/select-field";
import DateField from "../../../../common/date-field";
import TextAreaField from "../../../../common/text-area-field";
import { JobApiData } from "../../../../context/jobs/jobsContextApi";

function EmpPostAJobPage() {
  const { processAddJob } = useContext(JobApiData);
  const [formData, setFormData] = useState({});

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
    formData.user_id = 3; //dummy user_id
    formData.employer_id = 5; //dummy employer_id
    formData.status = 1; //dummy status

    console.log(formData);
    processAddJob(formData);
  };

  const handleSaveDraft = () => {
    console.log(formData);
  };

  const handlePostAJob = async (e) => {
    e.preventDefault();
  };

  return (
    <>
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
                    handleInputChange(data, field);
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
                    handleInputChange(data, field);
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
                    handleInputChange(data, field);
                  }}
                />
              </div>
              {/*Offered Salary*/}
              <div className="col-xl-4 col-lg-6 col-md-12">
                <JobInputField
                  field={POSTJOBFIELD.fieldDetail[3]}
                  value={formData}
                  change={(data, field) => {
                    handleInputChange(data, field);
                  }}
                />
              </div>
              {/*Experience*/}
              <div className="col-xl-4 col-lg-6 col-md-12">
                <JobInputField
                  field={POSTJOBFIELD.fieldDetail[4]}
                  value={formData}
                  change={(data, field) => {
                    handleInputChange(data, field);
                  }}
                />
              </div>
              {/*Qualification*/}
              <div className="col-xl-4 col-lg-6 col-md-12">
                <JobInputField
                  field={POSTJOBFIELD.fieldDetail[5]}
                  value={formData}
                  change={(data, field) => {
                    handleInputChange(data, field);
                  }}
                />
              </div>

              {/* budget */}
              <div className="col-xl-4 col-lg-6 col-md-12">
                <JobInputField
                  field={POSTJOBFIELD.fieldDetail[6]}
                  value={formData}
                  change={(data, field) => {
                    handleInputChange(data, field);
                  }}
                />
              </div>

              {/* job type */}
              <div className="col-xl-4 col-lg-6 col-md-12">
                <JobInputField
                  field={POSTJOBFIELD.fieldDetail[7]}
                  value={formData}
                  change={(data, field) => {
                    handleInputChange(data, field);
                  }}
                />
              </div>

              {/* duty */}
              <div className="col-xl-4 col-lg-6 col-md-12">
                <JobInputField
                  field={POSTJOBFIELD.fieldDetail[8]}
                  value={formData}
                  change={(data, field) => {
                    handleInputChange(data, field);
                  }}
                />
              </div>

              {/*Description*/}
              <div className="col-md-12">
                <TextAreaField
                  field={POSTJOBFIELD.fieldDetail[9]}
                  value={formData}
                  change={(data, field) => {
                    handleInputChange(data, field);
                  }}
                />
              </div>

              {/*Start Date*/}
              <div className="col-md-6">
                <DateField
                  field={POSTJOBFIELD.fieldDetail[10]}
                  value={formData}
                  change={(data, field) => {
                    handleInputChange(data, field);
                  }}
                />
              </div>
              {/*End Date*/}
              <div className="col-md-6">
                <DateField
                  field={POSTJOBFIELD.fieldDetail[11]}
                  value={formData}
                  change={(data, field) => {
                    handleInputChange(data, field);
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
    </>
  );
}
export default EmpPostAJobPage;

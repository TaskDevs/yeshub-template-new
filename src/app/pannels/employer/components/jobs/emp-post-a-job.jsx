import { useEffect, useContext, useState } from "react";
import { POSTJOBFIELD } from "../../../../../globals/post-job-data";
import JobInputField from "../../../../common/job-input-field";
import JobSelectField from "../../../../common/job-select-field";
import JobMultiSelectField from "../../../../common/job-multi-select-field";
import { JobApiData } from "../../../../context/jobs/jobsContextApi";
// import { ProfileApiData } from "../../../../context/user-profile/profileContextApi";
import { SkillsApiData } from "../../../../context/skills/skillsContextApi";
import Select from "react-select";
import { ToastContainer } from "react-toastify";
import ReactQuill from "react-quill";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import { CategoryApiData } from "../../../../context/category/categoryContextApi";

function EmpPostAJobPage() {
  const { processAddJob } = useContext(JobApiData);
  const userId = sessionStorage.getItem("user_id");
  const { skillOptions } = useContext(SkillsApiData);
  const [allCategories, setAllCategories] = useState([]);
  const { processGetAllCategory } = useContext(CategoryApiData);
  const [formData, setFormData] = useState({
    jobRoles: [],
  });

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const res = await processGetAllCategory();
        const data = res.data.data;

        // Map only required fields
        const formattedCategories = data.map((item) => ({
          id: item.id,
          name: item.category_name,
        }));

        setAllCategories(formattedCategories);
      } catch (err) {
        console.error("Could not fetch categories", err);
      }
    };

    fetchAllCategories();
  }, []);

  const categoryOptions = allCategories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const handleInputChange = (field, data) => {
    setFormData({
      ...formData,
      [field]: data,
    });
  };
  const handlePublishJob = () => {
    console.log("Data Sent:", formData);

    formData.user_id = userId;
    formData.employer_id = userId;
    formData.status = 1;

    if (!formData.job_category_id) {
      console.error("Job category is required.");

      return;
    }

    if (!formData.skills_id || formData.skills_id.length === 0) {
      console.error("At least one skill must be selected.");

      return;
    }

    formData.skills_id = JSON.stringify(formData.skills_id); // Option 1: JSON Format

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
                    handleInputChange(field, data);
                  }}
                />
              </div>
              {/*Job Category*/}
              <div className="col-xl-4 col-lg-6 col-md-12 rounded-lg">
                <label
                  htmlFor="category"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Select Category
                </label>

                <Select
                  id="category"
                  className="w-full border border-gray-300 bg-grey-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 text-gray-700"
                  classNamePrefix="custom-select"
                  options={categoryOptions}
                  value={categoryOptions.find(
                    (option) => option.value === formData.job_category_id
                  )} // Ensure job_category_id is used
                  onChange={(selectedOption) =>
                    handleInputChange("job_category_id", selectedOption?.value)
                  } // Ensure job_category_id is updated
                  isSearchable={true}
                  placeholder="Select a category..."
                  menuPortalTarget={document.body}
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 1000 }),
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
                  options={skillOptions || []}
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
                  onChange={(content) =>
                    handleInputChange(POSTJOBFIELD.fieldDetail[8].name, content)
                  }
                  style={{ height: "200px" }}
                  className="mb-5 pb-5"
                />
              </div>

              {/*Description*/}
              <div className="col-md-12">
                <h4>Skills Required</h4>
                <ReactQuill
                  theme="snow"
                  value={formData[POSTJOBFIELD.fieldDetail[9].name] || ""}
                  onChange={(content) =>
                    handleInputChange(POSTJOBFIELD.fieldDetail[9].name, content)
                  }
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

import React, { useContext } from "react";
import { PORTFOLIOFIELD } from "../../globals/portfolio-data";
import { PortfolioApiData } from "../context/portfolio/portfolioContextApi";
// import InputField from "./input-field";
// import TextAreaField from "./text-area-field";
import NewInputField from "./new-input-field";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

function PortfolioForm() {
  const { formData, handleChange } = useContext(PortfolioApiData);

  return (
    <div className="row">
      {/* <div className="col-xl-12 col-lg-12">
        <div className="form-group">
            <label>Work Title</label>
            <div className="ls-inputicon-box">
               
                <InputField
                    field={PORTFOLIOFIELD.fieldDetail[0]}
                    value={formData}
                    change={(data, field) => {
                        handleChange(data, field);
                    }}
                />
                <i className="fs-input-icon fa fa-address-card" />
            </div>
        </div>
    </div> */}

      <div className="col-xl-12 col-lg-12">
        <div className="p-field p-mb-3">
          <label
            htmlFor={PORTFOLIOFIELD.fieldDetail[0].name}
            className="p-text-secondary p-d-block p-mb-2 p-font-bold"
          >
            Project Title
          </label>
          <div className="ls-inputicon-box">
            <div className="">
              {/* <i className="fs-input-icon fas fa-book-reader" /> */}
              <i className="fs-input-icon fa fa-address-card" />
            </div>
            <NewInputField
              field={PORTFOLIOFIELD.fieldDetail[0]}
              value={formData}
              change={(data, field) => {
                handleChange(data, field);
              }}
            />
          </div>
        </div>
      </div>

      {/* <div className="col-xl-12 col-lg-12">
        <div className="form-group">
            <label>Role</label>
            <div className="ls-inputicon-box">
                
                <InputField
                    field={PORTFOLIOFIELD.fieldDetail[1]}
                    value={formData}
                    change={(data, field) => {
                        handleChange(data, field);
                    }}
                />
                <i className="fs-input-icon fa fa-address-card" />
            </div>
        </div>
    </div> */}

      <div className="col-xl-12 col-lg-12">
        <div className="p-field p-mb-3">
          <label
            htmlFor={PORTFOLIOFIELD.fieldDetail[1].name}
            className="p-text-secondary p-d-block p-mb-2 p-font-bold"
          >
            Role
          </label>
          <div className="ls-inputicon-box">
            <div className="">
              {/* <i className="fs-input-icon fas fa-book-reader" /> */}
              <i className="fs-input-icon fa fa-address-card" />
            </div>
            <NewInputField
              field={PORTFOLIOFIELD.fieldDetail[1]}
              value={formData}
              change={(data, field) => {
                handleChange(data, field);
              }}
            />
          </div>
        </div>
      </div>

      {/* skills */}

      {/* <div className="col-xl-12 col-lg-12">
        <div className="form-group">
            <label>Skills</label>
            <div className="ls-inputicon-box">
                {/* <input
                    className="form-control"
                    type="text"
                    placeholder="list your skills"
                    name="skills"
                /> 
                <InputField
                    field={PORTFOLIOFIELD.fieldDetail[2]}
                    value={formData}
                    change={(data, field) => {
                        handleChange(data, field);
                    }}
                />
                <i className="fs-input-icon fa fa-address-card" />
            </div>

        </div>
    </div> */}

      <div className="col-xl-12 col-lg-12">
        <div className="p-field p-mb-3">
          <label
            htmlFor={PORTFOLIOFIELD.fieldDetail[2].name}
            className="p-text-secondary p-d-block p-mb-2 p-font-bold"
          >
            Skills
          </label>
          <div className="ls-inputicon-box">
            <div className="">
              {/* <i className="fs-input-icon fas fa-book-reader" /> */}
              <i className="fs-input-icon fa fa-address-card" />
            </div>
            <NewInputField
              field={PORTFOLIOFIELD.fieldDetail[2]}
              value={formData}
              change={(data, field) => {
                handleChange(data, field);
              }}
            />
          </div>
        </div>
      </div>

      {/* <div className="col-xl-12 col-lg-12">
                <div className="form-group">
                    <label>URL</label>
                    <div className="ls-inputicon-box">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Enter Url"
                        />
                        <i className="fs-input-icon fa fa-globe-americas" />
                    </div>
                </div>
            </div> */}
      {/*Start Date*/}
      {/* <div className="col-md-6">
        <div className="form-group">
            <label>Duration From</label>
            <div className="ls-inputicon-box">
                <InputField
                    field={PORTFOLIOFIELD.fieldDetail[3]}
                    value={formData}
                    change={(data, field) => {
                        handleChange(data, field);
                    }}
                />
                <i className="fs-input-icon far fa-calendar" />
            </div>
        </div>
    </div> */}

      <div className="col-md-6">
        <div className="p-field p-mb-3">
          <label
            htmlFor={PORTFOLIOFIELD.fieldDetail[3].name}
            className="p-text-secondary p-d-block p-mb-2 p-font-bold"
          >
            Duration From
          </label>
          <div className="ls-inputicon-box">
            <div className="">
              {/* <i className="fs-input-icon fas fa-book-reader" /> */}
              <i className="fs-input-icon fa fa-address-card" />
            </div>
            <NewInputField
              field={PORTFOLIOFIELD.fieldDetail[3]}
              value={formData}
              change={(data, field) => {
                handleChange(data, field);
              }}
            />
          </div>
        </div>
      </div>

      {/*End Date*/}
      {/* <div className="col-md-6">
        <div className="form-group">
            <label>Duration to</label>
            <div className="ls-inputicon-box">
                <InputField
                    field={PORTFOLIOFIELD.fieldDetail[4]}
                    value={formData}
                    change={(data, field) => {
                        handleChange(data, field);
                    }}
                />
                <i className="fs-input-icon far fa-calendar" />
            </div>
        </div>
    </div> */}
      <div className="col-md-6">
        <div className="p-field p-mb-3">
          <label
            htmlFor={PORTFOLIOFIELD.fieldDetail[4].name}
            className="p-text-secondary p-d-block p-mb-2 p-font-bold"
          >
            Duration to
          </label>
          <div className="ls-inputicon-box">
            <div className="">
              {/* <i className="fs-input-icon fas fa-book-reader" /> */}
              <i className="fs-input-icon fa fa-address-card" />
            </div>
            <NewInputField
              field={PORTFOLIOFIELD.fieldDetail[4]}
              value={formData}
              change={(data, field) => {
                handleChange(data, field);
              }}
            />
          </div>
        </div>
      </div>
      {/* <div className="col-xl-12 col-lg-12">
        <div className="form-group">
            <input
                className="form-check-input"
                type="checkbox"
                name="flexRadioDefault"
                id="Working_on"
                defaultChecked
            />
            <label
                className="form-check-label"
                htmlFor="Working_on"
            >
                I am currently working on this
            </label>
        </div>
    </div> */}
      {/* <div className="col-md-12">
        <TextAreaField
          field={PORTFOLIOFIELD.fieldDetail[5]}
          value={formData}
          change={handleChange}
        />
      </div> */}

      <div className="col-md-12">
                <p  className="p-text-secondary p-d-block p-mb-2 p-font-bold">Description</p>
                <ReactQuill
                  theme="snow"
                  value={formData[PORTFOLIOFIELD.fieldDetail[5].name] || ""}
                  onChange={(content) =>
                    handleChange(PORTFOLIOFIELD.fieldDetail[5].name, content)
                  }
                  style={{ height: "200px" }}
                  className="mb-5 pb-5"
                />
              </div>
    </div>
  );
}

export default PortfolioForm;

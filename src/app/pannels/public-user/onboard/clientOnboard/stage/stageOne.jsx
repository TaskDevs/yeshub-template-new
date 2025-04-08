import React, { useState, useEffect } from "react";
import { START_CLIENT_PROFILE_FIELD } from "../../../../../../globals/user-profile-data";
import InputField from "../../../../../common/input-field";

const ClientStageOne = ({ forms, handleInputChange }) => {
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    forms[1]({
      ...forms[0],
      employeeNo: selectedOption,
    });
  }, [selectedOption]);

  return (
    <>
      <div className="container mt-2">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <h4 className="twm-title text-3xl text-gray">Welcome to Yeshub</h4>
            <p className="text-muted mt-2">
              Tell us about your business and you will be on your way to connect
              with talent.
            </p>
            <p className="text-muted mt-2">
              How many people are in your company?
            </p>
            <div className="d-flex items-align-center justify-center">
              <input
                type="radio"
                name="employeeNo"
                value="1"
                className="checker"
                checked={selectedOption === "1"}
                onChange={() => setSelectedOption("1")}
              />
              <span className="mx-2 text-muted">It is just me</span>
            </div>
            <div className="d-flex items-align-center justify-center mt-4">
              <input
                type="radio"
                name="employeeNo"
                value="2 - 9"
                className="checker"
                checked={selectedOption === "2 - 9"}
                onChange={() => setSelectedOption("2 - 9")}
              />
              <span className="mx-2 text-muted">2 - 9 employees</span>
            </div>
            <div className="d-flex items-align-center justify-center mt-4">
              <input
                type="radio"
                name="employeeNo"
                value="10 - 99"
                className="checker"
                checked={selectedOption === "10 - 99"}
                onChange={() => setSelectedOption("10 - 99")}
              />
              <span className="mx-2 text-muted">10 - 99 employees</span>
            </div>
            <div className="d-flex items-align-center justify-center mt-4">
              <input
                type="radio"
                name="employeeNo"
                value="100 - 1,000"
                className="checker"
                checked={selectedOption === "100 - 1,000"}
                onChange={() => setSelectedOption("100 - 1,000")}
              />
              <span className="mx-2 text-muted">100 - 1,000 employees</span>
            </div>
            <div className="d-flex items-align-center justify-center mt-4">
              <input
                type="radio"
                name="employeeNo"
                value="1000+"
                className="checker"
                checked={selectedOption === "1000+"}
                onChange={() => setSelectedOption("1000+")}
              />
              <span className="mx-2 text-muted">
                More than a 1,000 employees
              </span>
            </div>
            <div className="mt-4 input-container">
              <InputField
                field={START_CLIENT_PROFILE_FIELD.fieldDetailOne[0]}
                label={START_CLIENT_PROFILE_FIELD.fieldDetailOne[0].label}
                value={forms[0]}
                change={(data, field) => {
                  handleInputChange(field, data);
                }}
              />
            </div>
            <div className="mt-2 w-full">
              <InputField
                field={START_CLIENT_PROFILE_FIELD.fieldDetailOne[1]}
                label={START_CLIENT_PROFILE_FIELD.fieldDetailOne[1].label}
                value={forms[0]}
                change={(data, field) => {
                  handleInputChange(field, data);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientStageOne;

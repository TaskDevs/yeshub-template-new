import React, { useState, useEffect } from "react";
import { FaClock, FaMoneyBill1Wave } from "react-icons/fa6";
import { START_CLIENT_PROFILE_FIELD } from "../../../../../../globals/user-profile-data";
import InputField from "../../../../../common/input-field";

const ClientStageFive = ({ forms, handleInputChange }) => {
  const [selectedOption, setSelectedOption] = useState("hourly");

  useEffect(() => {
    forms[1]({
      ...forms[0],
      budgetType: selectedOption,
    });
  }, [selectedOption]);

  return (
    <>
      <div className="container mt-6 mb-8">
        <div className="row">
          <div className="col-sm-12 col-md-6 px-6">
            <h4 className="twm-title text-3xl text-gray">
              Tell us about you budget
            </h4>
            <p className="text-muted mt-2">
              This will help us match you to talent within your range
            </p>
          </div>
          <div className="col-sm-12 col-md-6 px-2">
            <div className="d-flex flex-sm-col flex-md-row justify-content-center gap-4">
              {/* Client Option */}
              <div
                className={`option-card ${
                  selectedOption === "hourly" ? "selected" : ""
                }`}
                onClick={() => setSelectedOption("hourly")}
              >
                <div className="d-flex align-items-center justify-content-between w-100">
                  <FaClock className="icon" size={28} />
                  <input
                    type="radio"
                    name="budgetType"
                    value="hourly"
                    className="checker"
                    checked={selectedOption === "hourly"}
                    onChange={() => setSelectedOption("hourly")}
                  />
                </div>
                <span className="option-text">Hourly Rate</span>
              </div>

              {/* Freelancer Option */}
              <div
                className={`option-card ${
                  selectedOption === "fixed" ? "selected" : ""
                }`}
                onClick={() => setSelectedOption("fixed")}
              >
                <div className="d-flex align-items-center justify-content-between w-100">
                  <FaMoneyBill1Wave className="icon" size={28} />
                  <input
                    type="radio"
                    name="budgetType"
                    value="fixed"
                    className="checker"
                    checked={selectedOption === "fixed"}
                    onChange={() => setSelectedOption("fixed")}
                  />
                </div>
                <span className="option-text">Fixed Price</span>
              </div>
            </div>
            {selectedOption === "hourly" ? (
              <>
                <div className="d-flex flex-sm-col flex-md-row justify-content-center gap-4 mt-4">
                  <div className="input-container">
                    <InputField
                      field={START_CLIENT_PROFILE_FIELD.fieldDetailFour[0]}
                      label={
                        START_CLIENT_PROFILE_FIELD.fieldDetailFour[0].label
                      }
                      value={forms[0]}
                      change={(data, field) => {
                        handleInputChange(field, data);
                      }}
                    />
                  </div>
                  <div className="input-container">
                    <InputField
                      field={START_CLIENT_PROFILE_FIELD.fieldDetailFour[0]}
                      label={
                        START_CLIENT_PROFILE_FIELD.fieldDetailFour[0].label
                      }
                      value={forms[0]}
                      change={(data, field) => {
                        handleInputChange(field, data);
                      }}
                    />
                  </div>
                </div>
                <p className="text-muted mt-2 mx-4">
                  This is the average rate of similar projects
                </p>
                <p className="text-muted mt-2 mx-4">
                  Professionals tend to charge GH10 - GH25 /hour for graphic
                  design projects. Experts may charge higher
                </p>
              </>
            ) : (
              <div className="mt-4 mx-4">
                <p className="text-muted mt-2">
                  Set a price for the project and pay at the end, or you can
                  divide the project into milestones and pay as each milestone
                  is completed.
                </p>
                <div className="mt-4">
                  <h4 className="text-bold">
                    What is the best cost estimate for your project ?
                  </h4>
                  <span className="text-muted mt-2">
                    You can negotiate this cost and create milestones when you
                    chat with your freelancer
                  </span>
                </div>
                <div className="input-container mt-4">
                  <InputField
                    field={START_CLIENT_PROFILE_FIELD.fieldDetailFour[2]}
                    label={START_CLIENT_PROFILE_FIELD.fieldDetailFour[2].label}
                    value={forms[0]}
                    change={(data, field) => {
                      handleInputChange(field, data);
                    }}
                  />
                </div>
              </div>
            )}
            <div className="mx-4">
              <span className="text-success cursor-pointer">
                No ready to set a budget?
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientStageFive;

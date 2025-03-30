import React, { useState, useEffect } from "react";

const FreelanceStageOne = ({ forms }) => {
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    forms[1]({ ...forms[0], freelanceExperience: selectedOption });
  }, [selectedOption]);

  return (
    <>
      <div className="container d-flex flex-column mt-2">
        <div className="row mb-4 w-50 ">
          <h4 className="twm-title text-3xl text-gray">
            A few quick questions: First, have you freelanced before?{" "}
          </h4>
          <p className="text-muted">
            This lets us know how much help to give you along the way. We won’t
            share your answer with anyone else, including potential clients.
          </p>
        </div>
      </div>
      <div className="container w-full ">
        <div className="row w-full justify-content-space-between">
          {/* Option 1 */}
          <div className="col-md-4 col-sm-10 mt-4 mt-md-0 card-container">
            <div
              className={`option-card card-two w-full ${
                selectedOption === "new" ? "selected" : ""
              }`}
              onClick={() => setSelectedOption("new")}
            >
              <div className="d-flex justify-content-between w-full">
                <img
                  src="/assets/images/freelance-onboard/one-search.png"
                  className="img-fixed-two"
                />
                <input
                  type="radio"
                  name="freelanceExperience"
                  value="new"
                  className="checker"
                  checked={selectedOption === "new"}
                  onChange={() => setSelectedOption("new")}
                />
              </div>
              <span className="option-text">I am brand new to this</span>
            </div>
          </div>

          {/* Option 2 */}
          <div className="col-md-4 col-sm-10 mt-4 mt-md-0 card-container">
            <div
              className={`option-card w-full card-two ${
                selectedOption === "some" ? "selected" : ""
              }`}
              onClick={() => setSelectedOption("some")}
            >
              <div className="d-flex justify-content-between w-full">
                <img
                  src="/assets/images/freelance-onboard/one-typing.png"
                  className="img-fixed-two"
                />
                <input
                  type="radio"
                  name="freelanceExperience"
                  value="some"
                  className="checker"
                  checked={selectedOption === "some"}
                  onChange={() => setSelectedOption("some")}
                />
              </div>
              <span className="option-text">I have some experience</span>
            </div>
          </div>

          {/* Option 3 */}
          <div className="col-md-4 col-sm-10 mt-4 mt-md-0 card-container">
            <div
              className={`option-card card-two w-full ${
                selectedOption === "expert" ? "selected" : ""
              }`}
              onClick={() => setSelectedOption("expert")}
            >
              <div className="d-flex justify-content-between w-full">
                <img
                  src="/assets/images/freelance-onboard/one-badge.png"
                  className="img-fixed-two"
                />
                <input
                  type="radio"
                  name="freelanceExperience"
                  value="expert"
                  className="checker"
                  checked={selectedOption === "expert"}
                  onChange={() => setSelectedOption("expert")}
                />
              </div>
              <span className="option-text">I’m an expert freelancer</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FreelanceStageOne;

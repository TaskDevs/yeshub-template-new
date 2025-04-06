import React, { useState, useEffect } from "react";

const FreelanceStageTwo = ({ forms }) => {
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    forms[1]({
      ...forms[0],
      goal: selectedOption,
    });
  }, [selectedOption]);

  return (
    <>
      <div className="container d-flex flex-column  mt-2">
        <div className="row mb-4 w-50">
          <h4 className="twm-title text-3xl text-gray">
            Got it. what is your biggest goal for freelancing?
          </h4>
          <p className="text-muted">
            Different people come to yeshub for various reasons. We want to
            highlight the opportunities that fit your goals best while still
            showing you all possibilities.
          </p>
        </div>
      </div>
      <div className="container w-full ">
        <div className="row w-full justify-content-space-between">
          {/* Option 1 */}
          <div className="col-md-3 col-sm-10 card-container">
            <div
              className={`option-card card-two w-full ${
                selectedOption === "fulltime" ? "selected" : ""
              }`}
              onClick={() => setSelectedOption("fulltime")}
            >
              <div className="d-flex justify-content-between w-full">
                <img
                  src="/assets/images/freelance-onboard/two-fulltime.png"
                  className="img-fixed-two"
                />
                <input
                  type="radio"
                  name="jobType"
                  value="fulltime"
                  className="checker"
                  checked={selectedOption === "fulltime"}
                  onChange={() => setSelectedOption("fulltime")}
                />
              </div>
              <span className="option-text">To earn my main income</span>
            </div>
          </div>

          {/* Option 2 */}
          <div className="col-md-3 col-sm-10 card-container">
            <div
              className={`option-card w-full card-two ${
                selectedOption === "part-time" ? "selected" : ""
              }`}
              onClick={() => setSelectedOption("part-time")}
            >
              <div className="d-flex justify-content-between w-full">
                <img
                  src="/assets/images/freelance-onboard/two-parttime.png"
                  className="img-fixed-two"
                />
                <input
                  type="radio"
                  name="jobType"
                  value="part-time"
                  className="checker"
                  checked={selectedOption === "part-time"}
                  onChange={() => setSelectedOption("part-time")}
                />
              </div>
              <span className="option-text">To make money on the side</span>
            </div>
          </div>

          {/* Option 3 */}
          <div className="col-md-3 col-sm-10 card-container">
            <div
              className={`option-card card-two w-full ${
                selectedOption === "learn" ? "selected" : ""
              }`}
              onClick={() => setSelectedOption("learn")}
            >
              <div className="d-flex justify-content-between w-full">
                <img
                  src="/assets/images/freelance-onboard/two-learn.png"
                  className="img-fixed-two"
                />
                <input
                  type="radio"
                  name="jobType"
                  value="learn"
                  className="checker"
                  checked={selectedOption === "learn"}
                  onChange={() => setSelectedOption("learn")}
                />
              </div>
              <span className="option-text">To get experience</span>
            </div>
          </div>

          {/* Option 4 */}
          <div className="col-md-3 col-sm-10 card-container">
            <div
              className={`option-card card-two w-full ${
                selectedOption === "hobby" ? "selected" : ""
              }`}
              onClick={() => setSelectedOption("hobby")}
            >
              <div className="d-flex justify-content-between w-full">
                <img
                  src="/assets/images/freelance-onboard/two-hobby.png"
                  className="img-fixed-two"
                />
                <input
                  type="radio"
                  name="jobType"
                  value="hobby"
                  className="checker"
                  checked={selectedOption === "hobby"}
                  onChange={() => setSelectedOption("hobby")}
                />
              </div>
              <span className="option-text">I dont have a goal in mind</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FreelanceStageTwo;

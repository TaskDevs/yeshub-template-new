import React, { useState, useEffect } from "react";

const ClientStageFour = ({ forms }) => {
  const [selectedOption, setSelectedOption] = useState(
    forms[0].workScope || ""
  );
  useEffect(() => {
    forms[1]({
      ...forms[0],
      workScope: selectedOption,
    });
  }, [selectedOption]);

  return (
    <>
      <div className="container mt-6 mb-8">
        <div className="row">
          <div className="col-sm-12 col-md-6 px-6">
            <h4 className="twm-title text-3xl text-gray">
              Next, estimate the scope of your work
            </h4>
            <p className="text-muted mt-2">
              Consider the size of your project and time it will take
            </p>
          </div>
          <div className="col-sm-12 col-md-6 px-2">
            <div className="d-flex flex-row gap-2 mt-2">
              <input
                type="radio"
                name="workScope"
                value="large"
                className="checker"
                checked={selectedOption === "large"}
                onChange={() => setSelectedOption("large")}
              />

              <div>
                <h4 className="mb-1">Large</h4>
                <span>
                  Long term or complex (ex. develop and execute brand strategy
                  (i.e. graphics, positioning))
                </span>
              </div>
            </div>

            <div className="d-flex flex-row gap-2 mt-4">
              <input
                type="radio"
                name="workScope"
                value="medium"
                className="checker"
                checked={selectedOption === "medium"}
                onChange={() => setSelectedOption("medium")}
              />

              <div>
                <h4 className="mb-1">Medium</h4>
                <span>
                  Well-defined projects (ex. design business rebrand package
                  (i.e. logos, icons))
                </span>
              </div>
            </div>

            <div className="d-flex flex-row gap-2 mt-4">
              <input
                type="radio"
                name="workScope"
                value="small"
                className="checker"
                checked={selectedOption === "small"}
                onChange={() => setSelectedOption("small")}
              />

              <div>
                <h4 className="mb-1">Small</h4>
                <span>
                  Quick and straight forward tasks (ex. create logo for a new
                  product) .
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientStageFour;

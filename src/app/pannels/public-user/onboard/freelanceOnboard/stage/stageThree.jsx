import React, { useState, useEffect } from "react";

const FreelanceStageThree = ({ forms }) => {
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    forms[1]({
      ...forms[0],
      freelancerChoice: selectedOption,
    });
  }, [selectedOption]);

  return (
    <>
      <div className="container d-flex flex-column  mt-2">
        <div className="row mb-4 w-50">
          <h4 className="twm-title text-3xl text-gray">
            And how would you like to work?
          </h4>
          <p className="text-muted">
            Everybody works in different ways, so we have different ways of
            helping you win work. You can select multiple preferences now and
            can always change it later!
          </p>
        </div>
      </div>
      <div className="container w-full ">
        <div className="row w-full justify-content-space-between">
          {/* Option 1 */}
          <div className="col-md-4 col-sm-10 card-container">
            <div
              className={`option-card card-two w-full ${
                selectedOption === "bid" ? "selected" : ""
              }`}
              onClick={() => setSelectedOption("bid")}
            >
              <div className="d-flex justify-content-between w-full">
                <img
                  src="/assets/images/freelance-onboard/three-bid.png"
                  className="img-fixed-two"
                />
                <input
                  type="radio"
                  name="freelancerChoice"
                  value="bid"
                  className="checker"
                  checked={selectedOption === "bid"}
                  onChange={() => setSelectedOption("bid")}
                />
              </div>
              <span className="option-text">
                I did like to find opportunities for myself
              </span>
              <span className="text-sm">
                Clients post jobs on our Market place, you can browse and bid
                for them, or get invited by a client for a job right away
              </span>
            </div>
          </div>

          {/* Option 2 */}
          <div className="col-md-4 col-sm-10 card-container">
            <div
              className={`option-card w-full card-two ${
                selectedOption === "package" ? "selected" : ""
              }`}
              onClick={() => setSelectedOption("package")}
            >
              <div className="d-flex justify-content-between w-full">
                <img
                  src="/assets/images/freelance-onboard/three-package.png"
                  className="img-fixed-two"
                />
                <input
                  type="radio"
                  name="freelancerChoice"
                  value="package"
                  className="checker"
                  checked={selectedOption === "package"}
                  onChange={() => setSelectedOption("package")}
                />
              </div>
              <span className="option-text">
                I like to package up my work for clients to buy
              </span>
              <span className="text-sm">
                Define your service with prices and timelines, we will list it
                in your project Catalog for clients to buy right away
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FreelanceStageThree;

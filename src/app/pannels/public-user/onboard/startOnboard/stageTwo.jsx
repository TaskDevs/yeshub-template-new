import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBriefcase, FaUserTie } from "react-icons/fa6";

const StageTwo = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const navigate = useNavigate();

  let handleCreateAccount = () => {
    selectedOption == "client" && navigate("client");
    selectedOption == "freelancer" && navigate("freelancer");
  };

  return (
    <div className="container mt-8 text-center">
      <h4 className="twm-title text-2xl text-gray mb-4">
        What do you want to do on Yeshub?
      </h4>

      <div className="d-flex flex-sm-col flex-md-row justify-content-center gap-4">
        {/* Client Option */}
        <div
          className={`option-card ${
            selectedOption === "client" ? "selected" : ""
          }`}
          onClick={() => setSelectedOption("client")}
        >
          <div className="d-flex align-items-center justify-content-between w-100">
            <FaBriefcase className="icon" size={28} />
            <input
              type="radio"
              name="userType"
              value="client"
              className="checker"
              checked={selectedOption === "client"}
              onChange={() => setSelectedOption("client")}
            />
          </div>
          <span className="option-text">
            I am a client, hiring for a project
          </span>
        </div>

        {/* Freelancer Option */}
        <div
          className={`option-card ${
            selectedOption === "freelancer" ? "selected" : ""
          }`}
          onClick={() => setSelectedOption("freelancer")}
        >
          <div className="d-flex align-items-center justify-content-between w-100">
            <FaUserTie className="icon" size={28} />
            <input
              type="radio"
              name="userType"
              value="freelancer"
              className="checker"
              checked={selectedOption === "freelancer"}
              onChange={() => setSelectedOption("freelancer")}
            />
          </div>
          <span className="option-text">
            I am a freelancer, looking for work
          </span>
        </div>
      </div>

      <div className="mt-6">
        {selectedOption !== "" ? (
          <button
            className="btn btn-success text-sm"
            onClick={handleCreateAccount}
          >
            {selectedOption == "client"
              ? "Get Started as Client"
              : "Get started as freelance"}
          </button>
        ) : (
          <span className="btn btn-secondary text-sm disabled">
            Choose Role
          </span>
        )}
      </div>
    </div>
  );
};

export default StageTwo;

import React from "react";

const ProgressBar = ({ step }) => {
  const progress = (step[0] / step[1]) * 100; // Convert step to percentage
  const isComplete = step === 3;

  return (
    <div className="progress-container">
      <div
        className={`progress-bar ${isComplete ? "complete" : ""}`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;

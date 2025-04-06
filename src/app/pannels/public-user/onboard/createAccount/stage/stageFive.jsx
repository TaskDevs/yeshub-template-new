import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { addCv } from "../../../../../context/user-profile/profileApi";
import toast from "react-hot-toast"; // Updated import

const StageFour = () => {
  const [cvFile, setCvFile] = useState(null);
  const [cvFileName, setCvFileName] = useState(""); // Display file name
  const [linkedinImported, setLinkedinImported] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // To handle the loading state
  const [progress, setProgress] = useState(0); // To track the progress (in percentage)
  const location = useLocation();
  const userId = location.state?.user_id;

  // Handle file selection
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCvFile(file); // Store file object
      setCvFileName(file.name); // Store file name for UI
    }
  };

  const handleLinkedInImport = () => {
    setLinkedinImported(true);
  };

  const handleSubmit = () => {
    if (!cvFile || !userId) {
      console.error("Missing required fields: cv_file or user_id");
      return;
    }

    const formData = new FormData();
    formData.append("cv_file", cvFile); // Append actual file
    formData.append("user_id", userId);

    console.log("Data being sent:", formData);

    setIsLoading(true); // Show spinner
    setProgress(0); // Reset progress

    // Simulating the upload progress
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval); // Stop the progress once it's 100%
        }
        return Math.min(prevProgress + 10, 100); // Increase progress by 10% at intervals
      });
    }, 1000);

    addCv(formData)
      .then((response) => {
        toast.success(response.data.message); // Success toast
        setIsLoading(false);
        setProgress(100); // Set progress to 100%
      })
      .catch((error) => {
        console.error("Error:", error.response ? error.response.data : error.message);
        toast.error("Error submitting CV! Please try again."); // Error toast
        setIsLoading(false);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <div className="container text-left mx-auto cv-margin-bottom">
            {/* Title */}
            <div>
              <h4 className="twm-title text-3xl text-gray">
                How would you like to tell us about yourself?
              </h4>
              <span>
                We need to get a sense of your education, experience, and skills.
                It is quickest to import your information - you can edit it before
                your profile goes live.
              </span>
            </div>

            {/* Upload Button */}
            <div className="mt-4">
              <label className="btn btn-outline-success w-full">
                {cvFileName ? "✅ CV Uploaded" : "📂 Upload your resume"}
                <input
                  type="file"
                  accept=".pdf, .doc, .docx"
                  onChange={handleFileUpload}
                  className="d-none"
                />
              </label>
              {cvFileName && <p className="mt-2 text-sm text-success">{cvFileName}</p>}
            </div>

            {/* LinkedIn Import */}
            <div className="mt-2">
              <button
                className={`btn w-full ${linkedinImported ? "btn-success" : "btn-outline-success"}`}
                onClick={handleLinkedInImport}
              >
                {linkedinImported ? "✅ LinkedIn Imported" : "🔗 Import from LinkedIn"}
              </button>
            </div>

            {/* Fill out manually */}
            <div className="mt-2">
              <button className="btn w-full btn-outline-success">
                Fill out manually
              </button>
            </div>

            {/* Submit button with spinner and progress */}
            {cvFile && (
              <div className="mt-2">
                <button className="btn btn-primary w-full" onClick={handleSubmit} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="spinner-border spinner-border-sm text-white" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                      <span className="ml-2">{progress}%</span> {/* Show progress percentage */}
                    </>
                  ) : (
                    "Submit CV"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="col-sm-12 col-md-6">
          <div className="d-flex w-full items-center test-border">
            <img
              src="/assets/images/freelance-onboard/three-bid.png"
              className="img-fill-page"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StageFour;

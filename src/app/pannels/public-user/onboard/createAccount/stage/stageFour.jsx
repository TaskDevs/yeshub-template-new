import React, { useState } from "react";

const StageFour = () => {
  const [cvFile, setCvFile] = useState(null);
  const [linkedinImported, setLinkedinImported] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCvFile(file.name);
    }
  };

  const handleLinkedInImport = () => {
    // Simulate LinkedIn import process
    setLinkedinImported(true);
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
                We need to get a sense of your education, experience and skills.
                it is quickest to import your information - you can edit it
                before your profile goes live.
              </span>
            </div>

            {/* Upload Button */}
            <div className="mt-4">
              <label className="btn btn-outline-success w-full">
                {cvFile ? "✅ CV Uploaded" : "📂 Upload your resume"}
                <input
                  type="file"
                  accept=".pdf, .doc, .docx"
                  onChange={handleFileUpload}
                  className="d-none"
                />
              </label>
              {cvFile && <p className="mt-2 text-sm text-success">{cvFile}</p>}
            </div>
            <div className="mt-2">
              <button
                className={`btn w-full ${
                  linkedinImported ? "btn-success" : "btn-outline-success"
                }`}
                onClick={handleLinkedInImport}
              >
                {linkedinImported
                  ? "✅ LinkedIn Imported"
                  : "🔗 Import from LinkedIn"}
              </button>
            </div>
            <div className="mt-2">
              <button
                className={"btn w-full btn-outline-success"}
                onClick={handleLinkedInImport}
              >
                Fill out manually
              </button>
            </div>
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

//  <InputField
//    field={item}
//    value={formData}
//    defaultVal={item.defaultValue}
//    readOnly={item.readOnly}
//    change={(data, field) => {
//      handleInputChange(data, field);
//    }}
//  />;

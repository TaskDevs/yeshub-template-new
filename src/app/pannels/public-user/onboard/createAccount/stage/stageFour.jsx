import React, { useState } from "react";

const StageFour = () => {
  const [cvFile, setCvFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCvFile(file.name);
    }
  };

  return (
    <div className="container text-center mx-auto contain-width cv-margin-bottom">
      {/* Title */}
      <div>
        <h4 className="twm-title text-3xl text-gray">Profession Information</h4>
        <span>Upload Your CV</span>
      </div>

      {/* Upload Button */}
      <div className="mt-4">
        <label className="btn btn-secondary position-relative">
          {cvFile ? "✅ CV Uploaded" : "📂 Upload CV"}
          <input
            type="file"
            accept=".pdf, .doc, .docx"
            onChange={handleFileUpload}
            className="d-none"
          />
        </label>
        {cvFile && <p className="mt-2 text-sm text-success">{cvFile}</p>}
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

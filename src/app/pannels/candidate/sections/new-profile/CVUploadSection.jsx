import React, { useState, useEffect } from "react";
import { Download, Trash2 } from "lucide-react";
import { addCv, getCv } from "../../../../context/user-profile/profileApi";

const CVUploadSection = () => {
  const [cvFiles, setCvFiles] = useState([]);
  const [defaultFileIndex, setDefaultFileIndex] = useState(null);

  // Load CVs and default index from localStorage
  useEffect(() => {
    const fetchCvFiles = async () => {
      const user_id = sessionStorage.getItem("userId");
      if (user_id) {
        try {
          const response = await getCv(user_id);
          const cvList = response?.data?.data;

          if (Array.isArray(cvList)) {
            const files = cvList.map((file) => ({
              file: null,
              url: file.cv_url,
              uploadedAt: new Date(file.uploaded_at),
              name: file.cv_url.split("/").pop() || "cv.pdf",
            }));

            setCvFiles(files);

            const storedDefaultName = localStorage.getItem("defaultCV");
            const defaultIndex = files.findIndex(
              (f) => f.name === storedDefaultName
            );
            if (defaultIndex !== -1) {
              setDefaultFileIndex(defaultIndex);
            } else if (files.length > 0) {
              setDefaultFileIndex(0); // fallback
            }
          }
        } catch (error) {
          console.error("Error fetching CV files:", error);
        }
      }
    };

    fetchCvFiles();
  }, []);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const pdfFiles = files.filter((file) => file.type === "application/pdf");

    if (pdfFiles.length !== files.length) {
      alert("Only PDF files are allowed.");
    }

    const user_id = sessionStorage.getItem("userId");

    for (const file of pdfFiles) {
      const formData = new FormData();
      formData.append("cv_file", file);
      formData.append("user_id", user_id);

      try {
        const response = await addCv(formData);
        if (response) {
          const newEntry = {
            file,
            url: URL.createObjectURL(file),
            uploadedAt: new Date(),
            name: file.name,
          };
          const newCvFiles = [...cvFiles, newEntry];
          setCvFiles(newCvFiles);

          // Set as default if none was set
          if (defaultFileIndex === null) {
            setDefaultFileIndex(newCvFiles.length - 1);
            localStorage.setItem("defaultCV", newEntry.name);
          }
        }
      } catch (error) {
        console.error("Upload error:", error);
      }
    }
  };

  const handleMarkAsDefault = (index) => {
    const selected = cvFiles[index];
    if (selected) {
      setDefaultFileIndex(index);
      localStorage.setItem("defaultCV", selected.name);
    }
  };

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);

  const formatSize = (size) => `${(size / 1024).toFixed(1)} KB`;

  const shortenFileName = (name, maxLength = 30) => {
    if (!name) return "cv.pdf";
    const cleaned = name.replace(/^[\d\-_]+/, "");
    const ext = cleaned.slice(cleaned.lastIndexOf("."));
    const base = cleaned.slice(0, cleaned.lastIndexOf("."));
    return base.length + ext.length <= maxLength
      ? cleaned
      : `${base.slice(0, maxLength - ext.length - 3)}...${ext}`;
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Upload Your CV(s)
      </h2>

      <div className="bg-gray-50 border-2 border-dashed border-blue-500 rounded-lg p-6 text-center hover:bg-blue-50 transition mb-8">
        <label className="cursor-pointer text-blue-600 font-medium">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            multiple
            className="hidden"
          />
          Click to upload PDF CVs
        </label>
        <p className="text-sm text-gray-500 mt-2">Only PDF format is allowed</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {cvFiles.map((entry, index) => (
          <div
            key={index}
            className="relative bg-white border border-gray-200 rounded-xl shadow p-4 flex flex-col"
          >
            <div className="absolute top-3 right-3 flex gap-2">
              <a
                href={entry.url}
                download={entry.file?.name || entry.name}
                className="text-gray-600 hover:text-gray-900"
              >
                <Download size={18} />
              </a>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() =>
                  setCvFiles((prev) => prev.filter((_, i) => i !== index))
                }
              >
                <Trash2 size={18} />
              </button>
            </div>

            <span className="inline-block bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-md w-max mb-2">
              PDF
            </span>

            <div className="flex-1">
              <div className="font-medium text-gray-800 text-sm mb-1">
                {shortenFileName(entry.file?.name || entry.name)}
              </div>
              <div className="text-xs text-gray-500">
                {entry.file ? formatSize(entry.file.size) : "Remote file"} •{" "}
                {formatDate(entry.uploadedAt)}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <div
                className={`w-4 h-4 rounded-full border-2 ${
                  defaultFileIndex === index
                    ? "border-green-600"
                    : "border-gray-300"
                } flex items-center justify-center cursor-pointer`}
                onClick={() => handleMarkAsDefault(index)}
              >
                {defaultFileIndex === index && (
                  <div className="w-2 h-2 bg-green-600 rounded-full" />
                )}
              </div>
              <span className="text-xs text-gray-600">Mark as Default</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CVUploadSection;

import React, { useState, useEffect } from "react";
import { Download } from "lucide-react";
import { addCv, getCv } from "../../../../context/user-profile/profileApi";

const CVUploadSection = () => {
  const [cvFiles, setCvFiles] = useState([]);
  const [defaultFileIndex, setDefaultFileIndex] = useState(null);

useEffect(() => {
  const fetchCvFiles = async () => {
    const user_id = sessionStorage.getItem("userId");

    if (user_id) {
      try {
        const response = await getCv(user_id);
      

        const cvList = response?.data?.data; // access the array
  console.log("response cv", cvList);
        if (Array.isArray(cvList)) {
          const files = cvList.map((file) => ({
            file: null, // not a JS File object, just a reference from the backend
            url: file.cv_url,
            uploadedAt: new Date(file.uploaded_at),
            name: file.cv_url.split("/").pop() || "cv.pdf", // derive name from URL
          }));

          setCvFiles(files);
          if (files.length > 0) setDefaultFileIndex(0);
        } else {
          console.warn("CV list is not an array");
        }
      } catch (error) {
        console.error("Error fetching CV files:", error);
        alert("An error occurred while fetching CV files.");
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
    console.log("user_id", user_id);

    for (const file of pdfFiles) {
      const formData = new FormData();
      formData.append("cv_file", file);
      formData.append("user_id", user_id); // 👈 Add user_id to form data

      try {
        const response = await addCv(formData);
        if (response) {
          const newEntry = {
            file,
            url: URL.createObjectURL(file),
            uploadedAt: new Date(),
          };

          setCvFiles((prev) => [...prev, newEntry]);

          if (defaultFileIndex === null) {
            setDefaultFileIndex(cvFiles.length);
          }
        } else {
          alert("Failed to upload CV.");
        }
      } catch (error) {
        console.error("Upload error:", error);
        alert("An error occurred while uploading.");
      }
    }
  };

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    }).format(date);

  const formatSize = (size) => `${(size / 1024).toFixed(1)} KB`;
const shortenFileName = (name, maxLength = 30) => {
  if (!name) return "cv.pdf";

  const ext = name.slice(name.lastIndexOf("."));
  const base = name.slice(0, name.lastIndexOf("."));

  if (base.length + ext.length <= maxLength) {
    return name;
  }

  return `${base.slice(0, maxLength - ext.length - 3)}...${ext}`;
};

  return (
    <div style={styles.wrapper} className="shadow-sm bg-white rounded-lg">
      <h2 style={styles.heading}>Upload Your CV(s)</h2>

      <div style={styles.uploadBox}>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          multiple
          style={{ width: "100%", cursor: "pointer" }}
        />
      </div>

      <div style={styles.fileList}>
        {cvFiles.map((entry, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.badge}>PDF</div>

            <div style={styles.meta}>
              <div style={styles.filename}>
  {shortenFileName(entry.file?.name || entry.name)}
</div>

              <div style={styles.details}>
  {entry.file ? formatSize(entry.file.size) : "Remote file"} · Last used on {formatDate(entry.uploadedAt)}
</div>
            </div>

       <a href={entry.url} download={entry.file?.name || entry.name} style={styles.icon}>
              <Download size={20} />
            </a>

            <div
              onClick={() => setDefaultFileIndex(index)}
              style={{
                ...styles.circle,
                borderColor: defaultFileIndex === index ? "#059669" : "#ccc",
              }}
            >
              {defaultFileIndex === index && <div style={styles.innerCircle} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    width: "100%",
    maxWidth: "100%",
    padding: "1rem 2rem",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    marginBottom: "1rem",
    fontSize: "1.5rem",
    fontWeight: "600",
  },
  uploadBox: {
    border: "2px dashed #2563eb",
    padding: "1.25rem",
    borderRadius: "10px",
    background: "#f9fafb",
    marginBottom: "2rem",
  },
  fileList: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  card: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    border: "2px solid #2563eb",
    borderRadius: "12px",
    padding: "1rem",
    background: "#fff",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  badge: {
    backgroundColor: "#be123c",
    color: "#fff",
    fontWeight: "bold",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    marginRight: "1rem",
    minWidth: "50px",
    textAlign: "center",
  },
  meta: {
    flex: 1,
  },
  filename: {
    fontWeight: "600",
    fontSize: "1rem",
  },
  details: {
    color: "#6b7280",
    fontSize: "0.85rem",
    marginTop: "0.25rem",
  },
  icon: {
    marginRight: "1.25rem",
    color: "#374151",
    cursor: "pointer",
  },
  circle: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: "2px solid #ccc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  innerCircle: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: "#059669",
  },
};

export default CVUploadSection;

import ReactQuill from "react-quill"; // Import React Quill
import "react-quill/dist/quill.snow.css"; // Import React Quill's CSS

function TextAreaField({ field, value, change, required = false }) {
  const handleInputChange = (content) => {
    change(field.name, content); // Pass the content (HTML) to the parent component
  };

  return (
    <div className="form-group">
      <label
        htmlFor={field.name}
        className="p-text-secondary p-d-block p-mb-2 p-font-bold"
      >
        {field.label}
      </label>

      <ReactQuill
        theme="snow" // This is the theme, you can choose other themes like 'bubble'
        value={value[field.name]} // Bind the value to the field.name
        onChange={handleInputChange} // Handle change in content
        required={required} // Make the field required if needed
        modules={{
          toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["bold", "italic", "underline"],
            ["link"],
            [{ align: [] }],
            ["image"],
            ["clean"], // For clearing the content
          ],
        }}
        style={{ height: "200px" }}
        className="mb-5 pb-5"
      />
    </div>
  );
}

export default TextAreaField;

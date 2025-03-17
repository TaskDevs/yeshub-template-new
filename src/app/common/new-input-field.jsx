function NewInputField({ field, value, change, required = true }) {
  const handleInputChange = (e) => {
    if (typeof change === "function") {
      if (change.length === 2) {
        change(field.name, e.target.value);
      } else {
        change(e);
      }
    }
  };

  return (
    <div className="form-group mb-3">
      <input
        name={field.name}
        type={field.type}
        minLength={3}
        maxLength={50}
        required={required}
        className="p-inputtext p-p-2 p-border-round new-input-field new-form-control"
        placeholder={field.placeholder}
        value={value[field.name]}
        onChange={handleInputChange}
        style={{ width: '100%', fontSize: '1rem' }}
      />
    </div>
  );
}

export default NewInputField;

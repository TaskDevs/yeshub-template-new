import { useState, useEffect } from "react";

const DateField = ({ field, value, change }) => {
  console.log(field);
  const [date, setDate] = useState(value[field.name] || ""); // Initialize properly

  useEffect(() => {
    // Only update state if the external value is different to avoid unnecessary resets
    if (value[field.name] !== undefined && value[field.name] !== date) {
      setDate(value[field.name]);
    }
  }, [value, field.name]); // Depend on field.name to correctly track changes

  const handleInputChange = (e) => {
    setDate(e.target.value);
    change(e.target.value, field.name);
  };

  return (
    <div className="form-group">
      <label>{field.label}</label>
      <div className="ls-inputicon-box">
        <input
          className="form-control datepicker"
          data-provide="datepicker"
          name={field.name}
          type={field.type}
          value={date}
          placeholder={field.placeholder}
          onChange={handleInputChange}
        />
        <i className={field.icon} />
      </div>
    </div>
  );
};

export default DateField;

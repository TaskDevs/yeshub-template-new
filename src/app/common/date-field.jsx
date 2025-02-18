import { useState, useEffect } from "react";

const DateField = ({ field, value, change }) => {
  const [date, setDate] = useState(value[field.name] || "");

  useEffect(() => {
    setDate(value[field.name]); // Sync with external value updates
  }, [value, field.name]);

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

import { useState, useEffect } from "react";
import { Calendar } from "primereact/calendar";


const DateField = ({ field, value, change }) => {
  const [date, setDate] = useState(value[field.name] || null);

  useEffect(() => {
    if (value[field.name] !== undefined && value[field.name] !== date) {
      setDate(value[field.name]);
    }
  }, [value, field.name]);

  const handleDateChange = (e) => {
    setDate(e.value);
    change(e.value, field.name);
  };

  return (
    <div className="p-field p-mb-3">
      <label htmlFor={field.name} className="p-text-secondary p-d-block p-mb-2 p-font-bold">
        {field.label}
      </label>
      <div className="p-inputgroup p-shadow-3 p-rounded-lg">
        {field.icon && (
          <div className="p-inputgroup-addon p-d-flex p-ai-center p-jc-center p-px-3">
            <i className={field.icon} style={{ fontSize: "1.4rem", color: "#6c757d" }} />
          </div>
        )}
        <Calendar
          id={field.name}
          name={field.name}
          value={date}
          onChange={handleDateChange}
          placeholder={field.placeholder || "Select a date"}
          className="p-calendar p-p-3 p-border-round p-shadow-1"
          style={{ width: "100%", fontSize: "1rem" }}
          showIcon
          touchUI
          showButtonBar
        />
      </div>
    </div>
  );
};

export default DateField;

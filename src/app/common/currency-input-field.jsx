import React, { Component } from "react";
import { InputText } from "primereact/inputtext";

class CurrencyInputField extends Component {
  formatCurrency = (value) => {
    if (!value) return "";
    
    // Remove non-numeric characters except decimal point
    let numericValue = value.replace(/[^\d.]/g, "");

    // Format with commas for thousands separator
    let parts = numericValue.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return parts.join(".");
  };

  handleInputChange = (e) => {
    let rawValue = e.target.value.replace(/,/g, ""); // Remove commas for raw storage
    this.props.change(rawValue, this.props.field.name);
  };

  render() {
    const { field, value } = this.props;
    const formattedValue = this.formatCurrency(value[field.name] || "");

    return (
      <div className="p-field p-mb-3">
        <label
          htmlFor={field.name}
          className="p-text-secondary p-d-block p-mb-2 p-font-bold"
        >
          {field.label}
        </label>
        <div className="p-inputgroup">
          <span className="p-inputgroup-addon">GH₵</span>
          <InputText
            id={field.name}
            name={field.name}
            type="text"
            placeholder={field.placeholder}
            value={formattedValue}
            onChange={this.handleInputChange}
            className="p-inputtext p-p-2 p-border-round"
            style={{ width: "100%", fontSize: "1rem" }}
          />
        </div>
      </div>
    );
  }
}

export default CurrencyInputField;

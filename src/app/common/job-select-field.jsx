import React, { Component } from "react";
import { Dropdown } from "primereact/dropdown";


class JobSelectField extends Component {
  handleInputChange = (e) => {
    this.props.change(e.value, this.props.field.name);
  };

  render() {
    const { field, value, options } = this.props;
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
          <Dropdown
            id={field.id}
            name={field.name}
            value={value[field.name] || null}
            options={options}
            onChange={this.handleInputChange}
            placeholder={field.placeholder || "Select an option"}
            className="p-dropdown p-p-3 p-border-round p-shadow-1"
            optionLabel="name"
            optionValue="name"
            showClear
            filter
            style={{ width: "100%", fontSize: "1rem" }}
            pt={{
              item: { style: { padding: "8px 12px" } }, // Padding for each option
            }}
          />
        </div>
      </div>
    );
  }
}

export default JobSelectField;
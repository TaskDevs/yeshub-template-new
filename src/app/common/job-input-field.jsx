import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';


class JobInputField extends Component {
  handleInputChange = (e) => {
    this.props.change(e.target.value, this.props.field.name);
  };

  render() {
    const { field, value } = this.props;
    return (
      <div className="p-field p-mb-3">
        <label htmlFor={field.name} className="p-text-secondary p-d-block p-mb-2 p-font-bold">
          {field.label}
        </label>
        <div className="p-inputgroup">
          {field.icon && (
            <div className="p-inputgroup-addon">
              <i className={field.icon} style={{ fontSize: '1.2rem', color: '#6c757d' }} />
            </div>
          )}
          <InputText
            id={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={value[field.name] || ''}
            onChange={this.handleInputChange}
            className="p-inputtext p-p-2 p-border-round"
            style={{ width: '100%', fontSize: '1rem' }}
          />
        </div>
      </div>
    );
  }
}

export default JobInputField;

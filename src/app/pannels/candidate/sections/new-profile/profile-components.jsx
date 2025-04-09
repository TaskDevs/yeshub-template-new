import React, { useEffect, useRef } from 'react';
import { LuImagePlus } from 'react-icons/lu';
import { MdClose } from 'react-icons/md';
import { MdAdd } from 'react-icons/md';
import { RiCloseLine } from 'react-icons/ri';

/**
 * All profile form components
 */
export const ProfileSectionModal = ({
  isOpen,
  onClose,
  title,
  children,
  isSkillsSection,
  currentStepTitle,
}) => {
  // Only handle Escape key to close modal
  useEffect(() => {
    if (isOpen) {
      const handleEscape = (e) => {
        if (e.key === 'Escape') onClose();
      };

      document.addEventListener('keydown', handleEscape);

      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 zIndex2 bg-black bg-opacity-50 flex justify-end">
      <div
        className={`bg-white w-full ${isSkillsSection ? "max-w-4xl" : "max-w-2xl"}  zIndex2 mx-auto h-[95%] rounded-lg flex flex-col justify-center items-center transform transition-transform duration-300 ease-in-out translate-x-0`}
      >
        <div className="flex justify-between items-center px-6 p-5 border-b w-full">
          <h2 className="text-xl font-bold capitalize">{title} {currentStepTitle ?? ""}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <MdClose size={24} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 -mt-3 w-full flex  justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * Date input component
 */
export const DateInput = ({
  value = '',
  onChange,
  name,
  disabled = false,
  required = false,
  label = '',
  placeholder = "-/-/-"
}) => {
  return (
    <div className="form-group">
      {label && (
        <label className="text-sm text-gray-600 mb-1 block">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type="date"
          name={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          disabled={disabled}
          required={required}
          className="h-10 form-control w-full border rounded py-1 px-3 pr-10 appearance-none"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

/**
 *  Input Field component 
 */
export const FormInput = ({
  field,
  value,
  onChange,
  label,
  required = false,
  type = "text",
  placeholder = "",
  icon = null,
  className = ""
}) => {
  const handleChange = (e) => {
    if (typeof onChange === "function") {
      if (onChange.length === 2) {
        onChange(field, e.target.value);
      } else {
        onChange(e);
      }
    }
  };

  return (
    <div className={`form-group w-full mb-4 ${className}`}>
      {label && (
        <label className="text-sm text-gray-600 mb-1 block">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative ">
        <input
          name={field}
          type={type}
          required={required}
          className="w-full border rounded py-2 px-3 focus:outline-none focus:ring-1 focus:ring-green-500"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
        {icon && (
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
            {icon}
          </span>
        )}
      </div>
    </div>
  );
};

/**
 * Textarea component for descriptions
 */
export const FormTextarea = ({
  field,
  value,
  onChange,
  label,
  required = false,
  placeholder = "",
  rows = 5,
  className = ""
}) => {
  const handleChange = (e) => {
    if (typeof onChange === "function") {
      if (onChange.length === 2) {
        onChange(field, e.target.value);
      } else {
        onChange(e);
      }
    }
  };

  return (
    <div className={`form-group w-full mb-4 ${className}`}>
      {label && (
        <label className="text-sm text-gray-600 mb-1 block">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        name={field}
        required={required}
        className="w-full border rounded py-2 px-3 focus:outline-none focus:ring-1 focus:ring-green-500"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        rows={rows}
      />
    </div>
  );
};

/**
 * File Upload Component for Projects
 */
export const FileUpload = ({ files, onFileSelect, onFileDrop, onFileRemove, error }) => {
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="mt-4">
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer "
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDrop={onFileDrop}
      >
        <div className="flex flex-col items-center">
          <div className="text-gray-400 mb-2">
            <LuImagePlus className="mx-auto h-7 w-7 text-[#9CA3AF]" />
          </div>
          <p className="flex items-center justify-center gap-1 mb-2 text-sm text-gray-500">
            <span className="text-[#305718]">Upload images</span> or drag and drop
          </p>
          <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            onFileSelect(e.target.files);
            e.target.value = ''; // Reset input value after selection
          }}
        />
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {files.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {files.map((file, index) => (
            <div key={index} className="relative">
              <img
                src={file.preview}
                alt={file.name}
                className="w-full h-64 object-cover rounded-md"
              />
              <button
                className="absolute top-1 right-1 bg-white bg-opacity-70 rounded-full p-1 hover:bg-opacity-100"
                onClick={() => onFileRemove(index)}
              >
                <MdClose size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Skills Selection Components
 */
export const SkillItem = ({ skill, onSelect }) => {
  return (
    <div className="flex items-center justify-between p-2 ">
      <div className="flex gap-0 items-center">
        <input
          type="checkbox"
          id={`skill-${skill.name}`}
          checked={skill.selected}
          onChange={() => onSelect(skill)}
          className="mr-2"
        />
        <label htmlFor={`skill-${skill.name}`} className="cursor-pointer">
          {skill.name}
        </label>
      </div>
      <span className="text-gray-500 text-sm">{skill.category}</span>
    </div>
  );
};
export const SelectedSkill = ({ skill, onRemove }) => {
  return (
    <div className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 mb-2">
      <span className="text-sm">{skill.name}</span>
      <button
        onClick={() => onRemove(skill.name)}
        className="ml-1 text-gray-500 hover:text-gray-700"
      >
        <RiCloseLine size={16} />
      </button>
    </div>
  );
};

export const RecommendedSkill = ({ skill, onAdd }) => {
  return (
    <div
      className="inline-flex items-center rounded-sm bg-gray-100 px-3 py-1 mb-2 cursor-pointer hover:bg-gray-100"
      onClick={() => onAdd(skill)}
    >
      <MdAdd size={16} className="mr-1 text-green-700" />
      <span className="text-sm">{skill.name}</span>
    </div>
  );
};

/**
 * Button components
 */
export const PrimaryButton = ({ children, onClick, disabled = false, className = "" }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`bg-green-800 text-white px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
  >
    {children}
  </button>
);

export const SecondaryButton = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded border text-gray-700  ${className}`}
  >
    {children}
  </button>
);

export const TertiaryButton = ({ children, onClick, icon, className = "" }) => (
  <button
    onClick={onClick}
    className={`flex items-center text-gray-600  ${className}`}
  >
    {icon && <span className="mr-1">{icon}</span>}
    {children}
  </button>
);
import { useState } from "react";

/**
 * Custom hook for managing form state across different profile sections
 * Provides functionality for form handling, validation, and submission
 */

export const useTeamForm = (initialState = {}, onSubmit = () => {}) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input change for any field
  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Basic validation function
  const validate = () => {
    const newErrors = {};

    // Check required fields
    Object.entries(formData).forEach(([key, value]) => {
      // Check if field is marked as required in the validation schema
      if (
        validationSchema[key]?.required &&
        (value === undefined || value === null || value === "")
      ) {
        newErrors[key] = "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    setIsSubmitting(true);

    if (validate()) {
      try {
        await onSubmit(formData);
        // Reset form after successful submission if needed
        // setFormData(initialState);
      } catch (error) {
        console.error("Form submission error:", error);
        setErrors((prev) => ({
          ...prev,
          form: "Submission failed. Please try again.",
        }));
      }
    }

    setIsSubmitting(false);
  };

  //  validation schema
  const validationSchema = {
    // Fields that are required
    // Example: jobTitle: { required: true }
  };

  // Reset the form to initial state
  const resetForm = () => {
    setFormData(initialState);
    setErrors({});
  };

  // Clear all fields
  const clearAll = () => {
    const clearedData = {};
    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        clearedData[key] = [];
      } else if (typeof formData[key] === "boolean") {
        clearedData[key] = false;
      } else {
        clearedData[key] = "";
      }
    });
    setFormData(clearedData);
    setErrors({});
  };

  return {
    formData,
    setFormData,
    errors,
    handleInputChange,
    handleSubmit,
    isSubmitting,
    setIsSubmitting,
    resetForm,
    clearAll,
    validate,
  };
};

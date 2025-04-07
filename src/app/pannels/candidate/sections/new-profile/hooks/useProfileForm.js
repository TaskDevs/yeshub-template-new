import { useState } from 'react';

/**
 * Custom hook for managing form state across different profile sections
 * Provides functionality for form handling, validation, and submission
 */
export const useProfileForm = (initialState = {}, onSubmit = () => {}) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input change for any field
  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle checkbox toggle
  const handleCheckboxChange = (name) => {
    setFormData(prev => ({ ...prev, [name]: !prev[name] }));
  };

  // Handle date change
  const handleDateChange = (name, date) => {
    setFormData(prev => ({ ...prev, [name]: date }));
  };

  // Basic validation function
  const validate = () => {
    const newErrors = {};
    
    // Check required fields
    Object.entries(formData).forEach(([key, value]) => {
      // Check if field is marked as required in the validation schema
      if (validationSchema[key]?.required && 
          (value === undefined || value === null || value === '')) {
        newErrors[key] = 'This field is required';
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
        console.error('Form submission error:', error);
        setErrors(prev => ({ ...prev, form: 'Submission failed. Please try again.' }));
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
    Object.keys(formData).forEach(key => {
      if (Array.isArray(formData[key])) {
        clearedData[key] = [];
      } else if (typeof formData[key] === 'boolean') {
        clearedData[key] = false;
      } else {
        clearedData[key] = '';
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
    handleCheckboxChange,
    handleDateChange,
    handleSubmit,
    isSubmitting,
    resetForm,
    clearAll,
    validate
  };
};

/**
 * Custom hook for managing skills selection
 */
export const useSkillsForm = (initialSelectedSkills = []) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedSkills, setSelectedSkills] = useState(initialSelectedSkills);
  
  // Sample skill categories for dropdown
  const categories = ['All Categories', 'Programming', 'Framework', 'Backend', 'Database', 'DevOps'];
  
  // Sample available skills by category
  const availableSkillsData = {
    'Programming': [
      { name: 'JavaScript', category: 'Programming' },
      { name: 'TypeScript', category: 'Programming' },
      { name: 'Python', category: 'Programming' },
      { name: 'Java', category: 'Programming' },
      { name: 'C#', category: 'Programming' },
    ],
    'Framework': [
      { name: 'React', category: 'Framework' },
      { name: 'Angular', category: 'Framework' },
      { name: 'Vue.js', category: 'Framework' },
      { name: 'Express', category: 'Framework' },
    ],
    'Backend': [
      { name: 'Node.js', category: 'Backend' },
      { name: 'Django', category: 'Backend' },
      { name: 'Flask', category: 'Backend' },
      { name: 'Ruby on Rails', category: 'Backend' },
    ],
    'Database': [
      { name: 'MongoDB', category: 'Database' },
      { name: 'PostgreSQL', category: 'Database' },
      { name: 'MySQL', category: 'Database' },
      { name: 'Redis', category: 'Database' },
    ],
    'DevOps': [
      { name: 'Docker', category: 'DevOps' },
      { name: 'Kubernetes', category: 'DevOps' },
      { name: 'AWS', category: 'DevOps' },
      { name: 'Azure', category: 'DevOps' },
      { name: 'GraphQL', category: 'DevOps' },
    ],
  };

  // Sample recommended skills
  const recommendedSkills = [
    { name: 'Docker', category: 'DevOps' },
    { name: 'AWS', category: 'DevOps' },
    { name: 'GraphQL', category: 'DevOps' },
  ];

  // Get filtered skills based on search and category
  const getFilteredSkills = () => {
    let filtered = [];
    
    // If All Categories is selected, combine all skills
    if (selectedCategory === 'All Categories') {
      filtered = Object.values(availableSkillsData).flat();
    } else {
      filtered = availableSkillsData[selectedCategory] || [];
    }
    
    // Filter by search term if present
    if (searchValue) {
      filtered = filtered.filter(skill => 
        skill.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    
    // Filter out already selected skills
    return filtered.filter(skill => 
      !selectedSkills.some(selected => selected.name === skill.name)
    );
  };

  // Add a skill to selected skills
  const addSkill = (skill) => {
    if (!selectedSkills.some(s => s.name === skill.name)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  // Remove a skill from selected skills
  const removeSkill = (skillName) => {
    setSelectedSkills(selectedSkills.filter(skill => skill.name !== skillName));
  };

  // Clear all selected skills
  const clearAllSkills = () => {
    setSelectedSkills([]);
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return {
    searchValue,
    setSearchValue,
    selectedCategory,
    categories,
    selectedSkills,
    setSelectedSkills,
    availableSkills: getFilteredSkills(),
    recommendedSkills,
    addSkill,
    removeSkill,
    clearAllSkills,
    handleCategoryChange
  };
};

/**
 * Custom hook for file upload handling
 */
export const useFileUpload = (maxFileSize = 10) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  // Handle file selection
  const handleFileSelect = (selectedFiles) => {
    const fileArray = Array.from(selectedFiles);
    
    // Validate file size (in MB)
    const validFiles = fileArray.filter(file => {
      const fileSizeInMB = file.size / (1024 * 1024);
      const isValidSize = fileSizeInMB <= maxFileSize;
      
      if (!isValidSize) {
        setUploadError(`File "${file.name}" exceeds the ${maxFileSize}MB limit`);
        setTimeout(() => setUploadError(null), 3000);
      }
      
      return isValidSize;
    });
    
    // Create preview URLs for images
    const newFiles = validFiles.map(file => ({
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      preview: URL.createObjectURL(file)
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
  };

  // Handle file drop
  const handleFileDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  // Remove a file
  const removeFile = (fileIndex) => {
    setFiles(prev => {
      const newFiles = [...prev];
      // Revoke object URL to avoid memory leaks
      URL.revokeObjectURL(newFiles[fileIndex].preview);
      newFiles.splice(fileIndex, 1);
      return newFiles;
    });
  };

  // Clear all files
  const clearFiles = () => {
    // Revoke all object URLs
    files.forEach(file => {
      if (file.preview) URL.revokeObjectURL(file.preview);
    });
    setFiles([]);
  };

  // Clean up function to revoke object URLs when component unmounts
  const cleanup = () => {
    files.forEach(file => {
      if (file.preview) URL.revokeObjectURL(file.preview);
    });
  };

  return {
    files,
    uploading,
    setUploading,
    uploadError,
    handleFileSelect,
    handleFileDrop,
    removeFile,
    clearFiles,
    cleanup
  };
};
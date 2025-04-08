import { useState } from 'react';

export const useFilterForm = (initial = {}) => {
  const [filters, setFilters] = useState({
    date: '',
    status: [],
    jobTypes: [],
    salaryRange: { min: 0, max: 200000 },
    experienceLevel: '',
    skills: [],
    ...initial,
  });

  const handleChange = (key) => (value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return {
    filters,
    setFilters,
    handleChange,
  };
};

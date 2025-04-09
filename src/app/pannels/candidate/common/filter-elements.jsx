export function filterElements(elements, filters) {
    return elements.filter((element) => {
      let match = true;
  
      for (const key in filters) {
        const value = filters[key];
  
        if (value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) {
          continue; // Skip empty filters
        }
  
        let now, savedDate, salary;
  
        switch (key) {
          case 'date':
            // Map keywords to actual date logic
            now = new Date();
            savedDate = new Date(element.date);
  
            if (value === 'last 24 hours') {
              match = match && (now.getTime() - savedDate.getTime()) <= 24 * 60 * 60 * 1000;
            } else if (value === 'last week') {
              match = match && (now.getTime() - savedDate.getTime()) <= 7 * 24 * 60 * 60 * 1000;
            } else if (value === 'last month') {
              match = match && (now.getTime() - savedDate.getTime()) <= 30 * 24 * 60 * 60 * 1000;
            }
            break;
  
          case 'status':
          case 'skills':
          case 'jobTypes':
            // These are arrays (checkboxes)
            match = match && value.includes(element[key]);
            break;
  
          case 'experienceLevel':
          case 'jobType':
            // Single-value filters
            match = match && element[key] === value;
            break;
  
          case 'salaryRange':
            salary = parseFloat(element.salary);
            match =
              match &&
              (value.min === undefined || salary >= value.min) &&
              (value.max === undefined || salary <= value.max);
            break;
  
          default:
            match = match && element[key] === value;
        }
  
        if (!match) break;
      }
  
      return match;
    });
  }
const readableDate = (dateString) => {
  if (!dateString) return "Invalid date"; // Handle empty values

  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

export default readableDate;



export const extractYear = (dateString) => {
  if (!dateString) return "Invalid date"; 
  const date = new Date(dateString);
  
  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid date"; 
  }

  return date.getFullYear(); 
};



export const extractTime = (dateString) => {
  if (!dateString) return "Invalid date"; 
  const date = new Date(dateString);
  
  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid date"; 
  }

  return date.getTime(); 
};


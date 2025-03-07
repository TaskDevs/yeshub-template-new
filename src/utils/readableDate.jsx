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



  // Function to calculate the number of days left
  export const calculateDaysLeft = (start_date, end_date) => {
    new Date(start_date);
     const endDate = new Date(end_date);
     const today = new Date();
 
     // If the job period is already over
     if (today > endDate) {
       return 0; // No days left
     }
 
     const timeDiff = endDate.getTime() - today.getTime();
     return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert to days
   };


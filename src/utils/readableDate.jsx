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


export const extractYearAndMonth = (dateString) => {
  if (!dateString) return "Invalid date";
  
  const date = new Date(dateString);
  
  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  // Get month (0-11) and add 1 to get 1-12
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // Format month as two digits
  const formattedMonth = month.toString().padStart(2, '0');

  return `${formattedMonth}/${year}`;
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



   export function calculateDaysSincePosted(startDate) {
    try {
      // Convert the startDate string to a Date object
      const postedDate = new Date(startDate);
  
      const nowAccra = new Date();
  
      // Calculate the difference in milliseconds
      const timeDifference = nowAccra.getTime() - postedDate.getTime();
  
      // Calculate the difference in minutes
      const minutesDifference = Math.floor(timeDifference / (1000 * 60));
  
      if (minutesDifference < 60) {
        return `${minutesDifference} minutes ago`;
      } else {
        // Calculate the difference in hours
        const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
  
        if (hoursDifference < 24) {
          return `${hoursDifference} hours ago`;
        } else {
          // Calculate the difference in days
          const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
          return `${daysDifference} days ago`;
        }
      }
    } catch (error) {
      console.error("Error parsing start date:", error);
      return null; // Or some other value indicating an error
    }
  }

  

  // export function calculateDaysSincePosted(startDate) {
  //   try {
  //     // Convert the startDate string to a Date object
  //     const postedDate = new Date(startDate);
  
  //     const nowAccra = new Date();
  
  //     // Calculate the difference in milliseconds
  //     const timeDifference = nowAccra.getTime() - postedDate.getTime();
  
  //     // Calculate the difference in days
  //     const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
  //     if (daysDifference < 1) {
  //       // If less than a day, calculate minutes
  //       const minutesDifference = Math.floor(timeDifference / (1000 * 60));
  //       return `${minutesDifference} minutes ago`;
  //     } else {
  //       return `${daysDifference} days ago`;
  //     }
  //   } catch (error) {
  //     console.error("Error parsing start date:", error);
  //     return null; // Or some other value indicating an error
  //   }
  // }
  
 


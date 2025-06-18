export const formatDate = (rawDate) => {
  if (!rawDate) return "";

  const date = new Date(rawDate);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const getDaysLeft = (startDate, endDate) => {
  if (!startDate || !endDate) return 0;

  const start = new Date(startDate);
  const end = new Date(endDate);

  // Calculate the difference in milliseconds
  const diffTime = end.getTime() - start.getTime();

  // Convert milliseconds to days
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays > 0 ? diffDays : 0;
};

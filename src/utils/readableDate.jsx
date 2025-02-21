const readableDate = (dateString) => {
  if (!dateString) return "Invalid date"; // Handle empty values

  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

export default readableDate;

export const generateRefNo = () => {
  const date = new Date()
    .toISOString()
    .replace(/[-:.TZ]/g, "")
    .slice(0, 14);
  const random = Math.floor(Math.random() * 900 + 100); // 3-digit random
  return `REF${date}${random}`;
};

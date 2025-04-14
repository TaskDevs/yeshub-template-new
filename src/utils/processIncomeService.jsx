export function processIncomeService(serviceString) {
  if (!serviceString || typeof serviceString !== "string") return [];

  return serviceString
    .trim()
    .split("||")
    .filter(Boolean)
    .map((record) => {
      const obj = {};
      record
        .trim()
        .split(",")
        .forEach((pair) => {
          const [key, value] = pair.split(":").map((str) => str.trim());
          if (key && value !== undefined) {
            obj[key] = value;
          }
        });
      return obj;
    });
}

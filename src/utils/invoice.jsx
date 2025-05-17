export function generateInvoiceNumber(sequenceNumber) {
  const year = new Date().getFullYear();
  const paddedNumber = String(sequenceNumber).padStart(4, "0");
  return `INV-${year}-${paddedNumber}`;
}

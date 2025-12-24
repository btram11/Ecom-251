/**
 * Format UUID to readable order code: #ORD-20251224-AB12EF
 * @param uuid - The order UUID
 * @param createdAt - The order creation date
 * @returns Formatted order ID like #ORD-20251224-AB12EF
 */
export const formatOrderId = (uuid: string, createdAt: string): string => {
  const date = new Date(createdAt);
  const dateStr = date
    .toLocaleDateString("en-CA")
    .replace(/-/g, "");
  const shortCode = uuid
    .replace(/-/g, "")
    .substring(0, 6)
    .toUpperCase();
  return `#ORD-${dateStr}-${shortCode}`;
};

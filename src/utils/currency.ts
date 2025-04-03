
/**
 * Formats a number as Indian Rupee currency
 * @param amount - The amount to format
 * @param decimals - Number of decimal places (default: 0)
 * @returns Formatted string with ₹ symbol
 */
export function formatInIndianRupees(amount: number, decimals = 0): string {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  
  return formatter.format(amount);
}

/**
 * Converts a string formatted as Indian Rupee currency to a number
 * @param formattedAmount - The formatted amount (e.g., "₹ 1,00,000")
 * @returns The numeric value
 */
export function parseIndianRupeeFormat(formattedAmount: string): number {
  // Remove the Rupee symbol, commas, and any whitespace
  const cleanedString = formattedAmount.replace(/[₹,\s]/g, '');
  return Number(cleanedString) || 0;
}

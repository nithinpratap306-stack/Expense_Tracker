/**
 * Format number to Indian Rupee representation (e.g. ₹4,760 or ₹1,20,500)
 * @param {number|string} amount
 * @param {boolean} showFraction
 * @returns {string}
 */
export function formatCurrency(amount, showFraction = false) {
  const numericAmount = Number(amount);
  if (isNaN(numericAmount)) return "₹0";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: showFraction ? 2 : 0,
    minimumFractionDigits: showFraction ? 2 : 0,
  }).format(numericAmount);
}

/**
 * Format a decimal or percentage number (e.g. 59.5%)
 * @param {number} value
 * @param {number} digits
 * @returns {string}
 */
export function formatPercent(value, digits = 1) {
  const num = Number(value);
  if (isNaN(num) || !isFinite(num)) return "0%";
  return `${num.toFixed(digits)}%`;
}

/**
 * Format date string (YYYY-MM-DD) into readable human-friendly label
 * @param {string} dateString
 * @param {'short'|'medium'|'full'} format
 * @returns {string}
 */
export function formatDate(dateString, format = 'medium') {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  if (format === 'short') {
    // "Sep 4"
    return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
  }

  if (format === 'full') {
    // "September 4, 2026"
    return date.toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' });
  }

  // "Sep 04, 2026"
  return date.toLocaleDateString('en-IN', { month: 'short', day: '2-digit', year: 'numeric' });
}

/**
 * Capitalize first letter helper
 */
export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

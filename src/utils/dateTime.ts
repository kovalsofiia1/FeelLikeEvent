/**
 * Get the formatted date from an ISO string.
 * @param {string} isoString - The ISO date string.
 * @returns {string} - Formatted date in 'YYYY-MM-DD' format.
 */
export function getDate(isoString: string) {
  const date = new Date(isoString);
  return date.toISOString().split('T')[0]; // Returns 'YYYY-MM-DD'
}

/**
 * Get the formatted time from an ISO string.
 * @param {string} isoString - The ISO date string.
 * @returns {string} - Formatted time in 'HH:MM AM/PM' format.
 */
export function getTime(isoString: string) {
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Localized time
}
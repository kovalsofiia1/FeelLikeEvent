/**
 * Get the formatted date from an ISO string.
 * @param {string} isoString - The ISO date string.
 * @returns {string} - Formatted date in 'YYYY-MM-DD' format.
 */
// export function getDate(isoString: string) {
//   const date = new Date(isoString);
//   return date.toISOString().split('T')[0]; // Returns 'YYYY-MM-DD'
// }

export function getDate(isoString: string) {
  if (!isoString) return;
  const date = new Date(isoString);
  const formattedDate = new Intl.DateTimeFormat('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);

  return formattedDate.replace(/\//g, '.'); // Ensure dots as separators
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
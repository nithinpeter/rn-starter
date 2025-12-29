/**
 * Converts a string to title case (capitalizes the first letter of each word)
 * @param str - The string to convert
 * @returns The string in title case
 * @example toTitleCase('hello world') // 'Hello World'
 * @example toTitleCase('UPPER case') // 'Upper Case'
 */
export function toTitleCase(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

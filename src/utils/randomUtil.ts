/**
 * Generate a random number within a specified range.
 * @param min Minimum value.
 * @param max Maximum value.
 * @param decimal Decimal places.
 * @returns {number} Random number.
 */
export const random = (min: number, max: number, decimal: number): number => {
  return Number((Math.random() * (max - min + 1) + min).toFixed(decimal));
};

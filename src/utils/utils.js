import { random } from "lodash";

/**
 * Generates a random index between 0 and 999.
 * @returns {number} The generated random index.
 */
export const generateRandomIndex = () => {
  return random(0, 99999);
};

/**
 * Checks if all values in the searchValues object are empty.
 * @param {Object} searchValues - The search values object to check.
 * @returns {boolean} True if all values are empty, false otherwise.
 */
export const areAllValuesEmpty = (searchValues) => {
  return (
    Object.keys(searchValues).length > 0 &&
    Object.values(searchValues).every((value) => value === "")
  );
};

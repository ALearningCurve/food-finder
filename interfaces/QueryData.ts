/**
 * An interface representing information entered by the user to find food near them.
 */
interface QueryData {
  /** Whether or not to search to for only vegetarian restaurants */
  onlyVegetarian: boolean;
  /** The limit on the cost of the restaurants to return */
  price: String;
  /** The minimum rating on the restaurants to return */
  rating: String;
  /** The location of the user (expected to be a string in the form lat,long) */
  location: String;
  /** The search radius */
  locatedWithin?: number;
}

export default QueryData;

/**
 * Function to check if an instance of an object is an instance of QueryData interface.
 * @param obj Object to check if it is QueryData instance
 * @returns True if given `obj` is QueryData
 */
export function isQueryData(obj: any): obj is QueryData {
  return (
    "onlyVegetarian" in obj &&
    "price" in obj &&
    "rating" in obj &&
    "location" in obj
  );
}

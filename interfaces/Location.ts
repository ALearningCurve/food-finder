/**
 * Represensts a physical, real world location as returned by the Bing Location API.
 */
export interface Location {
  name: string;
  address: Address;
  phone: string;
  website: string;
  coordinates: [number, number];
}

/**
 * Represents an physical, real world address as returned by the Bing Location API.
 */
export interface Address {
  addressLine: string;
  adminDistract: string;
  countryRegion: string;
  formattedAddress: string;
  locality: string;
  postalCode: string;
}

export interface Location {
    name: string,
    address: Address,
    phone: string,
    website: string,
    coordinates: [number, number]
}

export interface Address {
    addressLine: string,
    adminDistract: string,
    countryRegion: string,
    formattedAddress: string,
    locality: string,
    postalCode: string
}


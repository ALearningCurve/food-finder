interface QueryData {
    onlyVegetarian: boolean,
    price: String,
    rating: String,
    location: any,
    locatedWithin?: number
}

export default QueryData;

export function isQueryData(obj: any): obj is QueryData {
    return "onlyVegetarian" in obj
        && "price" in obj
        && "rating" in obj
        && "location" in obj;
}
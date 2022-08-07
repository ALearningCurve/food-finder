interface QueryData {
    type: String,
    price: String,
    rating: String,
    location: any
}

export default QueryData;

export function isQueryData(obj: any): obj is QueryData {
    return "type" in obj
        && "price" in obj
        && "rating" in obj
        && "location" in obj;
}
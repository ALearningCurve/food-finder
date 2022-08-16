import { Location } from "../../interfaces/Location"
import SimpleAddress from "./address";

/**
 * display the Location as a card
 * @param location the location to display information for 
 * @returns 
 */
export default function LocationInformation({ location }: { location: Location }) {

    if (location == null) {
        return <h1>Location could not be displayed 😔</h1>
    }

    return (
        <div className="border border-rounded mb-2 p-2 w-full">
            <h1>{location.name}</h1>
            <div className="text-sm pl-2">
                <p>
                    {location.phone}
                </p>
                <div>
                    <SimpleAddress address={location.address}></SimpleAddress>
                </div>
                <a className="text-blue-600 underline" target="_blank" rel="noreferrer" href={location.website}>Web Site</a>
            </div>
        </div>
    )
}
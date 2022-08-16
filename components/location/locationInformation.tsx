import { Location } from "../../interfaces/Location"
import SimpleAddress from "./address";

export default function LocationInformation(props: { location: Location }) {
    const { location } = props;
    return (
        <div className="border border-rounded mb-2 p-2 w-full">
            <h1>{location.name}</h1>
            <div className="text-sm pl-2">
                <p>
                    {location.phone}
                </p>
                <p>
                    <SimpleAddress address={location.address}></SimpleAddress>
                </p>
                <a className="text-blue-600 underline" target="_blank" rel="noreferrer" href={location.website}>Web Site</a>
            </div>
        </div>
    )
}
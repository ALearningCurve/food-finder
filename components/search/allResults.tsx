import { Location } from "../../interfaces/Location";
import LocationInformation from "../location/locationInformation";

export default function AllResults({ locations }: { locations: Location[] }) {
    return <ul>
        {locations.map(l => <li key={l.website}>
            <LocationInformation location={l} ></LocationInformation>
        </li>)}
    </ul>
}
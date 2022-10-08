import { Location } from "../../interfaces/Location";
import LocationInformation from "../location/locationInformation";

/**
 * Component for displaying each location in the provided list of locations as a list.
 * @param locations the list of locaitons to display
 * @returns JSX for a list of locations
 */
export default function AllResults({ locations }: { locations: Location[] }) {
  return (
    <ul>
      {locations.map((l) => (
        <li key={l.website}>
          <LocationInformation location={l}></LocationInformation>
        </li>
      ))}
    </ul>
  );
}

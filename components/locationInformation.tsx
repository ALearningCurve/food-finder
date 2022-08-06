import { Location } from "../interfaces/Location"

export default function LocationInformation(props: { location: Location }) {
    const { location } = props;
    return (
        <p> location {location.name}</p>
    )
}
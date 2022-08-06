import LocationInformation from "./locationInformation";
import { Location } from "../interfaces/Location";
import QueryData from "../interfaces/QueryData";
import { useEffect, useState } from "react";

export default function LocationResults(props: { queryData: QueryData }) {
    const { queryData } = props;
    const [locations, setLocations] = useState<Location[]>();
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    const [error, setRrror] = useState<Boolean>(false);


    useEffect(() => {
        setIsLoading(true)
        fetch('/api/maps')
            .then((res) => res.json())
            .then((data) => {
                setLocations(data.locations);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);

            });
    }, [])

    if (locations == undefined || locations.length == 0) {
        return (<h1>No Results 😢</h1>)
    }

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>An error has occurred while finding food near you 😔</h1>
    }

    return (
        <div>
            <h1>Results</h1>
            <ul>
                {locations.map(l => <li key={l.website}>
                    <LocationInformation location={l} ></LocationInformation>
                </li>)}
            </ul>
        </div>
    )
}
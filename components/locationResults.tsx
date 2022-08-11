import LocationInformation from "./locationInformation";
import { Location } from "../interfaces/Location";
import QueryData from "../interfaces/QueryData";
import { useEffect, useState } from "react";

export default function LocationResults(props: { queryData: QueryData }) {
    const { queryData } = props;
    const [locations, setLocations] = useState<Location[]>();
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    const [error, setError] = useState<Boolean>(false);


    useEffect(() => {
        console.log(queryData)
        setIsLoading(true);
        fetch('/api/map/search', {
            body: JSON.stringify(queryData),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return res.text().then(t => {
                    throw new Error("" + res.status + " " + t);
                });
            })
            .then((data) => {
                setLocations(data.locations);
                setIsLoading(false);
                setError(false);
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
                setError(true);
            });
        return () => console.log("Cleanup..");
    }, [queryData])



    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>An error has occurred while finding food near you 😔</h1>
    }

    if (locations == undefined || locations.length == 0) {
        return (<h1>No Results 😢</h1>)
    }

    return (
        <div>
            <h1 className="text-2xl leading-loose font-extrabold">Results</h1>
            <ul>
                {locations.map(l => <li key={l.website}>
                    <LocationInformation location={l} ></LocationInformation>
                </li>)}
            </ul>
        </div>
    )
}
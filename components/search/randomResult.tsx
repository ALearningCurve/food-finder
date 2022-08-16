import { useEffect, useState } from "react";
import { Location } from "../../interfaces/Location";
import LocationInformation from "../location/locationInformation";

export default function RandomResult({ whenDone, locations }: { whenDone: () => any, locations: Location[] }) {

    const [randomLocations, setRandomLocations] = useState(shuffle(locations));
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index >= randomLocations.length) {
            whenDone();
        }
    }, [index, randomLocations, whenDone])

    return (
        <div>
            <LocationInformation location={randomLocations[index]}></LocationInformation>
            <button onClick={e => setIndex(index + 1)}>next</button>
        </div>
    );
}

function shuffle<T>(arr: T[]) {
    // clone the array of locations to then randomly pop elements off of
    const worklist = [...arr];
    const stack = []
    while (worklist.length > 0) {
        const randIndx = Math.floor(Math.random() * worklist.length);
        stack.push(worklist.splice(randIndx, 1)[0])
    }
    return stack
}
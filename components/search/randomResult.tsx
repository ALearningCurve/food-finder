import { useEffect, useState } from "react";
import { Location } from "../../interfaces/Location";
import LocationInformation from "../location/locationInformation";

/**
 * Randomly displays a location in the provided list of locations one by one. Once all the locations
 * have randomly been seen by the user, then the callback whenDone is called.
 * @param props Has two fields: whenDone and locations. whenDone is a callback function that is called when there are no
 * more elements that have randomly been seen. locations is the lust of locations that will be displayed in random order.
 * @returns JSX for randomly viewing results
 */
export default function RandomResult({
  whenDone,
  locations,
}: {
  whenDone: () => any;
  locations: Location[];
}) {
  // set up state
  const [randomLocations, setRandomLocations] = useState(shuffle(locations));
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= randomLocations.length) {
      whenDone();
    }
  }, [index, randomLocations, whenDone]);

  /**
   * Increments the index to show the next location
   */
  const incrementIndex = () => setIndex(index + 1);

  return (
    <div>
      {index >= randomLocations.length ? (
        <p>No More Elements</p>
      ) : (
        <LocationInformation
          location={randomLocations[index]}
        ></LocationInformation>
      )}

      <button
        className="border rounded text-white bg-green-800 p-3"
        onClick={incrementIndex}
      >
        Next Result
      </button>
    </div>
  );
}

/**
 * Shuffles a list of elements ad then returns that list of elements.
 * @param arr array to shuffle
 * @returns the shuffled array
 */
function shuffle<T>(arr: T[]) {
  // clone the array of locations to then randomly pop elements off of
  const worklist = [...arr];
  const queue = [];
  while (worklist.length > 0) {
    const randIndx = Math.floor(Math.random() * worklist.length);
    queue.push(worklist.splice(randIndx, 1)[0]);
  }
  return queue;
}

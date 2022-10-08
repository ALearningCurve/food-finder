import LocationInformation from "../location/locationInformation";
import { Location } from "../../interfaces/Location";
import QueryData from "../../interfaces/QueryData";
import { useEffect, useState } from "react";
import AllResults from "./allResults";
import RandomResult from "./randomResult";

/**
 * Given query data, proceed to send query data to the API to get a list of locations
 * and the display that list of locations to the user.
 * @param props queryData: the query data to use to search for locations
 * @returns
 */
export default function LocationResults(props: { queryData: QueryData }) {
  const { queryData } = props;
  // Keep track of all the locations for the given query data returned by the API
  const [locations, setLocations] = useState<Location[]>();
  // Whether or not the api is loading
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  // if an error has occured while fetching the locations from the API display it here
  const [error, setError] = useState<Boolean>(false);
  // whether or not the use has already viewed all the results that have been returned from the API
  const [areResultsDepleted, setAreResultsDepleted] = useState(false);

  // Every time new query data arrives, get the new locations from the API
  useEffect(() => {
    setIsLoading(true);
    setAreResultsDepleted(false);
    setError(false);

    // fetch data from api
    fetch("/api/map/search", {
      body: JSON.stringify(queryData),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((res) => {
        // if HTTP status is not OK, then throw an error (fetch does not throw error for bad HTTP status)
        if (res.ok) {
          return res.json();
        }
        return res.text().then((t) => {
          throw new Error("" + res.status + " " + t);
        });
      })
      .then((data) => {
        setLocations(data.locations);
        setIsLoading(false);
        setError(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        setError(true);
      });
    return () => console.log("Cleanup..");
  }, [queryData]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>An error has occurred while finding food near you 😔</h1>;
  }

  if (locations == undefined || locations.length == 0) {
    return <h1>No Food Near You 😢</h1>;
  }

  return (
    <div>
      <h1 className="text-2xl leading-loose font-extrabold">Results</h1>
      <p>
        Down below see the restaurants near you presented randomly one at a
        time. Once you see every restaurant, all the restaurants will be shown
        at once.
      </p>
      {/* While the user has not viewed all the locations, we want them to 
            randomly view them, but after viewing all the locations we want to display the 
            locations in a list */}
      <div className="mt-4">
        {areResultsDepleted ? (
          <AllResults locations={locations}></AllResults>
        ) : (
          <RandomResult
            locations={locations}
            whenDone={() => setAreResultsDepleted(true)}
          ></RandomResult>
        )}
      </div>
      <sub className="text-grey">
        Found {locations.length} restaurants near you matching your search
        criteria!
      </sub>
    </div>
  );
}

import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorMessage } from "../../../interfaces/ErrorMessage";
import { Location } from "../../../interfaces/Location";
import QueryData, { isQueryData } from "../../../interfaces/QueryData";
{
}

/**
 * API method that will use the information provided in the body of the request to get the
 * locations of restaurants matching the criteria in the query data.
 *
 * The api needs to use post because we want all the search parameters (query data) from the client.
 * To put all this information into specific routes is tedious. Therefore, even though this is a
 * method that GETs information from the maps api, it should be accessed with post or the like
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ locations: Location[] } | ErrorMessage>
) {
  // make sure that only post requests are allowed
  if (req.method !== "POST") {
    res.status(405).send({ errorMessage: "Only POST requests allowed" });
    return;
  }

  let body = req.body;
  // if there is no body, then we want to return an error
  if (body == null || !isQueryData(body)) {
    res
      .status(400)
      .send({ errorMessage: "expected body to be of type QueryData" });
    return;
  }

  // using the data provided by the user, we want to tranform the parameters to
  // values used by the Bing Location API
  const allResults: Location[] = [];

  // Map onlyVegetarian to values used by Bing
  const type = body.onlyVegetarian
    ? "VegetarianAndVeganRestaurants"
    : "EatDrink,TakeAway,FastFood";

  // set the location of the user into the request
  let location = "userLocation=" + body.location;
  if ("locatedWithin" in body) {
    const max = 5000;
    // get the range provided by the user clamped between 0 and max
    let range = Math.round(body.locatedWithin ?? max);
    range = Math.max(0, Math.min(range, max));
    // update location to use a range around a point instead of a specific point
    location = `userCircularMapView=${body.location},${range}`;
  }

  // create the request URL that will be passed to the bing API
  const url = `${process.env.BING_SEARCH_URL}?type=${type}&${location}&maxResults=25&key=${process.env.BING_KEY}`;

  // try to make the request
  try {
    const bingRes = await fetch(url);
    // if the fetch fails for any reason return error
    if (bingRes == null || !bingRes.ok) {
      throw Error("Could not fetch map data");
    }
    // get the response json and return it
    const json = await bingRes.json();
    // if the results are null, then just use an empty array to simulate the results
    const results: any[] =
      json.resourceSets.flatMap((r: any) => r.resources) ?? [];

    // TODO: Determine what resourceSets are and what resourceSet[n].estimatedTotal is
    // map the returned JSON to our data type so that it can be displayed in the browser:
    // convert our results array into the interface type that we defined for
    // results
    results.forEach((res) => {
      allResults.push({
        name: res.name,
        phone: res.PhoneNumber,
        website: res.Website,
        coordinates: res["point"]["coordinates"],
        address: res["Address"],
      });
    });
  } catch (error: any) {
    // if the error is a standard error thrown by JS code, then we can just get the message
    if (error instanceof Error) {
      error = error.message;
    }
    // return that an error happened with the provided error
    res.status(500).send({ errorMessage: String(error) });
  }

  // return the results from the data the user entered
  res.status(200).json({ locations: allResults });
}

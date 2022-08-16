import type { NextApiRequest, NextApiResponse } from 'next'
import { ErrorMessage } from '../../../interfaces/ErrorMessage';
import { Location } from '../../../interfaces/Location'
import QueryData, { isQueryData } from '../../../interfaces/QueryData'; { }

/**
 * The api needs to use post because we want all the search query parameters from the client.
 * To put all this information into specific routes is tedious. Therefore, even though this is a 
 * method that GETs information from the maps api, it should be accessed with post or the like
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ locations: Location[] } | ErrorMessage>
) {

    if (req.method !== 'POST') {
        res.status(405).send({ errorMessage: 'Only POST requests allowed' });
        return
    }

    let body = req.body;

    if (body == null || !isQueryData(body)) {
        res.status(400).send({ errorMessage: 'expected body to be of type QueryData' })
        return
    }

    const allResults: Location[] = []
    const type = body.onlyVegetarian ? "VegetarianAndVeganRestaurants" : "EatDrink,TakeAway,FastFood";
    let location = "userLocation=" + body.location;
    if ("locatedWithin" in body) {
        const max = 5000;
        location = "userCircularMapView=" + body.location + "," + Math.min(Math.round(body.locatedWithin ?? max), max)
    }

    const url = `${process.env.BING_SEARCH_URL}?type=${type}&${location}&maxResults=5&key=${process.env.BING_KEY}`;

    try {
        const bingRes = await fetch(url);
        // if the fetch fails for any reason return error
        if (bingRes == null || !bingRes.ok) {
            throw Error("Could not fetch map data");
        }
        // get the response json and return it
        const json = await bingRes.json();
        // if the results are null, then just use an empty array to simulate the results
        const results: any[] = json.resourceSets.flatMap((r: any) => r.resources) ?? [];
        // TODO: Determine what resourceSets are and what resourceSet[n].estimatedTotal is
        // convert our results array into the interface type that we defined for 
        // results

        results.forEach((res) => {
            allResults.push({
                name: res.name,
                phone: res.PhoneNumber,
                website: res.Website,
                coordinates: res["point"]["coordinates"],
                address: res["Address"]
            })
        });
        // map the returned JSON to our data type so that it can be displayed in the browser
    } catch (error: any) {
        if (error instanceof Error) error = error.message;
        res.status(500).send({ errorMessage: String(error) });
    }
    // };
    res.status(200).json({ locations: allResults });

}

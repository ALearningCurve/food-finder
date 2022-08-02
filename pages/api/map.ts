import type { NextApiRequest, NextApiResponse } from 'next'
import { ErrorMessage } from '../../interfaces/ErrorMessage';
import { Locations, Location } from '../../interfaces/Location'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Locations | ErrorMessage>
) {
    const q = "Dunkin";
    const l = "42.493160,-71.564568";
    const url = `${process.env.BING_SEARCH_URL}?query=${q}&userLocation=${l}&key=${process.env.BING_KEY}`;
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

        const convertedResults: Location[] = results.map((res) => {
            return {
                name: res.name,
                phone: res.PhoneNumber,
                website: res.Website,
                coordinates: res.geocodePoints.coordinates,
                address: res.address
            }
        });
        // map the returned JSON to our data type so that it can be displayed in the browser

        res.status(200).json({ locations: convertedResults });
    } catch (error: any) {
        if (error instanceof Error) error = error.message;
        res.status(500).send({ errorMessage: String(error) });
    }
}

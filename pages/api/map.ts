import type { NextApiRequest, NextApiResponse } from 'next'
import { Locations, Location } from '../../interfaces/Location'

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
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
        res.status(200).json(json);
    } catch (error: any) {
        if (error instanceof Error) error = error.message;
        res.status(500).send({ error: String(error) });
    }
}

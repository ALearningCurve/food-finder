import { useEffect, useState } from 'react';
import QueryData from '../interfaces/QueryData';

export default function LocationSearch({ callback, instantSearch }: { callback: (_: QueryData) => any, instantSearch?: boolean }) {

    const [location, setLocation] = useState<GeolocationPosition | null>();
    const [errorMessage, setErrorMessage] = useState<String>();
    const [submitBtn, setSubmitBtn] = useState<HTMLButtonElement | null>();

    useEffect(() => {
        if (navigator && "geolocation" in navigator) {
            console.log("attemtping to use geolocation")
            navigator.geolocation.getCurrentPosition((position) => {
                console.log("Latitude is :", position.coords.latitude);
                console.log("Longitude is :", position.coords.longitude);
                setLocation(position);
                // here we technically have all the information we need in our form to submit the form
                // because we have the location

            }, (err) => {
                console.warn("could not use geolocation (denied privelage)");
                setLocation(null);
            });

        } else {
            console.warn("could not use geolocation");
            setLocation(null);
        }
    }, []);

    useEffect(() => {
        if (location == null) {
            setErrorMessage("Could not automatically determine location, please enter your longitude and latitude");
        } else {
            setErrorMessage(undefined);
        }
    }, [location]);

    useEffect(() => {
        if (instantSearch && submitBtn && location) {
            submitBtn.click();
        }
    }, [location, submitBtn, instantSearch])



    // Make a copy of the categories and copy it

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // values from the form
        const values = e.target.elements;
        // get each field in the form as a variable
        const onlyVegetarian = values.onlyVegetarian.checked;
        console.log(onlyVegetarian)
        const price = values.price?.value ?? 'Any';
        const rating = values.rating?.value ?? '1';
        // remove any whitespace
        const location = (values.location.value as string).replaceAll(" ", "");
        const locatedWithin: string = values?.location?.locatedWithin

        const qd: QueryData = {
            onlyVegetarian,
            price,
            rating,
            location
        }

        // if the located within is a vaid number, then submit it to the callback
        if (locatedWithin && Number.isInteger(locatedWithin)) {
            qd.locatedWithin = Number.parseInt(locatedWithin) * 1000
        }
        setErrorMessage(undefined);
        callback(qd);
    };

    if (location === undefined) {
        return (<div>
            <h1>Loading...</h1>
        </div>);
    }

    const locationAddress = location ? `${location.coords.latitude},${location.coords.longitude}` : "";


    return (
        <div className="w-full max-w-xs">
            <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit}>
                {errorMessage && <div className='text-red-800'>
                    <span>ERROR:</span> <span>{errorMessage}</span>
                </div>}
                <div className="mb-3">
                    <label className='block text-gray-700 text-m font-bold mb-2' htmlFor='location'>
                        Location (LAT,LONG):
                    </label>
                    <textarea className='bg-gray-50 shadow border rounded text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 w-full' id="location" name="location" defaultValue={locationAddress ?? ""}>
                    </textarea>
                </div>

                <div className="mb-3">
                    <label className='block text-gray-700 text-m font-bold mb-2' htmlFor='distance'>
                        Maximum Distance (KM):
                    </label>
                    <input className="w-full" type="range" min="1" max="5" defaultValue={5} id="distance" />
                </div>

                {/* Minimum Price and rating are not supported by the location API. We will have to use another API for this data 
                Which has not yet been implemented into the API of this project. So temporaily disable these fields. */}
                {/* <div className="mb-3">
                    <label className='block text-gray-700 text-m font-bold mb-2' htmlFor='rating'>
                        Minimum Rating:
                    </label>
                    <input className="w-full" type="range" min="1" max="5" defaultValue={3} id="rating" />
                </div>

                <div className="mb-3">

                    <label className='block text-gray-700 text-m font-bold mb-2' htmlFor='price'>
                        Price:
                    </label>
                    <select className='bg-gray-50 shadow border rounded text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2' id="price" name="price">
                        <option value="Any">Any</option>
                        <option value="$">$</option>
                        <option value="$$">$$</option>
                        <option value="$$$">$$$</option>
                    </select>
                </div> */}
                <div className="mb-3 flex flex-row">
                    <label className='block text-gray-700 text-m font-bold mb-2' >
                        Must be Vegetarian?
                    </label>
                    <div className='w-full'></div>
                    <input className='bg-gray-50 shadow border rounded text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2' id="onlyVegetarian" name="onlyVegetarian" type={"checkbox"} defaultChecked>
                    </input>
                </div>

                <div className='flex items-center justify-center mt-5'>
                    <button className='block text-m text-white shadow border rounded bg-blue-500 focus:shadow-outline p-2' type="submit" value="Submit" ref={input => setSubmitBtn(input)}> Lets Eat! </button>
                </div>
            </form>
        </div>
    );
}
import { useEffect, useState } from "react";
import QueryData from "../interfaces/QueryData";

/**
 * Create a form that gathers the required information from the user that can them be
 * used to perform a search to find the correct restaurants near the user.
 *
 * @param props Has two fields: callback and instantSearch. callback is called with the Query Data provided by the
 * user input when the form is submitted. instantSearch is a boolean. When instantSearch is true, the function will
 * submit the form the minute that all required information has been required (namely just location data).
 * @returns JSX for a form
 */
export default function LocationSearchForm({
  callback,
  instantSearch,
}: {
  callback: (_: QueryData) => any;
  instantSearch?: boolean;
}) {
  // set up state in the component
  // We use null value to represent no location could be found, undefined value to represent
  // that location has yet to be loaded by the Browser API
  const [browserLocation, setBrowserLocation] =
    useState<GeolocationPosition | null>();
  const [errorMessage, setErrorMessage] = useState<String>();
  const [submitBtn, setSubmitBtn] = useState<HTMLButtonElement | null>();

  // On first load of the form, we want to get the LAT,LONG location of the user
  // so we use the browser api to get that data
  useEffect(() => {
    if (navigator && "geolocation" in navigator) {
      console.log("attemtping to use geolocation");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Latitude is :", position.coords.latitude);
          console.log("Longitude is :", position.coords.longitude);
          setBrowserLocation(position);
        },
        (err) => {
          console.warn("could not use geolocation (denied privelage)");
          setBrowserLocation(null);
        }
      );
    } else {
      console.warn("could not use geolocation");
      setBrowserLocation(null);
    }
  }, []);

  // Every time that the location is updated, we want to display diagnositc information to the user
  // if the value could succcessfully be gotten or not
  useEffect(() => {
    if (browserLocation == null) {
      setErrorMessage(
        "Could not automatically determine location, please enter your longitude and latitude"
      );
    } else {
      setErrorMessage(undefined);
    }
  }, [browserLocation]);

  // once we have the location, we have all the information we need to submit.
  // so, if we have instantSearch enabled, we attempt to click the submit button to instantly
  // search.
  useEffect(() => {
    if (instantSearch && submitBtn && browserLocation) {
      submitBtn.click();
    }
  }, [browserLocation, submitBtn, instantSearch]);

  /**
   * Handle the submission of this form. Reads values from the form and uses those
   * values to create a query data object that is used to then find appropiate restaurants
   * near the user.
   * @param e Form submission event
   */
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // values from the form
    const values = e.target.elements;
    // get each field in the form as a variable
    const onlyVegetarian = values.onlyVegetarian.checked;
    const price = values.price?.value ?? "Any";
    const rating = values.rating?.value ?? "1";
    // remove any whitespace from the location entered by the user
    const location = (values.location.value as string).replaceAll(" ", "");

    // Create query data object
    const qd: QueryData = {
      onlyVegetarian,
      price,
      rating,
      location,
    };

    // if the located within is a valid number and it was provided in the form
    // then we will include it into the query data
    const locatedWithin: string = values?.location?.locatedWithin;
    if (locatedWithin && Number.isInteger(locatedWithin)) {
      qd.locatedWithin = Number.parseInt(locatedWithin) * 1000;
    }

    // Clear error message for the form
    setErrorMessage(undefined);

    // Call the callback for the query data
    callback(qd);
  };

  // if the location has yet to be gathered by the location API (AKA undefined)
  // then display loading until browser API returns location
  if (browserLocation === undefined) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  // format location from the Browser API into a human readable format
  // this value is used as a default in the form
  const locationAddress = browserLocation
    ? `${browserLocation.coords.latitude},${browserLocation.coords.longitude}`
    : "";

  return (
    <div className="w-full max-w-xs">
      <form
        className="bg-white rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        {errorMessage && (
          <div className="text-red-800">
            <span>ERROR:</span> <span>{errorMessage}</span>
          </div>
        )}
        <div className="mb-3">
          <label
            className="block text-gray-700 text-m font-bold mb-2"
            htmlFor="location"
          >
            Location (LAT,LONG):
          </label>
          <textarea
            className="bg-gray-50 border rounded text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 w-full"
            id="location"
            name="location"
            defaultValue={locationAddress ?? ""}
          ></textarea>
        </div>

        <div className="mb-3">
          <label
            className="block text-gray-700 text-m font-bold mb-2"
            htmlFor="distance"
          >
            Maximum Distance (KM):
          </label>
          <input
            className="w-full"
            type="range"
            min="1"
            max="5"
            defaultValue={5}
            id="distance"
          />
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
                    <select className='bg-gray-50  border rounded text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2' id="price" name="price">
                        <option value="Any">Any</option>
                        <option value="$">$</option>
                        <option value="$$">$$</option>
                        <option value="$$$">$$$</option>
                    </select>
                </div> */}
        <div className="mb-3 flex flex-row">
          <label className="block text-gray-700 text-m font-bold mb-2">
            Must be Vegetarian?
          </label>
          <div className="w-full"></div>
          <input
            className="bg-gray-50 border rounded text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
            id="onlyVegetarian"
            name="onlyVegetarian"
            type={"checkbox"}
            defaultChecked
          ></input>
        </div>

        <div className="flex items-center justify-center mt-5">
          <button
            className="block text-m text-white  border rounded bg-blue-500  p-2"
            type="submit"
            value="Submit"
            ref={(input) => setSubmitBtn(input)}
          >
            {" "}
            Lets Eat!{" "}
          </button>
        </div>
      </form>
    </div>
  );
}

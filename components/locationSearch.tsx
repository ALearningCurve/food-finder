import { useState } from 'react';

export default function LocationSearch({ callback }: { callback: () => any }) {
    const foodCategories = [
        "Any",
        "American",
        "Asian",
        "Barbecue",
        "Buffet",
        "Burgers",
        "Chinese",
        "Fast Food",
        "French",
        "Indian",
        "Italian",
        "Japanese",
        "Korean",
        "Mediterranean",
        "Mexican",
        "Pizzeria",
        "Seafood",
        "Steak House",
        "Sushi",
        "Thai"
    ];

    // Make a copy of the categories and copy it
    const [count, setCount] = useState(foodCategories.map(d => d));

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const values = e.target.elements;

        const type = values.type.value;
        const price = values.price.value;
        const rating = values.rating.value;

        console.log({
            "type": type,
            "price": price,
            "rating": rating
        })
    };

    return (
        <div className="w-full max-w-xs">
            <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className='block text-gray-700 text-m font-bold mb-2' htmlFor='type'>
                        Type:
                    </label>
                    <select className='bg-gray-50 shadow border rounded text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2' id="type" name="type">
                        {foodCategories.map(name => {
                            return <option defaultValue={name} key={name}>{name}</option>;
                        })}
                    </select>
                </div>
                <div className="mb-3">

                    <label className='block text-gray-700 text-m font-bold mb-2' htmlFor='rating'>
                        Minimum Rating
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
                </div>

                <div className='flex items-center justify-center mt-5'>
                    <button className='block text-m text-white shadow border rounded bg-blue-500 focus:shadow-outline p-2' type="submit" value="Submit"> Lets Eat! </button>

                </div>
            </form>
        </div>
    );
}
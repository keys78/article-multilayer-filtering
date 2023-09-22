import { useEffect, useState } from 'react';

interface Product {
    price: number;
}

interface DynamicFilterProps<T> {
    label: string;
    options: string[];
    selectedOptions: T;
    setSelectedOptions: (value: T) => void;
    isPriceRange?: boolean;
    filteredProducts: Product[];
    products: Product[];
}

function DynamicFilter<T extends string | [string, string]>({ label, options, selectedOptions, setSelectedOptions, isPriceRange = false, filteredProducts, products }: DynamicFilterProps<T>) {
    // Function to calculate the highest price from products
    const getMaxPrice = () => Math.max(...products.map((product) => product.price), 0);
    const getSelectionPrice = () => Math.max(...filteredProducts.map((product) => product.price), 0);

    // State to store the initial max value for the price range slider
    const [maxPrice, setMaxPrice] = useState(getMaxPrice());
    const [selectionPrice, setSelectionPrice] = useState(getSelectionPrice());

    // State to track the current value of the range slider
    const [sliderValue, setSliderValue] = useState(maxPrice.toString());

    useEffect(() => {
        // Here, this updates the max value of the price range slider when products change
        setMaxPrice(getMaxPrice());
        setSelectionPrice(getSelectionPrice());
    }, [filteredProducts, products]);

    return (
        <div className='mb-2'>
            <h3>{label}:</h3>
            {isPriceRange ? (
                <div className='flex'>
                    <input
                        type="range"
                        min="0"
                        max={maxPrice.toString()}
                        step="1"
                        value={sliderValue as string}
                        onChange={(e) => {
                            const minPrice = e.target.value;
                            setSliderValue(minPrice);
                            setSelectedOptions([minPrice, (sliderValue as unknown as [string, string])[1]] as T);
                        }}
                    />
                    <div className='whitespace-nowrap font-bold ml-1'>
                        $0 - ${selectionPrice};
                    </div>
                </div>
            ) : (
                <select
                    value={selectedOptions as string}
                    onChange={(e) => setSelectedOptions(e.target.value as T)}
                    className='border w-full rounded-none capitalize'
                >
                    <option value="">All</option>
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
}

export default DynamicFilter;
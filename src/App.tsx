import { useState } from "react";
import CheckboxFilter from "./components/CheckFilter";
import DynamicFilter from "./components/DynamicFilter";

interface Product {
  id: string
  category: string;
  productType: string;
  name: string;
  description: string;
  color: string[],
  sizes: string[],
  price: number

}


const products: Product[] = [
  { id: '5bf14hd7f9cs79s1', category: 'men', productType: 'footwear', name: 'moccasins', description: 'Comfortable moccasins.', color: ['red', 'green'], sizes: ['L', 'XL', 'M'], price: 15 },
  { id: '5bf14hd7f9cs79v2', category: 'women', productType: 'footwear', name: 'slit wang', description: 'Stylish women\'s shoes.', color: ['black', 'green'], sizes: ['XL', 'XXL', 'L'], price: 12 },
  { id: '5bf14hd7f9cs79v3', category: 'men', productType: 'top hat', name: 'magicio', description: 'Elegant top hat for men.', color: ['blue', 'black', 'red'], sizes: ['S', 'M', 'L'], price: 25 },
  { id: '5bf14hd7f9cs79v4', category: 'women', productType: 'top hat', name: 'womagicio', description: 'Fashionable women\'s top hat.', color: ['pink', 'purple'], sizes: ['M', 'L', 'XL'], price: 28 },
  { id: '5bf14hd7f9cs79v5', category: 'men', productType: 'underwear', name: 'denim', description: 'High-quality denim underwear for men.', color: ['blue', 'black'], sizes: ['S', 'M', 'L'], price: 35 },
  { id: '5bf14hd7f9cs79v6', category: 'women', productType: 'underwear', name: 'victoria secret', description: 'Elegant Victoria Secret underwear for women.', color: ['red', 'black', 'pink'], sizes: ['S', 'M', 'L'], price: 32 },
  { id: '5bf14hd7f9cs79v7', category: 'men', productType: 'sportwear', name: 'sportswear A', description: 'Versatile sportswear for men.', color: ['red', 'blue', 'green'], sizes: ['M', 'L', 'XL'], price: 45 },
  { id: '5bf14hd7f9cs79v8', category: 'women', productType: 'sportwear', name: 'sportswear B', description: 'Trendy sportswear for women.', color: ['blue', 'pink', 'purple'], sizes: ['S', 'M', 'L'], price: 50 },
  { id: '5bf14hd7f9cs79v9', category: 'men', productType: 'sportwear', name: 'sportswear C', description: 'Durable sportswear for men.', color: ['black', 'gray', 'red'], sizes: ['S', 'M', 'L'], price: 42 },
  { id: '5bf14hd7f9cs79v0', category: 'men', productType: 'sportwear', name: 'sportswear D', description: 'Premium sportswear for men.', color: ['blue', 'black', 'green'], sizes: ['M', 'L', 'XL'], price: 55 },
];


function App() {
  // State for each filter layer
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  // Filter products based on user selections
  const filteredProducts = products
    .filter(product => selectedCategory === '' || product.category === selectedCategory)
    .filter(product => selectedType === '' || product.productType === selectedType)
    .filter(product => selectedPriceRange === '' || product.price <= parseFloat(selectedPriceRange))
    .filter(product => selectedColors.length === 0 || selectedColors.every(color => product.color.includes(color)))
    .filter(product => selectedSizes.length === 0 || selectedSizes.every(size => product.sizes.includes(size)));


  const categories = [...new Set(products?.map((val: Product) => val.category))];
  const productTypes = [...new Set(products?.map((val: Product) => val.productType))];
  const colors = [...new Set(products?.flatMap((val: Product) => val.color))];
  const sizes = [...new Set(products?.flatMap((val: Product) => val.sizes))];

  const resetFilters = () => {
    setSelectedCategory('');
    setSelectedType('')
    setSelectedPriceRange('')
    setSelectedColors([])
    setSelectedSizes([])
  }



  return (
    <>
      <header className="py-6 text-center items-center bg-black text-white text-2xl mb-8">Multilayered Filtering ({filteredProducts?.length})</header>
      <main className="sm:px-[40px] px-[16px] max-w-[1200px] mx-auto">
        <section>
          <div className="flex sm:flex-row flex-col items-start sm:space-x-5 sm:space-y-0 space-y-5">
            <aside className="border rounded-[10px] sm:min-w-[250px] min-w-full  bg-gray-100 py-4 px-3">
              <DynamicFilter
                label="Category"
                options={categories}
                selectedOptions={selectedCategory}
                setSelectedOptions={setSelectedCategory}
                filteredProducts={[]}
                products={[]}
              />
              <DynamicFilter
                label="Type"
                options={productTypes}
                selectedOptions={selectedType}
                setSelectedOptions={setSelectedType}
                filteredProducts={[]}
                products={[]}
              />
              <DynamicFilter
                label="Price"
                isPriceRange={true}
                selectedOptions={selectedPriceRange}
                setSelectedOptions={setSelectedPriceRange}
                filteredProducts={filteredProducts}
                products={products}
                options={[]}
              />
              <CheckboxFilter
                label="Color"
                options={colors}
                selectedOptions={selectedColors}
                setSelectedOptions={setSelectedColors}
                isColor={true}
              />
              <CheckboxFilter
                label="Size"
                options={sizes}
                selectedOptions={selectedSizes}
                setSelectedOptions={setSelectedSizes}
                isColor={false}
              />

              <button className="bg-black text-white py-2 px-6 w-full rounded-[10px] mt-3" onClick={resetFilters}>Reset Filters ({filteredProducts?.length})</button>
            </aside>

            <aside className="border rounded-[10px] p-4 min-h-[600px] w-full">
              {filteredProducts.length > 0 ? (
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="px-4 py-6 bg-gray-100 rounded-[10px] border-2"
                    >
                      <div className="flex items-center justify-between">
                        <h2 className="capitalize text-[18px] font-medium">{product?.name}</h2>
                        <p className="font-bold text-[18px]">${product?.price}</p>
                      </div>

                      <p className="pb-5">{product.description}</p>
                      <div className="flex space-x-1 text-[10px]">
                        <p className="rounded-full px-[5px] border bg-white">{product?.category}</p>
                        <p className="rounded-full px-[5px] border bg-white">{product?.productType}</p>
                      </div>
                      <p><span className="font-semibold">Available Sizes:</span> {product.sizes.join(', ')}</p>
                      <p className="capitalize"><span className="font-semibold">Available Color(s):</span> {product.color.join(', ')} </p>
                    </div>
                  ))}
                </div>) :
                (
                  <div>No Match found</div>
                )
              }
            </aside>
          </div>

        </section>
      </main>
    </>
  );
}


export default App;
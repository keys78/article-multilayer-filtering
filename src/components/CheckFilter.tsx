interface CheckboxFilterProps {
    label: string;
    options: string[];
    selectedOptions: string[];
    setSelectedOptions: (selected: string[]) => void;
    isColor: boolean;
  }
  
  function CheckboxFilter({ label, options, selectedOptions, setSelectedOptions, isColor }: CheckboxFilterProps) {
    const handleCheckboxChange = (option: string) => {
      if (selectedOptions.includes(option)) {
        setSelectedOptions(selectedOptions.filter((item) => item !== option));
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    };
  
    return (
      <div className="bg-gray-100">
        <div className="mb-2">
          <h3>{label}:</h3>
          <div className="space-y-2">
            {options.map((option) => (
              <label className="flex space-x-3" key={option}>
                <input
                  type="checkbox"
                  value={option}
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                />
                {
                  <div>
                    {isColor ? (<div className="h-[15px] w-[15px] rounded-full" style={{ backgroundColor: option }}></div>) : option}
                  </div>
                }
              </label>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  export default CheckboxFilter;
  
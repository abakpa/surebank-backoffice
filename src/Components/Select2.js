import { useState } from "react";

const Select = ({ options, value, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Get the label of the currently selected option
  const selectedLabel = options.find((option) => option.value === value)?.label || "Select an option";

  return (
    <div className="relative mb-1 sm:mb-3">
      {label && (
        <label className="select2-label mb-0.5 block text-[10px] font-medium sm:mb-1 sm:text-sm">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="select2-trigger mt-0.5 flex w-full items-center justify-between rounded border px-1.5 py-1 text-left text-[10px] focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:mt-1 sm:px-3 sm:py-2 sm:text-sm"
      >
        <span className="min-w-0 truncate">{selectedLabel}</span>
        <svg
          className={`h-3.5 w-3.5 flex-shrink-0 transition-transform duration-200 sm:h-5 sm:w-5 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <ul className="select2-menu absolute w-full border rounded shadow-lg z-20 mt-1 max-h-48 overflow-y-auto">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                onChange(option.value); // Pass the value of the selected option
                setIsOpen(false);
              }}
              className="select2-option cursor-pointer px-1.5 py-1 text-[10px] sm:px-4 sm:py-2 sm:text-sm"
            >
              {option.label} {/* Display the label */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;

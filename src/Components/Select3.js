import { useState } from "react";

const Select3 = ({ options, value, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="mt-1 flex justify-between items-center w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-white text-left"
      >
        <span>{value || "Select an option"}</span>
        <svg
          className={`h-5 w-5 transition-transform duration-200 ${
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
        <ul className="absolute w-full bg-white border border-gray-300 rounded shadow-lg z-20 mt-1 max-h-48 overflow-y-auto">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => {
                onChange(option.label);
                setIsOpen(false);
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select3;

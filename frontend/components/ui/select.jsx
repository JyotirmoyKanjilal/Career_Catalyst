import React, { useState } from "react";

export function Select({ value, onValueChange, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (newValue) => {
    onValueChange(newValue);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <SelectTrigger onClick={() => setIsOpen(!isOpen)}>{value || "Select an option"}</SelectTrigger>
      {isOpen && <SelectContent>{React.Children.map(children, (child) => React.cloneElement(child, { onSelect: handleSelect }))}</SelectContent>}
    </div>
  );
}

export function SelectTrigger({ children, onClick }) {
  return (
    <button
      className="w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function SelectContent({ children }) {
  return (
    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg">
      {children}
    </ul>
  );
}

export function SelectItem({ value, children, onSelect }) {
  return (
    <li
      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
      onClick={() => onSelect(value)}
    >
      {children}
    </li>
  );
}

export function SelectValue({ placeholder }) {
  return <span className="text-gray-500">{placeholder}</span>;
}
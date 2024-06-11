import React, { useState } from "react";

const CustomDropdown = ({ options, newItem, onNewItemChange, onAddItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectChange = (e) => {
    const { value } = e.target;
    if (value === "addNewItem") {
      setIsOpen(true);
    }
  };

  return (
    <div className="flex">
      <select
        className="border px-2 py-1"
        value={newItem}
        onChange={(e) => {
          handleSelectChange(e);
          onNewItemChange(e.target.value);
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <option value="addNewItem">Select</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {
        <div className=" top-full left-0 bg-white border p-2">
          <input
            type="text"
            placeholder="Add dropdown item"
            value={newItem}
            onChange={(e) => onNewItemChange(e.target.value)}
            className="border px-2 py-1 mr-2"
          />
          <button
            type="button"
            onClick={onAddItem}
            className="px-3 py-1 bg-blue-500 text-white rounded-md"
          >
            Add
          </button>
        </div>
      }
    </div>
  );
};

export default CustomDropdown;

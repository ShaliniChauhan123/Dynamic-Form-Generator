import React from "react";

const LeftPanel = ({ handleAddField }) => {
  return (
    <div className="lg:w-1/3 w-full flex flex-col border-r p-4 h-full bg-white">
      <button
        onClick={() => handleAddField("text")}
        className="mb-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Add Text Field
      </button>
      <button
        onClick={() => handleAddField("textarea")}
        className="mb-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Add Text Area
      </button>
      <button
        onClick={() => handleAddField("dropdown")}
        className="mb-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Add Dropdown
      </button>
      <button
        onClick={() => handleAddField("checkbox")}
        className="mb-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Add Checkbox
      </button>
      <button
        onClick={() => handleAddField("file")}
        className="mb-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Add File Upload
      </button>
      <button
        onClick={() => handleAddField("radio")}
        className="mb-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Add Radio Button
      </button>
    </div>
  );
};

export default LeftPanel;

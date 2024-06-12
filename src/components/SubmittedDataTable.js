import React from "react";

const SubmittedDataTable = ({ data }) => {
  if (!data || data.length === 0) return null;
  return (
    <div className="mt-4 p-4 bg-white rounded shadow">
      <h3 className="text-xl font-bold mb-2">Submitted Data</h3>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200">Label</th>
            <th className="py-2 px-4 border-b border-gray-200">Type</th>
            <th className="py-2 px-4 border-b border-gray-200">Value</th>
            <th className="py-2 px-4 border-b border-gray-200">Options</th>
          </tr>
        </thead>
        <tbody>
          {data.map((field, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b border-gray-200">
                {field.label}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {field.type}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {field.type === "checkbox"
                  ? field.newCheckbox
                      ?.filter((_, idx) => field.value[idx])
                      .join(", ")
                  : field.type === "radio"
                  ? field.newRadio
                      ?.filter((_, idx) => field.value[idx])
                      .join(", ")
                  : field.type === "dropdown"
                  ? field.newItem
                  : field.value}
                {/* {field.type === "checkbox" || field.type === "radio"
                  ? field.newCheckbox?.join(", ") || field.newRadio?.join(", ")
                  : field.type === "dropdown"
                  ? field.newItem
                  : field.value} */}
              </td>
              {field.type === "dropdown" && (
                <td className="py-2 px-4 border-b border-gray-200">
                  {field.options.length > 0
                    ? field.options.join(", ")
                    : "No options"}
                </td>
              )}
              {field.type === "checkbox" && (
                <td className="py-2 px-4 border-b border-gray-200">
                  {field.newCheckbox.map((option, idx) => (
                    <div key={idx}>
                      <input
                        type="checkbox"
                        checked={field.value[idx]}
                        disabled
                      />
                      <label>{option}</label>
                    </div>
                  ))}
                </td>
              )}
              {field.type === "radio" && (
                <td className="py-2 px-4 border-b border-gray-200">
                  {field.newRadio.join(", ")}
                </td>
              )}
              {["text", "file", "textarea"].includes(field.type) && (
                <td className="py-2 px-4 border-b border-gray-200">
                  {field.options.length > 0
                    ? field.options.join(", ")
                    : "No options"}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubmittedDataTable;

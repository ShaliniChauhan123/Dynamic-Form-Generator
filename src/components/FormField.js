// FormField.js
import React from "react";

const FormField = ({ field, onRemove }) => {
  return (
    <div>
      <label>{field.label}</label>
      {/* Render the appropriate input based on field.type */}
      <button onClick={onRemove}>Remove</button>
    </div>
  );
};

export default FormField;

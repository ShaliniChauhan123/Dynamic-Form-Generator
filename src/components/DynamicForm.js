import clsx from "clsx";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "@mantine/form";

import CustomDropdown from "./CustomDropdown";
import FallBack from "../assets/icons/fallback";
import crossIcon from "../assets/icons/cross.png";
import {
  addField,
  removeField,
  updateField,
  resetFields,
} from "../reducers/formReducer";

const DynamicForm = () => {
  const fields = useSelector((state) => state.form.fields);
  const dispatch = useDispatch();
  const [checkboxCount, setCheckboxCount] = useState(1);

  const [radioCount, setRadioCount] = useState(1);

  const form = useForm({
    initialValues: {
      fields,
    },
    validate: {
      fields: (value) => {
        const errors = {};
        value.forEach((field, index) => {
          const fieldErrors = {};

          if (!field.label) {
            fieldErrors.label = "Label is required";
          }
          if (field.type === "checkbox") {
            if (!field.newCheckbox || field.newCheckbox.length === 0) {
              fieldErrors.value = "All checkbox label is required";
            } else {
              const checkboxErrors = field.newCheckbox.map((label) =>
                !label ? "Checkbox label is required" : null
              );
              if (checkboxErrors.some((error) => error !== null)) {
                fieldErrors.newCheckbox = checkboxErrors;
              }
            }
          } else if (!field.value) {
            fieldErrors.value = "Value is required";
          }
          if (Object.keys(fieldErrors).length > 0) {
            errors[index] = fieldErrors;
          }
          if (!field.newRadio || field.newRadio.length === 0) {
            fieldErrors.value = "All radio button labels are required";
          } else {
            const radioErrors = field.newRadio.map((label) =>
              !label ? "Radio button label is required" : null
            );
            if (radioErrors.some((error) => error !== null)) {
              fieldErrors.newRadio = radioErrors;
            }
          }
        });
        return errors;
      },
    },
    validateOnChange: true,
    validateOnBlur: true,
  });

  useEffect(
    () => {
      form.setFieldValue("fields", fields);
    },
    // eslint-disable-next-line
    [fields]
  );

  const handleAddField = (type) => {
    dispatch(
      addField({
        type,
        label: "",
        value: type === "checkbox" ? [] : "",
        options: type === "dropdown" ? [] : [],
      })
    );
  };

  const handleRemoveField = (index) => {
    dispatch(removeField(index));
  };

  const handleLabelChange = (index, event) => {
    const { value } = event.target;
    dispatch(updateField({ index, name: "label", value }));
  };

  const handleInputChange = (index, event) => {
    const { value } = event.target;
    dispatch(updateField({ index, name: "value", value }));
  };

  const handleFileChange = (index, event) => {
    const file = event.target.files[0].name;
    console.log("file", event.target.files[0].name);
    dispatch(updateField({ index, name: "value", value: file }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submission initiated");

    // Validate the form
    const validationResults = form.validate();
    console.log("Validation errors:", validationResults);

    // Check if there are any errors
    if (Object.keys(form.errors).length > 0) {
      console.log("Form is not valid, submission halted");
      return;
    }
    console.log(validationResults.errors.fields);

    // No errors, proceed with form submission
    if (
      validationResults.errors.fields &&
      Object.keys(validationResults.errors.fields).length === 0
    ) {
      console.log("Form Data:", fields);
      alert(JSON.stringify(fields, null, 2));
      dispatch(resetFields());
    }
  };

  const renderField = (field, index) => {
    switch (field.type) {
      case "text":
        return (
          <div>
            <input
              type="text"
              placeholder={"Enter your label input"}
              value={field.value}
              onChange={(e) => handleInputChange(index, e)}
              name={`fields.${index}.value`}
              className="border rounded p-2"
            />
            {form.errors?.fields?.[index]?.value && (
              <div className="text-red-500">
                {form.errors.fields[index].value}
              </div>
            )}
          </div>
        );
      case "textarea":
        return (
          <div>
            <textarea
              placeholder={"Enter your label input"}
              value={field.value}
              onChange={(e) => handleInputChange(index, e)}
              name={`fields.${index}.value`}
              className="border rounded p-2"
            ></textarea>
            {form.errors?.fields?.[index]?.value && (
              <div className="text-red-500">
                {form.errors.fields[index].value}
              </div>
            )}
          </div>
        );
      case "dropdown":
        return (
          <div>
            <CustomDropdown
              options={field.options}
              newItem={field.newItem}
              onNewItemChange={(value) =>
                dispatch(updateField({ index, name: "newItem", value }))
              }
              onAddItem={() => {
                dispatch(
                  updateField({
                    index,
                    name: "options",
                    value: [...field.options, field.newItem],
                  })
                );
                dispatch(updateField({ index, name: "newItem", value: "" }));
              }}
            />
          </div>
        );
      case "checkbox":
        return (
          <div>
            <div
              className="cursor-pointer text-blue-500 mb-2"
              onClick={() =>
                setCheckboxCount((checkboxCount) => checkboxCount + 1)
              }
            >
              Add more options
            </div>
            {[...Array(checkboxCount)].map((_, checkboxIndex) => (
              <div key={checkboxIndex} className="flex items-center mb-2">
                <input
                  type="text"
                  placeholder="New Checkbox Label"
                  value={
                    (field.newCheckbox && field.newCheckbox[checkboxIndex]) ||
                    ""
                  }
                  onChange={(e) => {
                    const updatedNewCheckbox = [...(field.newCheckbox || [])];
                    updatedNewCheckbox[checkboxIndex] = e.target.value;
                    dispatch(
                      updateField({
                        index,
                        name: "newCheckbox",
                        value: updatedNewCheckbox,
                      })
                    );
                  }}
                  className="border rounded p-2 mr-2"
                />
                <input
                  type="checkbox"
                  checked={(field.value && field.value[checkboxIndex]) || false}
                  onChange={(e) => {
                    const updatedCheckboxValues = [...(field.value || [])];
                    updatedCheckboxValues[checkboxIndex] = e.target.checked;
                    dispatch(
                      updateField({
                        index,
                        name: "value",
                        value: updatedCheckboxValues,
                      })
                    );
                  }}
                  name={`fields.${index}.value`}
                  className="mr-2"
                />
              </div>
            ))}
            {form.errors?.fields?.[index]?.newCheckbox &&
              form.errors.fields[index].newCheckbox.map(
                (error, checkboxIndex) =>
                  error && (
                    <div key={checkboxIndex} className="text-red-500">
                      {error}
                    </div>
                  )
              )}
            {form.errors?.fields?.[index]?.value && (
              <div className="text-red-500">
                {form.errors.fields[index].value}
              </div>
            )}
          </div>
        );
      case "file":
        return (
          <div>
            <input
              type="file"
              onChange={(e) => handleFileChange(index, e)}
              name={`fields.${index}.value`}
              required
              className="border rounded p-2"
            />
            {form.errors?.fields?.[index]?.value && (
              <div className="text-red-500">
                {form.errors.fields[index].value}
              </div>
            )}
          </div>
        );
      case "radio":
        return (
          <div>
            <div
              className="cursor-pointer text-blue-500 mb-2"
              onClick={() => setRadioCount((radioCount) => radioCount + 1)}
            >
              Add more options
            </div>
            {[...Array(radioCount)].map((_, radioIndex) => (
              <div key={radioIndex} className="flex items-center mb-2">
                <input
                  type="text"
                  placeholder="New Radio Button Label"
                  value={(field.newRadio && field.newRadio[radioIndex]) || ""}
                  onChange={(e) => {
                    const updatedNewRadio = [...(field.newRadio || [])];
                    updatedNewRadio[radioIndex] = e.target.value;
                    dispatch(
                      updateField({
                        index,
                        name: "newRadio",
                        value: updatedNewRadio,
                      })
                    );
                  }}
                  className="border rounded p-2 mr-2"
                />
                <input
                  type="radio"
                  checked={(field.value && field.value[radioIndex]) || false}
                  onChange={(e) => {
                    const updatedRadioValues = [...(field.value || [])];
                    updatedRadioValues[radioIndex] = e.target.checked;
                    dispatch(
                      updateField({
                        index,
                        name: "value",
                        value: updatedRadioValues,
                      })
                    );
                  }}
                  name={`fields.${index}.value`}
                  className="mr-2"
                />
              </div>
            ))}
            {form.errors?.fields?.[index]?.newRadio &&
              form.errors.fields[index].newRadio.map(
                (error, radioIndex) =>
                  error && (
                    <div key={radioIndex} className="text-red-500">
                      {error}
                    </div>
                  )
              )}
            {form.errors?.fields?.[index]?.value && (
              <div className="text-red-500">
                {form.errors.fields[index].value}
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
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

      <div className="flex-1 ml-1/3 overflow-auto p-4 bg-gray-100">
        {fields.length > 0 ? (
          <div className="flex flex-col w-full justify-center items-center">
            <form
              className="flex flex-col justify-center items-center w-full max-w-3xl bg-white p-8 rounded shadow"
              onSubmit={handleSubmit}
            >
              {fields.map((field, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 border rounded w-full flex justify-between items-center bg-gray-50"
                >
                  <div
                    className={clsx(
                      "flex",
                      field.type !== "dropdown" ? "flex-col" : "flex-row"
                    )}
                  >
                    <input
                      type="text"
                      placeholder="Label"
                      value={field.label}
                      onChange={(e) => handleLabelChange(index, e)}
                      className="border rounded p-2"
                    />
                    {form.errors?.fields?.[index]?.label && (
                      <div className="text-red-500">
                        {form.errors.fields[index].label}
                      </div>
                    )}
                    {renderField(field, index)}
                  </div>
                  <button
                    type="button"
                    className="ml-2 text-red-500"
                    onClick={() => handleRemoveField(index)}
                  >
                    <img
                      className="w-6 h-6 object-cover"
                      src={crossIcon}
                      alt=""
                    />
                  </button>
                </div>
              ))}
              <button
                type="submit"
                className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
              >
                Submit
              </button>
            </form>
          </div>
        ) : (
          <div className="flex justify-center items-center w-full h-full">
            <FallBack />
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicForm;

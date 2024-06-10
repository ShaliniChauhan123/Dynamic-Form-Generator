import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "@mantine/form";
import { addField, removeField, updateField } from "../reducers/formReducer";
import clsx from "clsx";
import CustomDropdown from "./CustomDropdown";
import CustomCheckboxGroup from "./CustomCheckboxGroup";
import FallBack from "../assets/icons/fallback";

const DynamicForm = () => {
  const fields = useSelector((state) => state.form.fields);
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const [checkboxCount, setCheckboxCount] = useState(1);

  const form = useForm({
    initialValues: {
      fields,
    },
  });

  const handleAddField = (type) => {
    dispatch(
      addField({
        type,
        label: "",
        value: type === "checkbox" ? false : "",
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
    console.log("first", value);
    dispatch(updateField({ index, name: "value", value }));
  };

  const handleSubmit = (values) => {
    console.log("Form Data:", fields);
    alert(JSON.stringify(fields, null, 2));
  };

  //   const handleAddCheckbox = (index) => {
  //     dispatch(
  //       updateField({
  //         index,
  //         name: "value",
  //         value: [
  //           ...fields[index].value,
  //           { label: fields[index].newCheckbox, checked: false },
  //         ],
  //       })
  //     );
  //     // Clear the input field after adding the new checkbox
  //     dispatch(updateField({ index, name: "newCheckbox", value: "" }));
  //   };

  const renderField = (field, index) => {
    switch (field.type) {
      case "text":
        return (
          <input
            key={index}
            type="text"
            placeholder={`Enter your ${field.label || "label input"}`}
            value={field.value}
            onChange={(e) => handleInputChange(index, e)}
            name={`fields.${index}.value`}
          />
        );
      case "textarea":
        return (
          <textarea
            key={index}
            placeholder={`Enter your ${field.label || "label input"}`}
            value={field.value}
            onChange={(e) => handleInputChange(index, e)}
            name={`fields.${index}.value`}
          ></textarea>
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
              className="cursor-pointer"
              onClick={() =>
                setCheckboxCount((checkboxCount) => checkboxCount + 1)
              }
            >
              Add
            </div>
            {[...Array(checkboxCount)].map((_, checkboxIndex) => (
              <div key={checkboxIndex}>
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
                />
                <input
                  key={checkboxIndex}
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
                />
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  console.log(fields);

  return (
    <div>
      <div className="flex">
        <div className="w-1/3 flex flex-col h-screen border">
          <button onClick={() => handleAddField("text")}>Text Field</button>
          <button onClick={() => handleAddField("textarea")}>Text Area</button>
          <button onClick={() => handleAddField("dropdown")}>Dropdown</button>
          <button onClick={() => handleAddField("checkbox")}>Checkbox</button>
        </div>

        {fields.length > 0 ? (
          <div className="flex flex-col h-screen w-full border justify-center items-center ">
            <form
              className="flex flex-col justify-center items-center h-full p-5 w-full"
              onSubmit={form.onSubmit(handleSubmit)}
            >
              {fields.map((field, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 border w-full flex justify-between"
                >
                  <div
                    className={clsx(
                      "flex",
                      field.type != "dropdown" ? "flex-col" : "flex-row"
                    )}
                  >
                    <input
                      type="text"
                      placeholder="Label"
                      value={field.label}
                      onChange={(e) => handleLabelChange(index, e)}
                      className="mb-2"
                    />
                    {renderField(field, index)}
                  </div>
                  <button
                    type="button"
                    className="ml-2 text-red-500"
                    onClick={() => handleRemoveField(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button type="submit">Submit</button>
            </form>
          </div>
        ) : (
          <div className="flex justify-center items-center w-full">
            <FallBack />
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicForm;

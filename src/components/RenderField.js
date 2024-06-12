import React from "react";
import CustomDropdown from "./CustomDropdown";
import { updateField } from "../reducers/formReducer";
import { useDispatch } from "react-redux";

const RenderField = (
  field,
  index,
  handleInputChange,
  handleFileChange,
  checkboxCount,
  setCheckboxCount,
  radioCount,
  setRadioCount,
  form
) => {
  const dispatch = useDispatch();

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
            Add more checkbox
          </div>
          {[...Array(checkboxCount)].map((_, checkboxIndex) => (
            <div key={checkboxIndex} className="flex items-center mb-2">
              <input
                type="text"
                placeholder="New Checkbox Label"
                value={
                  (field.newCheckbox && field.newCheckbox[checkboxIndex]) || ""
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

export default RenderField;

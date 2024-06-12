import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "@mantine/form";

import FallBack from "../assets/icons/fallback";
import {
  addField,
  removeField,
  updateField,
  resetFields,
} from "../reducers/formReducer";
import LeftPanel from "./LeftPanel";
import CustomForm from "./CustomForm";

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
          } else if (!field.value && field.type === "text") {
            fieldErrors.value = "Value is required";
          }
          if (Object.keys(fieldErrors).length > 0) {
            errors[index] = fieldErrors;
          }
          if (field.type === "radio") {
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
        options: [],
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
    dispatch(updateField({ index, name: "value", value: file }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate the form
    const validationResults = form.validate();

    // Check if there are any errors
    if (Object.keys(form.errors).length > 0) {
      return;
    }

    // No errors, proceed with form submission
    if (
      validationResults.errors.fields &&
      Object.keys(validationResults.errors.fields).length === 0
    ) {
      alert(JSON.stringify(fields, null));
      dispatch(resetFields());
    }
  };

  return (
    <div className="flex flex-col lg:flex-row lg:h-screen">
      <LeftPanel handleAddField={handleAddField} />
      <div className="flex-1 ml-1/3 overflow-auto p-4 bg-gray-100">
        {fields.length > 0 ? (
          <CustomForm
            handleSubmit={handleSubmit}
            handleFileChange={handleFileChange}
            handleInputChange={handleInputChange}
            handleLabelChange={handleLabelChange}
            handleRemoveField={handleRemoveField}
            form={form}
            checkboxCount={checkboxCount}
            setCheckboxCount={setCheckboxCount}
            radioCount={radioCount}
            setRadioCount={setRadioCount}
          />
        ) : (
          <div className="flex lg:flex-col flex-wrap justify-center items-center w-full h-full">
            <div className="pb-4 text-base font-bold">
              Create your Dynamic Form
            </div>
            <FallBack />
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicForm;

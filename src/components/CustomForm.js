import { useSelector } from "react-redux";
import RenderField from "./RenderField";
import crossIcon from "../assets/icons/cross.png";
import clsx from "clsx";

const CustomForm = ({
  handleSubmit,
  handleFileChange,
  handleInputChange,
  handleLabelChange,
  handleRemoveField,
  form,
  checkboxCount,
  setCheckboxCount,
  radioCount,
  setRadioCount,
}) => {
  const fields = useSelector((state) => state.form.fields);

  return (
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
                className="rounded p-2"
              />
              {form.errors?.fields?.[index]?.label && (
                <div className="text-red-500">
                  {form.errors.fields[index].label}
                </div>
              )}
              {RenderField(
                field,
                index,
                handleInputChange,
                handleFileChange,
                checkboxCount,
                setCheckboxCount,
                radioCount,
                setRadioCount,
                form
              )}
            </div>
            <button
              type="button"
              className="ml-2 text-red-500"
              onClick={() => handleRemoveField(index)}
            >
              <img className="w-6 h-6 object-cover" src={crossIcon} alt="" />
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
  );
};

export default CustomForm;

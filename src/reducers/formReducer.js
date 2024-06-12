import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    fields: [],
  },
  reducers: {
    addField: (state, action) => {
      state.fields.push(action.payload);
    },
    removeField: (state, action) => {
      state.fields.splice(action.payload, 1);
    },
    updateField: (state, action) => {
      const { index, name, value } = action.payload;
      state.fields[index][name] = value;
    },
    resetFields(state) {
      state.fields = [];
    },
  },
});

export const { addField, removeField, updateField, resetFields } =
  formSlice.actions;

export default formSlice.reducer;

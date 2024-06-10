// src/reducers/formReducer.js
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
      console.log("action", action.payload);
      state.fields[index][name] = value;
    },
  },
});

export const { addField, removeField, updateField } = formSlice.actions;

export default formSlice.reducer;

// src/reducers/index.js
import { combineReducers } from "@reduxjs/toolkit";
import formReducer from "./formReducer";

const rootReducer = combineReducers({
  form: formReducer,
});

export default rootReducer;

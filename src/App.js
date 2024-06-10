// src/App.js
import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import DynamicForm from "./components/DynamicForm";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <DynamicForm />
      </div>
    </Provider>
  );
}

export default App;

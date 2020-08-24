import React from "react";
import Salary from "./components/salary/index";
import css from "./App.module.css";

function App() {
  return (
    <div className={`${css.container} container`}>
      <h3 className={css.title}>React Salário</h3>

      <Salary />
    </div>
  );
}

export default App;

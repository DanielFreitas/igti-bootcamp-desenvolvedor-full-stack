import React from "react";
import ProjetoBase from "./components/salary/ProjetoBase";
import css from "./App.module.css";

function App() {
  return (
    <div className={`${css.container} container`}>
      <h3 className={css.title}>React Salário</h3>

      <ProjetoBase />
    </div>
  );
}

export default App;

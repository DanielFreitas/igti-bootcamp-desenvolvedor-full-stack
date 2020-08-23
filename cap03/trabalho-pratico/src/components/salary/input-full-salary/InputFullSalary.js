import React, { Component } from "react";
import css from "./input-full-salary.module.css";

export default class InputFullSalary extends Component {
  constructor() {
    super();

    this.state = {
      inputValue: "",
    };
  }

  handleInputChange = (event) => {
    const newText = event.target.value.replace(/[\D]+/g, "");
    this.props.value(newText);
  };

  render() {
    return (
      <div className={`${"row"} ${css.inputMargin}`}>
        <div className="col s12 m12 l12">
          <label htmlFor="input-full-salary">Salário bruto</label>
          <input
            id="input-full-salary"
            type="text"
            placeholder="Desconto IRPF"
            className={css.inputMargin}
            placeholder="Informe o salário bruto"
            onChange={this.handleInputChange}
          />
        </div>
      </div>
    );
  }
}

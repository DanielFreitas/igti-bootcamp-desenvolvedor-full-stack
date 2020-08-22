import React, { Component } from "react";
import InputFullSalary from "./input-full-salary/InputFullSalary";
import InputReadOnly from "./Input-read-only/InputReadOnly";

export default class index extends Component {
  constructor() {
    super();

    this.state = {
      fullSalary: 0,
    };
  }

  handleInputChange = (newValue) => {
    this.setState({
      fullSalary: newValue,
    });
  };

  render() {
    const { fullSalary } = this.state;
    console.log(fullSalary);
    return (
      <div>
        <InputFullSalary value={this.handleInputChange} />
        <InputReadOnly value={fullSalary} />
      </div>
    );
  }
}

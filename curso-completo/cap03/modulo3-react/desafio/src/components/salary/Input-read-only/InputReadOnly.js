import React, { Component } from "react";
import ProgressBar from "../progress-bar/ProgressBar";
import css from "./Input-read-only.module.css";
import { calculateSalaryFrom } from "../../../helpers/salary";
import { formatNumber } from "../../../helpers/formatNumber";

export default class InputReadOnly extends Component {
  render() {
    const { value } = this.props;

    const baseINSS = formatNumber(calculateSalaryFrom(value).baseINSS);
    const discountINSS = calculateSalaryFrom(value).discountINSS;
    const baseIRPF = formatNumber(calculateSalaryFrom(value).baseIRPF);
    const discountIRPF = calculateSalaryFrom(value).discountIRPF;
    const netSalary = calculateSalaryFrom(value).netSalary;

    let percINSS = ((discountINSS / Number(value)) * 100).toFixed(2);

    if (isNaN(percINSS)) {
      percINSS = 0;
    }

    let percIRPF = ((discountIRPF / Number(value)) * 100).toFixed(2);

    if (isNaN(percIRPF)) {
      percIRPF = 0;
    }

    let percNetSalary = ((netSalary / Number(value)) * 100).toFixed(2);

    if (isNaN(percNetSalary)) {
      percNetSalary = 0;
    }

    return (
      <div>
        <div className={`${"row"} ${css.inputMargin}`}>
          <div className="col s6 m3 l3">
            <label htmlFor="base-INSS">Base INSS</label>
            <input
              id="base-INSS"
              type="text"
              placeholder="Base INSS"
              value={baseINSS}
              readOnly
              className={css.text}
            />
          </div>

          <div className="col s6 m3 l3">
            <label htmlFor="desconto-INSS">Desconto INSS</label>
            <input
              id="desconto-INSS"
              type="text"
              placeholder="Desconto INSS"
              value={` ${formatNumber(discountINSS)}  (${percINSS} %)`}
              readOnly
              className={`${css.textOrange} ${css.text}`}
            />
          </div>

          <div className="col s6 m3 l3">
            <label htmlFor="base-IRPF">Base IRPF</label>
            <input
              id="base-IRPF"
              type="text"
              placeholder="Base IRPF"
              value={baseIRPF}
              readOnly
              className={css.text}
            />
          </div>

          <div className="col s6 m3 l3">
            <label htmlFor="desconto-IRPF">Desconto IRPF</label>
            <input
              id="desconto-IRPF"
              type="text"
              placeholder="Desconto IRPF"
              value={` ${formatNumber(discountIRPF)}  (${percIRPF} %)`}
              readOnly
              className={`${css.textRed} ${css.text}`}
            />
          </div>

          <div className="col s6 m3 l3">
            <label htmlFor="salario-liquido">Salário Líquido</label>
            <input
              id="salario-liquido"
              type="text"
              placeholder="Salário Líquido"
              value={` ${formatNumber(netSalary)}  (${percNetSalary} %)`}
              readOnly
              className={`${css.textGreen} ${css.text}`}
            />
          </div>
        </div>

        <div className="row">
          <div className="col s12 m12 l12">
            <ProgressBar
              discINSS={percINSS}
              discIRPF={percIRPF}
              netS={percNetSalary}
            />
          </div>
        </div>
      </div>
    );
  }
}

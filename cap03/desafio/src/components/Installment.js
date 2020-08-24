import React from "react";
import { formatMoney, formatPercentage } from "../helpers/formatNumber";
import css from "./style.module.css";

export default function Installment({
  month,
  valueTotal,
  valueMonthly,
  valueInterest,
}) {
  return (
    <table className={css.table}>
      <tbody>
        <tr>
          <th rowSpan="3" className="center-align">
            {month}
          </th>
          <td className={`${valueMonthly < 0 ? "red-text" : "green-text"}`}>
            <strong>{formatMoney(valueTotal)}</strong>
          </td>
        </tr>
        <tr>
          <td className={`${valueMonthly < 0 ? "red-text" : "green-text"}`}>
            <strong>
              {valueMonthly < 0 ? "" : "+"}
              {formatMoney(valueMonthly)}
            </strong>
          </td>
        </tr>
        <tr>
          <td className={`${valueMonthly < 0 ? "orange-text" : "blue-text"}`}>
            {formatPercentage(valueInterest)}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

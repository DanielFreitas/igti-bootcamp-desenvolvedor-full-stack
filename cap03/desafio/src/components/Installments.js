import React from "react";
import Installment from "./Installment";
import css from "./style.module.css";

export default function Installments({ setValues }) {
  return (
    <div className="row">
      {setValues.map((value, index) => {
        const { month, valueTotal, valueMonthly, valueInterest } = value;

        return (
          <div key={index} className={`col s6 m4 l2 ${css.padding}`}>
            <Installment
              key={month}
              month={month}
              valueTotal={valueTotal}
              valueMonthly={valueMonthly}
              valueInterest={valueInterest}
            />
          </div>
        );
      })}
    </div>
  );
}

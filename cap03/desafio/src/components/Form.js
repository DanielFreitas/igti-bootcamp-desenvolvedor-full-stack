import React, { useState, useEffect } from "react";

export default function Form({ setValues }) {
  const [initialValue, setInitialValue] = useState(1000);
  const [interest, setInterest] = useState(1);
  const [months, setMonths] = useState(1);

  useEffect(() => {
    setValues({
      initialValue,
      interest,
      months,
    });
  }, [initialValue, interest, months, setValues]);

  return (
    <div>
      <div className="input-field col s6 m4 l4">
        <input
          id="inputValue"
          type="number"
          value={initialValue}
          onChange={(event) => setInitialValue(event.target.value)}
          min={100}
          max={100000}
          step={100}
          autoFocus
        />
        <label className="active" htmlFor="inputValue">
          Capital inicial:
        </label>
      </div>

      <div className="input-field col s6 m4 l4">
        <input
          id="inputInterest"
          type="number"
          value={interest}
          onChange={(event) => setInterest(event.target.value)}
          min={-12}
          max={12}
          step={0.1}
        />
        <label className="active" htmlFor="inputInterest">
          Taxa de juros mensal:
        </label>
      </div>

      <div className="input-field col s6 m4 l4">
        <input
          id="inputMonths"
          type="number"
          value={months}
          onChange={(event) => setMonths(event.target.value)}
          min={1}
          max={36}
        />
        <label className="active" htmlFor="inputMonths">
          Período (meses):
        </label>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import calculateInterest from "./helpers/calculateInterest";
import Installments from "./components/Installments";
import css from "./App.module.css";

function App() {
  // Store in arrayCompoundInterest the values ​​already calculated
  const [arrayCompoundInterest, setCompoundInterest] = useState([]);

  // When valuesToCalculateInterest is updated in Form I do the interest calculation and store the amounts in arrayCompoundInterest
  const [valuesToCalculateInterest, setValuesToCalculateInterest] = useState({
    initialValue: 0,
    interest: 0,
    months: 0,
  });

  // Runs both after the first render and after every update in valuesToCalculateInterest
  useEffect(() => {
    setCompoundInterest(calculateInterest(valuesToCalculateInterest));
  }, [valuesToCalculateInterest]);

  return (
    <div className={`${css.back} container`}>
      <h3 className={css.title}>React - Juros Compostos</h3>

      <div className="row">
        {/* I send the setValuesToCalculateInterest to the Form so that it can be updated there and generate the effect here in useEffect  */}
        <Form setValues={setValuesToCalculateInterest} />

        {/*arrayCompoundInterest has all the values ​​already calculated*/}

        <Installments setValues={arrayCompoundInterest} />
      </div>
    </div>
  );
}

export default App;

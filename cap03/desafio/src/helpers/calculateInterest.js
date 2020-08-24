function calculateInterest({ initialValue, interest, months }) {
  let array = [];
  let count = 1;

  for (let month = 1; month <= months; month++) {
    const valueTotal = initialValue * Math.pow(1 + interest / 100.0, month);

    const valueMonthly = (valueTotal - initialValue).toFixed(2);
    const valueInterest = ((valueMonthly / initialValue) * 100).toFixed(2);

    const value = {
      month: count,
      valueTotal: valueTotal.toFixed(2),
      valueMonthly,
      valueInterest,
    };

    array.push(value);
    count++;
  }
  console.log(array);
  return array;
}

export default calculateInterest;

function formatNumber(number) {
  const formatter = number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return formatter;
}

function formatPercentage(number) {
  const formatter = number.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter + "%";
}

export { formatNumber, formatPercentage };
